import React from "react";
import {TotalRegistersContext} from "./overView";

export const TotalRegistersContextProvider = ({ children }: any) => {
    const [totalRegisterIn, setTotalRegisterIn] = React.useState<number>(0);
    const [totalRegisterOut, setTotalRegisterOut] = React.useState<number>(0);
    const [exportData, setExportData] = React.useState<any>([]);
  
    return (
      <TotalRegistersContext.Provider
        value={{ 
          totalRegisterIn, totalRegisterOut, 
          setTotalRegisterIn, setTotalRegisterOut, 
          exportData, setExportData }}
      >
        {children}
      </TotalRegistersContext.Provider>
    );
  };
  
export const TotalRegistersContextConsumer = TotalRegistersContext.Consumer;
  