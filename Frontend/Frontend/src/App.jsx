import { Routes, Route,  Outlet,
  Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
// import "./App.css";
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
  // console.log(localStorage.getItem(TOKEN_KEY), "----")
  return auth ? <GeneralRoutes /> : <Navigate to="/login" />;
};

function GeneralRoutes() {
  // var observer = new IntersectionObserver()
  // console.log(observer,"==== observer===");
  return (
    <div>
      {/* <Box className="app-Bgcolor" sx={{ m: -1 }}> */}
        {/* <Appbar />
        <Card
          className="bgColor"
          sx={{
            m: { xs: 1, sm: 1 },
            mx: { md: 10, xl: 10 },
            p: { md: 10, xl: 6, xs: 3, sm: 4 },
            borderRadius: 3,
            minHeight: {
              md: "calc(100vh - 181px)",
              xs: "calc(100vh - 0px)",
              sm: "calc(100vh - 0px)",
            },
            position: "relative",
            overflow: "visible",
          }}
        > */}
          <Outlet />
        {/* </Card>
      </Box> */}
    </div>
  );
}

export default App;
