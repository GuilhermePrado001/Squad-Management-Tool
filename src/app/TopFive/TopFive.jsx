import '../TopFive/TopFive.scss'
import { Card, Col, Row } from 'antd';
import InfoCard from '../../components/InfoCard/InfoCard';

function TopFive() {

    const teams = [
        {
            name: "Milan",
            avg:"26"
        },
        {
            name: "Barça",
            avg:"26"
        },
        {
            name: "Real",
            avg:"26"
        },
        {
            name: "Inter",
            avg:"26"
        },
        {
            name: "Guarani",
            avg:"26"
        }
    ]

    return (
        <>
          <Row justify="center">
             <Col lg={{ span: 11, offset: 1 }} xs={{ span: 16 }}>  
                <span className="avarage-title">Highest avg age</span>
                <Card
                    className="radius-modify avarage-card"
                    bordered={true}>
                    {teams.map((e,i) => (
                        <InfoCard key={i} name={e.name} avg={e.avg} />
                    ))}
                </Card>
             </Col>   
             <Col lg={{ span: 11, offset: 1 }} xs={{ span: 16 }}>
                <span className="avarage-title">Lowest avg age</span>  
                <Card
                    className="radius-modify avarage-card"
                    bordered={true}>
                    {teams.map((e,i) => (
                        <InfoCard key={i} name={e.name} avg={e.avg} />
                    ))}
                </Card>
             </Col>     
          </Row>
        </>
    );
}

export default TopFive;