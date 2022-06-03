// import { store } from '../config/configureStore';

export const API_URL = process.env.API_URL || 'https://appistadium-dev.herokuapp.com/api/admin';

export const HTTP_METHODS = Object.freeze({
    GET: {method: 'GET'},
    POST: {method: 'POST'},
    PUT: {method: 'PUT'},
    PATCH: {method: 'PATCH'},
    DELETE: {method: 'DELETE'},
});

export const CONTENT_TYPE = Object.freeze({
    JSON: {'Content-Type': 'application/json'},
    MULTIPART: {'Content-Type': 'form/multipart'},
    FORM_DATA: {'Content-Type': 'multipart/form-data'},
});

export const responseMiddleware = async (response) => {
    if (response.ok) {
        return response;
    }

    //  please do not remove this comment
    // if (response.status === 403 || response.status === 401) {
    //   const customError = new Error('Forbidden action');
    //   customError.response = { errorCode: 'Forbidden' };
    //   return Promise.reject(customError);
    // }

    const error = new Error(response.statusText);
    error.status = response.status;
    let res = null;
    try {
        res = JSON.parse(await response.text());
    } catch (e) {
        res = await response.text();
    }

    error.response = res || {};
    return Promise.reject(error);
};

export const request = async (url, options, requestForLocationHeader) => {
    const access = localStorage.getItem('access');
    const refresh = localStorage.getItem('refresh');
    const accessToken = access ? `Bearer ${access}` : '';
    const refreshToken = refresh ? `Bearer ${refresh}` : '';
    options.headers = {...options.headers, Authorization: accessToken};
    try {
        if (requestForLocationHeader) {
            const res = await fetch(`${API_URL}/${url}`, options)
            return res.headers.get('Location');
        }
        let res = await fetch(`${API_URL}/${url}`, options)
        if (res.status !== 401) {
            const data = await res.json();
            data.status = res.status
            return data;
        }
        res = await fetch(`${API_URL}/auth/refresh-access`, {
            method: 'POST',
            headers: {Authorization: refreshToken}
        })
        let data = await res.json()
        const newAccess = data?.data?.access
        options.headers = {
            ...options.headers,
            Authorization: newAccess ? `Bearer ${newAccess}` : '',
        };
        res = await fetch(`${API_URL}/${url}`, options)
        if (res.status !== 401) {
            localStorage.setItem('access', newAccess)
            data = await res.json();
            data.status = res.status
            return data
        }
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        localStorage.removeItem('userData');
        data = await res.json();
        data.status = res?.status;
        return data;
    } catch (e) {
        const data = e.response;
        data.status = e?.status;
        return data;
    }
};

export const requestForBlob = (url, options) =>
    fetch(`${API_URL}/${url}`, options)
        .then(responseMiddleware)
        .then((res) => res.text())
        .catch((e) => console.error('error blob : ', e));

export const http = (
    url,
    method,
    data = {},
    sendBlob = false,
    receiveBlob = false,
    requestForLocationHeader = false
) => {
    const {headers = {...CONTENT_TYPE.JSON}, body} = data;
    const params = [
        url,
        {
            ...method,
            headers: sendBlob ? {} : headers,
            credentials: 'include',
            body: sendBlob ? body : JSON.stringify(body),
        },
        requestForLocationHeader,
    ];
    return (receiveBlob ? requestForBlob : request)(...params);
};
