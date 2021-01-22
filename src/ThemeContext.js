import React from "react";
import themes from "./themes.json";

// Theme context to change appearance of the app
const ThemeContext = React.createContext({
  theme: themes.pink,
  changeTheme: () => {},
});

export default ThemeContext;