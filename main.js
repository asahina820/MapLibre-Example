style = {
    version: 8,
    sources: {
        // 地理院タイル（標準地図）
        'gsi-tile': {
            type: 'raster',
            tiles: ['https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: "地図の出典：<a href='https://www.gsi.go.jp/' target='_blank'>地理院タイル（標準）</a>",
        },
        //地理院ベクトルタイル
        'gsi-vector': {
            type: 'vector',
            tiles: ['https://cyberjapandata.gsi.go.jp/xyz/experimental_bvmap/{z}/{x}/{y}.pbf'],
            minZoom: 0,
            maxZoom: 14,
            maxzoom: 18,
            attribution: "建物データの出典：<a href='https://www.gsi.go.jp/' target='_blank'>国土地理院ベクトルタイル提供実験</a>",
        },
    },
    layers: [
        // 背景地図として国土地理院の地理院タイル（標準地図）を追加
        {
            id: 'gsi-tile',
            type: 'raster',
            source: 'gsi-tile',
            minzoom: 0,
            maxzoom: 24,
        },

        // 地理院ベクトルタイルの建物を追加
        {
            id: 'gsi-building',
            type: 'fill-extrusion',
            source: 'gsi-vector',
            'source-layer': 'building',
            layout: { visibility: 'visible' },
            paint: {
                'fill-extrusion-color': '#C0C0C0',
                'fill-extrusion-height': 50,
            },
        },
    ],
};

var map = new maplibregl.Map({
    container: 'map',
    style: style, // 地図のスタイル
    center: [139.7673068, 35.6809591], // 中心座標
    zoom: 15, // ズームレベル
    pitch: 30, // 傾き
});
