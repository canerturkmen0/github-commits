import axios from 'axios';
import { notification } from 'antd';

import { API } from '../consts';

export const getFirstCommitSha = async (owner, repo) => {
    const res = await axios.get(`${API}/repos/${owner}/${repo}/commits`);
    let firstCommitSha = '';
    if (res.headers.link) {
        const pageUrl = res.headers.link.split(',')[1].split(';')[0].split('<')[1].split('>')[0];
        const resPageUrl = await axios.get(pageUrl);
        const lastCommit = resPageUrl.data;
        firstCommitSha = lastCommit[lastCommit.length - 1]['sha'];
    }
    else {
        const firstCommit = res.data;
        firstCommitSha = firstCommit[firstCommit.length - 1]['sha'];
    }
    return firstCommitSha;
}

export const getLastCommitSha = async (owner, repo) => {
    const res = await axios.get(`${API}/repos/${owner}/${repo}/commits`, { params: { page: 1, per_page: 1 } });
    const lastCommitSha = res.data[0].sha;
    return lastCommitSha;
}

export const displayNotification = (placement, message) => notification.error({ message, placement });

export const getCommitMessage = message => message.split('\n\n')[0];

export const getCommitDescription = message => message.split('\n\n')[1] && message.split('\n\n')[1].split('\n');

export const handleAvatarClick = async (author, setSelectedAuthor, setModalShown, history) => {
    const fetchSelectedAuthor = async () => {
        try {
            const res = await axios.get(author.url);
            setSelectedAuthor(res.data);
            setModalShown(true);
            localStorage.setItem('author', JSON.stringify(res.data));
            localStorage.setItem('author-login', author.login);
        } catch (error) {
            history.push(`/error/${error.response.status}`);
        }
    }

    if (!author)
        return displayNotification('topLeft', 'That user profile API has issues');

    let localAuthor = localStorage.getItem('author');
    localAuthor = JSON.parse(localAuthor);
    const localAuthorLogin = localStorage.getItem('author-login');
    if (localAuthor && localAuthorLogin === author.login) {
        setSelectedAuthor(localAuthor);
        setModalShown(true);
        return;
    } else {
        fetchSelectedAuthor();
    }
}