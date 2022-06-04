import {Layout} from "antd";

const SelectNamespace = () => {
    return <div>
        <h1>Select</h1>
        <p>
            <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select">
                https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
            </a>
        </p>

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
