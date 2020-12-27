import { List, Typography, Layout } from 'antd';

const { Title } = Typography;

const Content = ({ commit }) => (
    <Layout.Content style={{ background: "white", textAlign: "center", padding: "20px" }}>
        <Title level={3}>{commit.files.length} files changed with {commit.stats.additions} additions and {commit.stats.deletions} deletions</Title>
        {commit.files && (
            <List
                itemLayout="horizontal"
                dataSource={commit.files}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            title={<p>{item.filename}</p>}
                            description={<span>Additions: {item.additions} - Deletions: {item.deletions}</span>}
                        />
                    </List.Item>
                )}
            />
        )}
    </Layout.Content>
);

export default Content;