import { IQuery } from "@/shared/types/generated/types";

export interface IMyPageUIProps {
  data: Pick<IQuery, "fetchUserLoggedIn"> | undefined;
}
