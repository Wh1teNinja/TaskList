import ThemeContext from "../ThemeContext.js";
import Utils from '../utils';

function compareThemes(theme1, theme2) {
  for (let key in theme1) if (theme1[key] !== theme2[key]) return false;
  return true;
}

function ThemePickerButton(props) {

  return (
    <ThemeContext.Consumer>
      {({ theme, changeTheme }, checked = compareThemes(theme, props.theme)) => (
        <div className='theme-picker-button'>
          <label className="flex ac-column" htmlFor={props.themeName + "-theme"}>
            <span>{props.themeName.charAt(0).toUpperCase() + props.themeName.slice(1)}</span>
            <input
              type='radio'
              id={props.themeName + "-theme"}
              name={"themes"}
              className='hidden-radio'
              value={props.themeName}
              onChange={() => {
                changeTheme(props.themeName);
              }}
              checked={checked}
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
                border: checked ? "4px solid " + Utils.changeColorByLuma(props.theme.text) : "4px solid #b4b4b4"
              }}
            ></span>
          </label>
        </div>
      )}
    </ThemeContext.Consumer>
  );
}

export default ThemePickerButton;
