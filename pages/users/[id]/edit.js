import {useEffect, useState} from "react";
import {getSystemUserDetails} from "../../../config/apis";
import Loader from "../../../components/Loader";
import {useRouter} from "next/router";
import {Button, Card, DatePicker, Form, Input, InputNumber, Select, Switch} from "antd";

const SystemUserEdit = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const {id} = router.query


    useEffect(() => {
        const fetchUserData = async (id) => {
            try {
                const response = await getSystemUserDetails(id)
                setUser(response.data);
            } catch (e) {
                setError(error);
            }
        };

        setLoading(true);
        if (id)
            fetchUserData(id)
                .catch(e => setError(e))
                .finally(() => setLoading(false));
    }, [router.query]);

    if (loading)
        return <Loader/>

    return (
        <>
            <Card title="Edit User">
                <Form labelCol={{span: 4}}
                      wrapperCol={{span: 14}}
                      layout="horizontal"
                      initialValues={user}
                      onValuesChange={() => {
                      }}
                      size={"large"}>
                    <Form.Item label="Full Name" style={{marginBottom: 0}}>
                        <Form.Item
                            name="first_name"
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
                    <Form.Item label="Roles" name="roles">
                        <Select mode="multiple" allowClear value={['a10', 'c12']} defaultValue={['a10', 'c12']}>
                        </Select>
                    </Form.Item>
                    <Form.Item label="DatePicker">
                        <DatePicker/>
                    </Form.Item>
                    <Form.Item label="InputNumber">
                        <InputNumber/>
                    </Form.Item>
                    <Form.Item label="Switch" valuePropName="checked">
                        <Switch/>
                    </Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form>
            </Card>
        </>
    )
};

export default SystemUserEdit