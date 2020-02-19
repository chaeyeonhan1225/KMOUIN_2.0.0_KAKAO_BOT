const request = require('request');
const options = {
    url : 'http://www.kmou.ac.kr/coop/dv/dietView/selectDietDateView.do?mi=1189',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36'
    }
}

request(options, (error, response, html) => {
    if(error) throw error;
    console.log(html);
})


