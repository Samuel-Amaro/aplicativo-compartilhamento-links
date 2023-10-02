"use client";

import { ProfileContext, ProfileDetails } from "@/types/datas";
import { getLocalStorage, setLocalStorage } from "@/utils/utils";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const ProfileContext = React.createContext<ProfileContext | null>(null);

export default function ProfileContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const datasLocalStorage = getLocalStorage<ProfileDetails>("profile", {
    firstName: "",
    lastName: "",
    email: "",
    dataUrlPicture: "",
  });

  const [datas, setDatas] = useState<ProfileDetails>(datasLocalStorage);

  const addProfile = useCallback((profile: ProfileDetails) => {
    setDatas(profile);
  }, []);

  const contextValue = useMemo(
    () => ({ profileDetails: datas, addProfile: addProfile }),
    [datas],
  );

  useEffect(() => {
    setLocalStorage("profile", datas);
  }, [datas]);

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfileContext() {
  const profileContext = useContext(ProfileContext);

  if (!profileContext) {
    throw new Error("Houve um erro ao usar dados para o contexto de perfil");
  }

  return profileContext;
}
