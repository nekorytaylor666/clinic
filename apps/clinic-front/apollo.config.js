module.exports = {
    client: {
        includes: [__dirname + "/graphql/**"],
        service: {
            name: "graphql",
            ssrMode: typeof window === "undefined",
            url: "https://lucem-back-production.up.railway.app/graphql",
            // url: "http://localhost:3000/graphql",
        },
    },
};
