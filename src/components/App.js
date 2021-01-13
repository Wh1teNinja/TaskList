import { useState, useEffect } from "react";
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
    JSON.parse(window.localStorage.getItem("theme")) || themes.pink
  );
  useEffect(() => {
    window.localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  // Hooks to get set and save modules parameters
  const [ModulesParams, setModulesParams] = useState(
    JSON.parse(window.localStorage.getItem("ModulesParams")) || {
      taskTime: {
        enabled: false,
        multitasking: {
          enabled: false,
        },
      },
    }
  );
  useEffect(() => {
    window.localStorage.setItem(
      "ModulesParams",
      JSON.stringify(ModulesParams)
    );
  }, [ModulesParams]);
  //================================================================

  //=========================< Functions >==========================
  // Theme change function
  const changeTheme = (themeTitle) => {
    console.log(1);
    if (themes[themeTitle] !== theme) setTheme(themes[themeTitle]);
  };

  // fix this and check if it changes everything or only what passed
  const changeTimerParams = (newValues) => {
    setModulesParams(newValues);
  };

  //=================================================================

  return (
    <ModulesContext.Provider
      value={{ params: ModulesParams, changeParams: changeTimerParams }}
    >
      <ThemeContext.Provider value={{ theme, changeTheme }}>
        <div id='app' style={{ backgroundColor: theme.background }}>
          <header>
            <h1>Task List</h1>
          </header>
          <SettingsBar />
          <TaskList />
        </div>
      </ThemeContext.Provider>
    </ModulesContext.Provider>
  );
}

export default App;
