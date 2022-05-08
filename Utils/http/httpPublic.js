import _isEmpty from 'lodash/isEmpty';
// import { store } from '../config/configureStore';

export const API_URL = process.env.API_URL || 'https://appistadium-dev.herokuapp.com/api/admin';
// export const API_URL =
//   process.env.API_URL || 'https://appistadium-dev.herokuapp.com/api/admin';

export const HTTP_METHODS = Object.freeze({
  GET: { method: 'GET' },
  POST: { method: 'POST' },
  PUT: { method: 'PUT' },
  PATCH: { method: 'PATCH' },
  DELETE: { method: 'DELETE' },
});

export const CONTENT_TYPE = Object.freeze({
  JSON: { 'Content-Type': 'application/json' },
  MULTIPART: { 'Content-Type': 'form/multipart' },
  FORM_DATA: { 'Content-Type': 'multipart/form-data' },
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

export const request = (url, options, requestForLocationHeader) => {
  if (requestForLocationHeader)
    return fetch(`${API_URL}/${url}`, options)
      .then(responseMiddleware)
      .then((res) => res.headers.get('location'))
      .catch((e) => console.error('error request 1 : ', e));

  return fetch(`${API_URL}/${url}`, options)
    .then(responseMiddleware)
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
    .then(responseMiddleware)
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
  const { headers = { ...CONTENT_TYPE.JSON }, body } = data;
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
