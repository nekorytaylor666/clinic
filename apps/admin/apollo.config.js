module.exports = {
    client: {
        includes: [__dirname + "/graphql/**"],
        service: {
            name: "SpaceX",
            url: "https://lucem-back-production.up.railway.app/graphql",
            // url: "http://localhost:3000/graphql",
        },
    },
};
