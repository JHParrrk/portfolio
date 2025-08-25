// useSearchbar.ts

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import _ from "lodash";
import { ApolloQueryResult } from "@apollo/client";
import { useRouter } from "next/router";
import { asSingle } from "@/src/commons/libraries/utils/router";

interface UseSearchbarArgs<
  TQuery,
  TVars extends { page?: number; search?: string }
> {
  refetch: (variables?: Partial<TVars>) => Promise<ApolloQueryResult<TQuery>>;
  refetchCount?: (
    variables?: Partial<TVars>
  ) => Promise<ApolloQueryResult<any>>;
  shallow?: boolean;
}

export const useSearchbar = <
  TQuery,
  TVars extends { page?: number; search?: string }
>(
  args: UseSearchbarArgs<TQuery, TVars>
) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  // 최신 함수 참조를 보장하기 위한 ref
  const refetchRef = useRef(args.refetch);
  const refetchCountRef = useRef(args.refetchCount);
  useEffect(() => {
    refetchRef.current = args.refetch;
    refetchCountRef.current = args.refetchCount;
  }, [args.refetch, args.refetchCount]);

  // URL -> state 동기화 (뒤로가기)
  useEffect(() => {
    setKeyword(asSingle(router.query.search, ""));
  }, [router.query.search]);

  const debounced = useMemo(
    () =>
      _.debounce((value: string) => {
        void refetchRef.current({ search: value, page: 1 } as Partial<TVars>);
        void refetchCountRef.current?.({ search: value } as Partial<TVars>);
        void router.replace(
          {
            pathname: router.pathname,
            query: { ...router.query, search: value, page: 1 },
          },
          undefined,
          { scroll: false, shallow: args.shallow ?? true }
        );
      }, 500),
    [router, args.shallow]
  );

  useEffect(() => {
    return () => {
      debounced.cancel();
    };
  }, [debounced]);

  const onChangeSearchbar = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setKeyword(value);
    debounced(value);
  };

  return { keyword, onChangeSearchbar };
};
