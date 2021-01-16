import http from "axios";
import {registerEndPoint} from '../constants/api';
import {verifyEndPoint} from '../constants/api';
import {authEndPoint} from '../constants/api';
import {baseUrl} from '../constants/api';


export function register() {
    return http.post(baseUrl + registerEndPoint, body)
}

export function verifying(model) {
    return http.post(baseUrl + verifyEndPoint, model)
}


export function authenticate () {
    return http.get(baseUrl + authEndPoint);
}


