var map = new maplibregl.Map({
    container: 'map',
    style: 'https://tile.openstreetmap.jp/styles/osm-bright-ja/style.json', // 地図のスタイル
    center: [140.067575487, 35.791039821], // 中心座標
    zoom: 18, // ズームレベル
    pitch: 0, // 傾き
});

var hoveredStateId = null;

map.on('load', function () {
    map.addSource('funabashi_fudepolygon', {
        type: 'geojson',
        data: './data/funabashi_fudepolygon.geojson',
    });
    map.addLayer({
        id: 'funabashi_fudepolygon_fill',
        type: 'fill',
        source: 'funabashi_fudepolygon',
        layout: {},
        paint: {
            'fill-color': '#84C98B',
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,
                0.5,
            ],
        },
    });
    map.addLayer({
        id: 'funabashi_fudepolygon_border',
        type: 'line',
        source: 'funabashi_fudepolygon',
        layout: {},
        paint: {
            'line-color': '#2B6442',
            'line-width': 1,
        },
    });

    map.on('mousemove', 'funabashi_fudepolygon_fill', function (e) {
        if (e.features.length > 0) {
            if (hoveredStateId) {
                map.setFeatureState(
                    { source: 'funabashi_fudepolygon', id: hoveredStateId },
                    { hover: false }
                );
            }
            hoveredStateId = e.features[0].id;
            map.setFeatureState(
                { source: 'funabashi_fudepolygon', id: hoveredStateId },
                { hover: true }
            );
        }
    });

    map.on('mouseleave', 'funabashi_fudepolygon_fill', function () {
        if (hoveredStateId) {
            map.setFeatureState(
                { source: 'funabashi_fudepolygon', id: hoveredStateId },
                { hover: false }
            );
        }
        hoveredStateId = null;
    });
});
