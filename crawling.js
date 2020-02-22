const request = require('request');
const cheerio = require('cheerio');
const sanitizeHtml = require('sanitize-html');

const options = {
    url : 'http://www.kmou.ac.kr/kmou/main.do',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;1=0.9*/*;q=0.8',
        'Accept-Charset' : 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
        'Accept-Encoding' : null,
        'Accept-Language' : 'en-US,en;q=0.8',
        'Connection' : 'keep-alive'
    }
}

request(options, (error, response, html) => {
    if(error) throw error;
    console.log(html);
});


