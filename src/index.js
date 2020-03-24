const app = require('./app');
let port = process.env.PORT || 3001;
async function main() {
    await app.listen(port);
    console.log('Server on port', port);
    

}

main();