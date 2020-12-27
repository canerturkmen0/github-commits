import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios';
import { Spin, Space, Layout } from 'antd';

import { API } from '../../consts';
import AuthorModal from '../../components/AuthorModal';
import Content from './Content';
import Footer from './Footer';
import Header from './Header';

const Commit = () => {
    const history = useHistory();
    const { id, owner, repo } = useParams();

    const [commit, setCommit] = useState();
    const [isModalShown, setModalShown] = useState(false);
    const [selectedAuthor, setSelectedAuthor] = useState();
    const [isLoading, setLoading] = useState(false);

    const handleModalClose = () => {
        setModalShown(false);
    }

    useEffect(() => {
        const fetchCommit = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${API}/repos/${owner}/${repo}/commits/${id}`);
                setCommit(res.data);
                setLoading(false);
            } catch (error) {
                history.push(`/error/${error.response.status}`);
            }
        }

        fetchCommit();

    }, [id, owner, repo, history]);

    if (isLoading || !commit)
        return (
            <Space size="middle" style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Spin size="large" />
            </Space>
        );

    return (
        <>
            <AuthorModal isModalShown={isModalShown} handleModalClose={handleModalClose} author={selectedAuthor} />
            <Layout style={{ minHeight: "100vh", display: "flex" }}>
                <Header commit={commit}
                    setSelectedAuthor={setSelectedAuthor}
                    setModalShown={setModalShown}
                    history={history}
                />
                <Content commit={commit} />
                <Footer commit={commit} />
            </Layout>
        </>
    );
}

export default Commit;