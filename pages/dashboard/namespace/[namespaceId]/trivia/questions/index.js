import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {getTriviaQuestions} from "../../../../../../config/apis";
import {Button, Card, Table} from "antd";
import {EditOutlined, SearchOutlined} from "@ant-design/icons";
import {navigate, paths} from "../../../../../../Utils/constants";

const TriviaQuestionsList = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const router = useRouter();
    const {namespaceId} = router.query;

    useEffect(() => {
        setLoading(true);
        getTriviaQuestions(namespaceId).then(res => {
            if (res.status === 200) {
                setQuestions(res.data);
                setError(null);
            } else {
                setQuestions([]);
                setError(res.detail);
            }
        }).catch(e => {
            setError(e)
            setMessage(null)
        }).finally(() => setLoading(false));

    }, [namespaceId]);

    const columns = [
        {title: 'Name', dataIndex: 'name', key: 'name'},
        {title: 'Question', dataIndex: 'questionText', key: 'questionText'},
        {
            title: 'Actions',
            key: 'actions',
            dataIndex: '_id',
            width: 400,
            render: (_id) => (
                <>
                    <Button icon={<SearchOutlined/>} type="primary"
                            onClick={() => navigate(router, paths.NAMESPACE_TRIVIA_VIEW_QUESTIONS, {
                                namespaceId,
                                id: _id
                            })}> Details</Button>
                    <Button icon={<EditOutlined/>} type="secondary"
                            onClick={() => navigate(router, paths.NAMESPACE_TRIVIA_EDIT_QUESTIONS, {
                                namespaceId,
                                id: _id
                            })}> Edit</Button>
                </>
            ),
        },
    ];

    return (
        <>
            <Card title="Trivia Questions" loading={loading}>
                {error && <p>{error}</p>}
                {message && <p>{message}</p>}
                <Table dataSource={questions} columns={columns} loading={loading}/>
            </Card>
        </>
    );
}

export default TriviaQuestionsList;