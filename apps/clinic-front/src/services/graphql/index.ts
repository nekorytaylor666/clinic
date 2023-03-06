import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import client from "@/client/apollo-client";

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

export const initializeApollo = (): ApolloClient<NormalizedCacheObject> => {
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === "undefined") {
        return client;
    }

    // Create the Apollo Client once in the client
    if (!apolloClient) {
        apolloClient = client;
    }

    return apolloClient;
};
