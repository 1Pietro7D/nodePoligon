// Converts degrees to radians
exports.deg2rad = function (angle) {
    return angle * Math.PI / 180;
};

// Converts radians to degrees
exports.rad2deg = function (angle) {
    return angle * 180 / Math.PI;
};
/*  Questo codice esporta due funzioni, deg2rade rad2deg, che convertono rispettivamente 
    gli angoli da gradi in radianti e radianti in gradi. La deg2radfunzione accetta come 
    argomento un angolo in gradi e restituisce l'angolo equivalente in radianti utilizzando
    la formula angle*Math.PI/180. La rad2degfunzione fa il contrario, prendendo un angolo 
    in radianti e restituendo l'angolo equivalente in gradi usando la formula angle*180/Math.PI.
*/



// Returns a float with the desired precision
exports.float = function (equation, precision = 9) {
    return Math.round(equation * (10 ** precision)) / (10 ** precision);
}
/*  Questo codice esporta una funzione denominata float()che arrotonda un numero in virgola mobile a una precisione specificata. 
    Accetta due argomenti: un'equazione che produce un numero in virgola mobile e una precisione opzionale (il valore predefinito è 9).
    Utilizza il metodo Math.round() per arrotondare il risultato dell'equazione alla precisione specificata. Lo fa moltiplicando prima 
    l'equazione per 10 elevata alla potenza della precisione, quindi dividendo il risultato per lo stesso valore.
    In questo modo il risultato finale avrà la precisione desiderata. 
*/

// Returns m and q coefficient of a line
exports.lineCoeff = function (a, b) {
    const m = (a.y - b.y) / (a.x - b.x);
    const q = a.y - m * a.x;
    return [m, q];
};
/*  Questo codice esporta una funzione denominata "lineCoeff" che accetta due argomenti, "a" e "b", che sono due punti in uno spazio 2D con coordinate x e y. 
    La funzione restituisce un array di due elementi, i coefficienti m e q della retta che passa per i due punti.
    La funzione calcola innanzitutto la pendenza (m) della retta utilizzando la formula (ay-by)/(ax-bx) dove "a" e "b" sono i due punti.
    Quindi calcola l'intercetta sull'asse (q) della retta utilizzando la formula ay - m*ax , dove m è la pendenza della retta e a è uno dei punti della retta.
    Infine restituisce un array contenente la pendenza e l'intercetta della retta che passa per i due punti.
*/

// Calculates the angle between two vectors defined by two points
// The angle is positive in anti-clockwise. The angle is the rotation
// of the first vector to the second vector
// source: https://stackoverflow.com/questions/49741476/angle-between-two-lines-with-their-coordinate
exports.angleFromPoints = function (pA, pB) {
    const a1 = pA[0]; const a2 = pA[1];
    const b1 = pB[0]; const b2 = pB[1];
    const dAx = a2.x - a1.x;
    const dAy = a2.y - a1.y;
    const dBx = b2.x - b1.x;
    const dBy = b2.y - b1.y;
    return Math.atan2(dAx * dBy - dAy * dBx, dAx * dBx + dAy * dBy);
}

/*  Questo codice esporta una funzione denominata "angleFromPoints" che accetta due argomenti, "pA" e "pB", 
    che sono matrici che contengono due punti con coordinate x e y. 
    La funzione restituisce l'angolo in radianti tra le due rette definite dai quattro punti.
    La funzione assegna prima le coordinate x e y dei punti alle variabili a1, a2, b1 e b2. 
    Quindi calcola la differenza in x e y tra i due punti di ciascun array.
    Quindi utilizza il metodo Math.atan2() per calcolare l'angolo tra le due linee definite dai quattro punti. 
    Il metodo Math.atan2() restituisce l'angolo in radianti e questo angolo viene restituito dalla funzione.
    Il calcolo all'interno della funzione atan2 (dAx * dBy - dAy * dBx, dAx * dBx + dAy * dBy) è rispettivamente 
    il prodotto incrociato e scalare dei due vettori lineari, in questo modo atan2 restituisce l'angolo tra i due vettori.
*/
