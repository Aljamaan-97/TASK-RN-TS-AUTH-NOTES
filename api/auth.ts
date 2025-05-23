import UserInfo from "@/types/UserInfo";
import instance from ".";
import { storeToken } from "@/api/Storage";

const login = async (userInfo: UserInfo) => {
  const { data } = await instance.post("/auth/login", userInfo);
  if (data.token) {
    storeToken(data.token);
  }
  return data;
};

const register = async (userInfo: UserInfo) => {
  const { data } = await instance.post("/auth/register", userInfo);
  if (data.token) {
    storeToken(data.token);
  }
  return data;
};

const me = async () => {
  const { data } = await instance.get("/auth/me");
  return data;
};

const getAllUsers = async () => {
  const { data } = await instance.get("/auth/users");
  return data;
};

export { login, register, me, getAllUsers };
