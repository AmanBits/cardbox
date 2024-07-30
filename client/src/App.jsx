import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import DashboardLeftBox from './components/DashboardLeftBox';
import DashboardMiddleBox from './components/DashboardMiddleBox';
import DashboardRightBox from './components/DashboardRightBox';
import CardBox from './components/CardBox';
import Header from './components/Header';
import CardBody from './components/CardBody';
import Preview from './components/Preview';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the special component */}
        <Route path="/cardbox/preview/:link" element={<Preview />} />

        {/* Route for the general layout */}
        <Route
          path="*"
          element={
            <Dashboard>
              <DashboardLeftBox />
              <DashboardMiddleBox>
                <CardBox>
                  <Header />
                  <CardBody />
                  <Footer />
                </CardBox>
              </DashboardMiddleBox>
              <DashboardRightBox />
            </Dashboard>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
