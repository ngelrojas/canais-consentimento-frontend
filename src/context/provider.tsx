import React from "react";
import {TotalRegistersContext} from "./totalRegisterContext";

export const TotalRegistersContextProvider = ({ children }: any) => {
    const [totalRegisterIn, setTotalRegisterIn] = React.useState<number>(0);
    const [totalRegisterOut, setTotalRegisterOut] = React.useState<number>(0);
  
    return (
      <TotalRegistersContext.Provider
        value={{ totalRegisterIn, totalRegisterOut, setTotalRegisterIn, setTotalRegisterOut }}
      >
        {children}
      </TotalRegistersContext.Provider>
    );
  };
  
export const TotalRegistersContextConsumer = TotalRegistersContext.Consumer;
  