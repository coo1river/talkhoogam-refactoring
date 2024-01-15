import { atom } from "recoil";

const tabState = atom({
  key: "tabState",
  default: "feed",
});

export default tabState;
