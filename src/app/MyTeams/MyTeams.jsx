import { Button, Card, Col, Row } from 'antd';
import '../MyTeams/MyTeams.css'

function MyTeams() {

    return (
        <>
            <div className="site-page-myteams">
                <Row justify="center">
                    <Col lg={{span:10}} xs={{span:16}}>
                        <Card 
                            title="My Team" 
                            className="radius-modify teams-card"
                            bordered={true}
                            extra={<Button>More</Button>}>
                                Card content
                         </Card>
                    </Col>
                    <Col lg={{span:10, offset:1}} xs={{span:16}}>
                        <Card 
                            title="teste" 
                            className="radius-modify top-five-card" 
                            bordered={true}
                            extra={<Button>More</Button>}>
                            Card content
                        </Card>
                    </Col>
                    <Col lg={{span:10, offset:11}} xs={{span:16}}>
                        <Card 
                            title="teste" 
                            className="radius-modify most-picked" 
                            bordered={true}
                            extra={<Button>More</Button>}>
                            Card content
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default MyTeams;