/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTemperature = /* GraphQL */ `
  query GetTemperature($id: ID!) {
    getTemperature(id: $id) {
      id
      type
      sub
      name
      temperature
      url
      createdAt
      updatedAt
    }
  }
`;
export const listTemperatures = /* GraphQL */ `
  query ListTemperatures(
    $filter: ModelTemperatureFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTemperatures(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        sub
        name
        temperature
        url
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTemperatureByCreatedAt = /* GraphQL */ `
  query GetTemperatureByCreatedAt(
    $type: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTemperatureFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getTemperatureByCreatedAt(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        sub
        name
        temperature
        url
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
