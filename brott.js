mapboxgl.accessToken = 'pk.eyJ1IjoiZmVsaXhqb2huc3NvbiIsImEiOiJjanh0ZHIwd3kwcjhjM2Rvb2M3ZnVyMW5kIn0.Mdf_WJH-4npMZh3HNu-6wQ';
map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/felixjohnsson/ck4flwl4k1zig1cprbi0w99im', // stylesheet location
    center: [17.9923658, 59.320990], // starting position [lng, lat]
    zoom: 9 // starting zoom
});

function render () {
    fetch('https://polisen.se/api/events')
    .then(e => e.json())
    .then(e => {
        for (let i = 0; i < e.length; i++){
            
            let longitude = e[i].location.gps.split(',')[0]
            let latitude = e[i].location.gps.split(',')[1]
            let title = e[i].name
            let id = e[i].id.toString()
                placeOnMap(latitude, longitude, title, id)
        }

    })
}
render();
function placeOnMap (lat, long, title, id) {
    map.addLayer({
        'id': id,
        'type': 'symbol',
        'source': {
        'type': 'geojson',
        'data': {
        'type': 'FeatureCollection',
        'features': [
        {
        // feature for Mapbox DC
        'type': 'Feature',
        'geometry': {
        'type': 'Point',
        'coordinates': [
        lat,
        long
        ]
        },
        'properties': {
        'title': title,
        'icon': 'monument',
        'color': 'white',
        }
        },
        {
    
        }
        ]
        }
        },
        'layout': {
        // get the icon name from the source's "icon" property
        // concatenate the name to get an icon from the style's sprite sheet
        'icon-image': ['concat', ['get', 'icon'], '-15'],
        // get the title name from the source's "title" property
        'text-field': ['get', 'title'],
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-anchor': 'top',
        'text-size': 15
        }
        });
        console.log(long, lat)
}
