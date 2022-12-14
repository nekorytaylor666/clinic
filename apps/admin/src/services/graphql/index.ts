import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

const createApolloClient = new ApolloClient({
    ssrMode: typeof window === "undefined",
    cache: new InMemoryCache(),
    link: createUploadLink({ uri: "https://api.pulse.org.kg/graphql" }),
    // link: createUploadLink({ uri: "http://650e-2-133-111-193.ngrok.io/graphql" }),
    // link: createUploadLink({ url: "http://650e-2-133-111-193.ngrok.io/graphql" })
});

export const initializeApollo = () => {
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === "undefined") {
        return createApolloClient;
    }

    // Create the Apollo Client once in the client
    if (!apolloClient) {
        apolloClient = createApolloClient;
    }

    return apolloClient;
};
