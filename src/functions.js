var polygonsIntersect = require('polygons-intersect');

//questa funzione ritorna un true se 2 poligoni si sormontano, ma anche solo fossero solo attaccati, ritorna false
exports.isIntercepting = function (poly1, poly2) {
    const intercepts = polygonsIntersect(poly1, poly2);
    return intercepts.length !== 0;
};




