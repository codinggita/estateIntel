import React, { useState, useEffect, useRef } from 'react';
import MapComponent from './Map';
import { Search, MapPin, Filter, X, ShieldCheck, RefreshCw } from 'lucide-react';
import axios from 'axios';
import logger from '../utils/logger';

// Haversine formula for accurate distance calculation
function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Comprehensive type configuration
const TYPE_CONFIG = {
  all:        { label: 'All Types',         color: 'bg-slate-100 text-slate-700',    img: '' },
  hospital:   { label: 'Hospital',          color: 'bg-blue-100 text-blue-800',      img: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=400&h=300&fit=crop' },
  school:     { label: 'School',            color: 'bg-emerald-100 text-emerald-800',img: 'https://images.unsplash.com/photo-1546410531-b4d4b1a45129?w=400&h=300&fit=crop' },
  college:    { label: 'College',           color: 'bg-violet-100 text-violet-800',  img: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop' },
  library:    { label: 'Library',           color: 'bg-indigo-100 text-indigo-800',  img: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop' },
  police:     { label: 'Police Station',    color: 'bg-sky-100 text-sky-800',        img: 'https://images.unsplash.com/photo-1580894912989-0bc892f4efd0?w=400&h=300&fit=crop' },
  market:     { label: 'Market',            color: 'bg-orange-100 text-orange-800',  img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop' },
  theatre:    { label: 'Theatre / Cinema',  color: 'bg-pink-100 text-pink-800',      img: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=400&h=300&fit=crop' },
  salon:      { label: 'Salon / Spa',       color: 'bg-rose-100 text-rose-800',      img: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&h=300&fit=crop' },
  restaurant: { label: 'Restaurant / Cafe', color: 'bg-yellow-100 text-yellow-800',  img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop' },
  railway:    { label: 'Railway Station',   color: 'bg-teal-100 text-teal-800',      img: 'https://images.unsplash.com/photo-1474487548417-781cb6d646b4?w=400&h=300&fit=crop' },
  bus:        { label: 'Bus Station',       color: 'bg-lime-100 text-lime-800',      img: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&h=300&fit=crop' },
  temple:     { label: 'Temple',            color: 'bg-purple-100 text-purple-700',  img: 'https://images.unsplash.com/photo-1544371081-36ba90678f14?w=400&h=300&fit=crop' },
  water:      { label: 'Water Hazard',      color: 'bg-cyan-100 text-cyan-800',      img: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=400&h=300&fit=crop' },
  dumpyard:   { label: 'Dumpyard',          color: 'bg-amber-100 text-amber-800',    img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15f?w=400&h=300&fit=crop' },
};

// Backend handles all detection and query logic for performance and reliability

const ResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [locError, setLocError] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [filters, setFilters] = useState({ search: '', type: 'all', radius: '5' });
  const fetchRef = useRef(null);

  // Prompt for location once
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocError('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setLocError('Location access denied. Please allow location access to see nearby resources.')
    );
  }, []);

  const fetchResources = async () => {
    if (!userLocation) return;
    setIsLoading(true);
    
    try {
      logger.info('Fetching resources with params:', {
        lat: userLocation.lat,
        lng: userLocation.lng,
        radius: filters.radius,
        type: filters.type
      });
      
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const { data } = await axios.get('/api/resources', {
        params: {
          lat: userLocation.lat,
          lng: userLocation.lng,
          radius: filters.radius,
          type: filters.type,
          search: filters.search,
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      logger.info(`Received ${data.length} results from backend`);
      setResources(Array.isArray(data) ? data : []);
    } catch (err) {
      if (err.name === 'AbortError') {
        logger.warn('Resources fetch timeout');
      } else {
        logger.error('Backend fetch failed:', err.response?.data || err.message);
      }
      setResources([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch whenever location or filters change (debounced 400ms)
  useEffect(() => {
    if (!userLocation) return;
    clearTimeout(fetchRef.current);
    fetchRef.current = setTimeout(fetchResources, 400);
    return () => clearTimeout(fetchRef.current);
  }, [userLocation, filters.type, filters.radius]);

  // Search is purely client-side, no re-fetch needed
  const displayedResources = filters.search
    ? resources.filter(r =>
        r.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        r.address.toLowerCase().includes(filters.search.toLowerCase()) ||
        r.type.toLowerCase().includes(filters.search.toLowerCase())
      )
    : resources;

  const handleMarkerClick = (resource) => {
    setSelectedId(resource.id);
    document.getElementById(`rc-${resource.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const resetFilters = () => setFilters({ search: '', type: 'all', radius: '5' });

  return (
    <div className="pt-20 flex flex-col md:flex-row overflow-hidden bg-bg h-screen">

      {/* LEFT: Map (70%) */}
      <div className="flex-1 md:w-[70%] h-[45vh] md:h-full relative z-0">
        {locError && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-red-50 border border-red-200 text-red-700 text-sm font-semibold px-5 py-3 rounded-xl shadow-lg">
            {locError}
          </div>
        )}
        <MapComponent
          resources={displayedResources}
          selectedResourceId={selectedId}
          onMarkerClick={handleMarkerClick}
          externalUserLocation={userLocation}
          shouldZoomToSelected={true}
          isEmbedded={true}
        />
      </div>

      {/* RIGHT: Cards (30%) */}
      <div className="w-full md:w-[380px] lg:w-[440px] flex flex-col bg-card border-l border-white/10 overflow-hidden">

        {/* Filter Header */}
        <div className="p-4 border-b border-white/5 bg-card shadow-sm space-y-3 shrink-0">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-text flex items-center gap-2">
              <Filter size={18} className="text-indigo-600" /> Nearby Resources
            </h2>
            <button onClick={resetFilters} className="flex items-center gap-1 text-xs text-slate-400 hover:text-indigo-600 font-semibold transition-colors">
              <RefreshCw size={12} /> Reset
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input
              type="text"
              placeholder="Search name, address or type..."
              value={filters.search}
              onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
              className="w-full pl-9 pr-8 py-2 bg-bg border border-white/10 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
            {filters.search && (
              <button onClick={() => setFilters(f => ({ ...f, search: '' }))} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Type + Radius */}
          <div className="flex gap-2">
            <select
              value={filters.type}
              onChange={e => setFilters(f => ({ ...f, type: e.target.value }))}
              className="flex-1 bg-bg border border-white/10 rounded-lg px-2 py-1.5 text-sm font-semibold text-text focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {Object.entries(TYPE_CONFIG).map(([key, val]) => (
                <option key={key} value={key}>{val.label}</option>
              ))}
            </select>
            <select
              value={filters.radius}
              onChange={e => setFilters(f => ({ ...f, radius: e.target.value }))}
              className="flex-1 bg-bg border border-white/10 rounded-lg px-2 py-1.5 text-sm font-semibold text-text focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="1">Within 1 km</option>
              <option value="3">Within 3 km</option>
              <option value="5">Within 5 km</option>
              <option value="10">Within 10 km</option>
              <option value="20">Within 20 km</option>
            </select>
          </div>

          {/* Count badge */}
          {!isLoading && (
            <p className="text-xs text-slate-400 font-semibold">
              {displayedResources.length} resource{displayedResources.length !== 1 ? 's' : ''} found
            </p>
          )}
        </div>

        {/* Resource List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 pb-10">
          {!userLocation && !locError && (
            <div className="text-center py-16 text-slate-400">
              <MapPin size={40} className="mx-auto mb-3 animate-bounce" />
              <p className="font-semibold">Waiting for your location…</p>
              <p className="text-sm mt-1">Please allow location access in your browser.</p>
            </div>
          )}

          {isLoading && userLocation && (
            [1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white border border-slate-100 rounded-2xl p-3 flex gap-3 animate-pulse shadow-sm">
                <div className="w-20 h-20 bg-slate-200 rounded-xl shrink-0" />
                <div className="flex-1 space-y-2 pt-1">
                  <div className="h-4 bg-slate-200 rounded w-3/4" />
                  <div className="h-3 bg-slate-200 rounded w-1/2" />
                  <div className="h-3 bg-slate-200 rounded w-full" />
                </div>
              </div>
            ))
          )}

          {!isLoading && userLocation && displayedResources.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <MapPin size={40} className="mx-auto mb-3 text-slate-300" />
              <p className="font-semibold text-slate-500">No results found</p>
              <p className="text-sm mt-1">Try a larger radius or different type.</p>
              <button onClick={resetFilters} className="mt-4 text-indigo-600 font-bold text-sm hover:underline">Reset Filters</button>
            </div>
          )}

          {!isLoading && displayedResources.map(res => {
            const badgeClass = TYPE_CONFIG[res.type]?.color || 'bg-gray-100 text-gray-700';
            const isSelected = selectedId === res.id;
            
            // Helper for handling image errors and providing fallbacks
            const handleImageError = (e) => {
              if (res.imageFallback && e.target.src !== res.imageFallback) {
                e.target.src = res.imageFallback;
              } else {
                e.target.src = `https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=300&fit=crop`; // Final fallback
              }
            };

            return (
              <div
                key={res.id}
                id={`rc-${res.id}`}
                onClick={() => setSelectedId(isSelected ? null : res.id)}
                className={`group cursor-pointer bg-card rounded-2xl overflow-hidden border transition-all duration-300 ${
                  isSelected
                    ? 'border-primary shadow-xl shadow-primary/10 ring-2 ring-primary/20'
                    : 'border-white/10 shadow-sm hover:shadow-lg hover:border-primary/30'
                }`}
              >
                {/* Image at Top */}
                <div className="h-40 overflow-hidden bg-slate-100 relative">
                  <img 
                    src={res.image} 
                    alt={res.name} 
                    loading="lazy"
                    onError={handleImageError}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`text-[10px] uppercase tracking-wider font-black px-2.5 py-1 rounded-full shadow-sm backdrop-blur-md bg-white/90 ${badgeClass}`}>
                      {TYPE_CONFIG[res.type]?.label || res.type}
                    </span>
                  </div>
                  {res.verified && (
                    <div className="absolute top-3 right-3 bg-white/90 rounded-full p-1.5 shadow-md text-green-500">
                      <ShieldCheck size={14} />
                    </div>
                  )}
                  {/* Distance Overlay */}
                  <div className="absolute bottom-3 right-3 bg-indigo-600/90 text-white px-2.5 py-1 rounded-lg text-[10px] font-black shadow-md backdrop-blur-sm">
                    {res.distance}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-black text-text text-base leading-snug truncate">
                      {res.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-amber-400">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <svg key={s} className={`w-3 h-3 fill-current ${s > (res.rating || 4) ? 'text-slate-200' : ''}`} viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">
                      ({res.rating || '4.0'})
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 truncate mb-1 flex items-center gap-1.5 font-medium">
                    <MapPin size={12} className="text-indigo-400 shrink-0" /> 
                    {res.address}
                  </p>

                  {isSelected && (
                    <div className="mt-4 pt-4 border-t border-slate-100 animate-in fade-in slide-in-from-top-2 duration-300">
                      <p className="text-xs text-slate-600 leading-relaxed font-medium mb-4">
                        {res.description}
                      </p>
                      
                      {res.opening_hours && (
                        <div className="mb-4 text-[10px] text-slate-500 font-bold bg-slate-50 p-2 rounded-lg flex items-center gap-2 border border-slate-100">
                          <RefreshCw size={10} className="text-indigo-500" />
                          Hours: {res.opening_hours}
                        </div>
                      )}

                      <div className="flex gap-2">
                        <button
                          onClick={e => { e.stopPropagation(); handleMarkerClick(res); }}
                          className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl font-black text-xs hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200 active:scale-95"
                        >
                          📍 View on Map
                        </button>
                        <button
                          onClick={e => e.stopPropagation()}
                          className="flex-1 bg-slate-100 text-slate-600 py-2.5 rounded-xl font-black text-xs hover:bg-slate-200 transition-all active:scale-95"
                        >
                          ⚠️ Report
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;
