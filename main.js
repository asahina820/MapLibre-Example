const tokyo_location = [139.74019, 35.6642];
const start_location = [136.29, 38.84];

var map = new maplibregl.Map({
    container: 'map',
    style: 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json', // 地図のスタイル
    center: start_location, // 中心座標
    zoom: 5, // ズームレベル
    pitch: 0, // 傾き
});

map.on('load', function () {
    map.addSource('railroad', {
        type: 'geojson',
        data: './data/railroad.geojson',
    });
    map.addLayer({
        id: 'railroad',
        type: 'line',
        source: 'railroad',
        minzoom: 0,
        layout: {
            'line-join': 'round',
            'line-cap': 'round',
        },
        paint: {
            'line-color': '#ee7800',
            'line-opacity': 0.7,
            'line-width': 1.5,
        },
    });
    map.loadImage('./data/station.png', function (error, image) {
        if (error) throw error;
        map.addImage('station_icon', image);
    });
    map.addSource('red_station', {
        type: 'geojson',
        data: './data/red_station.geojson',
        attribution: '国土数値情報（鉄道データ）',
    });
    map.addLayer({
        id: 'red_station',
        type: 'symbol',
        source: 'red_station',
        minzoom: 6,
        layout: {
            'icon-image': 'station_icon',
            'icon-size': 0.15,
            'text-field': ['get', 'station'],
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-offset': [0, 1.2],
            'text-anchor': 'top',
        },
        paint: {
            'text-color': '#ffffff',
        },
    });
    map.addLayer({
        id: 'red_station_circle',
        source: 'red_station',
        maxzoom: 6,
        type: 'circle',
        paint: {
            'circle-radius': 4,
            'circle-color': 'red',
        },
    });
});

document.getElementById('fly').addEventListener('click', function () {
    map.flyTo({
        center: tokyo_location,
        zoom: 14,
        bearing: 0,
        speed: 1.1,
        curve: 1.42,
        easing: function (t) {
            return t;
        },
        essential: true,
    });
});
