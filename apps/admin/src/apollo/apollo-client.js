import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

const client = new ApolloClient({
    // uri: "https://lucem-back-production.up.railway.app/graphql",
    uri: "http://localhost:3000/graphql",
    cache: new InMemoryCache(),
    link: createUploadLink({
        // uri: "https://lucem-back-production.up.railway.app/graphql",
        uri: "http://localhost:3000/graphql",
    }),
});

export default client;
