import { gql } from '@apollo/client';

const GET_ALL_DATA = gql`
  query getTodos {
    todos {
      done
      id
      text
    }
  }
`;

export { GET_ALL_DATA };
