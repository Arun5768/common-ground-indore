export const areas=[
 {id:'vijay',name:'Vijay Nagar',lat:22.7533,lng:75.8937,count:12},
 {id:'palasia',name:'Palasia',lat:22.7242,lng:75.8874,count:8},
 {id:'old',name:'Old city',lat:22.7186,lng:75.855,count:5},
 {id:'bhawar',name:'Bhawarkuan',lat:22.6926,lng:75.8679,count:10},
 {id:'rau',name:'Rau',lat:22.6344,lng:75.8122,count:6},
 {id:'corridor',name:'Super Corridor',lat:22.7865,lng:75.8094,count:7}
];
export const candidates=[{id:'palasia',name:'Palasia',lat:22.7242,lng:75.8874},{id:'vijay',name:'Vijay Nagar',lat:22.7533,lng:75.8937},{id:'bhawar',name:'Bhawarkuan',lat:22.6926,lng:75.8679}];
const rad=n=>n*Math.PI/180;
export function distance(a,b){const dLat=rad(b.lat-a.lat),dLng=rad(b.lng-a.lng);const h=Math.sin(dLat/2)**2+Math.cos(rad(a.lat))*Math.cos(rad(b.lat))*Math.sin(dLng/2)**2;return 6371.0088*2*Math.asin(Math.min(1,Math.sqrt(h)));}
export function analyse(origin,points,radius){if(!Number.isFinite(radius)||radius<=0)throw new Error('Invalid radius');let total=0,sum=0,inside=0,max=0;const rows=points.map(p=>{if(!Number.isInteger(p.count)||p.count<0||p.count>500)throw new Error('Counts must be whole numbers from 0 to 500');const km=distance(origin,p);total+=p.count;sum+=km*p.count;if(km<=radius)inside+=p.count;if(p.count>0)max=Math.max(max,km);return {...p,km,inside:km<=radius}});return {total,inside,coverage:total?inside/total*100:0,mean:total?sum/total:null,max:total?max:null,rows};}
export function rank(venues,points,radius){return venues.map(v=>({...v,...analyse(v,points,radius)})).sort((a,b)=>(a.mean??Infinity)-(b.mean??Infinity));}
export function planningBrief(venue,points,radius){const a=analyse(venue,points,radius);return {project:'Common Ground / Indore',createdAt:new Date().toISOString(),dataset:'Illustrative neighbourhood centres and user-adjustable scenario counts; not real registrations',method:'Haversine great-circle distance in kilometres; not road distance, journey time, or an isochrone',radiusKm:radius,selectedArea:venue,audience:points,results:{samplePeople:a.total,withinRadius:a.inside,coveragePercent:Number(a.coverage.toFixed(1)),weightedMeanKm:a.mean===null?null:Number(a.mean.toFixed(2)),farthestKm:a.max===null?null:Number(a.max.toFixed(2))},caveats:['Candidate areas are not booked venues or partners.','Neighbourhood centres are approximate and not address-level geocoding.','Confirm venue accessibility, public transport, capacity and actual travel conditions separately.']};}
