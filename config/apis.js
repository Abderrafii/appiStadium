import {http, HTTP_METHODS} from '../Utils/http/http';
import {httpPublic} from '../Utils/http/httpPublic';

export const userAuthentication = (userAuth) =>
    httpPublic("auth/login", HTTP_METHODS.POST, {body: userAuth});

export const checkAccessToken = () => {
    return http(`auth/check-access`, HTTP_METHODS.POST);
};

export const listNameSpaces = () => http(`namespaces`, HTTP_METHODS.GET);
export const createNameSpace = (data) => http(`namespaces`, HTTP_METHODS.POST, {body: data});
export const editNameSpace = (id, data) => http(`namespaces/${id}`, HTTP_METHODS.PATCH, {body: data});
export const getNamespaceDetails = (id) => http(`namespaces/${id}`, HTTP_METHODS.GET);

export const getSystemUsers = () => http(`system/users`, HTTP_METHODS.GET);
export const createSystemUser = (data) => http(`system/users`, HTTP_METHODS.POST, {body: data});
export const updateSystemUser = (id, data) => http(`system/users/${id}`, HTTP_METHODS.PATCH, {body: data});
export const deleteSystemUser = (id) => http(`system/users/${id}`, HTTP_METHODS.DELETE);

export const getSystemUserDetails = (id) => http(`system/users/${id}`, HTTP_METHODS.GET);


