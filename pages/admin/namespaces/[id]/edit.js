import {useEffect, useState} from "react";
import {editNameSpace, getNamespaceDetails, getSystemUsers} from "../../../../config/apis";
import {useRouter} from "next/router";
import {Alert, Button, Card, Form, Input, Select, Switch, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {valuesToFormData} from "../add";
import {navigate, paths} from "../../../../Utils/constants";

const NamespaceEdit = () => {
    const [namespace, setNamespace] = useState({});
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const router = useRouter();
    const {id} = router.query

    const getFile = (e) => {
        const f = e.file;
        f.filename = f.name;
        return f
    };


    useEffect(() => {
        setLoading(true);
        if (id)
            getNamespaceDetails(id).then(res => {
                if (res.status === 200) {
                    res.data.defaultLanguage = res.data.languages.default
                    res.data.languages = res.data.languages.available
                    setNamespace(res.data);
                    setError(null);
                } else {
                    setNamespace({});
                    setError(res.detail);
                }
            }).then(getSystemUsers).then(res => {
                if (res.status === 200) {
                    setUsers(res.data);
                    setError(null);
                } else {
                    setUsers([]);
                    setError(res.detail);
                }
            }).catch(e => {
                setError(e)
                setMessage(null)
            }).finally(() => setLoading(false));
    }, [router.query]);

    function onFinish(values) {
        setLoading(true);
        const data = valuesToFormData(values);
        editNameSpace(id, data).then(res => {
            if (res.status === 200) {
                setMessage(res.detail);
                setError(null);
                setNamespace({});
                return navigate(router, paths.VIEW_NAMESPACE, {id: namespace._id})
            } else {
                setMessage(null);
                return setError(res.detail);
            }
        }).catch(err => {
            setError(err.detail ? err.detail : err);
            setMessage(null);
        })
    }

    return (
        <>
            <Card title="Edit Namespace" loading={loading}>
                <Form
                    labelCol={{span: 4}}
                    wrapperCol={{span: 14}}
                    layout='horizontal'
                    initialValues={namespace}
                    onFinish={onFinish}
                    onValuesChange={(value) => {
                        setNamespace({...namespace, ...value});
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
                    <Form.Item
                        rules={[{required: true}]}
                        label='Label'
                        style={{marginBottom: 0}}>
                        <Form.Item className='bg-red-500' name='label' rules={[{required: true}]}>
                            <Input placeholder='Label'/>
                        </Form.Item>
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
                    <Form.Item name={"languages"} label='Languages'>
                        <Select rules={[{required: true}]} mode={"multiple"}>
                            <Select.Option value='fr'>Français</Select.Option>
                            <Select.Option value='en'>Anglais</Select.Option>
                            <Select.Option value='es'>Espagnole</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name={"defaultLanguage"} label='Default Languages'>
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
                    <Form.Item label="Actif" name="is_active" valuePropName={"is_active"}>
                        <Switch defaultChecked={namespace.is_active} checked={namespace.is_active}/>
                    </Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Submit
                    </Button>
                </Form>
            </Card>
        </>
    )
};

export default NamespaceEdit