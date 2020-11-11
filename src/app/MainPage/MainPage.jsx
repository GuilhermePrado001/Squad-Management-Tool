import { Button, Card, Col, Row } from 'antd';
import CardTitle from '../../components/CardTitle/CardTitle';
import MyTeam from '../MyTeam/MyTeam';
import './MainPage.scss'

function MainPage() {

    return (
        <>
            <div className="site-page-myteams">
                <Row justify="center">
                    <Col lg={{ span: 11 }} xs={{ span: 16 }}>
                        <Card
                            title={<CardTitle title={"My Team"} />}
                            className="radius-modify teams-card"
                            bordered={true}
                            extra={<Button>More</Button>}>
                                <MyTeam />
                         </Card>
                    </Col>
                    <Col lg={{ span: 11, offset: 1 }} xs={{ span: 16 }}>
                        <Card
                            title={<CardTitle title={"Top 5"} />}
                            className="radius-modify top-five-card"
                            bordered={true}
                            extra={<Button>More</Button>}>
                            Card content
                        </Card>

                        <Card
                            className="radius-modify most-picked"
                            bordered={true}
                        >
                            Card content
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default MainPage;