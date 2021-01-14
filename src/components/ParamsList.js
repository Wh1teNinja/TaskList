import modulesParamDesc from "../modulesParamDesc.json";

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

export default ParamsList;