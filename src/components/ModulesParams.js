import modulesParamDesc from "../modulesParamDesc.json";
import ModulesContext from "../ModulesContext";
import ParamsList from "./ParamsList";

function ModulesParams(props) {
  return (
    <div id='modules-parameters'>
      <h3>Modules</h3>
      <ModulesContext.Consumer>
        {({ params, changeParams }) => {
          let content = [];
          for (let module in params) {
            content.push(
              <div key={module} id={module + "-module-params"}>
                <h4>{modulesParamDesc[module].title}</h4>
                <ParamsList
                  key={module}
                  module={module}
                  changeParams={changeParams}
                  moduleParams={params[module]}
                  paramsDesc={modulesParamDesc[module]}
                />
              </div>
            );
          }
          return content;
        }}
      </ModulesContext.Consumer>
    </div>
  );
}

export default ModulesParams;
