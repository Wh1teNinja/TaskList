import ThemePickerButton from "./ThemePickerButton";
import ModulesParams from "./ModulesParams";
import themes from "../themes.json";

function getAllThemes() {
  let themesArray = [];
  for (let theme in themes) {
    themesArray.push(theme);
  }
  return themesArray;
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
        <ModulesParams />
    </div>
  );
}

export default SettingsBar;
