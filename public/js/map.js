    function initialize_Map() {
        var location = new google.maps.LatLng(38.89037, -77.03196);
        
        var options = {
            center: location,
            zoom: 10
        };
        
        var marker = new google.maps.Marker({
            position: location,
            map: map,
            title: "Washington D.C."
        });
        
        var map = new google.maps.Map(document.getElementById("map"), options);
        marker.setMap(map);
    }

    google.maps.event.addDomListener(window, 'load', initialize_Map);
