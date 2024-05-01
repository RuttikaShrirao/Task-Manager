import { Routes, Route,  Outlet,
  Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import {TOKEN_KEY} from './utils/constants'

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

        <Route exact path="/" element={<GuardedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="*" element={"404"} />
      </Routes>
    </>
  );
}

const GuardedRoute = () => {

  const auth = localStorage.getItem(TOKEN_KEY);

  return auth ? <GeneralRoutes /> : <Navigate to="/login" />;
};

function GeneralRoutes() {

  return (
    <div>
          <Outlet />

    </div>
  );
}

export default App;
