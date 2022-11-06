var haneda_location = [139.7663947, 35.5437833];
var shinchitose_location = [141.681229, 42.7875897];

var map = new maplibregl.Map({
    container: 'map',
    style: 'https://tile.openstreetmap.jp/styles/osm-bright-ja/style.json', // 地図のスタイル
    center: haneda_location, // 中心座標
    zoom: 11, // ズームレベル
    pitch: 0, // 傾き
});

var haneda_marker = new maplibregl.Marker()
    .setLngLat(haneda_location)
    .addTo(map);

var shinchitose_marker = new maplibregl.Marker()
    .setLngLat(shinchitose_location)
    .addTo(map);

var isAtStart = true;

document.getElementById('fly').addEventListener('click', function () {
    var target = isAtStart ? shinchitose_location : haneda_location;
    isAtStart = !isAtStart;

    map.flyTo({
        center: target,
        zoom: 9,
        bearing: 0,
        speed: 0.4,
        curve: 1,
        easing: function (t) {
            return t;
        },
        essential: true,
    });
});
