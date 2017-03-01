$(document).ready(function () {
    
    initMap(45.5230622, -122.6764816);
    $('#locationSubmit').submit(function (event) {
        event.preventDefault();
        var mapLocation = $("input[name=mapLocation]").val()
        console.log(mapLocation);
        $.ajax({
            url: "/Home/DrawMap/",         
            type: 'POST',      
            data: $(this).serialize(),
            datatype: 'json',
            success: function (result) {
                console.log(result);
                var stringArray = result.split(",");
                var latitude = parseFloat(stringArray[0]);
                var longitude = parseFloat(stringArray[1]);
                initMap(latitude, longitude);
            }
        }).error(function () { alert("whaaaaaaaat");});
    });
});

var initMap = function (latitude, longitude) {
    console.log(latitude, longitude);
    var center = { lat: latitude, lng: longitude };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: center,
        mapTypeId: google.maps.MapTypeId.TERRAIN
    });
    
    var marker = new google.maps.Marker({
        position: center,       
        map: map,
        title: 'Marker Title'
    });
    var contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
            '<div id="bodyContent">' +
            '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
            'sandstone rock formation in the southern part of the ' +
            'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
            'south west of the nearest large town, Alice Springs; 450&#160;km ' +
            '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
            'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
            'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
            'Aboriginal people of the area. It has many springs, waterholes, ' +
            'rock caves and ancient paintings. Uluru is listed as a World ' +
            'Heritage Site.</p>' +
            '.</p>' +
            '</div>' +
            '</div>';
    var infoWindow = new google.maps.InfoWindow({
        content: contentString
    });
    marker.addListener('click', function () {
        infoWindow.open(map, marker);
    });
    
    function addMarker(feature)
    {
        var marker = new google.maps.Marker({
            position: feature.position,
            map: map
        })
    }

    var features = [
        {
            position: new google.maps.LatLng(45, -122)
        }
    ]
    for (var i = 0, feature; feature = features[i]; i++) {
        addMarker(feature);
    }
}
