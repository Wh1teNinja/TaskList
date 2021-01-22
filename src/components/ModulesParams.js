import modulesParamDesc from "../modulesParamDesc.json";
import ModulesContext from "../ModulesContext";
import ThemeContext from "../ThemeContext";
import ParamsList from "./ParamsList";
import Utils from "../utils";
import Tooltip from './Tooltip';

function ModulesParams(props) {
  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <div id='modules-parameters'>
          <header>
            <h3>Modules</h3>
            <span className='line' style={{ backgroundColor: theme.text }}></span>
          </header>
          <main>
            <ModulesContext.Consumer>
              {({ params, changeParams }) => {
                let content = [];
                for (let module in params) {
                  content.push(
                    <div
                      key={module}
                      className='module-params'
                      id={module + "-module-params"}
                      style={{
                        backgroundColor: Utils.changeColorByLuma(
                          theme.listBackground
                        ),
                        border: "1px solid " + theme.text,
                      }}
                    >
                      <div className='flex jsp'>
                        <h4>{modulesParamDesc[module].title}</h4>
                          <Tooltip details={modulesParamDesc[module].desc}/>

                      </div>
                      <span
                        className='line'
                        style={{ backgroundColor: theme.text, height: "1px" }}
                      ></span>
                      <main>
                        <ParamsList
                          key={module}
                          module={module}
                          changeParams={changeParams}
                          moduleParams={params[module]}
                          paramsDesc={modulesParamDesc[module]}
                        />
                      </main>
                    </div>
                  );
                }
                return content;
              }}
            </ModulesContext.Consumer>
          </main>
        </div>
      )}
    </ThemeContext.Consumer>
  );
}

export default ModulesParams;
