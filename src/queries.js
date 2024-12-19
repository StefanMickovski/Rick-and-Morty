import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!, $status: String, $species: String) {
    characters(page: $page, filter: { status: $status, species: $species }) {
      info {
        pages
      }
      results {
        id
        name
        status
        species
        gender
        origin {
          name
        }
      }
    }
  }
`;
