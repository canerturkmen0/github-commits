import { Modal, Avatar, Typography, Tooltip } from 'antd';
import { TeamOutlined, LineOutlined, EnvironmentOutlined, DollarCircleOutlined, MailOutlined, ApiOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const { Title } = Typography;

const AuthorModal = ({ isModalShown, handleModalClose, author }) => {
    const history = useHistory();

    const [organizations, setOrganizations] = useState([]);

    useEffect(() => {
        const fetchOrganizations = async () => {
            try {
                const res = await axios.get(author.organizations_url);
                return setOrganizations(res.data);
            } catch (error) {
                history.push(`/error/${error.response.status}`);
            }
        }

        if (author && author.organizations_url)
            fetchOrganizations();

    }, [author, history]);

    if (!author)
        return null;

    return (
        <Modal title={author.login} visible={isModalShown} footer={[]} onCancel={handleModalClose}>
            <Avatar src={author.avatar_url} size={{ xs: 70, sm: 70, md: 70, lg: 80, xl: 100, xxl: 120, }} />
            <Title level={4} style={{ marginTop: "5px" }}>{author.name}</Title>
            {author.bio && <Typography>{author.bio}</Typography>}
            <Typography style={{ marginTop: "2.5px" }}>
                <TeamOutlined />
                <span style={{ marginLeft: "2.5px" }}>{`${author.followers} followers`}</span>
                <LineOutlined style={{ margin: "0 2.5px" }} />
                <span>{`${author.following} following`}</span>
            </Typography>
            <Info info={author.company} icon={DollarCircleOutlined} />
            <Info info={author.location} icon={EnvironmentOutlined} />
            <Info info={author.email} icon={MailOutlined} />
            <Info info={author.blog} icon={ApiOutlined} />
            {author.created_at && <Typography style={{ marginTop: "2.5px" }}>{`Joined on ${moment(author.created_at).format('L')}`}</Typography>}
            {organizations.length > 0 && <Title level={5}>Organizations</Title>}
            {organizations && organizations.map(organization => (
                <Tooltip key={organization.node_id} title={organization.login}>
                    <Avatar src={organization.avatar_url} size="small" style={{ marginRight: "5px" }} />
                </Tooltip>
            ))}
        </Modal>
    );
}

export default AuthorModal;

const Info = ({ info, icon }) => {
    if (!info)
        return null;

    return (
        <Typography style={{ marginTop: "2.5px" }}>
            {icon && icon.render()}
            <span style={{ marginLeft: "2.5px" }}>{`${info}`}</span>
        </Typography>
    );
}