export type LinksContext = {
  customizeLinks: CustomizeLink[];
};

export type ProfileContext = {
  profileDetails: ProfileDetails;
  addProfile: (profile: ProfileDetails) => void;
};

export type ProfileDetails = {
  dataUrlPicture?: string;
  firstName: string;
  lastName: string;
  email?: string;
};

export type CustomizeLink = {
  id: string;
  plataform: string;
  link: string;
};
