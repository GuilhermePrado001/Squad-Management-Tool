import { Card } from 'antd';
import React from 'react';
import '../CreatePage/CreatePage.scss';
import FormComponent from '../../components/Form/Form'

function CreatePage({ title }) {
    
    return (
        <>
            <Card className="create-card" title={title}>

                <FormComponent />

            </Card>
        </>
    );
}

export default CreatePage;