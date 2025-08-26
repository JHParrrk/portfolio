import {
  IMutation,
  IMutationCreateUseditemArgs,
} from "@/src/commons/types/generated/types";
import { gql, useMutation } from "@apollo/client";

export const CREATE_USED_ITEM = gql`
  mutation createUseditem($createUseditemInput: CreateUseditemInput!) {
    createUseditem(createUseditemInput: $createUseditemInput) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      pickedCount
      useditemAddress {
        zipcode
        address
        addressDetail
      }
      buyer {
        _id
        name
      }
      seller {
        _id
        name
      }
      soldAt
      createdAt
      updatedAt
    }
  }
`;

export const useMutationCreateUsedItem = () => {
  const mutation = useMutation<
    Pick<IMutation, "createUseditem">,
    IMutationCreateUseditemArgs
  >(CREATE_USED_ITEM, {
    update(cache, { data }) {
      // 1. 뮤테이션 결과로 새로 생성된 상품 데이터를 가져옵니다.
      const newUseditem = data?.createUseditem;
      if (!newUseditem) return;
      // 2. cache.modify를 사용해 캐시를 직접 수정합니다.
      cache.modify({
        fields: {
          // 3. fetchUseditems 캐시를 수정합니다.
          fetchUseditems(existingUseditems = []) {
            // 기존 상품 목록의 맨 앞에 새 상품을 추가합니다.
            return [newUseditem, ...existingUseditems];
          },
        },
      });
    },
  });

  return mutation;
};
