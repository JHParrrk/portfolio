import { DogImg, Wrapper } from "./OpenapiList.css";
import type { IOpenapiListUIProps } from "./OpenapiList.types";

export default function OpenapiListUI(props: IOpenapiListUIProps): JSX.Element {
  console.log(props.imgUrls);                                                     
  return (
    <div className={Wrapper}>
      <div>
        {props.imgUrls.map((el, index) => (
          <>
            <img className={DogImg} key={el} src={el} />
            {(index + 1) % 3 === 0 && <br />}
          </>
        ))}
      </div>
    </div>
  );
}
