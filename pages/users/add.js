import {Button, Card, Form, Input, Select} from "antd";
import {useEffect, useState} from "react";
import {listNameSpaces} from "../../config/apis";

const SystemUserAdd = () => {
    const [namespaces, setNamespaces] = useState([]);
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    useEffect(() => {
        const getNamespaces = async () => {
            const response = await listNameSpaces();
            setNamespaces(response.data);
        };
        getNamespaces().catch(console.error);
    }, []);

    return <div>
        <Card title="New User">
            <Form labelCol={{span: 4}}
                  wrapperCol={{span: 14}}
                  layout="horizontal"
                  initialValues={{}}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  onValuesChange={() => {
                  }}
                  size={"large"}>
                <Form.Item rules={[{required: true}]} label="Full Name" style={{marginBottom: 0}}>
                    <Form.Item
                    className="bg-red-500"
                        name="firstName"
                        rules={[{required: true}]}
                        style={{display: 'inline-block', width: 'calc(50% - 8px)'}}
                    >
                        <Input placeholder="Doe"/>
                    </Form.Item>
                    <Form.Item
                        name="last_name"
                        rules={[{required: true}]}
                        style={{display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px'}}
                    >
                        <Input placeholder="John"/>
                    </Form.Item>
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[{required: true}]}
                >
                    <Input placeholder="me@example.com"/>
                </Form.Item>
                <Form.Item label="Namespaces" name={"namespaces"} rules={[{required: true}]}>
                    <Select rules={[{required: true}]} mode="multiple" allowClear>
                        {namespaces.map(namespace => <Select.Option
                            key={namespace._id} value={namespace._id}>
                            {namespace.label}
                        </Select.Option>)}
                    </Select>
                </Form.Item>

                <Form.Item label="Role" name={"roles"} rules={[{required: true}]}>
                    <Select rules={[{required: true}]}>
                        <Select.Option value="user">User</Select.Option>
                        <Select.Option value="manager">Manager</Select.Option>
                        <Select.Option value="admin">Admin</Select.Option>
                        <Select.Option value="superuser">Superuser</Select.Option>
                    </Select>
                </Form.Item>
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form>
        </Card>
    </div>
}

export default SystemUserAdd