const fs = require('fs');

const json = fs.readFileSync('./1065.json', 'utf-8');
const geojson = JSON.parse(json);
const feature = geojson.features[0];
const coordinates = feature.geometry.coordinates;
const output = coordinates.map((d, i) => {
  const id = i + 1;
  return {
    id,
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          id
        },
        geometry: {
          type: 'LineString',
          coordinates: coordinates.slice(0, id)
        }
      }
    ]
  };
});

fs.writeFileSync('./1066.json', JSON.stringify(output, null, 2), 'utf-8');
