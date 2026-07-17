const map = new mapboxgl.Map({
    accessToken: mapToken,
    container: 'map', // container ID
    center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 8 // starting zoom
});

const marker1 = new mapboxgl.Marker({color: "red"})
.setLngLat(listing.geometry.coordinates)//listing.geometry.coordinates
.setPopup(new mapboxgl.Popup({offset: 25})
    .setHTML(`<h5>${listing.location}</h5><p>Exact location will be provided after booking!</p>`))
.addTo(map);