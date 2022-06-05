import {useEffect, useState} from "react";
import {getTriviaCategoryDetails} from "../../../../../../../config/apis";
import {Card} from "antd";
import {useRouter} from "next/router";

const TriviaCategoriesDetails = () => {
    const [category, setCategory] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const router = useRouter();
    const {namespaceId, id} = router.query;

    useEffect(() => {
        setLoading(true);
        getTriviaCategoryDetails(namespaceId, id).then(res => {
            if (res.status === 200) {
                setCategory(res.data);
                setError(null);
            } else {
                setCategory({});
                setError(res.detail);
            }
        }).catch(e => {
            setError(e)
            setMessage(null)
        }).finally(() => setLoading(false));

    }, [namespaceId, id]);

    return (
        <Card loading={loading}>
            <h1>Details Trivia Categories</h1>
            <p>{error && error?.detail}</p>
            <div>{JSON.stringify(category)}</div>
        </Card>
    );
}

export default TriviaCategoriesDetails;