import {useEffect, useState} from 'react';
import {deleteSystemUser, getSystemUserDetails} from '../../../../config/apis';
import {useRouter} from 'next/router';
import {Avatar, Button, Card, Popconfirm} from 'antd';
import {QuestionCircleOutlined} from "@ant-design/icons";

const SystemUserDetails = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const {id} = router.query;

    const handleDelete = () => {
        deleteSystemUser(id).then(res => {
            if (res.status === 200) {
                router.push('/users');
            } else {
                setError(res.detail);
            }
        }).catch(e => {
            setError(e?.detail ?? e);
        })
    }

    useEffect(() => {
        const fetchUserData = async (id) => {
            try {
                const response = await getSystemUserDetails(id);
                setUser(response.data);
                setLoading(false);
            } catch (e) {
                setError(error);
            }
        };
        setLoading(true);
        if (id)
            fetchUserData(id)
                .catch((e) => setError(true))
                .finally(() => setLoading(false));
    }, [id]);

//   if (loading) return <Loader />;

    return (
        <div>
            <Card title='Details User' loading={loading}>
                <div>
                    <div>
                        <p>{JSON.stringify(error)}</p>
                        <Avatar
                            size={'large'}
                            style={{color: '#ffffff', backgroundColor: 'dodgerblue'}}>
                            {}
                        </Avatar>
                    </div>
                    <div>
                        <p>
                            Fullname : {user?.first_name} {user?.last_name}
                        </p>
                        <p>Username : {user?.username}</p>
                        <p>Email : {user?.email}</p>
                        <p>Role : {user?.roles?.join(' ')}</p>
                    </div>
                </div>
                <Popconfirm
                    title="Are you sure to delete this User?"
                    onConfirm={handleDelete}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="danger">Delete</Button>
                </Popconfirm>
            </Card>
        </div>
    );
};

export default SystemUserDetails;

SystemUserDetails.breadcrumb = [
    {
        name: 'Users',
        url: '/users'
    },
    {
        name: 'Details'
    }
];

