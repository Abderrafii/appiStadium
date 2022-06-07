import {Alert, Button, Card, Form, Input, Select, Switch, Upload} from 'antd';
import {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {createNameSpace, getSystemUsers} from "../../../config/apis";
import {UploadOutlined} from '@ant-design/icons';
import {navigate, paths} from "../../../Utils/constants";

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

const NamespaceAdd = () => {
    const [values, setValues] = useState({is_active: true});
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        getSystemUsers().then(response => {
            if (response.status === 200) {
                setUsers(response.data);
                setError(null);
            } else {
                setUsers([]);
                setError(response.detail);
                setMessage(null);
            }
        }).catch(e => {
            setError(e.details);
            setMessage(null)
        });
    }, []);

    const getFile = (e) => {
        const f = e.file;
        f.filename = f.name;
        return f
    };

    function onFinish(values) {
        const data = valuesToFormData(values);
        createNameSpace(data).then(res => {
            if (res.status === 200) {
                setMessage(res.detail);
                setError(null);
                setValues({});
                setTimeout(() => navigate(router, paths.LIST_NAMESPACES), 1000);
            } else {
                setMessage(null);
                return setError(res.detail);
            }
        }).catch(err => {
            setError(err.detail ? err.detail : err);
            setMessage(null);
        })
    }

    return (<>
            <Card title='New Namespace' loading={loading}>
                <Form
                    labelCol={{span: 4}}
                    wrapperCol={{span: 14}}
                    layout='horizontal'
                    initialValues={values}
                    onFinish={onFinish}
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
                        {message && <Alert
                            message="Info"
                            description={message}
                            type="success"
                            closable
                        />}
                    </div>
                    <Form.Item rules={[{required: true}]} name={"label"} label='Label'>
                        <Input placeholder='Label'/>
                    </Form.Item>
                    <Form.Item name='description' label='Description'>
                        <Input.TextArea/>
                    </Form.Item>
                    <Form.Item name='phone' label='Phone'>
                        <Input placeholder='060467648'/>
                    </Form.Item>
                    <Form.Item name='email' label='Email' rules={[{required: true}]}>
                        <Input placeholder='me@example.com'/>
                    </Form.Item>
                    <Form.Item name={"languages"} label='Languages' rules={[{required: true}]}>
                        <Select mode={"multiple"}>
                            <Select.Option value='fr'>Français</Select.Option>
                            <Select.Option value='en'>Anglais</Select.Option>
                            <Select.Option value='es'>Espagnole</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name={"defaultLanguage"} label='Default Languages' rules={[{required: true}]}>
                        <Select rules={[{required: true}]}>
                            <Select.Option value='fr'>Français</Select.Option>
                            <Select.Option value='en'>Anglais</Select.Option>
                            <Select.Option value='es'>Espagnole</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label='Owner'
                        name={'owner'}
                        rules={[{required: true}]}>
                        <Select rules={[{required: true}]} allowClear>
                            {users.map((user) => (
                                <Select.Option key={user._id} value={user._id}>
                                    {user.first_name} {user.last_name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name='TOS' label='T.O.S'>
                        <Input.TextArea/>
                    </Form.Item>
                    <Form.Item name='privacyPolicy' label='Privacy Policy'>
                        <Input.TextArea/>
                    </Form.Item>
                    <Form.Item getValueFromEvent={getFile} name='logo' label='Logo'>
                        <Upload beforeUpload={() => {
                            return false
                        }} multiple={false}>
                            <Button icon={<UploadOutlined/>}>Select File</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item getValueFromEvent={getFile} name='banner' label='Banner'>
                        <Upload beforeUpload={() => {
                            return false
                        }}>
                            <Button icon={<UploadOutlined/>}>Select File</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item label="Actif" name="is_active">
                        <Switch/>
                    </Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Submit
                    </Button>
                </Form>
            </Card>
        </>
    );
};

export default NamespaceAdd;
