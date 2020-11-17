import { DeleteFilled, EditFilled, PlusOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Button, Card, Col, message, Popconfirm, Popover, Row } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CardTitle from '../../components/CardTitle/CardTitle';
import { ManagementTeamContext } from '../../context/ManagementTeamContext';
import { getAliasName, lessPickedPlayer, mostPickedPlayer } from '../../utils/utils';
import MyTeam from '../MyTeam/MyTeam';
import TopFive from '../TopFive/TopFive';
import './MainPage.scss';

var players = null;

function MainPage() {

    const columns = [
        {
            title: 'Name',
            dataIndex: 'teamName',
            sorter: (a, b) => a.teamName.localeCompare(b.first_name),
            width: 170
        },
        {
            title: 'Description',
            dataIndex: 'description',
            sorter: (a, b) => a.description.localeCompare(b.description),
            render: (text, record, index) => descriptionRender(text, record, index)
        }
    ];

    const { teamList, setTeamList, ageAvg, setAgeAvg } = useContext(ManagementTeamContext);
    const [ mostPicked, setMostPicked] = useState([])
    const [ lessPicked, setLessPicked] = useState([])

    useEffect(() => {

        players = null;      
        extractPlayersByTeam() 
        
    }, [teamList]) 

    const extractPlayersByTeam = () => {
        players = teamList.map(e => e.players);
        var concatedPlayers = [].concat.apply([],players)
      
        setMostPicked(mostPickedPlayer(concatedPlayers))
        setLessPicked(lessPickedPlayer(concatedPlayers))
    }

    const popOverRender = (picked) => {
        return (
            <div>
                <p><b>Name: </b>{picked.name}</p>
                <p><b>Pick Rate: </b>{picked.times && picked.times !== Number.POSITIVE_INFINITY ? `${(picked.times / teamList.length * 100)}%` : null}</p>
            </div>
        )
    }

    //Render column description
    const descriptionRender = (text, record) => {
        return (
            <div className="column-description">
                <span>{text}</span>
                <div className="actions">

                    <Popconfirm
                        title="Are you sure delete this team?"
                        onConfirm={() => {handleDelete(record.index); message.success(`You removed the ${record.teamName} team`)}}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Popover title="Delete" content="Click to remove an item">
                                <DeleteFilled className="icon-action" />
                        </Popover>
                    </Popconfirm>

                    <Popover title="Share" content="Click to share an item">
                        <ShareAltOutlined className="icon-action" />
                    </Popover>

                    <Popover title="Edit" content="Click to edit an item">
                        <Link className="reset-link" to={`/edit/${record.index}`}>
                            <EditFilled className="icon-action" />
                        </Link>
                    </Popover>

                </div>
            </div>
        )
    }

    const handleDelete = (index) => {
        const dataSource = [...teamList]
        const avgDataSource = [...ageAvg]

        setTeamList(dataSource.filter((item) => item.index !== index))
        setAgeAvg(avgDataSource.filter((item) => item.index !== index))
    }

    return (
        <>        
            <div className="site-page-myteams">
                <Row justify="center">
                    <Col lg={{ span: 11 }} xs={{ span: 22 }}>

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

                    <Col lg={{ span: 11, offset: 1 }} xs={{ span: 22 }}>

                        <Card
                            title={<CardTitle title={"Top 5"} />}
                            className="radius-modify top-five-card"
                            bordered={true}>
                                <TopFive />
                        </Card>

                        <Card
                            className="radius-modify most-picked-card"
                            bordered={true}>

                            <div className="most-picked-container">
                               
                                    <div className="most-container">
                                        <span className="text-label">Most picked player</span>
                                        <Popover content={popOverRender(mostPicked)} title="Most picked player">
                                            <div className="picked mostPicked">               
                                                <span>{mostPicked ? getAliasName(mostPicked.name): null }</span>                                         
                                            </div>
                                        </Popover>    
                                    </div>
                                        
                     
                                    <div className="less-container">
                                        <span className="text-label">Less picked player</span>
                                        <Popover content={popOverRender(lessPicked)} title="Less picked player">
                                            <div className="picked lessPicked">
                                                <span>{lessPicked ? getAliasName(lessPicked.name): null}</span>
                                            </div> 
                                        </Popover> 
                                    </div>
                                      
                                                                     
                            </div>
                                                 
                        </Card>

                    </Col>
                </Row>
            </div>
        </>
    );
}

export default MainPage;