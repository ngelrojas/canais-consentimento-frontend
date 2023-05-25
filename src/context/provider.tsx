import React from "react";
import { Context } from "./overView";

export const ContextProvider = ({ children }: any) => {
  const [totalRegisterIn, setTotalRegisterIn] = React.useState<number>(0);
  const [totalRegisterOut, setTotalRegisterOut] = React.useState<number>(0);
  const [exportData, setExportData] = React.useState<any>([]);

  return (
    <Context.Provider
      value={{ 
        totalRegisterIn, setTotalRegisterIn,
        totalRegisterOut, setTotalRegisterOut, 
        exportData, setExportData 
      }}>
      {children}
    </Context.Provider>
  );
};
  
export const ContextConsumer = Context.Consumer;
  