import NamespaceApp from "../../../../components/layouts/namespace";
import {Layout} from "antd";

const NamespaceDashboard = () => {
    return (
        <div>
            <h1>Namespace Dashboard</h1>
        </div>
    );
}

NamespaceDashboard.getLayout = function getLayout(Component, pageProps) {
    return (
        <Layout>
            {<NamespaceApp Component={Component} pageProps={pageProps} />}
        </Layout>
    )
}

export default NamespaceDashboard;