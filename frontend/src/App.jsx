import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ModalContainer from "./components/ModalContainer";
import useModalStore from "./store/modal";
import Login from "./pages/Login";

import { isAuthenticated } from "./utils/auth";
import Main from "./pages/Main";
import Initializer from "./pages/Initializer";
import Viewer from "./pages/Viewer";
import UpdateHistory from "./pages/UpdateHistory";
import { useProjectStore, useUserStore } from "./store";
import Invite from "./pages/Invite";

function RequireAuthRoutes() {
  const location = useLocation();
  const loggedIn = isAuthenticated();
  const { getProfileFromToken, user } = useUserStore();
  const { project, setProject } = useProjectStore();

  if (location.pathname === "/") {
    if (project) setProject(null);
  }

  if (!loggedIn)
    return <Navigate to="/main" replace state={{ from: location }} />;

  if (!user) getProfileFromToken();

  return <Outlet />;
}

function App() {
  const { isOpen, title, children } = useModalStore();

  return (
    <BrowserRouter>
      <Header />
      <main className="flex w-full grow flex-row">
        <Sidebar />
        <div className="h-full grow overflow-hidden">
          <Routes>
            <Route path="/login/google" element={<Login />} />
            <Route path="/main" element={<Main />} />
            <Route element={<RequireAuthRoutes />}>
              <Route path="/" element={<Home />} />
              <Route path="/intializer" element={<Initializer />} />
              <Route path="/project/:projectId" element={<Viewer />} />
              <Route path="/update-history" element={<UpdateHistory />} />
              <Route path="/invite" element={<Invite />} />
            </Route>
            <Route path="/*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
      {isOpen && <ModalContainer title={title}>{children}</ModalContainer>}
    </BrowserRouter>
  );
}

export default App;
