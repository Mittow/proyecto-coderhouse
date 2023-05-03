const cluster = require("cluster")
const CPUs = require("os").cpus().length
const server = require("./app")
const PORT = process.env.PORT || 8080;
const isCluster = process.argv[2] === 'cluster'

if (cluster.isPrimary && isCluster) {
    for (let i = 0; i < CPUs; i++) {
        cluster.fork()
    }
} else {
    server.then(server => server.listen(PORT, () => console.log(`🚀Server is running on port ${PORT}`)))
}
