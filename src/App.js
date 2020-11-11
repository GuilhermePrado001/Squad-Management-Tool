import 'antd/dist/antd.css';
import Layout from './app/Layout/Layout';
import ManagementTeamProvider from './context/ManagementTeamContext';

function App() {
  return (
    <div className="App">
      <ManagementTeamProvider>
        <Layout />
      </ManagementTeamProvider>
    </div>
  );
}

export default App;
