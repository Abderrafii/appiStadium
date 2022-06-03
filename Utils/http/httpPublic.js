import _isEmpty from 'lodash/isEmpty';
import {API_URL, CONTENT_TYPE, responseMiddleware} from "./http";


export const request = (url, options, requestForLocationHeader) => {
    if (requestForLocationHeader)
        return fetch(`${API_URL}/${url}`, options)
            .then(responseMiddleware)
            .then((res) => res.headers.get('location'))
            .catch((e) => console.error('error request 1 : ', e));

    return fetch(`${API_URL}/${url}`, options)
        .then((res) =>
            res.text().then((e) => {
                const data = _isEmpty(e) ? {} : JSON.parse(e);
                data.status = res.status;
                return data;
            })
        )

        .catch((e) => console.error('error request 2 : ', e));
};

export const requestForBlob = (url, options) =>
    fetch(`${API_URL}/${url}`, options)
        .then((res) => res.text())
        .catch((e) => console.error('error blob : ', e));

export const httpPublic = (
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
