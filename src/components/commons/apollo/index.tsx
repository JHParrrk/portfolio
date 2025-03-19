import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { useRecoilState } from "recoil";
import { accessTokenState } from "@/src/commons/stores";
import { useEffect } from "react";

const GLOBAL_STATE = new InMemoryCache();
// "Apollo Client의 캐시 데이터는 기본적으로 컴포넌트 재마운트나
// 새 창을 열 때 초기화됩니다. 이를 방지하기 위해 GLOBAL_STATE라는
// 전역 변수에 InMemoryCache를 저장하여 모든 Apollo Client 인스턴스가
// 동일한 캐시를 공유하도록 설정했습니다.

interface IApolloSettingsProps {
  children: JSX.Element;
}

const ApolloSettings = (props: IApolloSettingsProps): JSX.Element => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setAccessToken(localStorage.getItem("accessToken") || "");
    }
  }, []);
  // if (process.browser) {
  //   console.log("브라우저입니다.");
  // } else {
  //   console.log("프론트엔드 서버입니다. 얀데브 프로그램 내부입니다.");
  // }
  // if(typeof window !== undefined) {
  //   console.log("브라우저입니다.")
  // } else {
  //   console.log("프론트엔드 서버입니다. 얀데브 프로그램 내부입니다.");
  // }
  // 조건문으로 브라우저 일때만 실행하도록 하던가 useEffect 사용
  // 왜냐하면 localStorage는 브라우저에만 있는데, 서버에서 먼저 화면을
  // 그려보기 때문에 오류가 발생함
  // useEffect는 마운트 이후 실행됨

  const uploadLink = createUploadLink({
    uri: "https://backendonline.codebootcamp.co.kr/graphql",
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink as unknown as ApolloLink]),
    cache: GLOBAL_STATE,
    // 컴퓨터의 메모리에다가 백엔드에서 받아온 데이터 임시저장
    // 패치보드, 패치프로덕트같은거 여기다가 다 저장
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};

export default ApolloSettings;
