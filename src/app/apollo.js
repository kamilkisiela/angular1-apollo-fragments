import ApolloClient, { createNetworkInterface } from 'apollo-client';

const endpointURL = 'https://j7vzw8j5p.lp.gql.zone/graphql';

export const networkInterface = createNetworkInterface({
  uri: endpointURL
});

export const client = new ApolloClient({
  networkInterface
});
