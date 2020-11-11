import './MyTeam.scss'
import { Table } from 'antd';

function MyTeam({ data, columns }) {

    return (
        <>
            <Table columns={columns} dataSource={data} pagination={false} />
        </>
    );
}

export default MyTeam;