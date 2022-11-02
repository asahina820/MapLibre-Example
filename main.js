var map =  new maplibregl.Map({
    container: 'map',
    style: 'https://tile.openstreetmap.jp/styles/osm-bright-ja/style.json', // 地図のスタイル
    center: [139.6226196,35.4660694], // 中心座標
    zoom: 14, // ズームレベル
    pitch: 0 // 傾き
})

map.on('load', function () {
    map.addSource('kanagawa_bus', {
        type: 'geojson',
        data: './data/kanagawa_bus.geojson'
    });
    map.addLayer({
        'id': 'kanagawa_bus',
        'type': 'line',
        'source': 'kanagawa_bus',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': '#0067c0',
            'line-width': 5
        }
    });
});
