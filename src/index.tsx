import React, { useState, FormEvent, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import get from './service';

import './styles.css';

interface ILocation {
    lat: number;
    lng: number;
}

const App = () => {
    const [status, setStatus] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [quality, setQuality] = useState<number>();
    const [qualityType, setQualityType] = useState<string>('');
    const [qualityColor, setQualityColor] = useState<string>('');
    const [institute, setInstitute] = useState<string>('');
    const [instURL, setInstURL] = useState<string>('');
    const [map, setMap] = useState<any>(null);
    const [center, setCenter] = useState<ILocation>({
        lat: -3.745,
        lng: -38.523
    });
    const [zoom, setZoom] = useState<number>(10);

    const containerStyle = {
        width: '400px',
        height: '400px'
    };

    const getQualityData = async (e: FormEvent) => {
        e.preventDefault();
        const value = await get(city);

        setStatus(value.data.status);

        if (value.data.status === 'ok') {
            setLocation(value.data.data.city.name);
            setQuality(value.data.data.aqi);
            setInstitute(value.data.data.attributions[0].name);
            setInstURL(value.data.data.attributions[0].url);
            setCenter({
                lat: value.data.data.city.geo[0],
                lng: value.data.data.city.geo[1]
            });
            setZoom(10);
        }
    }

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, []);

    useEffect(() => {
        if (quality !== undefined) {
            if (quality > 300) {
                setQualityType('PERIGOSA');
                setQualityColor('#a52a2a');
            } else {
                if (quality > 201) {
                    setQualityType('MUITO PREJUDICIAL À SAÚDE');
                    setQualityColor('#8b008b');
                } else {
                    if (quality > 151) {
                        setQualityType('PREJUDICIAL À SAÚDE');
                        setQualityColor('#8b0000');
                    } else {
                        if (quality > 101) {
                            setQualityType('INSALUBRE PARA GRUPOS SENSÍVEIS');
                            setQualityColor('#ff8c00');
                        } else {
                            if (quality > 51) {
                                setQualityType('MODERADA');
                                setQualityColor('#ffd700');
                            } else {
                                setQualityType('BOA');
                                setQualityColor('#008000');
                            }
                        }
                    }
                }
            }
        }
    }, [quality]);

    useEffect(() => {
        if (city === '') {
            setStatus('');
        }
    }, [city]);

    return (
        <div className="root">
            <div className="header">Air Quality Now</div>
            <div className="container">
                <form method="post" onSubmit={getQualityData}>
                    <div className="group">
                        <label htmlFor="city">Cidade</label>
                        <input
                            type="text"
                            name="city"
                            id="city"
                            className="city"
                            value={city}
                            onChange={e => setCity(e.target.value)} />
                    </div>
                    <button type="submit" className="button">Pesquisar</button>
                </form>
                {
                    status === 'ok' && (
                        <span>
                            <div className="result">Estação de medição: <span className="location">{location}</span></div>
                            <div className="result">Qualidade do ar: <span className="location">{quality}</span><span style={{ color: '#fff', backgroundColor: qualityColor, padding: '0.4rem', borderRadius: '0.4rem', fontWeight: 'bold', marginLeft: '0.8rem' }}>{qualityType}</span></div>
                            <div className="result">Fonte: {institute} (<a href={instURL} target="_blank">{instURL})</a></div>
                        </span>
                    )
                }
                {
                    status === 'error' && (
                        <div className="error">Cidade não localizada</div>
                    )
                }
                <div className="map" style={{ visibility: status === 'ok' ? 'visible' : 'hidden' }}>
                    <LoadScript googleMapsApiKey="AIzaSyD_-qivVEZILE59X-qnvFpV8mCX4xuKQ1A">
                        <GoogleMap
                            id="map"
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={zoom}
                            onLoad={onLoad}
                            onUnmount={onUnmount}>
                            <Marker
                                position={center} />
                        </GoogleMap>
                    </LoadScript>
                </div>
            </div>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));