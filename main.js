var map =  new maplibregl.Map({
    container: 'map',
    style: 'https://tile.openstreetmap.jp/styles/osm-bright-ja/style.json', // 地図のスタイル
    center: [139.7779244, 35.7122128], // 中心座標
    zoom: 15, // ズームレベル
    pitch: 0 // 傾き
})

map.on('load', function () {
    map.loadImage(
        './data/icon.png',
        function (error, image) {
            if (error) throw error;
            map.addImage('facility_icon', image);
        }
    );
    map.addSource('facility_point', {
        type: 'geojson',
        data: './data/tokyo_facility.geojson'
    });
    map.addLayer({
        'id': 'facility_point',
        'type': 'symbol',
        'source': 'facility_point',
        'layout': {
            'icon-image': 'facility_icon',
            'icon-size': 0.1
        }
    });
    map.on('click', 'facility_point', function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var name = e.features[0].properties.P27_005;
    
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        // ポップアップを表示する
        new maplibregl.Popup({
            offset: 10, // ポップアップの位置
            closeButton: false, // 閉じるボタンの表示
        })
        .setLngLat(coordinates)
        .setHTML(name)
        .addTo(map);
    });
});
