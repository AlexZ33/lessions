const fs = require('fs');

const json = fs.readFileSync('./1052.json', 'utf-8');
const data = JSON.parse(json);
const checkcity = ["北京市","上海市","广州市","深圳市","成都市","杭州市","武汉市","重庆市","南京市","天津市","苏州市","西安市","长沙市","沈阳市","青岛市","郑州市","大连市","东莞市","宁波市","厦门市","福州市","无锡市","合肥市","昆明市","哈尔滨市","济南市","长春市","温州市","石家庄市","南宁市","常州市","南昌市","贵阳市","太原市","烟台市","南通市","珠海市","徐州市","海口市"];


const output= data.map((val,i) => {

  return checkcity.includes(val.name) ? {
    name: val.name,
    lng: val.lng,
    lat: val.lat,
    adcode: val.adcode
  }:null;
}).filter(v => v);;

fs.writeFileSync('./check2.json', JSON.stringify(output, null, 2), 'utf-8');

