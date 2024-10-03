import { BrowserRouter, Navigate, Routes, Route, HashRouter } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Redirect from "components/Redirect";
import { useEffect } from "react";
import { setLogin } from "state";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  // useSelector에서 갖고오는 토큰이 없으면 Boolean
  const isAuth = Boolean(useSelector((state) => state.token));

  
  console.log(setLogin)
  
  return (
    <div className="app">
      <HashRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route exact path="/" 
              element={isAuth ? <HomePage /> : <LoginPage />} 
            />
            <Route exact
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route exact
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route exact path="/redirect/:userId" element={<Redirect />}/>
          </Routes>
        </ThemeProvider>
      </HashRouter>
    </div>
  );
}

export default App;

//comment
