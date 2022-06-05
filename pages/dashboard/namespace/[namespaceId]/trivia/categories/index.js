import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {getTriviaCategories} from "../../../../../../config/apis";
import {Button, Card, Layout, Table} from "antd";
import {EditOutlined, SearchOutlined} from "@ant-design/icons";
import {navigate, paths} from "../../../../../../Utils/constants";
import NamespaceApp from "../../../../../../components/layouts/namespace";

const TriviaCategoriesList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const router = useRouter();
    const {namespaceId} = router.query;

    const columns = [
        {title: 'name', dataIndex: 'name', key: 'Name'},
        {title: 'Description', dataIndex: 'description', key: 'description'},
        {
            title: 'Actions',
            key: 'actions',
            dataIndex: '_id',
            width: 400,
            render: (_id) => (
                <>
                    <Button icon={<SearchOutlined/>} type="primary"
                            onClick={() => navigate(router, paths.NAMESPACE_TRIVIA_VIEW_CATEGORIES, {
                                namespaceId,
                                id: _id
                            })}> Details</Button>
                    <Button icon={<EditOutlined/>} type="secondary"
                            onClick={() => navigate(router, paths.NAMESPACE_TRIVIA_EDIT_CATEGORIES, {
                                namespaceId,
                                id: _id
                            })}> Edit</Button>
                </>
            ),
        },
    ];

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
        }
        , [namespaceId]);

    return (
        <>
            <Card title="Trivia Categories" loading={loading}>
                {error && <p>{error}</p>}
                {message && <p>{message}</p>}
                <Table dataSource={categories} columns={columns} loading={loading}/>
            </Card>
        </>
    );
}

export default TriviaCategoriesList;