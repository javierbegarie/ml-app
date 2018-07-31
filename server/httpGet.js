const https = require('https');

const httpGet = url => {
    let p = new Promise( (resolve, reject) => {
        https.get(url, response => {

            const { statusCode } = response;
            const contentType = response.headers['content-type'];
          
            let error;
            if (statusCode !== 200) {
              error = new Error('Request Failed.\n' +
                                `Status Code: ${statusCode}`);
            } else if (!/^application\/json/.test(contentType)) {
              error = new Error('Invalid content-type.\n' +
                                `Expected application/json but received ${contentType}`);
            }
            if (error) {
              console.error(error.message);
              // consume response data to free up memory
              response.resume();
              reject(error);
            }

            //Parse data to JSON
            response.setEncoding('utf8');
            let rawData = '';
            response.on('data', (chunk) => { rawData += chunk; });
            response.on('end', () => {
                try {
                    resolve(JSON.parse(rawData));
                } catch (e) {
                    reject(e.message);
                }
            });
        });
    });
    return p;
}

module.exports = httpGet;