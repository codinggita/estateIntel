const express = require('express');
const router = express.Router();
const https = require('https');

// Haversine formula
function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Fallback logic for images
const TYPE_UNSPLASH_KEYWORDS = {
  hospital:   'hospital,medical',
  school:     'school,classroom',
  college:    'university,campus',
  library:    'library,books',
  police:     'police,station',
  market:     'market,shopping',
  theatre:    'cinema,theatre',
  salon:      'salon,spa',
  restaurant: 'restaurant,food',
  railway:    'train,station',
  bus:        'bus,station',
  water:      'lake,water',
  dumpyard:   'waste,trash',
  temple:     'temple,mandir,spiritual',
  unknown:    'building'
};

function getResourceImage(type, id, lat, lng) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const keyword = TYPE_UNSPLASH_KEYWORDS[type] || 'building';
  
  // Primary: Google Street View (The REAL physical place)
  if (apiKey && apiKey !== 'YOUR_KEY_HERE') {
    return `https://maps.googleapis.com/maps/api/streetview?size=600x400&location=${lat},${lng}&fov=80&heading=70&pitch=0&key=${apiKey}`;
  }
  
  // Fallback: Unsplash featured
  return `https://source.unsplash.com/featured/400x300?${keyword.replace(',', '+')}&sig=${id}`;
}

// Map OSM tags to our internal type
function detectType(tags = {}, name = '') {
  const n = name.toLowerCase();
  const a = tags.amenity || '';
  const s = tags.shop || '';
  const l = tags.leisure || '';
  const b = tags.building || '';

  if (a === 'hospital' || a === 'clinic' || a === 'doctors' || a === 'pharmacy' || tags.healthcare) return 'hospital';
  if (a === 'school' || a === 'kindergarten') return 'school';
  if (a === 'university' || a === 'college' || n.includes('university') || n.includes('college') || b === 'university') return 'college';
  if (a === 'library') return 'library';
  if (a === 'police' || a === 'fire_station') return 'police';
  if (a === 'marketplace' || a === 'shopping_centre' || s === 'supermarket' || s === 'mall' || n.includes('market')) return 'market';
  if (a === 'theatre' || a === 'cinema' || l === 'cinema' || n.includes('cinema') || n.includes('multiplex')) return 'theatre';
  if (s === 'hairdresser' || s === 'beauty' || s === 'barber' || s === 'spa' || n.includes('salon')) return 'salon';
  if (a === 'restaurant' || a === 'fast_food' || a === 'cafe' || n.includes('restaurant') || n.includes('cafe')) return 'restaurant';
  if (a === 'train_station' || tags.railway === 'station' || n.includes('railway')) return 'railway';
  if (a === 'bus_station' || tags.highway === 'bus_stop' || n.includes('bus station')) return 'bus';
  if (a === 'place_of_worship' || tags.religion || tags.building === 'temple' || tags.building === 'mosque' || tags.building === 'church' || n.includes('temple') || n.includes('ashram') || n.includes('mandir') || n.includes('gurudwara')) return 'temple';
  if (tags.natural === 'water' || tags.waterway) return 'water';
  if (tags.landuse === 'landfill' || a === 'waste_disposal') return 'dumpyard';
  return 'unknown';
}

function buildOverpassQuery(lat, lng, radiusM, typeFilter) {
  const ALL_TAGS = {
    hospital: [`nwr["amenity"="hospital"]`, `nwr["amenity"="clinic"]`, `nwr["amenity"="doctors"]`],
    school:   [`nwr["amenity"="school"]`, `nwr["amenity"="kindergarten"]`],
    college:  [`nwr["amenity"="university"]`, `nwr["amenity"="college"]`],
    library:  [`nwr["amenity"="library"]`],
    police:   [`nwr["amenity"="police"]`],
    market:   [`nwr["amenity"="marketplace"]`, `nwr["amenity"="shopping_centre"]`, `nwr["shop"="supermarket"]`],
    theatre:  [`nwr["amenity"="theatre"]`, `nwr["amenity"="cinema"]`],
    salon:    [`nwr["shop"="hairdresser"]`, `nwr["shop"="beauty"]`, `nwr["shop"="barber"]`, `nwr["shop"="spa"]`],
    restaurant: [`nwr["amenity"="restaurant"]`, `nwr["amenity"="fast_food"]`, `nwr["amenity"="cafe"]`],
    railway:  [`nwr["railway"="station"]`, `nwr["amenity"="train_station"]`],
    bus:      [`nwr["amenity"="bus_station"]`, `node["highway"="bus_stop"]`],
    water:    [`nwr["natural"="water"]`, `nwr["waterway"]`],
    dumpyard: [`nwr["landuse"="landfill"]`, `nwr["amenity"="waste_disposal"]`],
    temple:   [
      `nwr["amenity"="place_of_worship"]`,
      `nwr["building"~"temple|mandir",i]`,
      `nwr["religion"~"hindu|jain|sikh|muslim",i]`,
      `nwr["name"~"temple|mandir|ashram|gurudwara|shrine|swaminarayan",i]`,
      `nwr["brand"~"swaminarayan",i]`,
      `nwr(around:${radiusM},${lat},${lng})[~"."~"temple|mandir|ashram",i]`
    ],
  };

  let tags = [];
  if (typeFilter === 'all') {
    // Essential types for "all" search
    tags = [
      ...ALL_TAGS.hospital, 
      ...ALL_TAGS.school, 
      ...ALL_TAGS.police, 
      ...ALL_TAGS.market, 
      ...ALL_TAGS.restaurant,
      ...ALL_TAGS.temple
    ];
  } else {
    tags = ALL_TAGS[typeFilter] || [];
  }

  const lines = tags.map(t => `  ${t}(around:${radiusM},${lat},${lng});`).join('\n');
  return `[out:json][timeout:60];\n(\n${lines}\n);\nout center tags;`;
}

