import { gql } from "@apollo/client";

export const QUERY_EVENTS = gql`
  query Event {
    events {
      _id
      pair
      title
      examples {
        _id
        date
        measureActual
        measureForecast
        measurePrevious
        image
      }
    }
  }
`;

export const QUERY_USERS = gql`
  query Users {
    users {
      _id
      email
      username
      password
    }
  }
`;

export const REMOVE_EVENT = gql`
  mutation EventRemoveById($id: MongoID!) {
    eventRemoveById(_id: $id) {
      recordId
    }
  }
`;

export const EDIT_EVENT = gql`
  mutation EventUpdateById($id: MongoID!, $record: UpdateByIdEventInput!) {
    eventUpdateById(_id: $id, record: $record) {
      recordId
    }
  }
`;

export const USER_CREATE = gql`
  mutation UserCreate($email: String, $username: String, $password: String) {
    userCreate(record: { email: $email, username: $username, password: $password }) {
      recordId
    }
  }
`;
