
var mymap = L.map('mapid').setView([53.482, -4.526], 5);//6/53.482/-4.526

L.tileLayer('http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg' , {
attribution: '<a target="_top" href="http://maps.stamen.com/">Map tiles</a> by <a target="_top" href="http://stamen.com">Stamen Design</a>, under <a target="_top" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.',
}).addTo(mymap);

/* 
// this puts the render on
L.tileLayer('../infotile/{x}/{y}' , {
}).addTo(mymap);
*/

/*
var circle = L.circle([51.508, -0.11], 500, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
}).addTo(mymap);
*/
var geojson;

function style(feature) {
    return {
        fillColor: feature.properties.colour,
        weight: 2,
        opacity: 0.5,
        color: 'white',
        //dashArray: '3',
        fillOpacity: 0.2
    };
}

var popup = L.popup();
//try out geoJson
//https://raw.githubusercontent.com/martinjc/UK-GeoJSON/master/json/administrative/gb/lad.json
var ukData = $.getJSON("/deliver", function(ladData) {
    geojson = L.geoJson(ladData, {
    style: style,
    onEachFeature: onEachFeature,
}).addTo(mymap);
    //ladData.properties.LAD13NM contains placename
});

$.getJSON("https://raw.githubusercontent.com/martinjc/UK-GeoJSON/master/json/administrative/ni/lgd.json", function(ladData) {
    L.geoJson(ladData, {
    style: style,
    onEachFeature: onEachFeature,
}).addTo(mymap);
    //ladData.properties.LAD13NM contains placename
});

function onEachFeature(feature, layer) {
    //console.log(feature.properties.LAD13NM);
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: handlePopup
    });
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        fillOpacity: 1
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
}

function handlePopup(e){
	//console.log(e);
	 popup
        .setLatLng(e.latlng)
        .setContent("This is " + e.target.feature.properties.LAD13NM)
        .openOn(mymap);
}

