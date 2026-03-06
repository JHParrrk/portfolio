import axios from "axios"; // [1] axios 라이브러리를 가져옵니다. axios는 HTTP 요청을 쉽게 보내기 위한 라이브러리입니다.
import { useEffect, useState } from "react"; // [2] React의 useEffect 및 useState 훅을 가져옵니다.
import OpenapiListUI from "./OpenapiList.presenter"; // [3] OpenapiListUI 컴포넌트를 가져옵니다.

export default function OpenapiList(): JSX.Element {
  // [4] OpenapiList 컴포넌트를 정의합니다.
  const [imgUrls, setImgUrls] = useState<string[]>([]); // [5] imgUrls라는 상태 변수를 선언하고 빈 문자열 배열로 초기화합니다. setImgUrls는 imgUrls 상태를 업데이트하는 함수입니다.

  useEffect(() => {
    // [6] useEffect 훅을 사용하여 컴포넌트가 마운트될 때 실행할 코드를 정의합니다.
    const getImg = async (): Promise<void> => {
      // [7] 비동기 함수를 정의하여 이미지를 가져옵니다.
      new Array(9).fill(1).forEach(async (el) => {
        // [8] 길이가 9인 배열을 생성하고 각 요소에 대해 비동기 함수를 실행합니다.
        const result = await axios.get(
          // [9] axios를 사용하여 랜덤 강아지 이미지를 가져옵니다.
          "https://dog.ceo/api/breeds/image/random" // [10] Dog CEO API에서 랜덤 강아지 이미지를 요청합니다.
        );
        setImgUrls((prev) => [...prev, result.data.message]); // [11] 이전 상태에 새로운 이미지를 추가하여 imgUrls 상태를 업데이트합니다.
      });
    };
    void getImg(); // [12] getImg 함수를 호출합니다.
  }, []); // [13] 빈 배열을 의존성 배열로 제공하여 이 효과가 컴포넌트가 마운트될 때 한 번만 실행되도록 합니다.

  return <OpenapiListUI imgUrls={imgUrls} />; // [14] OpenapiListUI 컴포넌트에 imgUrls 상태를 props로 전달합니다.
}
