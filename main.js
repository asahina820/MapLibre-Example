var map =  new maplibregl.Map({
    container: 'map',
    style: 'https://tile.openstreetmap.jp/styles/osm-bright-ja/style.json', // 地図のスタイル
    center: [139.7779244, 35.7122128], // 中心座標
    zoom: 15, // ズームレベル
    pitch: 0 // 傾き
})
