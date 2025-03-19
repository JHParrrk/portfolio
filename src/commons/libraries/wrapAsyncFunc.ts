export const wrapAsyncFunc = (asyncfunction: () => Promise<void>) => () => {
  // 이렇게하면 비동기함수를 동기함수로 감싸서 사용 가능
  void asyncfunction();
};
