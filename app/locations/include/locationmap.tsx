"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactDOMServer from "react-dom/server";
import { useParams } from "next/navigation";
import { HiLocationMarker } from "react-icons/hi";
import {
  FaToilet,
  FaChair,
  FaCoffee,
  FaFilm,
  FaMapMarkerAlt,
  FaClock,
  FaTimes,
  FaSearch,
  FaSlidersH,
  FaChevronRight,
  FaChevronDown,
  FaWhatsapp,
  FaStar,
  FaInfoCircle,
} from "react-icons/fa";
import { IoMdBatteryCharging } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { BASE_URL } from "@/app/ui/baceurl";

const MAPBOX_TOKEN =
  process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
const MAP_STYLE = "mapbox://styles/mapbox/light-v11";
mapboxgl.accessToken = MAPBOX_TOKEN;

interface Review {
  id: number;
  name: string;
  rating: number;
  date_str: string;
  comment: string;
  created_at: string;
}

interface Station {
  id: string | number;
  name: string;
  city: string;
  country: string;
  latitude: string;
  longitude: string;
  status: string;
  facilities: string[];
  charger_connector: string;
  charger_power: string;
  charger_count: number;
  google_map_url: string;
  image?: string;
  avg_rating?: number;
  total_reviews?: number;
  reviews?: Review[];
}

