const app = require('./app');

async function main() {
    await app.listen(3001);
    console.log('Server on port', 3001);
}

main();