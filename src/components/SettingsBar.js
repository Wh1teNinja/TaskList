import React from 'react';
import ThemePickerButton from "./ThemePickerButton";
import ModulesParams from "./ModulesParams";
import ThemeContext from "../ThemeContext";
import themes from "../themes.json";
import { useState } from "react";

function getAllThemes() {
  let themesArray = [];
  for (let theme in themes) {
    themesArray.push(theme);
  }
  return themesArray;
}

function SettingsBar(props) {
  const [displayBar, setDisplayBar] = useState(false);

  const handleOnClickShowBtn = () => {
    setDisplayBar(!displayBar);
  };

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <aside
          id='settings-aside'
          style={{
            color: theme.text,
            width: !displayBar ? "5px" : "400px",
            backgroundColor: theme.listBackground,
            borderRight: "5px solid" + theme.listBackground,
          }}
        >
          <div className='wrapper' style={{ boxShadow: "5px 0 #0002", borderRight: "5px solid " + theme.listBackground }}>
            <div
              id='settings-sidebar'
              className='flex ac-column'
              style={{ display: displayBar || "none" }}
            >
              <header>
                <h2
                  style={{
                    backgroundColor: theme.text,
                    color: theme.listBackground,
                  }}
                >
                  Settings
                </h2>
              </header>
              <main>
                <div id='theme-picker'>
                  <header>
                    <h3>Themes</h3>
                    <span
                      className='line'
                      style={{ backgroundColor: theme.text }}
                    ></span>
                  </header>
                  <div className='wrapper'>
                    {getAllThemes().map((theme) => {
                      return (
                        <ThemePickerButton
                          themeName={theme}
                          theme={themes[theme]}
                          key={theme}
                        ></ThemePickerButton>
                      );
                    })}
                  </div>
                </div>
                <ModulesParams />
              </main>
            </div>
            <button
              id='settings-button'
              onClick={handleOnClickShowBtn}
              style={{ backgroundColor: theme.listBackground }}
            >
              <i style={{ color: theme.text }} className='fas fa-cog'></i>
            </button>
          </div>
        </aside>
      )}
    </ThemeContext.Consumer>
  );
}

export default SettingsBar;
