import React, { useEffect, useState } from 'react';

const MapWithMarker = ({ latitude, longitude }) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const loadGoogleMapScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDIew3qwDBQzCda_awdNg1RSigIPhhmEPE`;
      script.onload = () => setMapLoaded(true);
      document.body.appendChild(script);
    };

    loadGoogleMapScript();
  }, []);

  useEffect(() => {
    if (mapLoaded) {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: latitude, lng: longitude },
        zoom: 15,
      });

      new window.google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        title: "Marker",
      });
    }
  }, [mapLoaded, latitude, longitude]);

  return (
    <div>
      <div id="map" className="h-96 w-96"></div>
    </div>
  );
};

export default MapWithMarker;

