import { gql } from '@apollo/client';

export const GET_ALL_FILMS = gql`
{
  allFilms {
    films {
      id
      title
      episodeID
      openingCrawl
      releaseDate
    }
  }
}
`;