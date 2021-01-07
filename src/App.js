import { useState, useEffect } from "react";
import "./App.css";
import themes from "./themes.json";
import { ThemeContext } from "./contexts";
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
  });
  //================================================================

  //=========================< Functions >==========================
  // Theme change function
  const changeTheme = (themeTitle) => {
    if (themes[themeTitle] !== theme)
      setTheme(themes[themeTitle]);
  };

  //=================================================================

  return (
    <ThemeContext.Provider value={{theme, changeTheme}}>
      <div id='app' style={{backgroundColor: theme.background}}>
        <header>
          <h1>Task List</h1>
        </header>
        <SettingsBar />
        <TaskList />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
