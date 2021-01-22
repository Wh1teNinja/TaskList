import React from "react";

export const ModulesContext = React.createContext({
  taskTime: {
    enabled: false,
    multitasking: {
      enabled: false,
    },
  },
  changeModuleParams: () => {},
});

export default ModulesContext;
