import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {createTriviaQuestion, getTriviaCategories} from "../../../../../../config/apis";
import {navigate, paths} from "../../../../../../Utils/constants";
import {Alert, Button, Card, Form, Input, Modal, Select, Switch} from "antd";

const TriviaQuestionsAdd = () => {
    const [values, setValues] = useState({is_active: true});
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [answerModal, setAnswerModal] = useState({isCorrect: false});
    const [answers, setAnswers] = useState([]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = (values) => {
        setIsModalVisible(false);
        setAnswers([...answers, answerModal]);
        setAnswerModal({isCorrect: false});
    }

    const router = useRouter();
    const {namespaceId} = router.query;


    function onFinish(values) {
        values.answers = answers;
        setLoading(true);
        createTriviaQuestion(namespaceId, values).then(res => {
            if (res.status === 200) {
                setMessage(res.detail);
                setError(null);
                setValues({});
                return navigate(router, paths.NAMESPACE_TRIVIA_LIST_QUESTIONS, {namespaceId});
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
        getTriviaCategories(namespaceId).then(res => {
            if (res.status === 200) {
                setCategories(res.data);
                setError(null);
            } else {
                setCategories([]);
                setError(res.detail);
            }
        }).catch(e => {
            setError(e)
            setMessage(null)
        }).finally(() => setLoading(false));
    }, [namespaceId]);

    return (<>
            <Card title='New Trivia Question' loading={loading}>
                <Form
                    labelCol={{span: 4}}
                    wrapperCol={{span: 14}}
                    layout='horizontal'
                    initialValues={{is_active: true}}
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
                    <Form.Item name='questionText' label='Question'>
                        <Input.TextArea/>
                    </Form.Item>
                    <Form.Item name='allowed_time' label='Allowed Time'>
                        <Input />
                    </Form.Item>
                    <Form.Item name='level' label="Level">
                        <Select>
                            <Select.Option value={1}>Easy</Select.Option>
                            <Select.Option value={2}>Medium</Select.Option>
                            <Select.Option value={3}>Hard</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name='categoryId' label='Category'>
                        <Select placeholder='Category' allowClear>
                            {categories.map(category => <Select.Option key={category._id}
                                                                       value={category._id}>{category.name}</Select.Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item name='language' label='Category'>
                        <Select placeholder="Language">
                            <Select.Option value={'en'}>English</Select.Option>
                            <Select.Option value={'fr'}>French</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Actif" name="is_active">
                        <Switch checked={values.is_active}/>
                    </Form.Item>


                    <div title='Answers' className={"mt-4 mb-4"}>
                        <Button type="primary" onClick={showModal}>
                            Add Answers
                        </Button>
                        <div className={'mt-4'}>
                            {answers.map((answer, index) => <div key={index}>
                                    <div className={'d-flex align-items-center'}>
                                        <div className={'mr-4'}>
                                            <p>
                                                {answer.answerText}.
                                                Réponse Correcte  : {JSON.stringify(answer.isCorrect)}
                                                <Button type="danger" onClick={() => {
                                                    setAnswers(answers.filter(ans => ans.answerText !== answer.answerText));
                                                }}>Delete Response</Button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <Modal title="Basic Modal" visible={isModalVisible} footer={null} destroyOnClose={true}
                               onCancel={() => setIsModalVisible(false)}>
                            <Form
                                layout='horizontal'
                                initialValues={answerModal}
                                onValuesChange={(value) => {
                                    setAnswerModal({...answerModal, ...value});
                                }}
                                onFinish={handleOk}
                                size={'large'}>
                                <Form.Item rules={[{required: true}]} name={"answerText"} label='Answer'>
                                    <Input placeholder='Answer ....'/>
                                </Form.Item>
                                <Form.Item label="Correct" name="isCorrect">
                                    <Switch checked={answerModal.isCorrect}/>
                                </Form.Item>
                                <Button type='success' htmlType='submit'>
                                    Submit
                                </Button>
                            </Form>
                        </Modal>
                    </div>

                    <Button type='primary' htmlType='submit'>
                        Submit
                    </Button>
                </Form>
            </Card>
        </>
    )
        ;
};

export default TriviaQuestionsAdd;