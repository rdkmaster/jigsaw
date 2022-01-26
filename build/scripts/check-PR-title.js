const https = require('https');

const options = {
    hostname: 'api.github.com',
    port: 443,
    path: `/repos/rdkmaster/jigsaw/pulls?per_page=30&state=open`,
    method: 'GET'
}
const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
        process.stdout.write(d)
    })
})

req.on('error', error => {
    console.error('xxxxxxxxxxxxxxxxxxxxxxxxxx', error)
})

req.end()
