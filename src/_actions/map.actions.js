import { mapConstants } from '../_constants';
import { alertActions } from './';
import { mapService } from '../_services';
import openSocket from 'socket.io-client';

const  socket = openSocket('http://localhost:3000');

export const mapActions = {
    getAccounts
};

function getAccounts(user) {
    return dispatch => {
        dispatch(request(user));

        const map = mapService.initMap();

        socket.emit('get_markers');
        socket.on('marker', account => {
            dispatch(success(account));
            mapService.addMarker(account, map);
        });
    };


    function request(user) { return { type: mapConstants.MAP_REQUEST, user } }
    function success(account) { return { type: mapConstants.MAP_SUCCESS, account } }
    function failure(error) { return { type: mapConstants.MAP_FAILURE, error } }
}

function startListening() {

}