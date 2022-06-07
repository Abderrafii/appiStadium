import {useEffect} from "react";
import {listNameSpaces} from "../../../config/apis";
import {Alert, Avatar, Button, Table} from "antd";
import {EditOutlined, SearchOutlined} from '@ant-design/icons';
import {useRouter} from "next/router";
import {navigate, paths} from "../../../Utils/constants";
import {useFetchData} from "../../../config/hooks";

const NamespacesList = ({}) => {
    const {error, message, loading, data: namespaces} = useFetchData(listNameSpaces, []);
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
                            onClick={() => navigate(router, paths.VIEW_NAMESPACE, {id: _id})}> Details</Button>
                    <Button icon={<EditOutlined/>} type="secondary"
                            onClick={() => navigate(router, paths.EDIT_NAMESPACE, {id: _id})}> Edit</Button>
                </>
            ),
        },
    ];

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
