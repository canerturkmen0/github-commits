import { Layout, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const Footer = ({ commit }) => (
    <Layout.Footer style={{ background: "white", borderTop: "1px solid #F0F0F0", display: "flex", justifyContent: "center" }}>
        <Button type="link" href={commit.html_url}>
            Go to the original GitHub commit page
            <ArrowRightOutlined />
        </Button>
    </Layout.Footer>
);

export default Footer;