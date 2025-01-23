export type TUser = {
  email: string;
  image: string;
  name: string;
  company: string | null;
  location: string | null;
  bio: string | null;
}

export type TSession = {
  accessToken: string;
  loginId: string;
  expires: string;
  user: {
    email: string;
    image: string;
    name: string;
    company: string | null;
    location: string | null;
    bio: string | null;
  }
}
