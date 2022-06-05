import {CONTENT_TYPE, http, HTTP_METHODS} from '../Utils/http/http';
import {httpPublic} from '../Utils/http/httpPublic';

export const userAuthentication = (userAuth) =>
    httpPublic("auth/login", HTTP_METHODS.POST, {body: userAuth});

export const checkAccessToken = () => {
    return http(`auth/check-access`, HTTP_METHODS.POST);
};

export const listNameSpaces = () => http(`namespaces/all`, HTTP_METHODS.GET);
export const listAccessibleNameSpaces = () => http(`namespaces`, HTTP_METHODS.GET);
export const createNameSpace = (data) => http(`namespaces`, HTTP_METHODS.POST, {
    headers: {...CONTENT_TYPE.FORM_DATA},
    body: data,
}, true);
export const editNameSpace = (id, data) => http(`namespaces/${id}`, HTTP_METHODS.PATCH, {
    headers: {...CONTENT_TYPE.FORM_DATA},
    body: data,
}, true);
export const getNamespaceDetails = (id) => http(`namespaces/${id}`, HTTP_METHODS.GET);

export const getSystemUsers = () => http(`system/users`, HTTP_METHODS.GET);
export const createSystemUser = (data) => http(`system/users`, HTTP_METHODS.POST, {body: data});
export const updateSystemUser = (id, data) => http(`system/users/${id}`, HTTP_METHODS.PATCH, {body: data});
export const deleteSystemUser = (id) => http(`system/users/${id}`, HTTP_METHODS.DELETE);
export const getSystemUserDetails = (id) => http(`system/users/${id}`, HTTP_METHODS.GET);

export const getTriviaCategories = (namespaceId) => http(`namespaces/${namespaceId}/quizzes/categories`, HTTP_METHODS.GET);
export const getTriviaCategoryDetails = (namespaceId, id) => http(`namespaces/${namespaceId}/quizzes/categories/${id}`, HTTP_METHODS.GET);
export const createTriviaCategory = (namespaceId, data) => http(`namespaces/${namespaceId}/quizzes/categories`, HTTP_METHODS.POST, {body: data});
export const updateTriviaCategory = (namespaceId, id, data) => http(`namespaces/${namespaceId}/quizzes/categories/${id}`, HTTP_METHODS.PATCH, {body: data});
export const deleteTriviaCategory = (namespaceId, id) => http(`namespaces/${namespaceId}/quizzes/categories/${id}`, HTTP_METHODS.DELETE);

export const getTriviaCategoryQuestions = (namespaceId, categoryId) => http(`namespaces/${namespaceId}/quizzes/categories/${categoryId}/questions`, HTTP_METHODS.GET);
export const getTriviaQuestions = (namespaceId) => http(`namespaces/${namespaceId}/quizzes/questions`, HTTP_METHODS.GET);
export const getTriviaQuestionDetails = (namespaceId, id) => http(`namespaces/${namespaceId}/quizzes/questions/${id}`, HTTP_METHODS.GET);
export const createTriviaQuestion = (namespaceId, data) => http(`namespaces/${namespaceId}/quizzes/questions`, HTTP_METHODS.POST, {body: data});
export const updateTriviaQuestion = (namespaceId, id, data) => http(`namespaces/${namespaceId}/quizzes/questions/${id}`, HTTP_METHODS.PATCH, {body: data});
export const deleteTriviaQuestion = (namespaceId, id) => http(`namespaces/${namespaceId}/quizzes/questions/${id}`, HTTP_METHODS.DELETE);

