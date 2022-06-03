import {Card} from 'antd';
import {useState} from 'react';
import {useRouter} from "next/router";

const NamespaceAdd = () => {
    const [values, setValues] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();

    return (<>
        <Card title='New Namespace'>

            <p>New Namespace Form</p>
        </Card>
    </>);
};

export default NamespaceAdd;
