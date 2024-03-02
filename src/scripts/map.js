
(function(){
let myMap;
const init = () => {
 myMap = new ymaps.Map("map", {
   center: [55.755864, 37.617698],
   zoom: 13,
   controls: [],
 });
 
 let coords = [
     [55.749486, 37.591494],
     [55.763417, 37.629008],
     [55.763903, 37.606478],
     [55.737831, 37.628163],
   ],
   myCollection = new ymaps.GeoObjectCollection({}, {
     draggable: false,
     iconLayout: 'default#image',
     iconImageHref: './img/marker.svg',
     iconImageSize: [58, 73],
     iconImageOffset: [-35, -52]
   });
 
 for (let i = 0; i < coords.length; i++) {
   myCollection.add(new ymaps.Placemark(coords[i]));
 }
 
 myMap.geoObjects.add(myCollection);
 
 myMap.behaviors.disable('scrollZoom');
};
 
ymaps.ready(init);

})()