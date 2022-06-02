import {Button, Card, DatePicker, Form, Input, InputNumber, Select, Switch} from "antd";

const SystemUserAdd = () => {
    return <div>
        <Card title="Add New User">
            <Form labelCol={{span: 4}}
                  wrapperCol={{span: 14}}
                  layout="horizontal"
                  initialValues={{}}
                  onValuesChange={() => {
                  }}
                  size={"large"}>
                <Form.Item label="Full Name" style={{marginBottom: 0}}>
                    <Form.Item
                        name="firstName"
                        rules={[{required: true}]}
                        style={{display: 'inline-block', width: 'calc(50% - 8px)'}}
                    >
                        <Input placeholder="Doe"/>
                    </Form.Item>
                    <Form.Item
                        name="lastName"
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
                <Form.Item label="Select">
                    <Select mode="multiple" allowClear  value={['a10', 'c12']} defaultValue={['a10', 'c12']}>
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
    </div>
}

export default SystemUserAdd