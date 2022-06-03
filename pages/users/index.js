import {useEffect, useState} from "react";
import {getSystemUsers} from "../../config/apis";
import {Alert, Avatar, Button, Table} from "antd";
import {EditOutlined, SearchOutlined} from '@ant-design/icons';
import {useRouter} from "next/router";

const UsersList = ({}) => {
    const [users, setUsers] = useState([]);
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
            dataIndex: 'first_name',
            key: 'image',
            render: (text, record) => (
                <Avatar
                    size={"large"}
                    style={{color: '#ffffff', backgroundColor: gerRandomColor()}}>
                    {text[0]}
                </Avatar>
            ),
            width: 75,
        },
        {title: 'First Name', dataIndex: 'first_name', key: 'first_name'},
        {title: 'Last Name', dataIndex: 'last_name', key: 'last_name'},
        {
            title: 'Role',
            key: 'roles',
            dataIndex: 'roles',
            render: (_, {roles}) => (
                <>
                    {roles.map(tag => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <span color={color} key={tag}>
                                {tag.toUpperCase()}
                            </span>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            dataIndex: '_id',
            render: (_id) => (
                <>
                    <Button icon={<SearchOutlined/>} type="primary"
                            onClick={() => router.push(`/users/${_id}`)}> Details</Button>
                    <Button icon={<EditOutlined/>} type="secondary"
                            onClick={() => router.push(`/users/${_id}/edit`)}> Edit</Button>
                </>
            ),
        },
    ];

    useEffect(() => {
        setLoading(true);
        getSystemUsers().then(res => {
            if (res && res.status === 200) {
                setUsers(res.data);
            } else {
                setUsers([]);
                setError(res.detail);
            }
        }).catch(error => {
            setUsers([]);
            setError(error);
        }).finally(() => {
            setLoading(false);
        })
    }, []);

    return <div className={""}>
        <div className={"mb-4"}>
            {error && <Alert
                message="Error"
                description={JSON.stringify(error)}
                type="error"
                closable
            />}
        </div>
        <Table dataSource={users} columns={columns} loading={loading}/>
    </div>
}


export default UsersList;

UsersList.breadcrumb = [
    {
        name: 'Users',
        url: '/namespaces'
    }
];
