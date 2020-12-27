import { Avatar } from 'antd';

const AuthorCol = ({ author, handleAvatarClick }) => (
    <div>
        <div onClick={handleAvatarClick} style={{ cursor: "pointer", maxWidth: "fit-content" }}>
            <Avatar src={author && author.avatar_url} alt={author && author.login} size="large" />
        </div>
        <p>{author && author.login}</p>
    </div>
);

export default AuthorCol;