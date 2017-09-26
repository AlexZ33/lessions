//https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
const fs = require('fs');

const json = fs.readFileSync('./1072.json', 'utf-8');
const data = JSON.parse(json);
data.sort((a, b) => {
  console.log(b);
  if (a.t === b.t) {
    if (a.lat === b.lat) {
      if (a.lng === b.lng) {
        return 0;
      } else if (a.lng > b.lng) {
        return 1;
      } else {
        return -1;
      }
    } else if (a.lat < b.lat) {
      return 1;
    } else {
      return -1;
    }
  } else if (a.t > b.t) {
    return 1;
  } else {
    return -1;
  }
});

fs.writeFileSync('./1073.json', JSON.stringify(data, null, 2), 'utf-8');
