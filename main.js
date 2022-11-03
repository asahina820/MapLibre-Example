var map =  new maplibregl.Map({
    container: 'map',
    style: 'https://tile.openstreetmap.jp/styles/osm-bright-ja/style.json', // 地図のスタイル
    center: [140.01162, 35.72270], // 中心座標
    zoom: 12, // ズームレベル
    pitch: 0 // 傾き
})

map.on('load', function () {
    map.addSource('funabashi_fudepolygon', {
        type: 'geojson',
        data: './data/funabashi_fudepolygon.geojson'
    });
    map.addLayer({
        'id': 'funabashi_fudepolygon_fill',
        'type': 'fill',
        'source': 'funabashi_fudepolygon',
        'layout': {},
        'paint': {
            'fill-color': '#84C98B',
            'fill-opacity': 0.8
        }
    });
});
