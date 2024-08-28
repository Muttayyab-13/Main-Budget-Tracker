import "./App.css";
import SignUp from "./Pages/SignUp/SignUp.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Pages/SignIn/SignIn.js";
import Main from "./Pages/LandingPage/MainPage.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={SignUp} />
          <Route path="/SignIn" Component={SignIn} />
          <Route path="/MainPage" Component={Main} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
