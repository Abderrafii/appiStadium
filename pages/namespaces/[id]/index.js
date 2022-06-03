import {useEffect, useState} from 'react';
import {getNamespaceDetails} from '../../../config/apis';
import {useRouter} from 'next/router';
import {Card} from 'antd';

const NamespaceDetails = () => {
    const [namespace, setNamespace] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const {id} = router.query;

    useEffect(() => {
        const fetchUserData = async (id) => {
            try {
                const response = await getNamespaceDetails(id);
                setNamespace(response.data);
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
    }, [router.query]);

    return (
        <div>
            <Card title='Details Namespace' loading={loading}>
                <div>
                    {JSON.stringify(namespace)}
                </div>
            </Card>
        </div>
    );
};

export default NamespaceDetails;

NamespaceDetails.breadcrumb = [
    {
        name: 'Namespaces',
        url: '/namespaces'
    },
    {
        name: 'Details'
    }
];
