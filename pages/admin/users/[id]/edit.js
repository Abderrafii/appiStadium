import {useEffect, useState} from "react";
import {getSystemUserDetails, listNameSpaces, updateSystemUser} from "../../../../config/apis";
import {useRouter} from "next/router";
import {Alert, Button, Card, Form, Input, Select, Switch} from "antd";
import {navigate, paths} from "../../../../Utils/constants";

const SystemUserEdit = () => {
    const [user, setUser] = useState({});
    const [namespaces, setNamespaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();
    const {id} = router.query

    const onFinish = values => {
        updateSystemUser(id, values).then(res => {
            if (res.status === 200) {
                setError(null);
                setMessage(res.detail);
                setTimeout(() => navigate(router, paths.VIEW_SYSTEM_USER, {id:user._id}), 1000);
            } else {
                setMessage(null);
                setError(res.detail);
            }
        }).catch(err => {
            setMessage(null);
            setError(err.detail ? err.detail : err);
        })
    }


    useEffect(() => {
        setLoading(true);
        if (id)
            getSystemUserDetails(id).then(res => {
                if (res.status === 200) {
                    setUser(res.data);
                    setError(null);
                } else {
                    setError(res.detail);
                    setUser({});
                }
            }).then(() => listNameSpaces().then(res => {
                if (res.status === 200) {
                    setNamespaces(res.data);
                } else {
                    setNamespaces([]);
                    setError(res.detail);
                }
            })).catch(e => setError(e?.detail ?? e)).finally(() => setLoading(false));
    }, [router.query]);

    console.dir(user)

    return (
        <>
            <Card title='Edit User' loading={loading}>
                <Form
                    labelCol={{span: 4}}
                    wrapperCol={{span: 14}}
                    layout='horizontal'
                    initialValues={user}
                    onFinish={onFinish}
                    onFinishFailed={(err) => alert(JSON.stringify(err))}
                    onValuesChange={(value) => {
                        setUser({...user, ...value});
                    }}
                    size={'large'}>
                    <div className={"mb-4"}>
                        {error && <Alert
                            message="Error"
                            description={JSON.stringify(error)}
                            type="error"
                            closable
                        />}
                        {message && <Alert
                            message="Message"
                            description={message}
                            type="success"
                            closable
                        />}
                    </div>
                    <Form.Item
                        rules={[{required: true}]}
                        label='Full Name'
                        style={{marginBottom: 0}}>
                        <Form.Item
                            className='bg-red-500'
                            name='first_name'
                            rules={[{required: true}]}
                            style={{display: 'inline-block', width: 'calc(50% - 8px)'}}>
                            <Input placeholder='Doe'/>
                        </Form.Item>
                        <Form.Item
                            name='last_name'
                            rules={[{required: true}]}
                            style={{
                                display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px',
                            }}>
                            <Input placeholder='John'/>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item name='avatar' label='Avatar' rules={[{required: true}]}>
                        <Input placeholder='060467648'/>
                    </Form.Item>
                    <Form.Item name='phone' label='Phone' rules={[{required: true}]}>
                        <Input placeholder='060467648'/>
                    </Form.Item>
                    <Form.Item name='pseudo' label='Pseudo' rules={[{required: true}]}>
                        <Input placeholder='me@example.com'/>
                    </Form.Item>
                    <Form.Item name='bio' label='Bio'>
                        <Input.TextArea defaultValue={"N/A"}/>
                    </Form.Item>
                    <Form.Item
                        label='Namespaces'
                        name={'namespaces'}
                        rules={[{required: true}]}>
                        <Select rules={[{required: true}]} mode='multiple' allowClear
                                value={user?.namespaces?.map(n => n._id)}>
                            {namespaces.map((namespace) => (
                                <Select.Option key={namespace._id} value={namespace._id}>
                                    {namespace.label}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label='Role' name={'roles'} rules={[{required: true}]}>
                        <Select rules={[{required: true}]} mode={"multiple"} value={user.roles}>
                            <Select.Option value='user'>User</Select.Option>
                            <Select.Option value='manager'>Manager</Select.Option>
                            <Select.Option value='admin'>Admin</Select.Option>
                            <Select.Option value='superuser'>Superuser</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Actif" name="is_active" valuePropName="checked">
                        <Switch/>
                    </Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Submit
                    </Button>
                </Form>
            </Card>
        </>
    )
};

export default SystemUserEdit