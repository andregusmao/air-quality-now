import React, { useState, FormEvent, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import get from './service';

import {
    Root,
    Header,
    Container,
    Group,
    Label,
    City,
    Button,
    Result,
    Location,
    Quality,
    Error,
    Map
} from './styles';

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
    const [zoom, setZoom] = useState<number>(25);

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
            setZoom(15);
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
        <Root>
            <Header>Air Quality Now</Header>
            <Container>
                <form method="post" onSubmit={getQualityData}>
                    <Group>
                        <Label htmlFor="city">Cidade</Label>
                        <City
                            type="text"
                            name="city"
                            id="city"
                            className="city"
                            value={city}
                            onChange={e => setCity(e.target.value)} />
                    </Group>
                    <Button type="submit">Pesquisar</Button>
                </form>
                {
                    status === 'ok' && (
                        <span>
                            <Result>Estação de medição: <Location>{location}</Location></Result>
                            <Result>Qualidade do ar: <Location>{quality}</Location><Quality style={{ backgroundColor: qualityColor }}>{qualityType}</Quality></Result>
                            <Result>Fonte: {institute} (<a href={instURL} target="_blank" rel="noopener noreferrer">{instURL})</a></Result>
                        </span>
                    )
                }
                {
                    status === 'error' && (
                        <Error>Cidade não localizada</Error>
                    )
                }
                <Map style={{ visibility: status === 'ok' ? 'visible' : 'hidden' }}>
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
                </Map>
            </Container>
        </Root>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));