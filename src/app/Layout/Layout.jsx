import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import MainPage from '../MainPage/MainPage';
import venturusIcon from '../../assets/img/venturus_logo_header.png'
import ManagmentPage from '../ManagmentPage/ManagmentPage';
import CardTitle from '../../components/CardTitle/CardTitle';
import '../Layout/Layout.scss'

function Layout() {

    return (
        <>
            <BrowserRouter>
                <Header 
                    logo={venturusIcon}
                    title="Squad Management Tool"
                />
                <div className="content">              
            
                        <Switch>
                            <Route
                                path="/"
                                render={() => <MainPage />}
                                exact
                            />
                            <Route
                                path="/create"
                                render={() => <ManagmentPage title={<CardTitle title="Create Team"/>} />}
                                exact
                            />
                            <Route
                                path="/edit/:index"
                                render={() => <ManagmentPage title={<CardTitle title="Edit your Team"/>} />}
                                exact
                            />
                        </Switch>
                        </div> 
                <Footer />
            </BrowserRouter>
        </>
    );
}

export default Layout;