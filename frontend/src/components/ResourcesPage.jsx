import React, { useState, useEffect, useRef } from 'react';
import MapComponent from './Map';
import { Search, MapPin, Filter, X, ShieldCheck, RefreshCw } from 'lucide-react';
import axios from 'axios';

// Distance helper
function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const ResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [locError, setLocError] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [filters, setFilters] = useState({ search: '', type: 'all', radius: '5' });

  const fetchRef = useRef(null);
  const isFetchingRef = useRef(false); // ✅ prevents duplicate calls

  // 📍 Get location once
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocError('Geolocation is not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => setLocError('Location access denied')
    );
  }, []);

  // 🚀 API call with guard
  const fetchResources = async () => {
    if (!userLocation || isFetchingRef.current) return;

    isFetchingRef.current = true;
    setIsLoading(true);

    try {
      console.log('🚀 API CALL');

      const { data } = await axios.get('/api/resources', {
        params: {
          lat: userLocation.lat,
          lng: userLocation.lng,
          radius: filters.radius,
          type: filters.type,
          search: filters.search,
        },
      });

      setResources(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('API ERROR:', err);
      setResources([]);
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  };

  // 📍 Fetch ONCE when location arrives
  useEffect(() => {
    if (userLocation) {
      fetchResources();
    }
  }, [userLocation]);

  // 🎯 Fetch when filters change (debounced)
  useEffect(() => {
    if (!userLocation) return;

    clearTimeout(fetchRef.current);

    fetchRef.current = setTimeout(() => {
      fetchResources();
    }, 1000); // ✅ increased debounce

    return () => clearTimeout(fetchRef.current);
  }, [filters.type, filters.radius]);

  // 🔍 Client-side search
  const displayedResources = filters.search
    ? resources.filter((r) =>
        r.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        r.address.toLowerCase().includes(filters.search.toLowerCase()) ||
        r.type.toLowerCase().includes(filters.search.toLowerCase())
      )
    : resources;

  const handleMarkerClick = (resource) => {
    setSelectedId(resource.id);
    document
      .getElementById(`rc-${resource.id}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const resetFilters = () =>
    setFilters({ search: '', type: 'all', radius: '5' });

  return (
    <div className="pt-20 flex flex-col md:flex-row overflow-hidden h-screen">

      {/* MAP */}
      <div className="flex-1 md:w-[70%] h-[45vh] md:h-full relative">
        <MapComponent
          resources={displayedResources}
          selectedResourceId={selectedId}
          onMarkerClick={handleMarkerClick}
          externalUserLocation={userLocation}
          shouldZoomToSelected={true}
        />
      </div>

      {/* LIST */}
      <div className="w-full md:w-[400px] flex flex-col border-l overflow-hidden">

        {/* Filters */}
        <div className="p-4 space-y-3 border-b">

          <div className="flex justify-between items-center">
            <h2 className="font-bold flex gap-2">
              <Filter size={18} /> Nearby Resources
            </h2>
            <button onClick={resetFilters}>
              <RefreshCw size={14} />
            </button>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search..."
            value={filters.search}
            onChange={(e) =>
              setFilters((f) => ({ ...f, search: e.target.value }))
            }
            className="w-full border p-2 rounded"
          />

          {/* Type */}
          <select
            value={filters.type}
            onChange={(e) =>
              setFilters((f) => ({ ...f, type: e.target.value }))
            }
          >
            <option value="all">All</option>
            <option value="hospital">Hospital</option>
            <option value="school">School</option>
          </select>

          {/* Radius */}
          <select
            value={filters.radius}
            onChange={(e) =>
              setFilters((f) => ({ ...f, radius: e.target.value }))
            }
          >
            <option value="1">1 km</option>
            <option value="5">5 km</option>
            <option value="10">10 km</option>
          </select>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-3">
          {isLoading && <p>Loading...</p>}

          {!isLoading && displayedResources.length === 0 && (
            <p>No results</p>
          )}

          {displayedResources.map((res) => (
            <div
              key={res.id}
              id={`rc-${res.id}`}
              className="border p-3 mb-2 cursor-pointer"
              onClick={() => handleMarkerClick(res)}
            >
              <h3 className="font-bold">{res.name}</h3>
              <p className="text-sm">{res.address}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;