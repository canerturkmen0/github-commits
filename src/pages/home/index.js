import { useHistory } from "react-router-dom";
import { Form, Input, Button } from 'antd';
import axios from 'axios';

import { API } from '../../consts';
import { displayNotification } from '../../helpers';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
};

const Home = () => {
    const history = useHistory();

    const handleFinish = async ({ owner, repo }) => {
        owner = owner.trim();
        repo = repo.trim();

        try {
            const res = await axios.get(`${API}/repos/${owner}/${repo}`);
            if (res.data) {
                history.push(`${owner}/${repo}/commits`);
            }
        } catch (error) {
            displayNotification('topLeft', 'It does not exist!');
        }
    };

    const handleFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="home-bg" style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={handleFinish}
                onFinishFailed={handleFinishFailed}
            >
                <Form.Item label="Owner" name="owner" rules={[{ required: true, message: 'Please input an owner name' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Repo" name="repo" rules={[{ required: true, message: 'Please input a repo of that owner' }]}>
                    <Input />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="default" htmlType="submit">FETCH !</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Home;