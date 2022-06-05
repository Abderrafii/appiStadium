import {useRouter} from "next/router";
import {getTriviaCategoryDetails, updateTriviaCategory} from "../../../../../../../config/apis";
import {navigate, paths} from "../../../../../../../Utils/constants";
import {Alert, Button, Card, Form, Input, Switch} from "antd";
import {useEffect, useState} from "react";

const TriviaCategoriesEdit = () => {
    const [values, setValues] = useState({is_active: true});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();
    const {namespaceId, id} = router.query;

    function onFinish(values) {
        setLoading(true);
        updateTriviaCategory(namespaceId, id, values).then(res => {
            if (res.status === 200) {
                setMessage(res.detail);
                setError(null);
                setValues({});
                return navigate(router, paths.NAMESPACE_TRIVIA_VIEW_CATEGORIES, {namespaceId, id});
            } else {
                setMessage(null);
                return setError(res.detail);
            }
        }).catch(err => {
            setError(err.detail ? err.detail : err);
            setMessage(null);
        }).finally(() => setLoading(false));
    }

    useEffect(() => {
            setLoading(true);
            getTriviaCategoryDetails(namespaceId, id).then(res => {
                if (res.status === 200) {
                    setValues(res.data);
                    setError(null);
                } else {
                    setValues({});
                    setError(res.detail);
                }
            }).catch(e => {
                setError(e)
                setMessage(null)
            }).finally(() => setLoading(false));
        }
        , [id, namespaceId]);

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
                        <Switch checked={values.is_active}/>
                    </Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Submit
                    </Button>
                </Form>
            </Card>
        </>
    );
};

export default TriviaCategoriesEdit;