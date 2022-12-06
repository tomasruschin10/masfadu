module.exports = {
    apps : [
        {
            name: "fadu-api",
            script: "npm start",
            watch: false,
            env: {
                "PORT": 3000,
                "IP": "164.92.100.215",
                "NODE_ENV": "production"
            }
        }
    ]
}
