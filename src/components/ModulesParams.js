import modulesParamDesc from "../modulesParamDesc.json";
import ModulesContext from "../ModulesContext";

function ParamsList(props) {
  const handleParamOnChange = (params, e) => {
    if (e) params.enabled = !params.enabled;
    else props.moduleParams[Object.keys(params)[0]] = Object.values(params)[0];
    props.changeParams({ [props.module]: props.moduleParams });
  };

  let listContent = [];
  if (props.moduleParams) {
    for (let param in props.moduleParams) {
      if (param === "enabled") {
        listContent.push(
          <li key={param}>
            <input
              type='checkbox'
              id={props.module + "-switch"}
              name={props.module}
              onChange={(e) => handleParamOnChange(props.moduleParams, e)}
              checked={props.moduleParams.enabled}
            />
            <label>
              {modulesParamDesc[props.module] ? "Enabled" : props.paramsDesc.title}
            </label>
          </li>
        );
      } else {
        listContent.push(
          <ParamsList
            key={param}
            module={param}
            paramsDesc={props.paramsDesc.parameters[param]}
            moduleParams={props.moduleParams[param]}
            changeParams={handleParamOnChange}
          />
        );
      }
    }
  }
  return <ul>{listContent}</ul>;
}

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
