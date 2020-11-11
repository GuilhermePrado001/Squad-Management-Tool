import './MyTeam.scss'
import { useState } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
import { DeleteFilled, ShareAltOutlined, EditFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
function MyTeam() {

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Description',
            dataIndex: 'description',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.description.length - b.description.length,
            sortDirections: ['descend', 'ascend'],
            render: (text, record) => descriptionRender(text, record)
        }
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            description: 'Team 1',
        },
        {
            key: '2',
            name: 'Jim Green',
            description: 'Team 2',
        },
        {
            key: '3',
            name: 'Joe Black',
            description: 'Team 3',
        },
        {
            key: '4',
            name: 'Jim Red',
            description: 'Team 4',
        },
    ];

    const [rowData, setRowDate] = useState(data);

    const descriptionRender = (text, record) => {
        return (
            <div className="column-description">
                <span>{text}</span>
                <div className="actions">

                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                        <a className="reset-link">
                            <DeleteFilled className="icon-action" />
                        </a>
                    </Popconfirm>

                    <ShareAltOutlined className="icon-action" />

                    <Link className="reset-link" to={"/edit"}>
                        <EditFilled className="icon-action"/>
                    </Link>
                 
                </div>
            </div>
        )
    }

    const handleDelete = (key) => {
        const dataSource = [...rowData]
        setRowDate(dataSource.filter((item) => item.key !== key))
    }

    return (
        <>
            <Table columns={columns} dataSource={rowData} pagination={false} />
        </>
    );
}

export default MyTeam;