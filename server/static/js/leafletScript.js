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
var geojsonNI;
// var colourHolder = 'rgb(0,0,255)';
// var colourJSON;

function getColour(ladName, colourData){
    //this needs to put information from colours back into the geoJSON
    //console.log(data1, data2);
    // var keys = [];
    // for(var key in data1){
    //     keys.push(key);

    //     //feature.properties.colour = key;
    // };
    //console.log(keys);
    // console.log(colourData.features[0]['loc'])
    for (var i=0; i<colourData.features.length; i++){
        //for (var j=0; j<ladData.features.length; j++){
            if (ladName == colourData.features[i]['loc']){
                return colourData.features[i]['col'];
            }
            // else if (ladData.features[j].properties.LGDNAME == colourData.features[i]['loc']){
            //     console.log(colourData.features[i]['col']);
            //     //return colourData.features[i]['col'];
            //     ladData.features[j].properties.colour = colourData.features[i]['col']
            //     console.log(ladData.features[j].properties.colour)
            // }
        //}
    }


    // for (var i = 0; i< ladData.features.length; i++){
    //     // if (ladData.features[i].properties.LGDNAME == undefined){
    //     //     console.log(colourData.features[ladData.features[i].properties.LAD13NM]['col']);
    //     // }else if(ladData.features[i].properties.LAD13NM == undefined){
    //     //     console.log(colourData.features[ladData.features[i].properties.LGDNAME]['col']);
    //     // }
    // }

    // for (var i = 0; i< ladData.features.length; i++){
    //     for (var j = 0; j< colourData.features.length; j++){

    //         // if (ladData.features[i].properties.LGDNAME == undefined){
    //         //     console.log(colourData.features[j][ladData.features[i].properties.LAD13NM]);
    //         // }else if(ladData.features[i].properties.LAD13NM == undefined){
    //         //     console.log(colourData.features[j][ladData.features[i].properties.LGDNAME]);
    //         // }
    //     }
    // }
}

function getNums(ladName, colourData){
    for (var i=0; i<colourData.features.length; i++){
        if (ladName == colourData.features[i]['loc']){
            return colourData.features[i]['nums'];
        }
    }
}

function style(feature) {
    //var thisPlace = feature.properties.LAD13NM;
    // for (var location in colourJSON.features){
    //     if (thisPlace == location.loc){
    //         console.log(location.col);
    //     };
    // };
    return {
        fillColor: feature.properties.colour,
        weight: 2,
        opacity: 0.5,
        color: 'white',
        //dashArray: '3',
        fillOpacity: 0.3
    };
}

var popup = L.popup();
//try out geoJson
//https://raw.githubusercontent.com/martinjc/UK-GeoJSON/master/json/administrative/gb/lad.json
$.getJSON("/deliver/UK", function(ladData) {
    $.getJSON("/deliver/data", function(colourData) {
        //colourJSON = colourData;
        // for (var i=0; i<colourData.features.length; i++){
        //     console.log(colourData.features[i]['loc']);
        //     console.log(colourData.features[i]['col']);
        // }
        // for (var i=0; i<ladData.features.length; i++){
        //     console.log(ladData.features[i].properties.LAD13NM);
        // }
        for (var i=0; i<ladData.features.length; i++){
            ladData.features[i].properties.colour = getColour(ladData.features[i].properties.LAD13NM.toLowerCase(), colourData);
            ladData.features[i].properties.nums = getNums(ladData.features[i].properties.LAD13NM.toLowerCase(), colourData);
        }
        //combineJSON(colourData, ladData);
        geojson = L.geoJson(ladData, {
            style: style,
            onEachFeature: onEachFeature,
        }).addTo(mymap);
    });
    //ladData.properties.LAD13NM contains placename
});

//https://raw.githubusercontent.com/martinjc/UK-GeoJSON/master/json/administrative/ni/lgd.json
$.getJSON("/deliver/NI", function(ladData) {
    $.getJSON("/deliver/data", function(colourData) {
        //colourJSON = colourData;
        // for (var i=0; i<colourData.features.length; i++){
        //     console.log(colourData.features[i]['loc']);
        //     console.log(colourData.features[i]['col']);
        // }
        // for (var i=0; i<ladData.features.length; i++){
        //     console.log(ladData.features[i].properties.LGDNAME);
        // }   
        for (var i=0; i<ladData.features.length; i++){
            ladData.features[i].properties.colour = getColour(ladData.features[i].properties.LGDNAME.toLowerCase(), colourData);
            ladData.features[i].properties.nums = getNums(ladData.features[i].properties.LGDNAME.toLowerCase(), colourData);
        }
        //combineJSON(colourData, ladData);
        geojsonNI = L.geoJson(ladData, {
            style: style,
            onEachFeature: onEachFeature,
        }).addTo(mymap);
    });
        //ladData.properties.LAD13NM contains placename
        //fetchNewColours();
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
    //geojsonNI.resetStyle(e.target);
}

function handlePopup(e){
    //console.log(e);
    if (e.target.feature.properties.LAD13NM == undefined) {
         popup
            .setLatLng(e.latlng)
            .setContent(e.target.feature.properties.LGDNAME+" - Positive: "+e.target.feature.properties.nums[0]+", Negative: "+e.target.feature.properties.nums[1])
            .openOn(mymap);
    }else{
         popup
            .setLatLng(e.latlng)
            .setContent(e.target.feature.properties.LAD13NM+" - Positive: "+e.target.feature.properties.nums[0]+", Negative: "+e.target.feature.properties.nums[1])
            .openOn(mymap);
    }
}
