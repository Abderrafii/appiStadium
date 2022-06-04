const paths = Object.freeze({
    HOME: '/home',
    AFTER_SIGN_IN: '/select',
    SIGN_IN: '/authentication/login',
    RESET_PASSWORD: '/authentication/resetPassword',
    // CRUD NAMESPACE

    ADD_NAMESPACE: '/admin/namespace/add',
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

});

const navigate = (router, path, params = {}) => {
    console.log(path);
    Object.keys(params).forEach(k => {
        console.log(k, params[k], path);
        path = path.replace(`#{${k}}`, params[k]);
        console.log(path)
    })
    router.push(path)
}


//   module.exports = paths;

module.exports = {paths, navigate};