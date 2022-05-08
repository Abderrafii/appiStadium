import { CONTENT_TYPE, http, HTTP_METHODS } from '../Utils/http/http';
import { httpPublic } from '../Utils/http/httpPublic';

export const userAuthentication = (userAuth) =>
  httpPublic(`auth/login`, HTTP_METHODS.POST, { body: userAuth });

export const checkAccessToken = () => {
  return http(`auth/check-access`, HTTP_METHODS.POST);
};

export const listNameSpaces = () => http(`namespaces`, HTTP_METHODS.GET);
