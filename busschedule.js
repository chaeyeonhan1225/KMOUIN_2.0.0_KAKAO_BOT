const { crawling_data } = require('./crawling');
const cheerio = require('cheerio');
const { url_yeongdo,url_190,url_kmou } = require('./mycon');

exports.yeongdo = crawling_data(url_yeongdo).then((result)=>{
    return new Promise((resolve,reject)=>{
        const $ = cheerio.load(result);
        let bus = [];
        $('item').each(function(element){
            const busnum = $(this).find('lineNo').text();
            const min1 = $(this).find('min1').text();
            const min2 = $(this).find('min2').text();
            const busschedule = {};
            busschedule.busnum = busnum;
            busschedule.min = [min1,min2];
            bus.push(busschedule);
        });
        resolve(bus);
    });
}).catch((error)=>{
    console.error(error);
});


exports.kmoubus = crawling_data(url_kmou).then((result)=>{
    return new Promise((resolve,reject)=>{
        const start = result.indexOf('<tbody>');
        const end = result.indexOf('</tbody>');
        result = result.substring(start,end);
        let timetable = result.split('</tr>');
        timetable.shift();
        timetable.pop();
        timetable.pop();
        let totalbustime = [];
        timetable.forEach(function(element,idx){
            const td = element.split('<td>');
            let bustime = [];
            td.forEach(function(value,idx){
                if(value.indexOf(':')>=0|| value.indexOf('-')>=0||value.indexOf('식')>=0){
                    const end = value.indexOf("</td>");
                    value = value.substring(0,end);
                    bustime.push(value);
                }
            });
            totalbustime.push(bustime);
        });
        let kmoubus = {
            weekday: [],
            holiday: [],
        };
        for(let i=0;i<totalbustime.length;++i){
            for(let j=0;j<totalbustime[i].length;++j){
                if(['휴식','중식','석식','-'].indexOf(totalbustime[i][j])>=0){
                    continue;
                }
                if(j<2){
                    kmoubus.weekday.push(totalbustime[i][j]);
                }
                else{
                    kmoubus.holiday.push(totalbustime[i][j]);
                }
            }
        }
        resolve(kmoubus);
    });
}).catch((error)=>{
    console.error(error);  
});


exports.kmou190bus = crawling_data(url_190).then((result)=>{
    return new Promise((resolve,reject)=>{
        let kmou190bus = {
            weekday: [],
            saturday: [],
            holiday: [],
        };
        const start = result.indexOf('<tbody>');
        const end = result.indexOf('</tbody>');
        result = result.substring(start,end);
        const tr = result.split('<tr>');
        tr.shift();
       let totaltime = [];
        tr.forEach(function(value,idx){
            const bustime = value.split('</td>');
            let temptime = [];
            bustime.forEach(function(value,idx){
                const start = value.indexOf('>')+1;
                value = value.substring(start);
                if(value.indexOf('\n')<0){
                    temptime.push(value);
                }
            });
            totaltime.push(temptime);
        });
        for(let j=0;j<12;++j){
            for(let i=0;i<16;++i){
                if(totaltime[i][j]!=''){
                    if(j<4){
                        kmou190bus.weekday.push(totaltime[i][j]);
                    }
                    else if(j<8){
                        kmou190bus.saturday.push(totaltime[i][j]);
                    }
                    else{
                        kmou190bus.holiday.push(totaltime[i][j]);
                    }
                }
            }
        }
        
        resolve(kmou190bus);
        }); // Promise
}).catch((error)=>{
    console.error(error);
});