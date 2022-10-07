import React, { useState } from 'react';
import Map from 'react-map-gl';
import styled from 'styled-components';
import "mapbox-gl/dist/mapbox-gl.css";

import Layout from 'src/components/Layout';
import SearchForm from 'src/components/SearchForm';

const Section = styled.section`
    display: flex;
    justify-content: space-between;
`

interface IViewport {
    latitude: number;
    longitude: number;
    zoom: number;
}

const Search = () => {
    const [viewport, setViewport] = useState<IViewport>({
        latitude: -1.935114,
        longitude: 30.082111,
        zoom: 10
    });

    return ( 
        <Layout><Section>
                <div><SearchForm /></div>
                <div>
                <Map initialViewState={viewport} mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN} mapStyle="mapbox://styles/mapbox/light-v10" style={{ width: "45vw", height: "80vh", margin: "0 2rem"}} />
                </div>
            </Section></Layout>
     );
}
 
export default Search;