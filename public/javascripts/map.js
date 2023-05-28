var map = L.map('main_map', {
    center: [4.579593925023963, -74.15694207715741],
    zoom: 13
});

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
}).addTo(map)
//Para agregar gotas
//L.marker([4.579609971451944, -74.15755897972817]).addTo(map);
//L.marker([4.580979794824863, -74.1559421117009]).addTo(map);
//L.marker([4.580636524835112, -74.15537859708105]).addTo(map);

$.ajax({
    dataType: "json",
    url: "api/bicicletas",
    success: function(result){
        console.log(result);
        result.bicicletas.forEach(function(bici){
            L.marker(bici.ubicacion, {title: bici.id}).addTo(map);
        });
    }
})

