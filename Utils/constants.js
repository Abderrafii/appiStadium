const paths = Object.freeze({
    HOME: '/home',
    AFTER_SIGN_IN: '/select',
    SIGN_IN: '/authentication/login',
    RESET_PASSWORD: '/authentication/resetPassword',

    /* Administration */
    // CRUD NAMESPACE
    ADD_NAMESPACE: '/admin/namespaces/add',
    LIST_NAMESPACES: '/admin/namespaces',
    EDIT_NAMESPACE: '/admin/namespaces/#{id}/edit',
    VIEW_NAMESPACE: '/admin/namespaces/#{id}',
    DELETE_NAMESPACE: '/admin/namespaces/#{id}',

    // CRUD USER
    ADD_SYSTEM_USER: '/admin/users/add',
    LIST_SYSTEM_USERS: '/admin/users',
    EDIT_SYSTEM_USER: '/admin/users/#{id}/edit',
    VIEW_SYSTEM_USER: '/admin/users/#{id}',
    DELETE_SYSTEM_USER: '/admin/users/#{id}',

    /* Namespace Dashboard */
    NAMESPACE_DASHBOARD: '/dashboard/namespace/',

    // Trivia
    NAMESPACE_TRIVIA_LIST_CATEGORIES: '/dashboard/namespace/#{namespaceId}/trivia/categories',
    NAMESPACE_TRIVIA_ADD_CATEGORIES: '/dashboard/namespace/#{namespaceId}/trivia/categories/add',
    NAMESPACE_TRIVIA_EDIT_CATEGORIES: '/dashboard/namespace/#{namespaceId}/trivia/categories/#{id}/edit',
    NAMESPACE_TRIVIA_VIEW_CATEGORIES: '/dashboard/namespace/#{namespaceId}/trivia/categories/#{id}',
    NAMESPACE_TRIVIA_LIST_QUESTIONS: '/dashboard/namespace/#{namespaceId}/trivia/questions',
    NAMESPACE_TRIVIA_ADD_QUESTIONS: '/dashboard/namespace/#{namespaceId}/trivia/questions/add',
    NAMESPACE_TRIVIA_EDIT_QUESTIONS: '/dashboard/namespace/#{namespaceId}/trivia/questions/#{id}/edit',
    NAMESPACE_TRIVIA_VIEW_QUESTIONS: '/dashboard/namespace/#{namespaceId}/trivia/questions/#{id}',
});

const navigate = (router, path, params = {}) => {
    Object.keys(params).forEach(k => {
        path = path.replace(`#{${k}}`, params[k]);
    })
    router.push(path)
}


//   module.exports = paths;

module.exports = {paths, navigate};