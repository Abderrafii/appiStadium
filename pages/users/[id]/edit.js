import {useEffect, useState} from "react";
import {getSystemUserDetails} from "../../../config/apis";
import Loader from "../../../components/Loader";
import {useRouter} from "next/router";

const SystemUserEdit = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const {id} = router.query


    useEffect(() => {
        const fetchUserData = async (id) => {
            try {
                const response = await getSystemUserDetails(id)
                setUser(response.data);
            } catch (e) {
                setError(error);
            }
        };

        setLoading(true);
        if (id)
            fetchUserData(id)
                .catch(e => setError(e))
                .finally(() => setLoading(false));
    }, [router.query]);

    if (loading)
        return <Loader/>

    return (
        <div>
            Form to Edit {JSON.stringify(user)} {error && <div>Error</div>}
        </div>
    )
};

export default SystemUserEdit