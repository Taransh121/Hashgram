import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom";
// import {Navigate} from "react-router-dom";
import { Homepage } from "./containers/homePage/Homepage"; 
import { Login } from "./containers/loginPage/Login";
import Profilepage  from "./containers/profilePage/Profilepage";
import { useMemo } from "react";
import {useSelector} from "react-redux";
import {CssBaseline,ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import { themeSetting } from "./theme";




function App() {
  const mode=useSelector((state)=>state.mode); 
  const theme=useMemo(()=>createTheme(themeSetting(mode)),[mode]);
  // console.log(mode);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/home" element={ isAuth? <Homepage/>: <Navigate to="/"/>}></Route>
          <Route path="/profile/:userId" element={isAuth? <Profilepage/>: <Navigate to="/"/>}></Route>
        </Routes>
      </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
