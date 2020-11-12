import { Button, Col, Empty, Form, Input, Radio, Row, Select, Spin } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useState } from 'react';
import { GetLineUp } from '../../services/Repository/Football';
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

function FormComponent() {

    const [form] = Form.useForm();

    const [playerList, setPlayerList] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchHandler = async (e) => {

        e.preventDefault();
        
        setPlayerList([]);

        if(e.target.value === "")
            return;

        setLoading(true)
        const data = await GetLineUp(e.target.value)
        setLoading(false)

        setPlayerList([data]);
    }

    const onFinish = values => {
        console.log(values);
    };

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
                            name="team-name"
                            className="label-teams" 
                            label="Team Name" 
                            rules={[
                                {
                                  required: true,
                                  message: 'Please input your team name!',
                                },
                              ]}
                        >
                            <Input placeholder="Insert team name" name="team-name" />
                        </Form.Item>

               
                        <Form.Item name="teste" label="Description" className="label-teams"  >
                            <TextArea name="teste" rows={6} />
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
                                                  
                            <Select>
                                {formations.map((value, i) => {
                                    return <Select.Option key={i} value={value}>{value}</Select.Option>
                                })}                                   
                            </Select>
                            
                        </Form.Item>

                        <div className="escalation-squad">

                        </div>

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
                                        <PlayerCard key={i} name={e.player_name} age={e.age} nacionality={e.nationality} />
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