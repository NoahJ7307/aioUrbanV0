import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
const KakaoMap = () => {
    const mapContainer = useRef(null); // Reference to the map container
    const [keyword, setKeyword] = useState('이태원 맛집');
    const [places, setPlaces] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [map, setMap] = useState(null);
    const [infowindow, setInfowindow] = useState(null);
    const [markers, setMarkers] = useState([]); // Add markers state

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=74a8d06a8248ca1397d3f95dd9185ff8&libraries=services`;
        script.async = true;
        script.onload = initializeMap;
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    const initializeMap = () => {
        const kakao = window.kakao;
        const mapOption = {
            center: new kakao.maps.LatLng(37.566826, 126.9786567), // Map center
            level: 3 // Map zoom level
        };

        const newMap = new kakao.maps.Map(mapContainer.current, mapOption); // Initialize map
        setMap(newMap);

        const newInfowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
        setInfowindow(newInfowindow);

        const ps = new kakao.maps.services.Places(); // Places service
        ps.keywordSearch(keyword, placesSearchCB);
    };

    const searchPlaces = () => {
        if (!keyword.trim()) {
            alert('Please enter a keyword!');
            return;
        }

        const kakao = window.kakao;
        const ps = new kakao.maps.services.Places();
        ps.keywordSearch(keyword, placesSearchCB);
    };

    const placesSearchCB = (data, status, pagination) => {
        const kakao = window.kakao;
        if (status === kakao.maps.services.Status.OK) {
            setPlaces(data);
            setPagination(pagination);
            displayPlaces(data);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            alert('No search results found.');
        } else if (status === kakao.maps.services.Status.ERROR) {
            alert('An error occurred during the search.');
        }
    };

    const sendCoordinatesToServer = async (latitude, longitude) => {
        try {
            const token = localStorage.getItem("token"); // Get JWT token
            console.log("token", token);
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            };
            console.log("위도 :", latitude, ",경도:", longitude);
            const response = await axios.post(`http://localhost:8080/api/communities/info/coordinates`, { latitude, longitude }, config);
            console.log('Data sent to server:', response.data);
        } catch (error) {
            console.error('Error sending data to server:', error);
        }
    };

    const displayPlaces = (places) => {
        if (!map) return;

        const kakao = window.kakao;
        const bounds = new kakao.maps.LatLngBounds();
        removeMarkers();

        const newMarkers = places.map((place, i) => {
            const position = new kakao.maps.LatLng(place.y, place.x);
            const marker = addMarker(position, i);
            bounds.extend(position);

            kakao.maps.event.addListener(marker, 'mouseover', () => displayInfowindow(marker, place.place_name));
            kakao.maps.event.addListener(marker, 'mouseout', () => infowindow.close());

            kakao.maps.event.addListener(marker, 'click', () => {
                // Send latitude and longitude to the server on marker click
                sendCoordinatesToServer(place.y, place.x);
            });

            return marker;
        });

        setMap((prevMap) => {
            prevMap.setBounds(bounds);
            return prevMap;
        });
    };

    const addMarker = (position, idx) => {
        const kakao = window.kakao;
        const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
        const imageSize = new kakao.maps.Size(36, 37);
        const imgOptions = {
            spriteSize: new kakao.maps.Size(36, 691),
            spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10),
            offset: new kakao.maps.Point(13, 37)
        };
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);

        const marker = new kakao.maps.Marker({
            position,
            image: markerImage
        });

        marker.setMap(map);
        return marker;
    };

    const removeMarkers = () => {
        // Clear all markers from the map
        markers.forEach((marker) => marker.setMap(null));
        setMarkers([]); // Reset markers state
    };

    const displayInfowindow = (marker, title) => {
        infowindow.setContent(`<div style="padding:5px;z-index:1;">${title}</div>`);
        infowindow.open(map, marker);
    };

    const handleKeywordChange = (e) => setKeyword(e.target.value);

    const handlePageClick = (page) => {
        pagination.gotoPage(page);
    };

    return (
        <div className="map_wrap">
            <div ref={mapContainer} style={{ width: '100%', height: '500px', position: 'relative', overflow: 'hidden' }}></div>
            <div id="menu_wrap" className="bg_white">
                <div className="option">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            searchPlaces();
                        }}
                    >
                        <label>
                            Keyword:
                            <input type="text" value={keyword} onChange={handleKeywordChange} size="15" />
                        </label>
                        <button type="submit">Search</button>
                    </form>
                </div>
                <hr />
                <ul id="placesList">
                    {places.map((place, i) => (
                        <li
                            key={i}
                            className="item"
                            onMouseOver={() => markers[i] && displayInfowindow(markers[i], place.place_name)} // Check marker exists
                            onMouseOut={() => infowindow && infowindow.close()}
                        >
                            <span className={`markerbg marker_${i + 1}`} />
                            <div className="info">
                                <h5>{place.place_name}</h5>
                                <span>{place.road_address_name || place.address_name}</span>
                                <span className="tel">{place.phone}</span>
                            </div>
                        </li>
                    ))}
                </ul>
                <div id="pagination">
                    {pagination && Array.from({ length: pagination.last }, (_, i) => (
                        <a
                            href="#"
                            key={i + 1}
                            className={pagination.current === i + 1 ? 'on' : ''}
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageClick(i + 1);
                            }}
                        >
                            {i + 1}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default KakaoMap;
