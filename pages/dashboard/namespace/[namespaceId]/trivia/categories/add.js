import {useRouter} from "next/router";
import {createTriviaCategory} from "../../../../../../config/apis";
import {navigate, paths} from "../../../../../../Utils/constants";
import {Alert, Button, Card, Form, Input, Switch} from "antd";
import {useState} from "react";

const TriviaCategoriesAdd = () => {
    const [values, setValues] = useState({is_active: true});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();
    const {namespaceId} = router.query;

    function onFinish(values) {
        setLoading(true);
        createTriviaCategory(namespaceId, values).then(res => {
            if (res.status === 200) {
                setMessage(res.detail);
                setError(null);
                setValues({});
                return navigate(router, paths.NAMESPACE_TRIVIA_LIST_CATEGORIES, {namespaceId});
            } else {
                setMessage(null);
                return setError(res.detail);
            }
        }).catch(err => {
            setError(err.detail ? err.detail : err);
            setMessage(null);
        }).finally(() => setLoading(false));
    }

    return (<>
            <Card title='New Trivia Category' loading={loading}>
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
                    <Form.Item rules={[{required: true}]} name={"name"} label='Name'>
                        <Input placeholder='Label'/>
                    </Form.Item>
                    <Form.Item name='description' label='Description'>
                        <Input.TextArea/>
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

export default TriviaCategoriesAdd;