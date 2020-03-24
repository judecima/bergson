const app = require('./app');
// let port = process.env.PORT || 3000;
async function main() {
    await app.listen(3001);
    console.log('Server on port', 3001);
    

}

main();