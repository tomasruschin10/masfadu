module.exports = {
    apps : [
        {
            name: "gl-api",
            script: "npm start",
            watch: false,
            env: {
                "PORT": 8500,
                "IP": "104.236.92.29",
                "NODE_ENV": "production"
            }
        }
    ]
}