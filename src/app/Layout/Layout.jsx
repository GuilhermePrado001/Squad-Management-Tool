import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import MainPage from '../MainPage/MainPage';
import venturusIcon from '../../assets/img/venturus_logo_header.png'
import CreatePage from '../CreatePage/CreatePage';
import CardTitle from '../../components/CardTitle/CardTitle';


function Layout() {

    return (
        <>
            <BrowserRouter>
                <Header 
                    logo={venturusIcon}
                    title="Squad Management Tool"
                />               
            
                        <Switch>
                            <Route
                                path="/"
                                render={() => <MainPage />}
                                exact
                            />
                            <Route
                                path="/create"
                                render={() => <CreatePage title={<CardTitle title="Create Team"/>} />}
                                exact
                            />
                        </Switch>
                <Footer />
            </BrowserRouter>
        </>
    );
}

export default Layout;