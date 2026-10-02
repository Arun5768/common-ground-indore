import fs from 'node:fs';
fs.mkdirSync('dist/vendor',{recursive:true});
fs.cpSync('site','dist',{recursive:true});
for(const name of ['leaflet.js','leaflet.css'])fs.copyFileSync('node_modules/leaflet/dist/'+name,'dist/vendor/'+name);
fs.copyFileSync('node_modules/leaflet/LICENSE','dist/vendor/LEAFLET-LICENSE.txt');
console.log('Built Common Ground.');
