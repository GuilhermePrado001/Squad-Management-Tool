import { DeleteFilled, EditFilled, PlusOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Button, Card, Col, Popconfirm, Popover, Row } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import CardTitle from '../../components/CardTitle/CardTitle';
import MyTeam from '../MyTeam/MyTeam';
import TopFive from '../TopFive/TopFive';
import './MainPage.scss';

function MainPage() {

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend', 'ascend'],
            width: 170
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

    const [rowData, setRowData] = useState(data);

    const descriptionRender = (text, record) => {
        return (
            <div className="column-description">
                <span>{text}</span>
                <div className="actions">

                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                        <a className="reset-link">
                            <Popover title="Delete" content="Click to remove a item">
                                <DeleteFilled className="icon-action" />
                            </Popover>
                        </a>
                    </Popconfirm>

                    <Popover title="Share" content="Share a team">
                        <ShareAltOutlined className="icon-action" />
                    </Popover>

                    <Link className="reset-link" to={"/edit"}>
                        <Popover title="Edit" content="Click to edit a team">
                            <EditFilled className="icon-action" />
                        </Popover>
                    </Link>

                </div>
            </div>
        )
    }

    const handleDelete = (key) => {
        const dataSource = [...rowData]
        setRowData(dataSource.filter((item) => item.key !== key))
    }

    const handleAdd = () => {
        const newData = {
            key: rowData.length + 1,
            name: "Guilherme",
            description: "Sumaré"
        }

        setRowData([...rowData, newData])
    }

    return (
        <>
            <div className="site-page-myteams">
                <Row justify="center">
                    <Col lg={{ span: 11 }} xs={{ span: 16 }}>
                        <Card
                            title={<CardTitle title={"My Team"} />}
                            className="radius-modify teams-card"
                            bordered={true}
                            extra={
                                <Button className="addBtn radius-modify" onClick={handleAdd}>
                                    <PlusOutlined className="plus-icon" />
                                </Button>
                            }>
                            <MyTeam data={rowData} columns={columns} />
                        </Card>
                    </Col>
                    <Col lg={{ span: 11, offset: 1 }} xs={{ span: 16 }}>
                        <Card
                            title={<CardTitle title={"Top 5"} />}
                            className="radius-modify top-five-card"
                            bordered={true}>
                            <TopFive />
                        </Card>

                        <Card
                            className="radius-modify most-picked"
                            bordered={true}>
                            Card content
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default MainPage;