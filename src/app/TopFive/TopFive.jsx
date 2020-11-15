import '../TopFive/TopFive.scss'
import { Card, Col, Row, Empty } from 'antd';
import InfoCard from '../../components/InfoCard/InfoCard';
import { useContext, useEffect, useState } from 'react';
import { ManagementTeamContext } from '../../context/ManagementTeamContext';
import { AvgArrayCalc, SortFunc } from '../../utils/utils';

function TopFive() {

    const { ageAvg } = useContext(ManagementTeamContext)
    const [ sortedList , setSortedList ] = useState([])

    useEffect(() => {
        var calc = [];

        ageAvg.map(e => {
            var result = AvgArrayCalc(e.ageList);
            calc.push({ name: e.name, ageAvg: result })
        })

        setSortedList(calc.sort(SortFunc));

    }, [ageAvg])

    return (
        <>
            <Row justify="center">
                <Col lg={{ span: 11, offset: 1 }} xs={{ span: 16 }}>
                    
                    <span className="avarage-title">Highest avg age</span>
                    {sortedList.length > 0 ? (
                        <Card
                            className="radius-modify avarage-card"
                            bordered={true}>
                            {sortedList.slice(0,5).map((e, i) => (
                                <InfoCard key={i} name={e.name} avg={e.ageAvg} />
                            ))}
                        </Card>) :
                        (<Card>
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        </Card>)
                    }

                </Col>
                <Col lg={{ span: 11, offset: 1 }} xs={{ span: 16 }}>

                    <span className="avarage-title">Lowest avg age</span>
                    {sortedList.length > 0 ? (
                        <Card
                            className="radius-modify avarage-card"
                            bordered={true}>
                            {sortedList.slice(5,10).map((e, i) => (
                                <InfoCard key={i} name={e.name} avg={e.ageAvg} />
                            ))}
                        </Card>) :
                        (<Card>
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        </Card>)
                    }
                    
                </Col>
            </Row>
        </>
    );
}

export default TopFive;