const generateSlug = (name: string, city: string) => {
  const combined = `${name}-${city}`;
  return combined
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const getGoogleMapsUrl = (station: Station) => {
  if (
    station.google_map_url &&
    station.google_map_url.trim() !== "" &&
    !station.google_map_url.includes("90.00000") &&
    !station.google_map_url.includes("/dir/")
  ) {
    return station.google_map_url;
  }

  const nameStr = station.name ? station.name.trim() : "";
  const cityStr = station.city ? station.city.trim() : "";
  const addressStr = (station as any).address
    ? (station as any).address.trim()
    : "";

  const queryParts = [nameStr, addressStr, cityStr].filter(Boolean);
  if (queryParts.length > 0) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(queryParts.join(", "))}`;
  }

  if (station.latitude && station.longitude) {
    const lat = parseFloat(station.latitude);
    const lng = parseFloat(station.longitude);
    if (!isNaN(lat) && !isNaN(lng) && lat !== 0 && Math.abs(lat) <= 85) {
      return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    }
  }

  return "https://www.google.com/maps";
};

const LocationMapPro = () => {
  const params = useParams();
  const slug = params?.slug
    ? Array.isArray(params.slug)
      ? params.slug[0]
      : params.slug
    : undefined;

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [stations, setStations] = useState<Station[]>([]);
  const [country, setCountry] = useState("India");
  const [city, setCity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [showReviews, setShowReviews] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Fetch stations from backend
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/locations/`);
        if (res.ok) {
          const data = await res.json();
          setStations(data);
        }
      } catch (err) {
        console.error("Failed to fetch stations:", err);
      }
    };
    fetchStations();
  }, []);

  // Sync selected station with URL slug when stations load or slug changes
  useEffect(() => {
    if (stations.length > 0 && isMapLoaded) {
      if (slug) {
        const matched = stations.find(
          (s) => generateSlug(s.name, s.city) === slug,
        );
        if (matched) {
          if (selectedStation?.id !== matched.id) {
            setSelectedStation(matched);
            setShowReviews(false);
            const isMobile =
              typeof window !== "undefined" && window.innerWidth < 1024;
            if (isMobile) {
              setIsSidebarOpen(false);
            }
            if (mapRef.current) {
              const lat = parseFloat(matched.latitude);
              const lng = parseFloat(matched.longitude);
              if (
                !isNaN(lat) &&
                !isNaN(lng) &&
                Math.abs(lat) < 90 &&
                Math.abs(lng) <= 180
              ) {
                mapRef.current.flyTo({
                  center: [lng, lat],
                  zoom: 14,
                  essential: true,
                  duration: 800,
                  padding: {
                    left: !isMobile && isSidebarOpen ? 440 : 40,
                    top: isMobile ? 110 : 60,
                    right: isMobile ? 40 : 380,
                    bottom: isMobile ? 280 : 60,
                  },
                });
              }
            }
          }
        }
      } else {
        if (selectedStation !== null) {
          setSelectedStation(null);
        }
      }
    }
  }, [slug, stations, isMapLoaded]);

  const handleCloseDetail = () => {
    setSelectedStation(null);
    setShowReviews(false);
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", "/locations");
    }
  };

  // Helper to categorize AC/DC
  const getChargerType = (connector: string) => {
    if (!connector) return "AC";
    const c = connector.toLowerCase();
    if (c.includes("ccs") || c.includes("dc") || c.includes("fast"))
      return "DC";
    return "AC";
  };

  // Derived Data for Filters
  const countries = useMemo(() => {
    if (stations.length === 0) return ["India"];
    return [...new Set(stations.map((s) => s.country))].sort();
  }, [stations]);

  const citiesInSelectedCountry = useMemo(() => {
    const filtered = stations.filter((s) => s.country === country);
    return [...new Set(filtered.map((s) => s.city))].sort();
  }, [country, stations]);

  const filteredStations = useMemo(() => {
    return stations.filter((station) => {
      const matchesCountry = country === "" || station.country === country;
      const matchesCity = city === "" || station.city === city;
      const matchesSearch =
        station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        station.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || station.status === statusFilter;
      const matchesType =
        typeFilter === "all" ||
        getChargerType(station.charger_connector) === typeFilter;
      return (
        matchesCountry &&
        matchesCity &&
        matchesSearch &&
        matchesStatus &&
        matchesType
      );
    });
  }, [country, city, searchQuery, statusFilter, typeFilter, stations]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: MAP_STYLE,
      center: [78.9629, 15.5937],
      zoom: 4.8,
    });

    // Set initial padding (account for sidebar on desktop, navbar/bottomsheet on mobile)
    const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
    mapRef.current.setPadding({
      left: !isMobile && isSidebarOpen ? 400 : 0,
      top: isMobile ? 110 : 0,
      right: 0,
      bottom: isMobile ? 240 : 0,
    });

    mapRef.current.on("load", () => {
      if (mapRef.current) {
        mapRef.current.resize();

        // Change all text labels on the map to green
        const style = mapRef.current.getStyle();
        if (style && style.layers) {
          style.layers.forEach((layer) => {
            if (
              layer.type === "symbol" &&
              layer.layout &&
              layer.layout["text-field"]
            ) {
              mapRef.current?.setPaintProperty(
                layer.id,
                "text-color",
                "#00b14f",
              );
            }
          });
        }

        setIsMapLoaded(true);
        renderMarkers(filteredStations, true);
      }
    });

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  // Sync Padding when Sidebar toggles
  useEffect(() => {
    if (mapRef.current) {
      const isMobile =
        typeof window !== "undefined" && window.innerWidth < 1024;
      mapRef.current.easeTo({
        padding: {
          left: !isMobile && isSidebarOpen ? 400 : 0,
          top: isMobile ? 110 : 0,
          right: 0,
          bottom: isMobile ? 240 : 0,
        },
        duration: 500,
      });
    }
  }, [isSidebarOpen]);

  // Update markers when filters change or map loads — always re-fit to show all pins
  useEffect(() => {
    if (isMapLoaded && mapRef.current) {
      // Auto-fit bounds only when no station is currently selected/focused
      if (!selectedStation) {
        renderMarkers(filteredStations, true);
      } else {
        renderMarkers(filteredStations, false);
      }
    }
  }, [filteredStations, isMapLoaded, selectedStation]);

  const renderMarkers = (data: Station[], fitMap = false) => {
    if (!mapRef.current) return;
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Collect valid coords for bounds calculation
    const validCoords: [number, number][] = [];

    data.forEach((station) => {
      const lng = parseFloat(station.longitude);
      const lat = parseFloat(station.latitude);

      if (isNaN(lng) || isNaN(lat)) return;

      // Skip clearly wrong coordinates (outside India bounding box roughly)
      // India: lat 6–38, lng 68–98
      if (lat < 5 || lat > 40 || lng < 60 || lng > 100) return;

      validCoords.push([lng, lat]);

      const el = document.createElement("div");
      el.className = "relux-mapbox-marker";
      el.style.width = "40px";
      el.style.height = "40px";
      el.style.position = "absolute";
      el.style.top = "0";
      el.style.left = "0";
      el.style.cursor = "pointer";
      el.style.zIndex = "999";

      el.innerHTML = `
                <div style="position:absolute; bottom:0; left:50%; transform:translateX(-50%); display:flex; flex-direction:column; align-items:center;">
                    <img src="/Icon.svg" alt="marker" style="width:36px; height:auto; position:relative; z-index:2; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));" 
                         onerror="this.style.display='none'; this.parentElement.style.background='#00b14f'; this.parentElement.style.width='14px'; this.parentElement.style.height='14px'; this.parentElement.style.borderRadius='50%'; this.parentElement.style.border='2px solid white'; this.parentElement.style.boxShadow='0 2px 4px rgba(0,0,0,0.3)';" />
                </div>
            `;

      if (mapRef.current) {
        const marker = new mapboxgl.Marker({
          element: el,
          anchor: "bottom",
        })
          .setLngLat([lng, lat])
          .addTo(mapRef.current);

        el.addEventListener("click", (e) => {
          e.stopPropagation();
          handleStationSelect(station);
        });

        markersRef.current.push(marker);
      }
    });

    // Auto-fit map to show all markers at their correct geographic positions
    if (fitMap && validCoords.length > 0 && mapRef.current) {
      const isMobile =
        typeof window !== "undefined" && window.innerWidth < 1024;

      if (validCoords.length === 1) {
        mapRef.current.flyTo({
          center: validCoords[0],
          zoom: 12,
          essential: true,
        });
      } else {
        // Calculate bounds
        const lngs = validCoords.map((c) => c[0]);
        const lats = validCoords.map((c) => c[1]);
        const minLng = Math.min(...lngs);
        const maxLng = Math.max(...lngs);
        const minLat = Math.min(...lats);
        const maxLat = Math.max(...lats);

        const bounds = new mapboxgl.LngLatBounds(
          [minLng, minLat],
          [maxLng, maxLat],
        );

        mapRef.current.fitBounds(bounds, {
          padding: {
            top: isMobile ? 130 : 80,
            bottom: isMobile ? 260 : 80,
            left: !isMobile && isSidebarOpen ? 440 : 60,
            right: 80,
          },
          maxZoom: 13,
          duration: 800,
        });
      }
    }
  };

  const handleStationSelect = (station: Station) => {
    setSelectedStation(station);
    setShowReviews(false);
    const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

    if (isMobile) {
      setIsSidebarOpen(false);
    }

    if (mapRef.current) {
      const lat = parseFloat(station.latitude);
      const lng = parseFloat(station.longitude);
      if (
        !isNaN(lat) &&
        !isNaN(lng) &&
        Math.abs(lat) < 90 &&
        Math.abs(lng) <= 180
      ) {
        mapRef.current.flyTo({
          center: [lng, lat],
          zoom: 14,
          essential: true,
          duration: 800,
          padding: {
            left: !isMobile && isSidebarOpen ? 440 : 40,
            top: isMobile ? 110 : 60,
            right: isMobile ? 40 : 380,
            bottom: isMobile ? 280 : 60,
          },
        });
      }
    }

    // Update URL without triggering Next.js navigation (avoids map re-mount that cancels flyTo)
    if (typeof window !== "undefined") {
      const stationSlug = generateSlug(station.name, station.city);
      window.history.pushState(null, "", `/locations/${stationSlug}`);
    }
  };

  const handleReset = () => {
    setStatusFilter("all");
    setTypeFilter("all");
    setCountry("India");
    setCity("");
    setSearchQuery("");
    setShowReviews(false);
    setIsSidebarOpen(true);
    setSelectedStation(null);
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", "/locations");
    }
  };

  const facilityIcons = {
    Restroom: <FaToilet />,
    "Seating Area": <FaChair />,
    Cafe: <FaCoffee />,
    Multiplex: <FaFilm />,
  };

  return (
    <div className="relative w-full h-full bg-[#0a0a0a] overflow-hidden flex font-sans">
      {/* Sidebar (Glassmorphic List) */}
      <motion.aside
        initial={false}
        animate={{
          x: isSidebarOpen
            ? 0
            : typeof window !== "undefined" && window.innerWidth < 1024
              ? "-100%"
              : -400,
          width: isSidebarOpen
            ? typeof window !== "undefined" && window.innerWidth < 1024
              ? "100%"
              : 400
            : typeof window !== "undefined" && window.innerWidth < 1024
              ? "100%"
              : 0,
          opacity: isSidebarOpen ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="hidden lg:flex absolute h-full bg-[#0a0a0a] lg:bg-white/95 dark:lg:bg-[#0a0a0a]/90 lg:backdrop-blur-3xl border-r border-white/5 lg:border-black/5 dark:lg:border-white/5 z-40 flex-col shadow-2xl overflow-hidden"
      >
        {/* Sidebar Header — Premium */}
        <div className="pt-30 px-5 pb-4 shrink-0 bg-[#0a0a0a] lg:bg-transparent">
          {/* Green accent top bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#00b14f] via-[#00d45f] to-[#00b14f]" />

          {/* Title row */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <div className="w-2 h-2 rounded-full bg-[#00b14f] animate-pulse" />
                <p className="text-[9px] font-black text-[#00b14f] uppercase tracking-[0.25em]">
                  Relux Network
                </p>
              </div>
              <h1 className="text-xl font-black text-white lg:text-black dark:lg:text-white tracking-tight">
                Charging <span className="text-[#00b14f]">Locations</span>
              </h1>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              aria-label="Close sidebar"
              className="lg:hidden w-8 h-8 flex items-center justify-center rounded-xl bg-white/10 lg:bg-black/5 text-white/50 lg:text-black/40"
            >
              <FaTimes size={12} />
            </button>
          </div>

          {/* Search */}
          <div className="relative group mb-3">
            <FaSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 lg:text-black/25 dark:lg:text-white/20 group-focus-within:text-[#00b14f] transition-colors"
              size={11}
            />
            <input
              type="text"
              placeholder="Search stations or cities..."
              className="w-full bg-white/8 lg:bg-black/4 dark:lg:bg-white/5 border border-white/10 lg:border-black/8 dark:lg:border-white/10 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white lg:text-black dark:lg:text-white focus:outline-none focus:border-[#00b14f]/60 lg:focus:border-[#00b14f]/40 transition-all placeholder:text-white/25 lg:placeholder:text-black/20 dark:lg:placeholder:text-white/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Country & City */}
          <div className="flex gap-2 mb-3">
            <select
              className="flex-1 bg-white/8 lg:bg-black/4 dark:lg:bg-white/5 border border-white/10 lg:border-black/8 dark:lg:border-white/10 rounded-xl px-3 py-2 text-xs text-white/70 lg:text-black/60 dark:lg:text-white/60 focus:border-[#00b14f]/60 lg:focus:border-[#00b14f]/40 focus:outline-none appearance-none cursor-pointer"
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
                setCity("");
              }}
            >
              <option
                value=""
                className="bg-[#111] lg:bg-white dark:lg:bg-zinc-900"
              >
                All Countries
              </option>
              {countries.map((c) => (
                <option
                  key={c}
                  value={c}
                  className="bg-[#111] lg:bg-white dark:lg:bg-zinc-900"
                >
                  {c}
                </option>
              ))}
            </select>
            <select
              className="flex-1 bg-white/8 lg:bg-black/4 dark:lg:bg-white/5 border border-white/10 lg:border-black/8 dark:lg:border-white/10 rounded-xl px-3 py-2 text-xs text-white/70 lg:text-black/60 dark:lg:text-white/60 focus:border-[#00b14f]/60 lg:focus:border-[#00b14f]/40 focus:outline-none appearance-none cursor-pointer"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option
                value=""
                className="bg-[#111] lg:bg-white dark:lg:bg-zinc-900"
              >
                All Cities
              </option>
              {citiesInSelectedCountry.map((c) => (
                <option
                  key={c}
                  value={c}
                  className="bg-[#111] lg:bg-white dark:lg:bg-zinc-900"
                >
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Filters — single compact row */}
          <div className="flex items-center gap-1.5">
            <div className="flex bg-white/8 lg:bg-black/4 dark:lg:bg-white/5 border border-white/10 lg:border-black/8 dark:lg:border-white/10 rounded-xl overflow-hidden flex-1 shadow-sm">
              {["All", "Active"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s.toLowerCase())}
                  className={`flex-1 py-1.5 text-[9px] font-black uppercase tracking-wider transition-all ${
                    statusFilter === s.toLowerCase()
                      ? "bg-[#00b14f] text-white"
                      : "text-white/40 lg:text-black/40 dark:lg:text-white/40 hover:text-white/70 lg:hover:text-black/70 dark:lg:hover:text-white"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="flex bg-white/8 lg:bg-black/4 dark:lg:bg-white/5 border border-white/10 lg:border-black/8 dark:lg:border-white/10 rounded-xl overflow-hidden flex-1 shadow-sm">
              {["All", "DC", "AC"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t === "All" ? "all" : t)}
                  className={`flex-1 py-1.5 text-[9px] font-black uppercase tracking-wider transition-all ${
                    typeFilter === (t === "All" ? "all" : t)
                      ? "bg-[#00b14f] text-white"
                      : "text-white/40 lg:text-black/40 dark:lg:text-white/40 hover:text-white/70 lg:hover:text-black/70 dark:lg:hover:text-white"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <button
              onClick={handleReset}
              className="text-[9px] font-bold text-[#00b14f] hover:underline px-1 shrink-0"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Station List — Premium Cards */}
        <div className="flex-1 overflow-y-auto px-4 pb-10 custom-scrollbar space-y-2 bg-[#0a0a0a] lg:bg-transparent">
          {/* Count badge */}
          <p className="text-[9px] font-black text-white/25 lg:text-black/30 dark:lg:text-white/30 uppercase tracking-[0.2em] pb-1">
            {filteredStations.length} Station
            {filteredStations.length !== 1 ? "s" : ""} Found
          </p>
          <AnimatePresence>
            {filteredStations.map((station, i) => (
              <motion.div
                key={station.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: i * 0.04,
                  type: "spring",
                  stiffness: 300,
                  damping: 24,
                }}
                onClick={() => handleStationSelect(station)}
                className={`relative flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all group overflow-hidden ${
                  selectedStation?.id === station.id
                    ? "bg-[#00b14f]/10 border-[#00b14f]/30 lg:bg-[#00b14f]/8 lg:border-[#00b14f]/40 lg:shadow-md lg:shadow-[#00b14f]/10"
                    : "bg-white/5 border-white/8 hover:border-[#00b14f]/30 hover:bg-white/8 lg:bg-white lg:border-black/6 lg:hover:border-[#00b14f]/30 lg:shadow-sm"
                }`}
              >
                {/* Left green accent bar */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-0.75 rounded-l-2xl transition-all ${
                    selectedStation?.id === station.id
                      ? "bg-[#00b14f]"
                      : "bg-transparent group-hover:bg-[#00b14f]/40"
                  }`}
                />

                {/* Charger icon circle */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    station.status === "active"
                      ? "bg-[#00b14f]/10"
                      : "bg-orange-500/10"
                  }`}
                >
                  <IoMdBatteryCharging
                    className={
                      station.status === "active"
                        ? "text-[#00b14f]"
                        : "text-orange-500"
                    }
                    size={18}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h3 className="text-white lg:text-black dark:lg:text-white font-bold text-[13px] leading-tight group-hover:text-[#00b14f] transition-colors truncate">
                      {station.name}
                    </h3>
                    <span
                      className={`text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md shrink-0 ${
                        station.status === "active"
                          ? "bg-[#00b14f]/10 text-[#00b14f]"
                          : "bg-orange-500/10 text-orange-500"
                      }`}
                    >
                      {station.status === "active" ? "Live" : "Maint."}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="flex items-center gap-1 text-[10px] text-white/40 lg:text-black/40 dark:lg:text-white/40">
                      <FaMapMarkerAlt size={8} /> {station.city}
                    </span>
                    <span
                      className={`text-[8px] font-black px-1.5 py-0.5 rounded ${
                        getChargerType(station.charger_connector) === "DC"
                          ? "bg-[#00b14f]/20 text-[#00b14f] lg:bg-[#00b14f]/10"
                          : "bg-blue-500/20 text-blue-400 lg:bg-blue-500/10 lg:text-blue-500"
                      }`}
                    >
                      {getChargerType(station.charger_connector)}
                    </span>
                    <span className="text-[10px] text-white/40 lg:text-black/40 dark:lg:text-white/40 font-medium">
                      {station.charger_power}
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <FaChevronRight
                  size={10}
                  className={`shrink-0 transition-all ${
                    selectedStation?.id === station.id
                      ? "text-[#00b14f]"
                      : "text-white/15 lg:text-black/15 dark:lg:text-white/15 group-hover:text-[#00b14f]/50"
                  }`}
                />
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredStations.length === 0 && (
            <div className="text-center py-16 opacity-30">
              <FaSearch size={32} className="mx-auto mb-3" />
              <p className="text-xs font-bold uppercase tracking-widest">
                No stations found
              </p>
            </div>
          )}
        </div>
      </motion.aside>
      {/* Sidebar Toggle Button (Desktop only) */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle sidebar"
        className="hidden lg:flex absolute top-8 transition-all duration-500 z-30 w-10 h-10 bg-[#00b14f] rounded-xl items-center justify-center text-white shadow-xl"
        style={{ left: isSidebarOpen ? "420px" : "24px" }}
      >
        {isSidebarOpen ? (
          <FaChevronRight className="rotate-180" />
        ) : (
          <FaSearch />
        )}
      </button>
      {/* Mobile Top Overlay - Shifted down to appear below fixed Navbar */}
      <div className="lg:hidden absolute top-25 left-0 right-0 z-40 p-4 pt-2 bg-linear-to-b from-[#f3f4f6]/95 via-[#f3f4f6]/80 to-transparent pointer-events-none flex flex-col gap-3">
        <div className="relative pointer-events-auto shadow-lg rounded-full bg-white flex items-center border border-gray-100 h-12">
          <FaSearch className="absolute left-5 text-gray-500" size={14} />
          <input
            type="text"
            placeholder="Search stations or cities..."
            className="w-full bg-transparent h-full pl-11 pr-4 text-sm focus:outline-none rounded-full text-black font-semibold placeholder:text-gray-500 placeholder:font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaChevronDown className="absolute right-5 text-gray-300" size={12} />
        </div>
        {/* Horizontal filters */}
        <div className="flex gap-2 overflow-x-auto pointer-events-auto pb-1 px-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          <button
            onClick={() => {
              setStatusFilter("all");
              setTypeFilter("all");
            }}
            className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm ${statusFilter === "all" && typeFilter === "all" ? "bg-[#00b14f] text-white border border-[#00b14f]" : "bg-white border border-gray-200 text-gray-800"}`}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter("active")}
            className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm ${statusFilter === "active" ? "bg-[#00b14f] text-white border border-[#00b14f]" : "bg-white border border-gray-200 text-gray-800"}`}
          >
            Active-only
          </button>
          <button
            onClick={() => setTypeFilter("DC")}
            className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm ${typeFilter === "DC" ? "bg-[#00b14f] text-white border border-[#00b14f]" : "bg-white border border-gray-200 text-gray-800"}`}
          >
            DC fast
          </button>
          <button
            onClick={() => setTypeFilter("AC")}
            className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm ${typeFilter === "AC" ? "bg-[#00b14f] text-white border border-[#00b14f]" : "bg-white border border-gray-200 text-gray-800"}`}
          >
            AC type 2
          </button>
        </div>
      </div>
      {/* Legacy mobile filter space removed */} {/* Map Area */}
      <main className="absolute inset-0 z-10">
        <div ref={mapContainerRef} className="w-full h-full" />

        {/* WhatsApp Floating Button (Mobile Only) */}
        <button
          onClick={() => window.open("https://wa.me/919884866993", "_blank")}
          aria-label="Contact on WhatsApp"
          className="lg:hidden absolute bottom-6 right-6 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white text-3xl shadow-2xl z-40 hover:scale-110 active:scale-95 transition-transform"
        >
          <FaWhatsapp />
        </button>

        {/* Floating Selection Overlay (Details - Desktop Only) */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none z-30">
          <AnimatePresence>
            {selectedStation &&
              (() => {
                const activeFacilities = selectedStation.facilities || [];

                const stationReviews =
                  selectedStation.reviews && selectedStation.reviews.length > 0
                    ? selectedStation.reviews
                    : [];
                const avgRating = selectedStation.avg_rating || 0;
                const totalReviews = selectedStation.total_reviews || 0;

                return (
                  <motion.div
                    initial={{ x: 80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 80, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 280, damping: 28 }}
                    className="absolute bottom-6 left-4 right-4 lg:left-auto lg:right-8 lg:bottom-8 lg:w-90 bg-white lg:bg-white/97 dark:bg-[#111] backdrop-blur-3xl rounded-3xl lg:rounded-4xl border border-black/5 dark:border-white/10 p-4 lg:p-5 shadow-2xl z-30 overflow-y-auto max-h-[80vh] custom-scrollbar pointer-events-auto"
                  >
                    <button
                      onClick={handleCloseDetail}
                      className="absolute top-3.5 right-3.5 w-8 h-8 flex items-center justify-center rounded-full bg-black/70 hover:bg-black text-white transition-all z-30 shadow-lg backdrop-blur-sm"
                    >
                      <FaTimes size={13} />
                    </button>

                    {/* 1. STATION IMAGE */}
                    <div className="relative w-full h-28 rounded-[14px] overflow-hidden mb-3 border border-black/5">
                      <img
                        src="/location/location_img.png"
                        alt={selectedStation.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-2 left-2 flex gap-1">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[7px] font-black uppercase tracking-wider ${selectedStation.status === "active" ? "bg-green-500 text-white shadow-md shadow-green-500/20" : "bg-orange-500 text-white"}`}
                        >
                          {selectedStation.status === "active"
                            ? "Active"
                            : "Maintenance"}
                        </span>
                        <span
                          className={`px-1.5 py-0.5 rounded text-[7px] font-black uppercase tracking-wider ${getChargerType(selectedStation.charger_connector) === "DC" ? "bg-[#00b14f] text-white shadow-md shadow-[#00b14f]/20" : "bg-blue-500 text-white"}`}
                        >
                          {getChargerType(selectedStation.charger_connector)}{" "}
                          Charger
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[7px] font-black uppercase tracking-wider bg-black/60 text-white backdrop-blur-md border border-white/10 flex items-center gap-0.5">
                          <FaClock className="text-[#00b14f]" size={7} /> 24 x 7
                          Open
                        </span>
                      </div>
                    </div>

                    {/* 2. STATION NAME & LOCATION */}
                    <div className="mb-3">
                      <h4 className="text-base lg:text-lg font-black text-black dark:text-white leading-tight">
                        {selectedStation.name}
                      </h4>
                      <p className="text-black/40 dark:text-white/40 text-[10px] lg:text-[11px] mt-0.5 flex items-center gap-1">
                        <FaMapMarkerAlt size={9} className="text-[#00b14f]" />{" "}
                        {selectedStation.city}, {selectedStation.country}
                      </p>

                      {/* 3. RATING STAR */}
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <div className="flex text-amber-500 gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <FaStar
                              key={s}
                              className={`w-2.5 h-2.5 ${s <= Math.round(avgRating) ? "fill-current" : "text-gray-300 dark:text-gray-700"}`}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] font-black text-black/60 dark:text-white/60">
                          {avgRating.toFixed(1)}
                        </span>
                        <span className="text-white/20 dark:text-white/10">
                          |
                        </span>
                        {/* 4. BTN CLICK -> CUSTOMER REVIEW SHOW */}
                        <button
                          onClick={() => setShowReviews(!showReviews)}
                          className="text-[10px] font-bold text-[#00b14f] hover:underline focus:outline-none"
                        >
                          {showReviews
                            ? "Hide Reviews"
                            : `Show Reviews (${totalReviews})`}
                        </button>
                      </div>
                    </div>

                    {/* Collapsible Customer Reviews Section */}
                    <AnimatePresence>
                      {showReviews && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden mb-3 bg-black/3 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5 p-3"
                        >
                          <h5 className="text-[8px] font-black text-black/40 dark:text-white/40 uppercase tracking-widest mb-2">
                            Customer Reviews
                          </h5>
                          <div className="space-y-2">
                            {stationReviews.length > 0 ? (
                              stationReviews.map((rev) => (
                                <div
                                  key={rev.id}
                                  className="border-b border-black/5 dark:border-white/5 last:border-0 pb-1.5 last:pb-0"
                                >
                                  <div className="flex justify-between items-center mb-0.5">
                                    <span className="text-[10px] font-bold text-black dark:text-white">
                                      {rev.name}
                                    </span>
                                    <span className="text-[8px] text-black/40 dark:text-white/40">
                                      {rev.date_str}
                                    </span>
                                  </div>
                                  <div className="flex text-amber-500 gap-0.5 mb-1">
                                    {Array.from({ length: rev.rating }).map(
                                      (_, i) => (
                                        <FaStar
                                          key={i}
                                          className="w-2 h-2 fill-current"
                                        />
                                      ),
                                    )}
                                  </div>
                                  <p className="text-[9px] text-black/60 dark:text-white/50 leading-relaxed">
                                    {rev.comment}
                                  </p>
                                </div>
                              ))
                            ) : (
                              <p className="text-[9px] text-black/40 dark:text-white/40 italic">
                                No reviews yet.
                              </p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* 5. TECHNICAL METRICS */}
                    <div className="grid grid-cols-3 gap-1.5 mb-3">
                      <div className="bg-black/5 dark:bg-white/5 p-2 rounded-[10px] border border-black/5 dark:border-white/5 flex flex-col justify-center">
                        <p className="text-[7px] font-black text-black/40 dark:text-white/40 uppercase tracking-widest mb-0.5">
                          Max Power
                        </p>
                        <p className="text-black dark:text-white font-extrabold text-[10px] lg:text-[11px]">
                          {selectedStation.charger_power}
                        </p>
                      </div>
                      <div className="bg-black/5 dark:bg-white/5 p-2 rounded-[10px] border border-black/5 dark:border-white/5 flex flex-col justify-center">
                        <p className="text-[7px] font-black text-black/40 dark:text-white/40 uppercase tracking-widest mb-0.5">
                          Connector
                        </p>
                        <p className="text-black dark:text-white font-extrabold text-[10px] lg:text-[11px] truncate">
                          {selectedStation.charger_connector}
                        </p>
                      </div>
                      <div className="bg-black/5 dark:bg-white/5 p-2 rounded-[10px] border border-black/5 dark:border-white/5 flex flex-col justify-center">
                        <p className="text-[7px] font-black text-black/40 dark:text-white/40 uppercase tracking-widest mb-0.5">
                          Chargers
                        </p>
                        <p className="text-black dark:text-white font-extrabold text-[10px] lg:text-[11px]">
                          {selectedStation.charger_count || 1} Units
                        </p>
                      </div>
                    </div>

                    {/* 6. FACILITIES */}
                    <div className="mb-3">
                      <p className="text-[7.5px] font-black text-black/40 dark:text-white/40 uppercase tracking-widest mb-1.5">
                        Available Facilities
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {activeFacilities.map((fac) => (
                          <div
                            key={fac}
                            className="flex items-center gap-1 bg-black/4 dark:bg-white/5 border border-black/5 dark:border-white/5 px-2 py-1 rounded-full text-[9px] font-bold text-black/60 dark:text-white/70"
                          >
                            {facilityIcons[
                              fac as keyof typeof facilityIcons
                            ] || <HiLocationMarker className="w-2.5 h-2.5" />}
                            <span>{fac}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* STATION HOURS */}
                    <div className="mb-3 p-2 rounded-xl bg-black/4 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-between">
                      <span className="text-[7.5px] font-black uppercase text-black/40 dark:text-white/40 tracking-wider">
                        Station Hours
                      </span>
                      <span className="text-[10px] font-bold text-[#00b14f] flex items-center gap-1">
                        <FaClock size={9} /> 24 x 7 Open
                      </span>
                    </div>

                    {/* 7. GET DIRECTIONS & VIEW FULL DETAILS BUTTONS */}
                    <div className="sticky -bottom-4 lg:-bottom-5 -mx-4 lg:-mx-5 px-4 lg:px-5 pb-4 lg:pb-5 pt-3 bg-white/95 dark:bg-[#111]/95 backdrop-blur-md z-20 border-t border-black/5 dark:border-white/5 mt-2 space-y-2">
                      <button
                        onClick={() =>
                          window.open(
                            getGoogleMapsUrl(selectedStation),
                            "_blank",
                          )
                        }
                        className="w-full py-2.5 bg-[#00b14f] text-white rounded-[10px] font-black text-[10px] uppercase tracking-widest shadow-lg shadow-[#00b14f]/20 hover:scale-[1.02] transition-transform active:scale-[0.98] flex items-center justify-center gap-1.5"
                      >
                        Get Directions
                      </button>
                      <button
                        onClick={() => {
                          const stationSlug = generateSlug(
                            selectedStation.name,
                            selectedStation.city,
                          );
                          window.location.href = `/locations/${stationSlug}`;
                        }}
                        className="w-full py-2.5 bg-black/5 dark:bg-white/10 text-black dark:text-white border border-black/10 dark:border-white/15 rounded-[10px] font-black text-[10px] uppercase tracking-widest hover:border-[#00b14f]/50 hover:text-[#00b14f] transition-all flex items-center justify-center gap-1.5"
                      >
                        View Full Details →
                      </button>
                    </div>
                  </motion.div>
                );
              })()}
          </AnimatePresence>
        </div>

        {/* Mobile Bottom Sheet (Mobile Only) */}
        <div className="lg:hidden absolute bottom-0 left-0 right-0 z-40 bg-[#f5f5f5] rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.12)] flex flex-col pointer-events-auto overflow-hidden">
          <div className="flex justify-center pt-3 pb-2 shrink-0 bg-white">
            <div className="w-7.5 h-0.5 rounded-full bg-gray-400" />
          </div>

          {!selectedStation ? (
            <div className="flex flex-col w-full pb-6 bg-white min-h-55">
              <div className="flex justify-between items-center px-5 mb-4 shrink-0">
                <h3 className="font-bold text-[15px] text-black">
                  Nearby stations
                </h3>
                <span className="text-[10px] bg-gray-100 px-3 py-1 rounded-full font-bold text-gray-600">
                  {filteredStations.length} found
                </span>
              </div>
              <div className="flex overflow-x-auto px-5 pb-2 gap-4 shrink-0 w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                {filteredStations.slice(0, 10).map((station) => (
                  <div
                    key={station.id}
                    onClick={() => handleStationSelect(station)}
                    className="w-[82vw] max-w-[320px] shrink-0 border-2 border-[#00b14f] shadow-sm rounded-xl p-4 cursor-pointer relative overflow-hidden bg-white hover:bg-gray-50 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2 gap-3">
                        <h4
                          className="font-extrabold text-[15px] text-black leading-tight flex-1"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {station.name}
                        </h4>
                        <span
                          className={`text-[9.5px] font-bold px-2 py-0.5 rounded ${station.status === "active" ? "bg-[#d8f4e6] text-[#00b14f]" : "bg-orange-100 text-orange-500"}`}
                        >
                          {station.status === "active" ? "Active" : "Maint."}
                        </span>
                      </div>
                      <p className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium mb-4">
                        <FaMapMarkerAlt size={10} className="text-gray-500" />{" "}
                        {station.city}, {station.country}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-[11px] font-bold bg-[#d8f4e6] text-[#00b14f] px-2.5 py-1.5 rounded flex items-center justify-center">
                        DC - {station.charger_power}
                      </span>
                      <span className="text-[11px] font-bold bg-[#f3f4f6] text-gray-600 px-2.5 py-1.5 rounded flex items-center justify-center">
                        {station.charger_count || 1} chargers
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            (() => {
              const activeFacilities = selectedStation.facilities || [];

              const stationReviews =
                selectedStation.reviews && selectedStation.reviews.length > 0
                  ? selectedStation.reviews
                  : [];
              const avgRating = selectedStation.avg_rating || 0;
              const totalReviews = selectedStation.total_reviews || 0;

              return (
                <div className="flex flex-col w-full bg-white max-h-[55vh] overflow-y-auto custom-scrollbar relative">
                  <button
                    onClick={handleCloseDetail}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white z-10"
                  >
                    <FaTimes size={14} />
                  </button>

                  {/* 1. STATION IMAGE */}
                  <div className="relative w-full h-48 sm:h-56 shrink-0 mb-5">
                    <img
                      src="/location/location_img.png"
                      alt={selectedStation.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-white via-white/20 to-transparent" />
                    <div className="absolute bottom-0 left-5 flex gap-1.5 translate-y-1/2">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider shadow-md ${selectedStation.status === "active" ? "bg-[#00b14f] text-white shadow-[#00b14f]/20" : "bg-orange-500 text-white"}`}
                      >
                        {selectedStation.status === "active"
                          ? "Active"
                          : "Maintenance"}
                      </span>
                      <span
                        className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider shadow-md ${getChargerType(selectedStation.charger_connector) === "DC" ? "bg-black text-white" : "bg-blue-500 text-white"}`}
                      >
                        {getChargerType(selectedStation.charger_connector)}{" "}
                        Charger
                      </span>
                    </div>
                  </div>

                  <div className="px-5 space-y-5">
                    {/* 2. STATION NAME & LOCATION */}
                    <div>
                      <h4 className="text-xl font-black text-black leading-tight mb-1">
                        {selectedStation.name}
                      </h4>
                      <p className="flex items-center gap-1.5 text-xs text-gray-500 font-bold">
                        <FaMapMarkerAlt size={12} className="text-[#00b14f]" />{" "}
                        {selectedStation.city}, {selectedStation.country}
                      </p>

                      {/* 3. RATING STAR */}
                      <div className="flex items-center gap-2 mt-2.5">
                        <div className="flex text-amber-500 gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <FaStar
                              key={s}
                              className={`w-3.5 h-3.5 ${s <= Math.round(avgRating) ? "fill-current" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs font-black text-gray-600">
                          {avgRating.toFixed(1)}
                        </span>
                        <span className="text-gray-300">|</span>
                        {/* 4. BTN CLICK -> CUSTOMER REVIEW SHOW */}
                        <button
                          onClick={() => setShowReviews(!showReviews)}
                          className="text-xs font-bold text-[#00b14f] focus:outline-none"
                        >
                          {showReviews
                            ? "Hide Reviews"
                            : `Show Reviews (${totalReviews})`}
                        </button>
                      </div>
                    </div>

                    {/* Collapsible Customer Reviews Section */}
                    <AnimatePresence>
                      {showReviews && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-gray-50 rounded-2xl border border-gray-100 p-4"
                        >
                          <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                            Customer Reviews
                          </h5>
                          <div className="space-y-3">
                            {stationReviews.length > 0 ? (
                              stationReviews.map((rev) => (
                                <div
                                  key={rev.id}
                                  className="border-b border-gray-200 last:border-0 pb-3 last:pb-0"
                                >
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs font-bold text-black">
                                      {rev.name}
                                    </span>
                                    <span className="text-[10px] text-gray-400">
                                      {rev.date_str}
                                    </span>
                                  </div>
                                  <div className="flex text-amber-500 gap-0.5 mb-1.5">
                                    {Array.from({ length: rev.rating }).map(
                                      (_, i) => (
                                        <FaStar
                                          key={i}
                                          className="w-2.5 h-2.5 fill-current"
                                        />
                                      ),
                                    )}
                                  </div>
                                  <p className="text-[11px] text-gray-600 leading-relaxed">
                                    {rev.comment}
                                  </p>
                                </div>
                              ))
                            ) : (
                              <p className="text-[11px] text-gray-400 italic">
                                No reviews yet.
                              </p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* 5. TECHNICAL METRICS */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-[#f8f6f2] rounded-xl p-3 border border-gray-100 flex flex-col justify-center">
                        <p className="text-[8.5px] font-black text-gray-400 uppercase mb-1 tracking-wider">
                          Max Power
                        </p>
                        <p className="text-xs sm:text-sm font-extrabold text-[#2d2d2d]">
                          {selectedStation.charger_power}
                        </p>
                      </div>
                      <div className="bg-[#f8f6f2] rounded-xl p-3 border border-gray-100 flex flex-col justify-center">
                        <p className="text-[8.5px] font-black text-gray-400 uppercase mb-1 tracking-wider">
                          Connector
                        </p>
                        <p className="text-xs sm:text-sm font-extrabold text-[#2d2d2d] truncate">
                          {selectedStation.charger_connector}
                        </p>
                      </div>
                      <div className="bg-[#f8f6f2] rounded-xl p-3 border border-gray-100 flex flex-col justify-center">
                        <p className="text-[8.5px] font-black text-gray-400 uppercase mb-1 tracking-wider">
                          Chargers
                        </p>
                        <p className="text-xs sm:text-sm font-extrabold text-[#2d2d2d]">
                          {selectedStation.charger_count || 1} Units
                        </p>
                      </div>
                    </div>

                    {/* 6. FACILITIES */}
                    <div className="pb-4">
                      <p className="text-[9.5px] font-black text-gray-400 uppercase tracking-widest mb-2.5">
                        Available Facilities
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {activeFacilities.map((fac) => (
                          <div
                            key={fac}
                            className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full text-xs font-bold text-gray-700"
                          >
                            {facilityIcons[
                              fac as keyof typeof facilityIcons
                            ] || (
                              <HiLocationMarker className="w-3.5 h-3.5 text-gray-400" />
                            )}
                            <span>{fac}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 7. GET DIRECTIONS BUTTON (STICKY BOTTOM) */}
                  <div className="sticky bottom-0 left-0 right-0 bg-linear-to-t from-white via-white to-transparent pt-4 pb-5 px-5 z-20 mt-auto border-t border-gray-100">
                    <button
                      onClick={() =>
                        window.open(getGoogleMapsUrl(selectedStation), "_blank")
                      }
                      className="w-full py-4 bg-[#00b14f] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-[0_8px_25px_rgba(0,177,79,0.3)] active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
                    >
                      Get Directions
                    </button>
                  </div>
                </div>
              );
            })()
          )}
        </div>
      </main>
      {/* Global Custom CSS for Pulse Markers and Scrollbar */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
                .relux-marker-container {
                    width: 24px;
                    height: 24px;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    will-change: transform;
                    backface-visibility: hidden;
                    transform: translateZ(0);
                }
                .relux-marker-dot {
                    width: 14px;
                    height: 14px;
                    background: #00b14f;
                    border: 2.5px solid white;
                    border-radius: 50%;
                    z-index: 2;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.2), 0 0 10px rgba(0, 177, 79, 0.4);
                    position: absolute;
                    transition: all 0.3s ease;
                }
                .is-inactive .relux-marker-dot {
                    background: #ff3b30;
                    box-shadow: 0 2px 8px rgba(255,59,48,0.3);
                }
                .relux-marker-pulse {
                    position: absolute;
                    width: 44px;
                    height: 44px;
                    background: rgba(0, 177, 79, 0.4);
                    border-radius: 50%;
                    animation: relux-pulse-ring 2s infinite cubic-bezier(0.45, 0.05, 0.55, 0.95);
                    z-index: 1;
                    pointer-events: none;
                }
                .is-inactive .relux-marker-pulse {
                    background: rgba(255, 59, 48, 0.2);
                    animation: none;
                }
                @keyframes relux-pulse-ring {
                    0% { transform: scale(0.2); opacity: 0.8; }
                    80%, 100% { transform: scale(1.4); opacity: 0; }
                }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.05); border-radius: 10px; }
                .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); }
                
                /* Ensure Mapbox marker own classes don't override positioning */
                .relux-mapbox-marker {
                    margin: 0 !important;
                    padding: 0 !important;
                    position: absolute !important;
                    top: 0 !important;
                    left: 0 !important;
                    will-change: transform;
                }

                /* Hide Mapbox Watermark and Attribution */
                .mapboxgl-ctrl-bottom-left,
                .mapboxgl-ctrl-bottom-right,
                .mapboxgl-ctrl-logo,
                .mapboxgl-ctrl-attrib {
                    display: none !important;
                }
            `,
        }}
      />
    </div>
  );
};

export default LocationMapPro;
