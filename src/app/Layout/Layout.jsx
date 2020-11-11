import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import MainPage from '../MainPage/MainPage';
import venturusIcon from '../../assets/img/venturus_logo_header.png'


function Layout() {

    return (
        <>
            <Header 
                logo={venturusIcon}
                title="Squad Management Tool"
            />               
                <BrowserRouter>
                    <Switch>
                        <Route
                            path="/"
                            render={() => <MainPage />}
                            exact
                        />
                        <Route
                            path="/edit"
                            render={() => <h1>passou 2</h1>}
                            exact
                        />
                    </Switch>
                </BrowserRouter>
            <Footer />
        </>
    );
}

export default Layout;