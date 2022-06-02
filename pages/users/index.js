import {useEffect, useState} from "react";
import {getSystemUsers} from "../../config/apis";
import {Avatar, Button, Table} from "antd";
import Link from "next/link";
import Loader from "../../components/Loader";
import {SearchOutlined, EditOutlined} from '@ant-design/icons';
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
                    <Button icon={<SearchOutlined/>} type="primary" onClick={()=>router.push(`/users/${_id}`)}> Details</Button>
                    <Button icon={<EditOutlined/>} type="secondary" onClick={()=>router.push(`/users/${_id}/edit`)}> Edit</Button>
                </>
            ),
        },
    ];

    const getUsers = async () => {
        try {
            const response = await getSystemUsers();
            setUsers(response.data);
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        setLoading(true);
        getUsers().catch(error => {
            setError(error);
        }).finally(() => {
            setLoading(false);
        })
    }, []);

    return <div className={""}>
        {loading ? <Loader/> : <Table dataSource={users} columns={columns}/>};
    </div>
}


export default UsersList;