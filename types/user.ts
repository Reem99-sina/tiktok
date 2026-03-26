export type User = {
  _id: string;
  username: string;
  email?: string;
  avatar?: string;
  followers?: User[];
  following?: User[];
};
export type FormDataLogin = {
  email: string;
  password: string;
};

export type FormDataRegister = {
  email: string;
  password: string;
  username: string;
  avatar: string;
};

export type FormDataVerify = {
  email: string;
  code: string;
};
export type FormDataResendCode = {
  email: string;
};

export type avatarUser = {
  _id?: string;
  username: string;

  avatar?: string;
};
