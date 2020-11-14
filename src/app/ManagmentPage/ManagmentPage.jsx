import { Card } from 'antd';
import React from 'react';
import '../ManagmentPage/ManagmentPage.scss';
import FormComponent from '../../components/Form/Form'

function ManagmentPage({ title }) {
    
    return (
        <>
            <Card className="create-card" title={title}>

                <FormComponent />

            </Card>
        </>
    );
}

export default ManagmentPage;