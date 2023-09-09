export type ProfileContext = {
  profileDetails: ProfileDetails;
};

export type LinksContext = {
  customizeLinks: CustomizeLink[];
};

export type ProfileDetails = {
  profilePicture: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type CustomizeLink = {
  id: string;
  plataform: string;
  link: string;
};
