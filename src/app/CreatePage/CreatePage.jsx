import { Card, Col, Row, Radio } from 'antd'
import '../CreatePage/CreatePage.scss'
import { Form, Input } from 'antd';
import React from 'react';
import TextArea from 'antd/lib/input/TextArea';

function CreatePage({ title }) {

    const [form] = Form.useForm();

    return (
        <>
            <Card title={title}>
                <Form 
                    form={form}
                    layout="vertical"
                >
                    <span className="session-title">TEAM INFORMATION</span>
                   <Row justify="center">

                     

                        <Col lg={{ span: 8 }} xs={{ span: 16 }}>
                            <Form.Item label="Team Name">
                                <Input placeholder="input placeholder" />
                            </Form.Item>

                            <span>Description</span>
                            <TextArea/>
                        </Col>

                        <Col lg={{ span: 8, offset: 1 }} xs={{ span: 16 }}>
                            <Form.Item label="Team Website">
                                <Input placeholder="input placeholder" />
                            </Form.Item>

                            <Form.Item
                                label="Radio.Button"
                            >
                                <Radio.Group>
                                    <Radio value="Real">Real</Radio>
                                    <Radio value="Fantasy">Fantasy</Radio>
                                </Radio.Group>
                            </Form.Item>

                        </Col>
                    </Row>  
                 
                </Form>
            </Card>
        </>
    );
}

export default CreatePage;