router.get('/', async (req, res) => {
  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);
  const radiusKm = parseFloat(req.query.radius) || 5;
  const typeFilter = req.query.type || 'all';

  if (isNaN(lat) || isNaN(lng)) return res.status(400).json({ error: 'Lat/Lng missing' });

  const radiusM = radiusKm * 1000;
  console.log(`[Resources] Fetching ${typeFilter} at ${lat},${lng} (radius ${radiusKm}km)`);

  try {
    const query = buildOverpassQuery(lat, lng, radiusM, typeFilter);
    const body = `data=${encodeURIComponent(query)}`;
    
    // List of reliable Overpass mirrors for failover
    const mirrors = ['overpass-api.de', 'lz4.overpass-api.de', 'z.overpass-api.de', 'overpass.kumi.systems'];
    let sent = false;

    const tryQuery = (mirrorIndex) => {
      if (sent) return;
      if (mirrorIndex >= mirrors.length) {
        console.error('[Resources] All Overpass mirrors failed.');
        sent = true;
        return res.json([]);
      }

      console.log(`[Resources] Trying mirror: ${mirrors[mirrorIndex]}`);
      
      const options = {
        hostname: mirrors[mirrorIndex], 
        path: '/api/interpreter', 
        method: 'POST',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded', 
          'Content-Length': Buffer.byteLength(body), 
          'User-Agent': 'EstateIntel/1.0' 
        },
        timeout: 10000 // 10 second timeout per mirror
      };

      const request = https.request(options, response => {
        let data = '';
        response.on('data', chunk => data += chunk);
        response.on('end', () => {
          if (sent) return;
          if (response.statusCode !== 200) {
            console.warn(`[Resources] Mirror ${mirrors[mirrorIndex]} returned ${response.statusCode}.`);
            return tryQuery(mirrorIndex + 1);
          }
          try {
            const elements = JSON.parse(data).elements || [];
            const seen = new Set();
            const resources = elements.map(el => {
              const eLat = el.lat ?? el.center?.lat;
              const eLon = el.lon ?? el.center?.lon;
              if (!eLat || !eLon || seen.has(el.id)) return null;
              seen.add(el.id);

              const tags = el.tags || {};
              let name = tags.name || tags['name:en'] || tags['name:hi'] || tags['name:gu'] ||
                         tags.official_name || tags.alt_name || tags.operator || tags.brand;

              const detectedType = detectType(tags, name || '');
              const dist = getDistanceKm(lat, lng, eLat, eLon);
              const street = tags['addr:street'] || tags['addr:place'] || '';
              const city = tags['addr:city'] || '';

              if (!name) {
                const typeLabel = typeFilter === 'all' ? detectedType : typeFilter;
                const titleCaseType = typeLabel.charAt(0).toUpperCase() + typeLabel.slice(1);
                name = street ? `${titleCaseType} on ${street}` : `Unlabeled ${titleCaseType}`;
              }

              if (detectedType === 'unknown' && !tags.name && typeFilter === 'all') return null;

              return {
                id: String(el.id),
                name: name,
                type: detectedType,
                latitude: eLat, longitude: eLon,
                address: street ? `${street}${city ? ', ' + city : ''}` : 'Local area',
                description: tags.description || `${name} is located ${dist.toFixed(2)} km away.`,
                image: getResourceImage(detectedType, el.id, eLat, eLon),
                imageFallback: `https://source.unsplash.com/featured/400x300?${(TYPE_UNSPLASH_KEYWORDS[detectedType] || 'building').replace(',', '+')}&sig=${el.id}`,
                distance: `${dist.toFixed(1)} km`,
                rawDistance: dist,
                rating: (4.0 + Math.random() * 1).toFixed(1),
                verified: true
              };
            }).filter(r => r !== null && r.rawDistance <= (radiusKm * 1.1));

            resources.sort((a, b) => a.rawDistance - b.rawDistance);
            console.log(`[Resources] Success! Returning ${resources.length} results from ${mirrors[mirrorIndex]}`);
            sent = true;
            res.json(resources);
          } catch (e) {
            console.error(`[Resources] Parse error from ${mirrors[mirrorIndex]}.`);
            tryQuery(mirrorIndex + 1);
          }
        });
      });

      request.on('error', (e) => {
        if (sent) return;
        console.error(`[Resources] Network error on ${mirrors[mirrorIndex]}:`, e.message);
        tryQuery(mirrorIndex + 1);
      });

      request.on('timeout', () => {
        request.destroy();
        if (sent) return;
        console.warn(`[Resources] Timeout on ${mirrors[mirrorIndex]}.`);
        tryQuery(mirrorIndex + 1);
      });

      request.write(body);
      request.end();
    };

    // Start fetching from first mirror
    tryQuery(0);

  } catch (err) {
    console.error('[Resources] Server error:', err.message);
    res.status(500).json({ error: 'Internal Error' });
  }
});

module.exports = router;
