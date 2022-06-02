import {useEffect, useState} from "react";
import {getSystemUsers} from "../../config/apis";
import {Table} from "antd";
import Loader from "../../components/Loader";
import Link from "next/link";

const UsersList = ({}) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const columns = [
        {title: '# ID', dataIndex: '_id', key: '_id'},
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
                <div>
                    <Link href={`/users/${_id}`}>Details</Link>
                    <Link href={`/users/${_id}/edit`}>Edit</Link>
                </div>
            ),
        },
    ];

    const getUsers = async () => {
        setLoading(true);
        try {
            const response = await getSystemUsers();
            setUsers(response.data);
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        getUsers().catch(error => {
            setError(error);
        });
    }, []);

    if (loading)
        return <Loader/>;

    return <div className={""}>
        {loading ? "Loading ... " : <Table dataSource={users} columns={columns}/>};
    </div>
}


export default UsersList;