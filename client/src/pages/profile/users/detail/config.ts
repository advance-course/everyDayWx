import * as images from "./img/images";

export const defaultDetails = {
  nickName: "",
  avatarUrl: "",
  gender: 1 as const,
  type: 3 as const,
  province: "",
  country: "",
  city: "",
  district: "",
  createTime: 0,
  language: "zh_CN" as const
};

export function getDefUserDetails() {
  return {
    nickName: "",
    avatarUrl: "",
    gender: 1 as const,
    type: 3 as const,
    province: "",
    country: "",
    city: "",
    district: "",
    createTime: 0,
    language: "zh_CN" as const
  };
}

export const genderIcon = {
  0: "",
  1: images.male,
  2: images.female
};

export const language = [
  { label: "英语", value: "en" },
  { label: "简体中文", value: "zh_CN" },
  { label: "繁体中文", value: "zh_TW" }
];

export const userType = [
  { label: "超级管理员", value: 1 },
  { label: "管理员", value: 2 },
  { label: "普通用户", value: 3 },
  { label: "尊贵VIP", value: 4 }
];
