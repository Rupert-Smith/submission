import axios from "axios";
import { Source } from "../types/Source";
import { Fund } from "../types/Fund";
import { Investment, PostInvestment } from "../types/Investments";

const BASE_URL = "http://localhost:8080";

const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getSourceById = async (id: string) => {
  return (await axiosInstance.get<Source>(`sources/${id}`)).data;
};

export const getFunds = async () => {
  return (await axiosInstance.get<Fund[]>(`funds`)).data;
};

export const postInvestment = async (data: PostInvestment) => {
  return await axiosInstance.post("investments", data);
};

export const getInvestments = async () =>
  (await axiosInstance.get<Investment[]>("investments")).data;
