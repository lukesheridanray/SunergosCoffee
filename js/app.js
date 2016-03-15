//Hide Warning
//Show Warning Slowly
//$(".primary-content").hide().show("slow");
if ($('input').hasClass('wholesale')) {
    function clicked() {
        var formdata = $('#formId').serialize();
        $.ajax('//formspree.io/luke.v@att.net', {
            data: formdata,
            type: 'post',
            success: function() {
                swal("Good job!", "You clicked the button!", "success");
            }
        })
        return false;
    }
}

$('.new-details').on('click', function(e){

    e.preventDefault();

    var message = $(this).siblings('.content').find('.message').html();
    console.log(message);

    swal({
        title: "<small></small>",
        text: message,
        confirmButtonColor: "#c9bb38",
        html:true
    });
});
$('.new-notes').on('click', function(e){

    e.preventDefault();

    var message = $(this).siblings('.content').find('.note').html();
    console.log(message);

    swal({
        title: "<small></small>",
        text: message,
        confirmButtonColor: "#c9bb38",
        html:true
    });
});

if ($('body').hasClass('location')) {
    var geocoder = new google.maps.Geocoder(),
        address = "306 W Woodlawn Ave, Louisville, KY 40214",
        color = "#AB9559",
        latitude,
        longitude;

    function getGeocode() {
        geocoder.geocode({
            'address': address
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                latitude = results[0].geometry.location.lat();
                longitude = results[0].geometry.location.lng();
                initGoogleMap();
            }
        });
    }

    function initGoogleMap() {
        var styles = [{
            stylers: [{
                saturation: -100
            }]
        }];
        options = {
                mapTypeControlOptions: {
                    mapTypeIds: ['Styled']
                },
                center: new google.maps.LatLng(latitude, longitude),
                zoom: 17,
                scrollwheel: false,
                navigationControl: true,
                mapTypeControl: false,
                zoomControl: true,
                disableDefaultUI: true,
                mapTypeId: 'Styled'
            },
            div = document.getElementById('map'),
            map = new google.maps.Map(div, options);
        marker = new google.maps.Marker({
            map: map,
            draggable: false,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(latitude, longitude)
        });
        var styledMapType = new google.maps.StyledMapType(styles, {
            name: 'Styled'
        });
        map.mapTypes.set('Styled', styledMapType);
        var infowindow = new google.maps.InfoWindow({
            content: "<div class='iwContent'>" + address + "</div>"
        });
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });
        bounds = new google.maps.LatLngBounds(new google.maps.LatLng(-84.999999, -
            179.999999), new google.maps.LatLng(84.999999, 179.999999));
        rect = new google.maps.Rectangle({
            bounds: bounds,
            fillColor: color,
            fillOpacity: 0.2,
            strokeWeight: 0,
            map: map
        });
    }
    google.maps.event.addDomListener(window, 'load', getGeocode);
}
new Vue({
    el: '#formId',
    data: {
        message: ''
    }
});

new Vue({
  el: '#validation'
})
