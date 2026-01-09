
const https = require('https');

https.get('https://travelzy.vercel.app/', (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
        data += chunk;
    });

    resp.on('end', () => {
        console.log(`Status Code: ${resp.statusCode}`);
        console.log('Response:', data);
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});
