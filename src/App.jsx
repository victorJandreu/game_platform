import Home from "./pages/Home";
import "./styles/app.scss";
import { Route, BrowserRouter, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter basename="game_platform/">
      
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route basename="game_platform/" path={"/game/:id"} element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
