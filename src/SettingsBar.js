import { ThemeContext } from "./contexts";

function SettingsBar(props) {
  return (
    <ThemeContext.Consumer>
      {({ theme, changeTheme }) => (
        <div id='settings-sidebar' className="flex ac-column">
          <header>
            <h2>Settings</h2>
          </header>
        </div>
      )}
    </ThemeContext.Consumer>
  );
}

export default SettingsBar;
