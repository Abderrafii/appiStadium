import {Layout} from "antd";
import {useEffect, useState} from "react";
import Link from "next/link";
import {paths} from "../Utils/constants";
import {listAccessibleNameSpaces} from "../config/apis";

const SelectNamespace = () => {
    const [namespaces, setNamespaces] = useState([]);

    useEffect(() => {
        listAccessibleNameSpaces().then(res => {
            if (res.status === 200) {
                setNamespaces(res.data);
            } else {
                setNamespaces([]);
            }
        }).catch(e => console.log(e));
    }, [])


    return <div>
        <h1>Select</h1>
        <div>
            {namespaces.map(namespace => <div key={namespace._id}>
                <p>Name : {namespace.label} <Link href={paths.NAMESPACE_DASHBOARD + namespace._id}>Access</Link></p>
            </div>)}
        </div>
    </div>
}

SelectNamespace.getLayout = function getLayout(Component, pageProps) {
    return (
        <Layout>
            {<Component {...pageProps} />}
        </Layout>
    )
}

export default SelectNamespace;
