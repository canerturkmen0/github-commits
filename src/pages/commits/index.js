import { useEffect, useState } from "react";
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { Table, Typography } from 'antd';
import moment from 'moment';

import { API } from '../../consts';
import AuthorCol from './AuthorCol';
import AuthorModal from "../../components/AuthorModal";
import { getFirstCommitSha, getLastCommitSha, getCommitMessage, handleAvatarClick } from '../../helpers';

const Commits = () => {
    const history = useHistory();
    const { owner, repo } = useParams();

    const [commits, setCommits] = useState([]);
    const [totalCommits, setTotalCommits] = useState(0);
    const [isModalShown, setModalShown] = useState(false);
    const [selectedAuthor, setSelectedAuthor] = useState();
    const [currentPage, setCurrentPage] = useState();
    const [isLoading, setLoading] = useState(false);

    const handleModalClose = () => {
        setModalShown(false);
    }

    const handleCommitColClick = (data) => {
        history.push(`/${owner}/${repo}/commits/${data.sha}`);
    }

    useEffect(() => {
        const localOwner = localStorage.getItem('owner');
        const localRepo = localStorage.getItem('repo');
        localOwner !== owner && localRepo !== repo && localStorage.clear();
        localOwner !== owner && localStorage.setItem('owner', owner);
        localRepo !== repo && localStorage.setItem('repo', repo);

        const localCurrentPage = localStorage.getItem('current-page');
        setCurrentPage(+localCurrentPage || 1);
    }, [owner, repo]);

    useEffect(() => {
        const fetchCommits = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${API}/repos/${owner}/${repo}/commits`, { params: { page: currentPage, per_page: 10 } });
                setCommits(res.data);
                setLoading(false);
                localStorage.setItem('commits', JSON.stringify(res.data));
            } catch (error) {
                history.push(`/error/${error.response.status}`);
            }
        }

        const fetchTotalCommits = async () => {
            try {
                const firstCommitSha = await getFirstCommitSha(owner, repo);
                const lastCommitSha = await getLastCommitSha(owner, repo);
                const res = await axios.get(`${API}/repos/${owner}/${repo}/compare/${firstCommitSha}...${lastCommitSha}`);
                const totalCommits = res.data.total_commits;
                setTotalCommits(totalCommits);
                localStorage.setItem('total-commits', totalCommits);
            } catch (error) {
                history.push(`/error/${error.response.status}`);
            }
        }

        if (!currentPage)
            return;

        const localTotalCommits = localStorage.getItem('total-commits');
        localTotalCommits ? setTotalCommits(localTotalCommits) : fetchTotalCommits();

        let localCommits = localStorage.getItem('commits');
        localCommits = JSON.parse(localCommits);

        let localCurrentPage = localStorage.getItem('current-page');
        localCurrentPage = +localCurrentPage;
        if (localCurrentPage === currentPage && localCommits && currentPage !== 1) {
            setCommits(localCommits);
        } else {
            localStorage.setItem('current-page', currentPage);
            fetchCommits();
        }

    }, [currentPage, owner, repo, history]);

    const columns = [
        {
            title: "Author",
            render: (data) => <AuthorCol author={data.author} handleAvatarClick={() => handleAvatarClick(data.author, setSelectedAuthor, setModalShown, history)} />
        },
        {
            title: "Message",
            render: (data) => (
                <div style={{ cursor: "pointer" }} onClick={() => handleCommitColClick(data)}>
                    <Typography>{getCommitMessage(data.commit.message)}</Typography>
                </div>
            )
        },
        {
            title: "Date",
            render: (data) => moment(data.commit.committer.date).format('L')
        },
        {
            title: "SHA",
            render: (data) => (
                <div style={{ cursor: "pointer" }} onClick={() => handleCommitColClick(data)}>
                    <Typography>{data.sha}</Typography>
                </div>
            )
        },
        {
            title: "Parent SHA",
            render: (data) => (
                <div>
                    {data.parents.map(parent => (
                        <Typography key={parent.sha}>{parent.sha.slice(0, 7)}</Typography>
                    ))}
                </div>
            )
        }
    ];

    return (
        <>
            <AuthorModal isModalShown={isModalShown} handleModalClose={handleModalClose} author={selectedAuthor} />
            <Table
                dataSource={commits}
                loading={isLoading}
                columns={columns}
                rowKey="node_id"
                size="middle"
                scroll={{ y: 'calc(100vh - 125px)' }}
                pagination={{
                    total: totalCommits,
                    pageSize: 10,
                    showSizeChanger: false,
                    current: currentPage,
                    onChange: (page, pageSize) => setCurrentPage(page)
                }}
            />
        </>
    );
}

export default Commits;