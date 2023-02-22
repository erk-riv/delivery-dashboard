import {useMemo} from 'react';
const { GoogleMap, useLoadScript, Marker } = require("../../");
//const ScriptLoaded = require("../../docs/ScriptLoaded").default;

export default function Directions() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    });

    if (!isLoaded) return <div>Loading...</div>;
    return <Map />;
}

function Map() {
        return <GoogleMap zoom={10} center={{lat: 44, lng: -80}} mapContainerClassName="map-container"></GoogleMap>
}
