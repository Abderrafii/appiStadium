import {Alert, Button, Card, Form, Input, Select, Switch} from 'antd';
import {useEffect, useState} from 'react';
import {createSystemUser, listNameSpaces} from '../../config/apis';
import {useRouter} from "next/router";

const SystemUserAdd = () => {
    const [namespaces, setNamespaces] = useState([]);
    const [values, setValues] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();
    const onFinish = (values) => {
        setLoading(true);
        createSystemUser(values).then(res => {
            if (res.status === 200) {
                return router.push('/users');
            } else {
                return setError(res);
            }
        }).catch(err => setError(err)).finally(() => setLoading(false));
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    useEffect(() => {
        const getNamespaces = async () => {
            const response = await listNameSpaces();
            if (response.status === 200) {
                setNamespaces(response.data);
            } else {
                setNamespaces([]);
                setError(response.detail);
            }
        };
        getNamespaces().catch(console.error);
    }, []);

    return (<>
        <Card title='New User' loading={loading}>
            <Form
                labelCol={{span: 4}}
                wrapperCol={{span: 14}}
                layout='horizontal'
                initialValues={values}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                onValuesChange={(value) => {
                    setValues({...values, ...value});
                }}
                size={'large'}>
                <div className={"mb-4"}>
                    {error && <Alert
                        message="Error"
                        description={JSON.stringify(error)}
                        type="error"
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
                <Form.Item name='email' label='Email' rules={[{required: true}]}>
                    <Input placeholder='me@example.com'/>
                </Form.Item>
                <Form.Item name='pseudo' label='Pseudo' rules={[{required: true}]}>
                    <Input placeholder='me@example.com'/>
                </Form.Item>
                <Form.Item name='bio' label='Bio'>
                    <Input.TextArea defaultValue={"N/A"}/>
                </Form.Item>
                <Form.Item name='username' label='Username' rules={[{required: true}]}>
                    <Input placeholder='me@example.com'/>
                </Form.Item>
                <Form.Item name='password' label='Password' rules={[{required: true}]}>
                    <Input placeholder='me@example.com'/>
                </Form.Item>
                <Form.Item
                    label='Namespaces'
                    name={'namespaces'}
                    rules={[{required: true}]}>
                    <Select rules={[{required: true}]} mode='multiple' allowClear>
                        {namespaces.map((namespace) => (
                            <Select.Option key={namespace._id} value={namespace._id}>
                                {namespace.label}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label='Role' name={'roles'} rules={[{required: true}]}>
                    <Select rules={[{required: true}]} mode='multiple'>
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
    </>);
};

export default SystemUserAdd;
