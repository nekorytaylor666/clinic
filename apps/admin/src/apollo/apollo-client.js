import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

const client = new ApolloClient({
    uri: "https://lucem-back-production-08e3.up.railway.app/graphql",
    cache: new InMemoryCache(),
    link: createUploadLink({
        uri: "https://lucem-back-production-08e3.up.railway.app/graphql",
    }),
});

export default client;
