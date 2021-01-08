import { ThemeContext } from "./contexts";
import themes from "./themes.json";

function getAllThemes() {
  let themesArray = [];
  for (let theme in themes) {
    themesArray.push(theme);
  }
  return themesArray;
}

function compareThemes(theme1, theme2) {
  for (let key in theme1)
    if (theme1[key] !== theme2[key])
      return false;
  return true;
}

function ThemePickerButton(props) {
  return (
    <ThemeContext.Consumer>
      {({ theme, changeTheme }) => (
        <div id='theme-picker-buttons'>
          <label htmlFor={props.themeName + "-theme"}>
            {props.themeName.charAt(0).toUpperCase() +
              props.themeName.slice(1)}
            <input
              type='radio'
              id={props.themeName + "-theme"}
              name={'themes'}
              className='hidden-radio'
              value={props.themeName}
              onChange={() => {changeTheme(props.themeName)}}
              checked={compareThemes(theme, props.theme)} 
            />
            <span
              className='theme-picker-custom-radio'
              style={{
                background: `linear-gradient(135deg, ${props.theme.background} 60%,
                                                ${props.theme.listBackground} 60%,
                                                ${props.theme.listBackground} 74%, 
                                                ${props.theme.text} 74%, 
                                                ${props.theme.text} 80%, 
                                                ${props.theme.listBackground} 80%)`,
              }}
            ></span>
          </label>
        </div>
      )}
    </ThemeContext.Consumer>
  );
}

function SettingsBar(props) {
  return (
    <div id='settings-sidebar' className='flex ac-column'>
      <header>
        <h2>Settings</h2>
      </header>
      <div id='theme-picker'>
        <h3>Themes</h3>
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
  );
}

export default SettingsBar;
