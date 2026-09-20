import React, { useState, useEffect, useRef } from 'react';
import { useInView } from '../../hooks/useInView';
import { MapPin, Navigation, Compass, Calendar, DollarSign } from 'lucide-react';
import fallbackDestinations from '../../data/fallbackDestinations';

// Key coordinates for the animated golden triangle route: Kathmandu -> Pokhara -> Chitwan
const ROUTE_COORDS = [
  { name: 'Kathmandu', lat: 27.7172, lng: 85.3240 },
  { name: 'Pokhara', lat: 28.2096, lng: 83.9856 },
  { name: 'Chitwan', lat: 27.5291, lng: 84.3542 },
];

export default function MapTeaser() {
  const [ref, inView] = useInView({ threshold: 0.1, once: true });
  const mapContainerRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!inView || !mapContainerRef.current) return;

    let mapInstance = null;

    // Dynamically load leaflet only when near viewport
    import('leaflet')
      .then((L) => {
        if (!mapContainerRef.current) return;

        // Custom muted styling: CartoDB Positron warm layer
        mapInstance = L.map(mapContainerRef.current, {
          center: [28.0, 84.6],
          zoom: 7,
          zoomControl: false,
          scrollWheelZoom: false,
          attributionControl: false,
        });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          maxZoom: 18,
          subdomains: 'abcd',
        }).addTo(mapInstance);

        // Custom marigold pin icon
        const customIcon = L.divIcon({
          className: 'yp-map-pin',
          html: `<div style="width:14px;height:14px;border-radius:50%;background:#D3A045;border:2px solid #FFFFFF;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        });

        // Add pins for major destinations
        fallbackDestinations.forEach((dest) => {
          if (dest.lat && dest.lng) {
            L.marker([dest.lat, dest.lng], { icon: customIcon })
              .addTo(mapInstance)
              .bindTooltip(dest.name, { permanent: false, direction: 'top' });
          }
        });

        // Animated route polyline: Kathmandu -> Pokhara -> Chitwan -> Kathmandu
        const routePoints = [
          [ROUTE_COORDS[0].lat, ROUTE_COORDS[0].lng],
          [ROUTE_COORDS[1].lat, ROUTE_COORDS[1].lng],
          [ROUTE_COORDS[2].lat, ROUTE_COORDS[2].lng],
          [ROUTE_COORDS[0].lat, ROUTE_COORDS[0].lng],
        ];

        const polyline = L.polyline(routePoints, {
          color: '#D3A045',
          weight: 3,
          dashArray: '6, 8',
          opacity: 0.85,
        }).addTo(mapInstance);

        setMapLoaded(true);
      })
      .catch((err) => {
        console.warn('Leaflet lazy load notice:', err);
      });

    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, [inView]);

  return (
    <section
      ref={ref}
      id="map-teaser"
      data-section-theme="paper"
      style={{
        position: 'relative',
        background: 'var(--paper, #EAE3D6)',
        color: 'var(--ink, #0F1A22)',
        padding: '6rem 5%',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ maxWidth: '640px', marginBottom: '3rem' }}>
          <div
            style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--stone, #A39B8D)',
              marginBottom: '0.65rem',
            }}
          >
            05 / ROUTE OPTIMISATION
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display, serif)',
              fontSize: 'var(--text-3xl, 2.5rem)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            Routes ordered so you spend time{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--marigold, #D3A045)' }}>exploring</em>, not travelling.
          </h2>
        </div>

        {/* Map Container with Vignette & Overlay Card */}
        <div
          style={{
            position: 'relative',
            height: '520px',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(15, 26, 34, 0.12)',
            border: '1px solid rgba(163, 155, 141, 0.3)',
            background: 'var(--snow, #F4EFE6)',
          }}
        >
          {/* Leaflet Mount Target */}
          <div
            ref={mapContainerRef}
            style={{
              width: '100%',
              height: '100%',
              zIndex: 1,
              filter: 'sepia(12%) contrast(1.02) brightness(0.98)',
            }}
          />

          {/* Vignetted ink borders for seamless blending */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 2,
              boxShadow: 'inset 0 0 60px rgba(15, 26, 34, 0.25)',
            }}
          />

          {/* Floating Route Intelligence Stat Card */}
          <div
            style={{
              position: 'absolute',
              bottom: '1.75rem',
              left: '1.75rem',
              zIndex: 3,
              background: 'rgba(15, 26, 34, 0.88)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              color: 'var(--snow, #F4EFE6)',
              padding: '1.5rem 1.75rem',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.12)',
              maxWidth: '380px',
              boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--marigold, #D3A045)', marginBottom: '0.65rem' }}>
              <Navigation size={18} />
              <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Haversine Nearest-Neighbor
              </span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-display, serif)', fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 500 }}>
              Golden Circuit (Valley to Jungle)
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'rgba(244, 239, 230, 0.8)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              Ordered sequence eliminates back-tracking across Prithvi Highway. Estimated travel time reduced by 4.5 hours.
            </p>

            <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '0.85rem' }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--stone)', display: 'block' }}>TOTAL DISTANCE</span>
                <span style={{ fontWeight: 700, fontSize: '0.92rem' }}>450 km</span>
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--stone)', display: 'block' }}>RECOMMENDED</span>
                <span style={{ fontWeight: 700, fontSize: '0.92rem' }}>7 Days</span>
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--stone)', display: 'block' }}>EST. VEHICLE SPEND</span>
                <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--marigold, #D3A045)' }}>NPR 9,500</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
