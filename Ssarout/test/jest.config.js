module.exports = {
    testEnviroment: 'node',
    roots: ['./src/'],
    transform: {
        '\\.ts$': 'esbuild-jest'
    }
}