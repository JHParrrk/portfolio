import { atom, selector } from "recoil";
import { getAccessToken } from "@/src/commons/libraries/getAccessToken";

// export const isEditState = atom({
//   key: `isEditState/${Math.random()}`,
//   default: true,
// });

export const accessTokenState = atom({
  key: `accessTokenState/${Math.random()}`,
  default: "",
});

export const visitedPageState = atom({
  key: `visitedPageState/${Math.random()}`,
  default: "",
});

export const restoreAccessTokenLoadable = selector({
  key: `restoreAccessTokenLoadable/${Math.random()}`,
  get: async () => {
    try {
      const newAccessToken = await getAccessToken();
      return newAccessToken ?? ""; // nullish coalescing 연산자로 안전하게 빈 문자열을 반환
    } catch (error) {
      console.error("Failed to restore access token:", error);
      return ""; // 에러 발생 시 빈 문자열 반환
    }
  },
});
