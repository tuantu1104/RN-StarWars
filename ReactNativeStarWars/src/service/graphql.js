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

export const GET_FILM = gql`
query GetFilm($id: ID!) {
  film(id: $id) {
    title
    releaseDate
    openingCrawl
    speciesConnection {
      totalCount
    }
    vehicleConnection {
      totalCount
    }
    planetConnection {
      totalCount
    }
    characterConnection {
      characters {
        id
        name
      }
    }
  }
}
`;

export const GET_CHARACTER = gql`
query GetCharacter($id: ID!) {
  person(id: $id) {
    name
    birthYear
    height
    mass
    homeworld {
      name
    }
    filmConnection {
      films {
        id
        title
      }
    }
  }
}
`;