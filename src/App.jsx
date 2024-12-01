import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

const App = () => {

  const routeConfig = [
    { path: "/doctor", element: <Home /> }, // trang chu
    { path: "/login-doctor", element: <Login /> }, 
     
  ];
  return (
    <>
      <Routes>
        {routeConfig.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </>
  )
}

export default App;