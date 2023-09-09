"use client";

import { ActionTypeLinksReducer, linksReducer } from "@/reducers/linksReducer";
import { CustomizeLink, LinksContext } from "@/types/datas";
import { getLocalStorage, setLocalStorage } from "@/utils/utils";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

const LinksContext = React.createContext<LinksContext | null>(null);

const LinksDispatchContext =
  createContext<React.Dispatch<ActionTypeLinksReducer> | null>(null);

export default function LinksContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const datasLocalStorage = getLocalStorage<CustomizeLink[]>("links", []);

  //const [datas, setDatas] = useState(datasLocalStorage);

  const [datas, dispatch] = useReducer(linksReducer, datasLocalStorage);

  useEffect(() => {
    setLocalStorage("links", datas);
  }, [datas]);

  const contextValue = useMemo(() => ({ customizeLinks: datas }), [datas]);

  const contextValueDispatch = useMemo(() => dispatch, [dispatch]);

  return (
    <LinksContext.Provider value={contextValue}>
      <LinksDispatchContext.Provider value={contextValueDispatch}>
        {children}
      </LinksDispatchContext.Provider>
    </LinksContext.Provider>
  );
}

export function useLinksContext() {
  const linksContext = useContext(LinksContext);

  if (!linksContext) {
    throw new Error("Houve um erro ao usar dados para o contexto de links");
  }

  return linksContext;
}

export function useLinksDispatchContext() {
  const dispatchContext = useContext(LinksDispatchContext);
  if (!dispatchContext) {
    throw Error(
      "Houve um erro ao usar o dispatch function reducer links no contexto",
    );
  }
  return dispatchContext;
}
