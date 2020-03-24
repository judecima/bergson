const app = require('./app');
let port = process.env.PORT || 3000;
async function main() {
    await app.listen(port);
    console.log('Server on port', port);
    

}

main();