import { Layout, Typography, Avatar } from 'antd';
import moment from 'moment';

import { getCommitMessage, getCommitDescription, handleAvatarClick } from '../../helpers';

const { Title, Text } = Typography;

const Header = ({ commit, setSelectedAuthor, setModalShown, history }) => (
    <Layout.Header style={{ background: "white", flex: "1", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "50px 10px" }}>
        <Text code style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "100%", display: "flex", flexDirection: "column", padding: "20px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", borderBottom: "1px solid rgba(0,0,0,0.15)" }}>
                    <div onClick={() => handleAvatarClick(commit.author, setSelectedAuthor, setModalShown, history)} style={{ cursor: "pointer", display: "flex" }}>
                        <Avatar
                            src={commit && commit.author && commit.author.avatar_url}
                            alt={commit && commit.author && commit.author.login}
                            size="large"
                        />
                    </div>
                    <div>
                        <Title level={5} style={{ margin: "0", display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                            {commit && commit.author && commit.author.login}
                            <div style={{ width: "10px" }}></div>
                            <Text style={{ fontWeight: "lighter", fontSize: "0.85rem" }}>committed on {moment(commit.commit.committer.date).format('L')}</Text>
                        </Title>
                        <Title level={5} style={{ margin: "0" }}>{getCommitMessage(commit.commit.message)}</Title>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", lineHeight: "24px", borderBottom: "1px solid rgba(0,0,0,0.15)", padding: "5px 0" }}>
                    <Text>SHA: {commit.sha}</Text>
                    {commit.parents.map((parent, idx) => <Text key={parent.sha}>SHA of Parent {idx + 1}: {parent.sha.slice(0, 7)}</Text>)}
                </div>
                <div style={{ paddingTop: "10px 0" }}>
                    {Array.isArray(getCommitDescription(commit.commit.message)) && getCommitDescription(commit.commit.message).map((descRow, idx) => <Typography key={idx} style={{ lineHeight: "32px" }}>{descRow}</Typography>)}
                </div>
            </div>
        </Text>
    </Layout.Header>
);

export default Header;