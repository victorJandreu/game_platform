import Home from "./pages/Home";
import "./styles/app.scss";
import { Route, HashRouter, Routes } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route  path={"/game/:id"} element={<Home />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
