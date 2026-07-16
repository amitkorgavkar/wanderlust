const map = new mapboxgl.Map({
    accessToken: mapToken,
    container: 'map', // container ID
    center: [72.8775, 19.0760], // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
});