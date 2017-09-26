const fs = require('fs');

const json = fs.readFileSync('route.json', 'utf-8');
const geojson = JSON.parse(json);
const latlngs = geojson.latlngs[0];
//const coordinates = feature.geometry.coordinates;
const output = latlngs.map((d, i) => {
  const id = i + 1;
  return {
    type:"polyline",
     id,
    latlngs: latlngs.slice(0,id)
  };
});

fs.writeFileSync('route.json', JSON.stringify(output, null, 2), 'utf-8'); 	
