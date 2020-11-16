import './MyTeam.scss'
import { Table } from 'antd';

function MyTeam({ data, columns }) {

    return (
        <>
            <Table scroll={{ y: 480 }} key={"table"} columns={columns} dataSource={data} pagination={false} />
        </>
    );
}

export default MyTeam;