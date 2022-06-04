export const valuesToFormData = (values) => {
    const data = new FormData();
    data.append('owner', values.owner);
    data.append('is_active', values.is_active);
    data.append('label', values.label);
    data.append('description', values.description);
    data.append('email', values.email);
    data.append('defaultLanguage', values.defaultLanguage);
    data.append('languages', values.languages);
    data.append('system_users', values.system_users);
    data.append('telephone', values.phone);
    data.append('logo', values.logo);
    data.append('banner', values.banner);
    return data;
}