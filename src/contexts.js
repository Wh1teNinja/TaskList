import React from "react";
import themes from "./themes.json";

// Theme context to change appearance of the app
export const ThemeContext = React.createContext({
  theme: themes.pink,
  changeTheme: () => {},
});

//================================< Modules >=====================================

export const TimeModuleContext = React.createContext({
  parameters: {
    enabled: false,
  },
  changeModuleParams: () => {},
});

export const DeadlineModuleContext = React.createContext({
  parameters: {
    enabled: false,
  },
  changeModuleParams: () => {},
});

//===============================================================================
