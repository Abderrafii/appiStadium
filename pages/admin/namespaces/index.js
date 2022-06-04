import {useEffect, useState} from "react";
import {listNameSpaces} from "../../../config/apis";
import {Alert, Avatar, Button, Table} from "antd";
import {EditOutlined, SearchOutlined} from '@ant-design/icons';
import {useRouter} from "next/router";

const NamespacesList = ({}) => {
    const [namespaces, setNamespaces] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)
    const router = useRouter();
    const colors = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
    const gerRandomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    const columns = [
        {
            title: '',
            dataIndex: 'label',
            key: 'image',
            render: (text, record) => (
                <Avatar
                    size={"large"}
                    style={{color: '#ffffff', backgroundColor: gerRandomColor()}}>
                    {text[0].toUpperCase()}
                </Avatar>
            ),
            width: 75,
        },
        {title: 'Label', dataIndex: 'label', key: 'label'},
        {title: 'Description', dataIndex: 'description', key: 'description'},
        {
            title: 'Actions',
            key: 'actions',
            dataIndex: '_id',
            width: 400,
            render: (_id) => (
                <>
                    <Button icon={<SearchOutlined/>} type="primary"
                            onClick={() => router.push(`/namespaces/${_id}`)}> Details</Button>
                    <Button icon={<EditOutlined/>} type="secondary"
                            onClick={() => router.push(`/namespaces/${_id}/edit`)}> Edit</Button>
                </>
            ),
        },
    ];

    useEffect(() => {
        setLoading(true);
        listNameSpaces().then(res => {
            if (res && res.status === 200) {
                setNamespaces(res.data)
            } else {
                setNamespaces([])
                setError(res.detail)
            }
        }).catch(error => {
            setError(error);
        }).finally(() => {
            setLoading(false);
        })
    }, []);

    return <div className={""}>
        <div className={"mb-4"}>
            {error && <Alert
                message="Error"
                description={error}
                type="error"
                closable
            />}
        </div>
        <Table dataSource={namespaces} columns={columns} loading={loading}/>
    </div>
}


export default NamespacesList;

NamespacesList.breadcrumb = [
    {
        name: 'Namespaces',
        url: '/namespaces'
    }
];
