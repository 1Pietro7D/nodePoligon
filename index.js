//npm run test (verifichiamo errori)
//npm run start (stampiamo i risultati)

var poly1 = require('./data/polygon_1.json');
var poly2 = require('./data/polygon_2.json');
var poly3 = require('./data/polygon_3.json');

var functions = require('./src/functions');
var angle = require('./src/angle');
var segment = require('./src/segment');
// console.log(angle);


const isPoly12Clipping = functions.isIntercepting(poly1.points, poly2.points);
const isPoly13Clipping = functions.isIntercepting(poly1.points, poly3.points);
const isPoly23Clipping = functions.isIntercepting(poly2.points, poly3.points);


// console.log("POLY 1,2:", isPoly12Clipping); //true
// console.log("POLY 1,3:", isPoly13Clipping); //false
// console.log("POLY 2,3:", isPoly23Clipping); //false


//test-1
var test_1 = require('./data/test_1.json');
const test1 = functions.isIntercepting(test_1.pol1, test_1.pol2);
// console.log("TEST1:", test1); //true

//test-2
var test_2 = require('./data/test_2.json');
const test2 = functions.isIntercepting(test_2.pol1, test_2.pol2);
// console.log("TEST2:", test2); //true IL CHE NON è CORRETTO, NON RICONOSCE I SINGOLI PUNTI

//test-3    
var test_3 = require('./data/test_3.json');
const test3 = functions.isIntercepting(test_3.pol1, test_3.pol2);
// console.log("TEST3:", test3); //false
// i poligoni si toccano ma non si sormontano

console.log("xxx" + segment.lengthSegment([poly1.points[0], poly1.points[1]]));

// console.log(segment.segment(poly1))
// console.log(segment.segment(poly1)[2])

var nesting1 = require('./data/nesting1.json');
console.log(segment.segment(poly2)[0]);

console.log(segment.getSegmentExtensionInCanva({ points: [{ x: -750, y: 0 }, { x: 750, y: 1500 }] }));
// console.log(segment.checkSegmentIntersection({ points: [{ x: 1, y: 2 }, { x: 4, y: 2 }] }, { points: [{ x: 2, y: 1 }, { x: 6, y: 3 }] }));
// console.log(segment.getMx({ points: [{ x: 1, y: 2 }, { x: 4, y: 2 }] }, { points: [{ x: 2, y: 1 }, { x: 6, y: 3 }] }));

