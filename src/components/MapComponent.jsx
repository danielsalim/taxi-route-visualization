import React, { useEffect } from 'react';
import OLMap from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Style, Fill, Stroke, Circle } from 'ol/style';
import Polyline from 'ol/format/Polyline';

const MapComponent = ({ tripsData }) => {
    const pickupCoords = [-73.986632999999998, 40.738830999999998]; // Pickup Longitude, Latitude
    const dropoffCoords = [-73.978172000000001, 40.750034999999997]; // Dropoff Longitude, Latitude

    useEffect(() => {
        // Initialize OpenLayers Map
        const map = new OLMap({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            view: new View({
                center: fromLonLat([-73.986632, 40.738831]), // Default center
                zoom: 14,
            }),
            controls: [],
        });
        const allFeatures = []
        const vectorSource = new VectorSource();
        const vectorLayer = new VectorLayer({ source: vectorSource });
        map.addLayer(vectorLayer);

        let requestCount = 0; // Initialize a counter

        // tripsData.forEach((trip) => {
        //     if (requestCount >= 5) return; // Stop processing if the limit is reached

        //     const pickupCoords = [parseFloat(trip.pickup_longitude), parseFloat(trip.pickup_latitude)];
        //     const dropoffCoords = [parseFloat(trip.dropoff_longitude), parseFloat(trip.dropoff_latitude)];

        //     // Check if coordinates are not zero
        //     if (
        //         pickupCoords[0] === 0 || pickupCoords[1] === 0 ||
        //         dropoffCoords[0] === 0 || dropoffCoords[1] === 0
        //     ) {
        //         return; // Skip this element
        //     }

        //     // Increment the request counter
        //     requestCount++;

        //     // Create pickup marker
        //     const pickupMarker = new Feature({
        //         geometry: new Point(fromLonLat(pickupCoords)),
        //     });
        //     pickupMarker.setStyle(
        //         new Style({
        //             image: new Circle({
        //                 radius: 8,
        //                 fill: new Fill({ color: 'white' }),
        //                 stroke: new Stroke({ color: 'black', width: 2 }),
        //             }),
        //         })
        //     );
        //     // Create dropoff marker
        //     const dropoffMarker = new Feature({
        //         geometry: new Point(fromLonLat(dropoffCoords)),
        //     });
        //     dropoffMarker.setStyle(
        //         new Style({
        //             image: new Circle({
        //                 radius: 8,
        //                 fill: new Fill({ color: '#1052fe' }),
        //                 stroke: new Stroke({ color: 'black', width: 2 }),
        //             }),
        //         })
        //     );

        //     // Add markers to vector source
        //     allFeatures.push(pickupMarker);
        //     allFeatures.push(dropoffMarker);

        //     // Fetch route from OSRM API
        //     const routeUrl = `http://router.project-osrm.org/route/v1/driving/${pickupCoords[0]},${pickupCoords[1]};${dropoffCoords[0]},${dropoffCoords[1]}?overview=full&steps=true`;
        //     console.log(routeUrl);
        //     fetch(routeUrl)
        //         .then((response) => response.json())
        //         .then((data) => {
        //             if (data.routes && data.routes.length > 0) {
        //                 const polyline = data.routes[0].geometry;
        //                 createRoute(polyline);
        //             }
        //         })
        //         .catch((error) => console.error('Error fetching route:', error));
        // });

        //FIX WHY ALL THE FEATURES INSIDE FOREACH LOOP CANT BE DISPLAYED
        vectorSource.addFeatures(allFeatures)

        //TESTING-----------------------------------------------------------------------------------------------
        const routeUrl = `http://router.project-osrm.org/route/v1/driving/${pickupCoords[0]},${pickupCoords[1]};${dropoffCoords[0]},${dropoffCoords[1]}?overview=full&steps=true`;
        fetch(routeUrl)
            .then((response) => response.json())
            .then((data) => {
                const polyline = data.routes[0].geometry;
                createRoute(polyline);
            })
            .catch((error) => {
                console.error('Error fetching route:', error);
            });

        const testFeature = new Feature({
            geometry: new Point(fromLonLat([-73.986632, 40.738831])), // Test with a known coordinate
        });
        testFeature.setStyle(new Style({
            image: new Circle({
                radius: 8,
                fill: new Fill({ color: 'red' }),
                stroke: new Stroke({ color: 'black', width: 2 }),
            }),
        }));

        vectorSource.addFeature(testFeature); // Add a single feature manually
        console.log("testFeature", testFeature)

        //TESTING-----------------------------------------------------------------------------------------------


        // Function to create and add a route from polyline
        function createRoute(polyline) {
            const route = new Polyline({ factor: 1e5 }).readGeometry(polyline, {
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857',
            });

            const routeFeature = new Feature({
                type: 'route',
                geometry: route,
            });

            routeFeature.setStyle(
                new Style({
                    stroke: new Stroke({
                        color: '#1052fe',
                        width: 12,
                    }),
                })
            );
            vectorSource.addFeature(routeFeature); // Add all features to the map
        }
    }, [tripsData]);

    return <div id="map" style={{ width: '100%', height: '100%' }} />;
};

export default MapComponent;
