import { Result, Button } from 'antd';
import { useParams, useHistory } from "react-router-dom";

const Error = () => {
    const history = useHistory();
    const { status } = useParams();

    const handleHomeClick = () => history.push('/');

    return (
        <Result
            status="500"
            title={status}
            subTitle="Oops, something went wrong..."
            extra={<Button type="primary" onClick={handleHomeClick}>Back Home</Button>}
        />
    );
}

export default Error;