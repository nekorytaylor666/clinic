import { ApolloClient, InMemoryCache } from "@apollo/client";
import configs from "../../apollo.config";

const client = new ApolloClient({
    // IMPORTANT!: ApolloClint uri
    name: configs.client.service.name,
    uri: configs.client.service.url,
    ssrMode: configs.client.service.ssrMode,
    cache: new InMemoryCache(),
});

export default client;
