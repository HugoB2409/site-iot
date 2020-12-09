/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTemperature = /* GraphQL */ `
  mutation CreateTemperature(
    $input: CreateTemperatureInput!
    $condition: ModelTemperatureConditionInput
  ) {
    createTemperature(input: $input, condition: $condition) {
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
export const updateTemperature = /* GraphQL */ `
  mutation UpdateTemperature(
    $input: UpdateTemperatureInput!
    $condition: ModelTemperatureConditionInput
  ) {
    updateTemperature(input: $input, condition: $condition) {
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
export const deleteTemperature = /* GraphQL */ `
  mutation DeleteTemperature(
    $input: DeleteTemperatureInput!
    $condition: ModelTemperatureConditionInput
  ) {
    deleteTemperature(input: $input, condition: $condition) {
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
