import {authHeader} from "../_helpers";
import config from 'config';

export const mapService = {
    getAccounts,
    initMap,
    addMarker
};

function getAccounts() {
    const requestOptions = {
        method: 'GET',
    };

    return fetch(`${config.apiUrl}/accounts`, requestOptions)
        .then(handleResponse);
}

function handleResponse(response) {
    return response.json().then(data => {

        return data;
    });
}

function initMap(accounts) {
    //get coordinates for first object and init a map
    // const firstObj = accounts[0];
    // const coordinates = this.getCoordinates(firstObj.address);
    let map = null;
    // if (coordinates) {
        const mapOptions = {
            zoom: 6,
            center: {lat: 52.784391, lng: 9.188200},
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map"), mapOptions);
    // }

    // addMarkers(accounts, map);
    return map;
}

function getCoordinates(address) {
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address;

    var coordinates = false;
    $.ajax({
        url: url,
        async: false,
        method: 'get',
        success: function (response) {
            if (response.status == "OK") {
                coordinates = response.results[0].geometry.location;
            }
        }
    });

    return coordinates;
}

// add marker to the map
function addMarkers(accounts, map) {
    accounts.forEach(function (object) {
        let coordinates = getCoordinates(object.address);
        // if we have coordinates, then display marker on the map
        if (coordinates) {
            var marker = new google.maps.Marker({
                position: coordinates,
                map: map,
                title: object.name,
                animation: google.maps.Animation.DROP,
            });

            // show account info by click
            marker.addListener('click', function (e) {
                showAccountInfo(map, this, object);
            })
        }
    });
};

function addMarker(object, map) {
    let coordinates = getCoordinates(object.address);
    // if we have coordinates, then display marker on the map
    if (coordinates) {
        var marker = new google.maps.Marker({
            position: coordinates,
            map: map,
            title: object.name,
            animation: google.maps.Animation.DROP,
        });

        // show account info by click
        marker.addListener('click', function (e) {
            showAccountInfo(map, this, object);
        })
    }
}

// show account info
function showAccountInfo(map, marker, object) {
    var infowindow = new google.maps.InfoWindow({
        content: '<b>' + object.name + '</b></br>'
        // 'Amount: ' + parseInt(object.amount) + '$<br/>' +
        // 'Opportunity: ' + object.opportunity_name + '<br/>' +
        // 'Sales Stage: ' + object.sales_stage + '<br/>' +
        // 'Address: ' + object.address + ' (' + object.address_street + ')<br/>'
    });

    infowindow.open(map, marker);
};