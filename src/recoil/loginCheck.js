import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "sessionStorage",
  storage: sessionStorage,
});

const loginCheck = atom({
  key: "loginCheck",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export default loginCheck;
