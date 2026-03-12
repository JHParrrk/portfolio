import { IQuery } from '@/shared/types/generated/types';

export interface IMarketWriteProps {
  isEdit: boolean;
  data?: Pick<IQuery, 'fetchUseditem'>;
}
