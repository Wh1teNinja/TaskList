import React, { useState, useEffect } from "react";
import "./App.css";
import themes from "../themes.json";
import ThemeContext from "../ThemeContext";
import ModulesContext from "../ModulesContext";
import TaskList from "./TaskList";
import SettingsBar from "./SettingsBar";

function App() {
  //==========================< Hooks >=============================
  // Hooks to get, set and save theme option
  const [theme, setTheme] = useState(
    JSON.parse(window.localStorage.getItem("theme")) || themes.classic
  );
  useEffect(() => {
    window.localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  // Hooks to get set and save modules parameters
  const [params, setParams] = useState(
    JSON.parse(window.localStorage.getItem("params")) || {
      taskTime: {
        enabled: false,
        multitasking: {
          enabled: false,
        },
      },
    }
  );
  useEffect(() => {
    window.localStorage.setItem("params", JSON.stringify(params));
  }, [params]);
  //================================================================

  //=========================< Functions >==========================
  // Theme change function
  const changeTheme = (themeTitle) => {
    if (themes[themeTitle] !== theme) setTheme(themes[themeTitle]);
  };

  // fix this and check if it changes everything or only what passed
  const changeTimerParams = (newValues) => {
    setParams(newValues);
  };

  //=================================================================

  return (
    <ModulesContext.Provider value={{ params, changeParams: changeTimerParams }}>
      <ThemeContext.Provider value={{ theme, changeTheme }}>
        <div id='app' style={{ backgroundColor: theme.background }}>
          <SettingsBar />
          <TaskList />
        </div>
      </ThemeContext.Provider>
    </ModulesContext.Provider>
  );
}

export default App;
