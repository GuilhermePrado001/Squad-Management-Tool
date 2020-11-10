import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import MyTeams from '../MyTeams/MyTeams';


function Layout() {

    return (
        <>
            <Header 
                logo={'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4'}
                title="Squad Management"
            />               
                <BrowserRouter>
                    <Switch>
                        <Route
                            path="/"
                            render={() => <MyTeams />}
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