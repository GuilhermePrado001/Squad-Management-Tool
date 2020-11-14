import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Empty, Form, Input, Radio, Row, Select, Spin } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ManagementTeamContext } from '../../context/ManagementTeamContext';
import { GetLineUp } from '../../services/Repository/Football';
import { GetAliasName } from '../../utils/utils';
import '../Form/Form.scss';
import PlayerCard from '../PlayerCard/PlayerCard';

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

const FormComponent = () => {

    const [form] = Form.useForm();

    let history = useHistory();
    const [playerList, setPlayerList] = useState([]);
    const [escalationList, setEscalationList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formation, setFormation] = useState([]);

    const { teamList, setTeamList, ageAvg, setAgeAvg } = useContext(ManagementTeamContext);

    useEffect(() => {
        ageList = [];
    }, [])

    const searchHandler = async (e) => {

        e.preventDefault();

        setPlayerList([]);

        if (e.target.value === "")
            return;

        setLoading(true)
        const data = await GetLineUp(e.target.value)
        setLoading(false)

        setPlayerList([data]);
    }

    const editFlow = (url, values) => {
        var index = url.pathname.split('/')[2];
            
        var arrayCopy = [...teamList];

        //Still with the same index
        values.index = index;

        var newAgeList = ageAvg.filter((item) => item.name !== arrayCopy[index].teamName)
        
        arrayCopy[index] = values;
        
        setAgeAvg([...newAgeList, { name: values.teamName, ageList: ageList }])
        setTeamList(arrayCopy);
    }

    const onFinish = values => {

        if (!values.players)
            values.players = escalationList

        var url = new URL(window.location.href);

         if(url.pathname.includes('/edit')){

            editFlow(url, values)

            history.push("/");
            return;
         }

        //This index is independent of the ordering, it's necessary for edit 
        values.index = teamList.length

        setAgeAvg([...ageAvg, { name: values.teamName, ageList: ageList }])
        setTeamList([...teamList, values])

        history.push("/");
    };

    const onFinishFailed = values => {
        form.scrollToField(values.errorFields[0].name);
    }

    const allowDrop = (ev) => {
        ev.preventDefault();
    }

    const drop = (ev) => {
        ev.preventDefault();

        var data = JSON.parse(ev.dataTransfer.getData("text"));

        if (!data)
            return;

        ageList.push(data.age);
        setEscalationList([...escalationList, data])

        document.getElementById(data.currentId).style.display = "none";

        ev.target.firstChild.innerText = GetAliasName(data.player_name);
    }

    const formationHandler = (e) => {

        // setEscalationList([]);

        var formationInfo = e.trim().split('-')
        var lineUp = [];

        formationInfo.map((e, i) => {
            lineUp.push(makeFormation(e, i));
        })

        setFormation(lineUp);
    }

    const makeFormation = (playerByPosition, i) => {
        let lineUp = [];

        for (let index = 0; index < playerByPosition; index++) {
            lineUp.push(
                <div onDrop={(e) => drop(e)} onDragOver={(e) => allowDrop(e)} className={`line-${index}`}>
                    <span></span>
                </div>
            )
        }

        return { key: i, value: lineUp };
    }

    return (
        <>
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
                            <TextArea name="description" rows={6} />
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
                    </Col>
                </Row>

                <Row justify="center">
                    <span className="form-session-conf label-teams">CONFIGURE SQUAD</span>
                </Row>

                <Row justify="center">
                    <Col lg={{ span: 8 }} xs={{ span: 16 }}>

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
                            <div className="lineUp">
                                {
                                    formation.length > 0 ?
                                        formation[0].value.map((e, i) => {
                                            return (
                                                <div onDrop={(e) => drop(e)} onDragOver={(e) => allowDrop(e)} className={`line line-one`}>
                                                    <span><PlusOutlined /></span>
                                                </div>
                                            )
                                        }) : null
                                }
                            </div>

                            <div className="lineUp">
                                {
                                    formation.length > 0 ?
                                        formation[1].value.map((e, i) => {
                                            return (
                                                <div onDrop={(e) => drop(e)} onDragOver={(e) => allowDrop(e)} className={`line line-two`}>
                                                    <span><PlusOutlined /></span>
                                                </div>
                                            )
                                        }) : null
                                }
                            </div>

                            <div className="lineUp">
                                {
                                    formation.length > 0 ?
                                        formation[2].value.map((e, i) => {
                                            return (
                                                <div onDrop={(e) => drop(e)} onDragOver={(e) => allowDrop(e)} className={`line line-three`}>
                                                    <span><PlusOutlined /></span>
                                                </div>
                                            )
                                        }) : null
                                }
                            </div>

                            <div className="lineUp">
                                {
                                    formation.length == 4 ?
                                        formation[3].value.map((e, i) => {
                                            return (
                                                <div onDrop={(e) => drop(e)} onDragOver={(e) => allowDrop(e)} className={`line line-four`}>
                                                    <span><PlusOutlined /></span>
                                                </div>
                                            )
                                        }) : null
                                }
                            </div>

                        </div>

                        <Form.Item>
                            <Button className="submit-button" type="primary" htmlType="submit">
                                Save
                            </Button>
                        </Form.Item>
                    </Col>

                    <Col lg={{ span: 8, offset: 1 }} xs={{ span: 16 }}>

                        <Form.Item className="label-teams" label="Search Players">
                            <Input onPressEnter={searchHandler} placeholder="input placeholder" />
                        </Form.Item>

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
                </Row>
            </Form>
        </>
    );
}

export default FormComponent;