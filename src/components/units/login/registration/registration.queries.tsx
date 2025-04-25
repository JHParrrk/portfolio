import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      email
      name
    }
  }
`;

// GraphQL 쿼리를 작성할 때, 서버의 createUser(createUserInput: CreateUserInput!): User!
// 스키마를 바탕으로, CreateUserInput은 서버에서 정의한 타입이고, $createUserInput은
// 클라이언트에서 임의로 지정할 수 있는 변수입니다.
// mutation createUser($createUserInput: CreateUserInput!) 형태로 클라이언트 변수를
// 타입과 함께 정의하며, createUser(createUserInput: $createUserInput) 구문을 통해
// 서버 필드 이름 createUserInput과 클라이언트 변수 $createUserInput을 매핑합니다.
// 서버의 반환값인 User!는 필수 리턴 타입으로 _id, email, name 등 필요한 필드를 선택적으로
// 요청할 수 있습니다. !는 필수 항목을 의미하며, 데이터 구조를 명확히 정의하고 전달합니다.

//쿼리쓰는법
// createUser(createUserInput: CreateUserInput!): User! 이면
//mutation createUser($createUserInput: CreateUserInput!) 이다.
// CreateUserInput은 타입이고 $createUserInput은 임의로 바꿀수 있는 클라이언트 변수이다.
// createUser(createUserInput: $createUserInput) {
//      _id
//      email
//      name
//  }
// createUserInput는 서버의 GraphQL 스키마에서 정의된 필드 이름이다.
// 그러니까 createUser(createUserInput: CreateUserInput!): User!를
// createUserInput:  $createUserInput : CreateUserInput! 이렇게 연결되어있는거를
// 둘로 찢은거다.
