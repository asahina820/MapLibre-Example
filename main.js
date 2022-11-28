const style = {
    version: 8,
    sources: {
        rtile: {
            type: 'raster',
            tiles: ['https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: "地図の出典：<a href='https://www.gsi.go.jp/' target='_blank'>地理院タイル</a>",
        },
        plateau: {
            type: 'vector',
            tiles: ['https://indigo-lab.github.io/plateau-tokyo23ku-building-mvt-2020/{z}/{x}/{y}.pbf'],
            minzoom: 10,
            maxzoom: 16,
            attribution:
                "データの出典：<a href='https://github.com/indigo-lab/plateau-tokyo23ku-building-mvt-2020'>plateau-tokyo23ku-building-mvt-2020 by indigo-lab</a> (<a href='https://www.mlit.go.jp/plateau/'>国土交通省 Project PLATEAU</a> のデータを加工して作成)",
        },
    },
    layers: [
        {
            id: 'rtile',
            type: 'raster',
            source: 'rtile',
            minzoom: 5,
            maxzoom: 20,
        },
        {
            id: 'bldg',
            type: 'fill-extrusion',
            source: 'plateau',
            'source-layer': 'bldg',
            minzoom: 10,
            maxzoom: 20,
            paint: {
                'fill-extrusion-color': '#797979',
                'fill-extrusion-height': ['get', 'measuredHeight'],
            },
        },
    ],
};
var map = new maplibregl.Map({
    container: 'map',
    style: style, // 地図のスタイル
    center: [139.745461, 35.65856], // 中心座標
    zoom: 14, // ズームレベル
    pitch: 45, // 傾き
});
