import { DeleteFilled, EditFilled, PlusOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Button, Card, Col, Popconfirm, Popover, Row } from 'antd';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import CardTitle from '../../components/CardTitle/CardTitle';
import { ManagementTeamContext } from '../../context/ManagementTeamContext';
import MyTeam from '../MyTeam/MyTeam';
import TopFive from '../TopFive/TopFive';
import './MainPage.scss';

function MainPage() {

    const columns = [
        {
            title: 'Name',
            dataIndex: 'teamName',
            sorter: (a, b) => a.teamName.length - b.teamName.length,
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

    const { teamList, setTeamList, ageAvg, setAgeAvg } = useContext(ManagementTeamContext);
    
    const descriptionRender = (text, record) => {
        return (
            <div className="column-description">
                <span>{text}</span>
                <div className="actions">

                    <Popconfirm title="Sure to delete?" onConfirm={() =>{ handleDelete(record.teamName);}}>
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

    const handleDelete = (teamName) => {
        const dataSource = [...teamList]
        const avgDataSource = [...ageAvg]

        setTeamList(dataSource.filter((item) => item.teamName !== teamName))
        setAgeAvg(avgDataSource.filter((item) => item.name !== teamName))
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
                                <Link to='/create'>
                                    <Button className="addBtn radius-modify">
                                        <PlusOutlined className="plus-icon" />
                                    </Button>
                                </Link>
                            }>
                            <MyTeam data={teamList} columns={columns} />
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