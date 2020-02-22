const rp = require('request-promise');

const crawling_data = (url_str) => {
    return new Promise(async (resolve, reject) => {
        const options = await {
            url : url_str,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;1=0.9*/*;q=0.8',
                'Accept-Charset' : 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
                'Accept-Encoding' : null,
                'Accept-Language' : 'en-US,en;q=0.8',
                'Connection' : 'keep-alive'
            }
        }

        const source = await rp(options)
        .then((result) => {
            resolve(result);
        })

        resolve(source);
    }) 
}

exports.crawling_data = crawling_data
