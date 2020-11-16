import { DeleteFilled, EditFilled, PlusOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Button, Card, Col, message, Popconfirm, Popover, Row } from 'antd';
import { useContext, useEffect } from 'react';
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

    const { teamList, setTeamList, ageAvg, setAgeAvg, allPlayer, setAllPlayer } = useContext(ManagementTeamContext);
    
    useEffect(() => {
        players = null;

        if(teamList)
            extractPlayersByTeam()

        console.log(mostPickedPlayer(allPlayer))
    }, []) 

    useEffect(() => {
        
    },[allPlayer])

    const extractPlayersByTeam = () => {
        players = teamList.map(e => e.players);
        setAllPlayer([].concat.apply([],players))
    }

    //Render column description
    const descriptionRender = (text, record) => {
        return (
            <div className="column-description">
                <span>{text}</span>
                <div className="actions">

                    <Popconfirm
                        title="Are you sure delete this task?"
                        onConfirm={() => {handleDelete(record.index); message.success(`You removed the ${record.teamName} team`)}}
                        okText="Yes"
                        cancelText="No"
                    >
                    <Popover title="Delete" content="Click to remove a item">
                            <DeleteFilled className="icon-action" />
                    </Popover>
                    </Popconfirm>

                    <ShareAltOutlined className="icon-action" />

                    <Link className="reset-link" to={"/edit"}>
                            <Link to={`/edit/${record.index}`}>
                                <EditFilled className="icon-action" />
                            </Link>
                    </Link>

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

                            <div className="most-picked-container">
                               
                                        {mostPickedPlayer(allPlayer) ?

                                            <div className="picked mostPicked">               
                                                <span>{getAliasName(mostPickedPlayer(allPlayer)) }</span>                                         
                                            </div>
                                      
                                        : null}
                                        
                                        {lessPickedPlayer(allPlayer) ?
                                            
                                            <div className="picked lessPicked">
                                                <span>{getAliasName(lessPickedPlayer(allPlayer))}</span>
                                            </div> 
                                        
                                        : null}
                                                                     
                            </div>
                                                 
                        </Card>

                    </Col>
                </Row>
            </div>
        </>
    );
}

export default MainPage;