import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Empty, Form, Input, Radio, Row, Select, Spin } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ManagementTeamContext } from '../../context/ManagementTeamContext';
import { GetLineUp } from '../../services/Repository/Football';
import { getAliasName } from '../../utils/utils';
import '../Form/Form.scss';
import PlayerCard from '../PlayerCard/PlayerCard';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css'
import { debounce, throttle } from 'lodash';

const formations = [
    "3 - 2 - 2 - 3",
    "3 - 2 - 3 - 1",
    "3 - 4 - 3",
    "3 - 5 - 2",
    "4 - 2 - 3 - 1",
    "4 - 3 - 1 - 1",
    "4 - 3 - 2",
    "4 - 4 - 2",
    "4 - 5 - 1",
    "5 - 4 - 1",
]

var ageList = [];
var teamData = null;
var index = null;

const FormComponent = () => {

    const [form] = Form.useForm();
    let history = useHistory();

    //store player list after the api result is done
    const [playerList, setPlayerList] = useState([]);

    //store all selected player
    const [escalationList, setEscalationList] = useState([]);

    //start the load when start search for players
    const [loading, setLoading] = useState(false);

    //store formation for update when formation is changed
    const [formation, setFormation] = useState([]);

    //clean formation on values change
    const [cleanFormation, setCleanFormation] = useState(true);

    //Control error msg for escalation validate
    const [formationIsInvalid, setFormationIsInvalid] = useState(null)

    //Store tags
    const [tags , setTags] = useState([]);

    const { teamList, setTeamList, ageAvg, setAgeAvg } = useContext(ManagementTeamContext);

    useEffect(() => {
        ageList = [];
        teamData = null;
        index = null;

        var url = new URL(window.location.href);

        //When user click in edit/config team we pre load team informations
        LoadInformation(url);
       
    }, [])

    //Start api for search players
    const searchHandler = debounce(async (e) => {

        e.preventDefault();

        setPlayerList([]);

        if (e.target.value === "")
            return;

        setLoading(true)

        const data = await GetLineUp(e.target.value)

        setLoading(false)

        setPlayerList([data]);
    },1000)

    //Made edit flow if url has 'edit or config' path
    const editFlow = (values) => {

        var arrayCopy = [...teamList];

        //Still with the same index
        values.index = index;

        //Remove the old values in case that escalation players is changed
        var newAgeList = ageAvg.filter((item) => item.index !== arrayCopy[index].index)

        arrayCopy[index] = values;

        //Add new values
        setAgeAvg([...newAgeList, { index: values.index ,name: values.teamName, ageList: ageList }])
        setTeamList(arrayCopy);
    }

    //Config flow is used when user click in a top five team
    const LoadInformation = (url) => {

        if(!url.pathname.includes('/config') && !url.pathname.includes('/edit'))
            return;
          
        index = url.pathname.split('/')[2];
      
        teamData = teamList.map(e => {     
            if(e.index == index)       
                return e;           
        })
 
        form.setFieldsValue(teamData[index]);

        setFormation(teamData[index].formation.trim().split('-')) 
        setEscalationList(teamData[index].players)
        setTags(teamData[index].tags)

        //Put the player on the escalation
        setTimeout(() => {
            document.querySelectorAll('.line').forEach((e,i) => {
                e.firstChild.innerText = getAliasName(teamData[index].players[i].player_name)
                ageList.push(teamData[index].players[i].age)
            })
        },100)
            
    }

    //Validate if all position of escalation has a player
    const isInvalidFormation = (escalation) => {
        let formQntd = formation.reduce((a,b) => +a + +b, 0); 

        if(escalation.length < formQntd)
            return true;
        else
            return false
    }

    //Submit form
    const onFinish = values => {
  
        values.players = escalationList
        values.tags = tags;

        //Validate if escalation has players
        if(isInvalidFormation(values.players))
            return setFormationIsInvalid(true);
        else
            setFormationIsInvalid(false);
                        
        var url = new URL(window.location.href);

        //if user edit or config team we needed update your informations
        if (url.pathname.includes('/edit') || url.pathname.includes('/config')) {

            editFlow(values)

            history.push("/");
            return;
        }

        //This index is independent of the ordering, it's necessary for edit 
        values.index = teamList.length

        setAgeAvg([...ageAvg, { index: values.index ,name: values.teamName, ageList: ageList }])
        setTeamList([...teamList, values])

        history.push("/");
    };

    //Scroll to error
    const onFinishFailed = values => {
        form.scrollToField(values.errorFields[0].name);
    }

    //Prevent default comportament of browser when drag and drop is using, this comportament try open a file
    const allowDrop = (ev) => {
        ev.preventDefault();
    }

    //event for droped field
    const drop = (ev) => {
        ev.preventDefault();

        var data = JSON.parse(ev.dataTransfer.getData("text"));

        if (!data)
            return;

        ageList.push(data.age);
        setEscalationList([...escalationList, data])

        document.getElementById(data.currentId).style.display = "none";

        if(ev.target.tagName === 'svg')
            ev.target.parentNode.parentNode.innerText = getAliasName(data.player_name);
        else if (ev.target.tagName === 'path')
            ev.target.parentNode.parentNode.parentNode.innerText = getAliasName(data.player_name);
        else if (ev.target.tagName === 'SPAN')
            ev.target.innerText = getAliasName(data.player_name);
        else
            ev.target.firstChild.innerText = getAliasName(data.player_name);
    }

    //On formation is changed
    const formationHandler = (e) => {

        ageList = [];         
        setEscalationList([])
        setCleanFormation(false)

        var formationInfo = e.trim().split('-')
        setFormation(formationInfo);

        setTimeout(() => {
            setCleanFormation(true)
        })
    }

    //Render escaliton lines
    const renderEscalation = (lines, ref = "") =>{

        if(!lines) return;

        return(
            <>
                {
                    [...Array(lines)].map((e,i) => {
                        return (
                            <div key={i} onDrop={(ev) => drop(ev)} onDragOver={(ev) => allowDrop(ev)} className={`line line-${ref}`}>
                                <span><PlusOutlined /></span>
                            </div>
                        )
                    })
                }
            </>
        )
    }

    //Control tags states
    const handleTagChange = (tags) => {
        setTags(tags)
    }

    return (
        <>
        <Button onClick={() => {console.log(escalationList)}}>teste</Button>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row justify="center">

                    <span className="form-session-team label-teams">TEAM INFORMATION</span>

                </Row>
                
                <Row justify="center">

                    <Col lg={{ span: 8 }} xs={{ span: 16 }}>
                        <Form.Item
                            name="teamName"
                            className="label-teams"
                            label="Team Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your team name!',
                                },
                            ]}                          
                        >
                            <Input placeholder="Insert team name" name="teamName" />
                        </Form.Item>


                        <Form.Item name="description" label="Description" className="label-teams"  >
                            <TextArea name="description" rows={7}  />
                        </Form.Item>
                    </Col>

                    <Col lg={{ span: 8, offset: 1 }} xs={{ span: 16 }}>

                        <Form.Item
                            className="label-teams"
                            label="Team Website"
                            name="website"
                            
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Website!',
                                },
                                {
                                    type: "url",
                                    message: "This field must be a valid url."
                                }
                            ]}
                        >
                            <Input placeholder="http://myteam.com" name="website" />
                        </Form.Item>

                        <Form.Item
                            className="label-teams"
                            label="Team Type"
                            name="team-type"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please choose your team type!',
                                },
                            ]}
                        >
                            <Radio.Group name="team-type">
                                <Radio value="Real">Real</Radio>
                                <Radio value="Fantasy">Fantasy</Radio>
                            </Radio.Group>
                        </Form.Item>

                        {<TagsInput value={tags} onChange={handleTagChange} addKeys={[191,13]} />}

                    </Col>

                </Row>

                <Row justify="center">

                    <span className="form-session-conf label-teams">CONFIGURE SQUAD</span>

                </Row>

                <Row justify="center">
                    <div className="custom-wrapper">

                        <Col lg={{ span: 8 }} >

                            <Form.Item
                                className="label-teams"
                                label="Formation"
                                name="formation"
                                rules={[{ required: true, message: 'Please select your team roster!' }]}
                            >

                                <Select onChange={(e) => { formationHandler(e) }}>
                                    {formations.map((value, i) => {
                                        return <Select.Option key={i} value={value}>{value}</Select.Option>
                                    })}
                                </Select>

                            </Form.Item>

                            <div className="escalation-squad">

                                {cleanFormation && formation.length > 0 ?
                                    <>
                                        <div className="lineUp">
                                            {
                                                renderEscalation(+formation[0],"one")
                                            }
                                        </div>

                                        <div className="lineUp">
                                            {
                                                renderEscalation(+formation[1],"two")
                                            }
                                        </div>

                                        <div className="lineUp">
                                            {
                                                renderEscalation(+formation[2],"three")
                                            }
                                        </div>

                                        {formation.length === 4 ?
                                            <div className="lineUp">
                                                {
                                                    renderEscalation(+formation[3],"four")
                                                }
                                            </div> 
                                        : null}
                                    </>
                                    : null} 
                            </div>
                            { formationIsInvalid ? <div className="my-custom-validate ant-form-item-explain ant-form-item-explain-error">
                                <div role="alert">Please complete your escalation!</div>
                            </div> : null}

                            <Form.Item>
                                <Button className="submit-button" type="primary" htmlType="submit">
                                    Save
                                </Button>
                            </Form.Item>
                        </Col>

                        <Col lg={{ span: 8, offset: 1 }}>

                            <Form.Item className="label-teams" label="Search Players">
                                <Input onChange={searchHandler} placeholder="Type for search a player" />

                                {playerList.length > 0 && playerList[0].api.error ? 
                                (<div className="my-custom-validate ant-form-item-explain ant-form-item-explain-error">
                                        <div role="alert">{playerList[0].api.error}</div>
                                </div>) : null}

                            </Form.Item>
                             {console.log(playerList)}       
                            <div className="squad">
                                {
                                    playerList.length > 0 && playerList[0].api.results !== 0 ?
                                        playerList[0].api.players.map((e, i) => {
                                            return (
                                                <PlayerCard
                                                    key={i}
                                                    name={e.player_name}
                                                    age={e.age}
                                                    nacionality={e.nationality}
                                                    id={`player-${i}`}
                                                    draggable="true"
                                                    playerData={e}
                                                    index={i}
                                                />
                                            )
                                        })
                                        :
                                        !loading ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> : <Spin className="spin-loadin" spinning={loading} delay={500}></Spin>
                                }
                            </div>
                           
                        </Col>

                    </div>
                </Row>
           
            </Form>
        </>
    );
}

export default FormComponent;