const app = require('./app');

async function main() {
    // await app.listen(3000);
    // console.log('Server on port', 3000);
    await app.listen(port, function () {
        console.log('Server running at http://127.0.0.1:' + port + '/');
    });

}

main();