
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import {TOKEN_KEY} from './utils/constants'
// --------------------------------------------------------------------
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
// import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import TaskDetails from "./pages/TaskDetails";
import Tasks from "./pages/Tasks";
import Trash from "./pages/Trash";
import Users from "./pages/Users";
// import Dashboard from "./pages/dashboard";

function App() {
  return (
    <>
      {/* <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

        <Route exact path="/" element={<GuardedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="*" element={"404"} />
      </Routes> */}

{/* ------------------------------------------------------------------------------------------ */}
      <main className='w-full min-h-screen bg-[#f3f4f6] '>
      <Routes>
        {/* <Route element={<Layout />}> */}
          <Route index path='/' element={<Navigate to='/dashboard' />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/tasks' element={<Tasks />} />
          <Route path='/completed/:status' element={<Tasks />} />
          <Route path='/in-progress/:status' element={<Tasks />} />
          <Route path='/todo/:status' element={<Tasks />} />
          <Route path='/team' element={<Users />} />
          <Route path='/trashed' element={<Trash />} />
          <Route path='/task/:id' element={<TaskDetails />} />
        {/* </Route> */}

        <Route path='/log-in' element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>

      <Toaster richColors />
    </main>
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
