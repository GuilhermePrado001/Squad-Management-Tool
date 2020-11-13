import '../TopFive/TopFive.scss'
import { Card, Col, Row } from 'antd';
import InfoCard from '../../components/InfoCard/InfoCard';
import { useContext } from 'react';
import { ManagementTeamContext } from '../../context/ManagementTeamContext';
import { AvgArrayCalc } from '../../utils/utils';

function TopFive() {

    const { ageAvg } = useContext(ManagementTeamContext)

    return (
        <>
          <Row justify="center">
             <Col lg={{ span: 11, offset: 1 }} xs={{ span: 16 }}>  
                <span className="avarage-title">Highest avg age</span>
                <Card
                    className="radius-modify avarage-card"
                    bordered={true}>
                    {ageAvg.map((e,i) => (
                        <InfoCard key={i} name={e.name} avg={AvgArrayCalc(e.ageList)} />
                    ))}
                </Card>
             </Col>   
             <Col lg={{ span: 11, offset: 1 }} xs={{ span: 16 }}>
                <span className="avarage-title">Lowest avg age</span>  
                <Card
                    className="radius-modify avarage-card"
                    bordered={true}>
                    {ageAvg.map((e,i) => (
                        <InfoCard key={i} name={e.name} avg={AvgArrayCalc(e.ageList)} />
                    ))}
                </Card>
             </Col>     
          </Row>
        </>
    );
}

export default TopFive;