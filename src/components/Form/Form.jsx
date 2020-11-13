import { Button, Col, Empty, Form, Input, Radio, Row, Select, Spin } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ManagementTeamContext } from '../../context/ManagementTeamContext';
import { GetLineUp } from '../../services/Repository/Football';
import '../Form/Form.scss';
import PlayerCard from '../PlayerCard/PlayerCard';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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

function FormComponent() {

    const [form] = Form.useForm();

    let history = useHistory();
    const [playerList, setPlayerList] = useState([]);
    const [loading, setLoading] = useState(false);

    const { teamList, setTeamList } = useContext(ManagementTeamContext);

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

    const onFinish = values => {
        console.log(values)
        setTeamList([...teamList, values])

        history.push("/");
    };


    const handleOnDragEnd  = (result) =>{
        console.log(result)
    }

    return (
        <>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
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
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="players">
                            {(provided) => (
                                <>
                                    <Col lg={{ span: 8 }} xs={{ span: 16 }}>

                                        <Form.Item
                                            className="label-teams"
                                            label="Formation"
                                            name="formation"
                                            rules={[{ required: true, message: 'Please select your team roster!' }]}
                                        >

                                            <Select>
                                                {formations.map((value, i) => {
                                                    return <Select.Option key={i} value={value}>{value}</Select.Option>
                                                })}
                                            </Select>

                                        </Form.Item>

                                        //PRECISO COLCOAR JOGADORES AQUI            
                                        <ul className="escalation-squad" {...provided.droppableProps} ref={provided.innerRef}>
                                          {provided.placeholder}      
                                        </ul>
                                        //PRECISO E AQUI
                                        <ul className="escalation-squad" {...provided.droppableProps} ref={provided.innerRef}>
                                          {provided.placeholder}      
                                        </ul>

                                        <Form.Item>
                                            <Button type="primary" htmlType="submit">
                                                Submit
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
                                                            <Draggable key={e.player_name} draggableId={e.player_name} index={i}>
                                                                {(provided) => (
                                                                    <PlayerCard innerRef={provided.innerRef} provided={provided} name={e.player_name} age={e.age} nacionality={e.nationality} />
                                                                )}
                                                            </Draggable>
                                                        )
                                                    })
                                                    :
                                                    !loading ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> : <Spin className="spin-loadin" spinning={loading} delay={500}></Spin>
                                            }
                                        </div>

                                    </Col>
                                </>
                            )}
                        </Droppable>
                    </DragDropContext>
                </Row>
            </Form>
        </>
    );
}

export default FormComponent;