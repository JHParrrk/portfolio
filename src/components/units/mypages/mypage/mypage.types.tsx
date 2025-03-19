import { IQuery } from "@/src/commons/types/generated/types";

export interface IMyPageUIProps {
  data: Pick<IQuery, "fetchUserLoggedIn"> | undefined;
}
