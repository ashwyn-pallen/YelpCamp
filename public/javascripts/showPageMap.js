const goodCampground = JSON.parse(campground);

mapboxgl.accessToken = mapToken;
  const map = new mapboxgl.Map({
    container: 'map', 
    style: 'mapbox://styles/mapbox/streets-v10',
    center: goodCampground.geometry.coordinates,
    zoom: 9,
    });

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
    .setLngLat(goodCampground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${goodCampground.title}</h3><p>${goodCampground.location}</p>`
            )
    )
    .addTo(map)

