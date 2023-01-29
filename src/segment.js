
exports.getSegmentExtensionInCanva = function (segment) {
    // LA FUNZIONE NON GESTISCE SEGMENTI CHE SI ORIGINANO FUORI DAL CANVA
    const canva = {
        "Xmin": 0,
        "Ymin": 0,
        "Xmax": 3000,
        "Ymax": 1500
    }
    // COEFFICENTE ANGOLARE DI F(X)=Y
    const M_x = this.getMx(segment);
    const Q_x = this.getQx(M_x, segment);

    // COEFFICENTE ANGOLARE DI F(Y)=X
    const M_y = this.getMy(segment);
    const Q_y = this.getQy(M_y, segment);



    const Ovest = this.segmentExtension(M_x, canva.Xmin, Q_x); // Restituisce la y a quota Xmin
    const Est = this.segmentExtension(M_x, canva.Xmax, Q_x); // Restituisce la y a quota Xmax
    const Sud = this.segmentExtension(M_y, canva.Ymin, Q_y); // Restituisce la x a quota Ymin
    const Nord = this.segmentExtension(M_y, canva.Ymax, Q_y); // Restituisce la x a quota Ymax


    // NORD = PUNTO X IN Y MAX
    let Nord_Boolean = false;
    if (Nord >= canva.Xmin && Nord <= canva.Xmax) {
        Nord_Boolean = true;
    }
    // SUD = PUNTO X IN Y MIN
    let Sud_Boolean = false;
    if (Sud >= canva.Xmin && Sud <= canva.Xmax) {
        Sud_Boolean = true;
    }
    // OVEST = PUNTO Y IN X MIN
    let Ovest_Boolean = false;
    if (Ovest >= canva.Ymin && Ovest <= canva.Ymax) {
        Ovest_Boolean = true;
    }
    // EST = PUNTO Y IN X MAX
    let Est_Boolean = false;
    if (Est >= canva.Ymin && Est <= canva.Ymax) {
        Est_Boolean = true;
    }


    if (Ovest_Boolean == true && Est_Boolean == true) {
        console.log("caso1");
        return [{ x: canva.Xmin, y: Ovest }, { x: canva.Xmax, y: Est }];
    } else if (Sud_Boolean == true && Nord_Boolean == true) {
        console.log("caso2");
        return [{ x: Sud, y: canva.Ymin }, { x: Nord, y: canva.Ymax }];
    } else if (Ovest_Boolean == true && Sud_Boolean == true) {
        console.log("caso3");
        return [{ x: canva.Xmin, y: Ovest }, { x: Sud, y: canva.Ymin }];
    } else if (Est_Boolean == true && Sud_Boolean == true) {
        console.log("caso4");
        return [{ x: canva.Xmax, y: Est }, { x: Sud, y: canva.Ymix }];
    } else if (Ovest_Boolean == true && Nord_Boolean == true) {
        console.log("caso5");
        return [{ x: canva.Xmin, y: Ovest }, { x: Nord, y: canva.Ymax }];
    } else if (Est_Boolean == true && Nord_Boolean == true) {
        console.log("caso6");
        return [{ x: canva.Xmax, y: Est }, { x: Nord, y: canva.Ymax }];
    } else {
        console.log("la retta del segmento nemmeno concide con il canva");
    }
}
exports.alignSegments = function (segmentOne, segmentTwo) {
    // Calcola i vettori dei segmenti
    let vectorOne = { x: segmentOne[1].x - segmentOne[0].x, y: segmentOne[1].y - segmentOne[0].y };
    let vectorTwo = { x: segmentTwo[1].x - segmentTwo[0].x, y: segmentTwo[1].y - segmentTwo[0].y };

    // Verifica se i vettori hanno la stessa direzione
    if (vectorOne.x * vectorTwo.x + vectorOne.y * vectorTwo.y < 0) {
        // Inverte l'ordine dei punti del segmento two per invertire la direzione del vettore
        segmentTwo.reverse();
    }
    return segmentTwo;
}


// calcola il coefficiente angolare del segmento specificato
exports.getMx = function (segment) {  //calculateSlopeX
    const point1 = segment.points[0];
    const point2 = segment.points[1];
    return (point2.y - point1.y) / (point2.x - point1.x);
}
exports.getMy = function (segment) {  //calculateSlopeY
    const point1 = segment.points[0];
    const point2 = segment.points[1];
    return (point2.x - point1.x) / (point2.y - point1.y);
}

// calculateIntercept= quota di origine (x o y) + il distacco da tale punto
exports.getQx = function (slope, segment) {
    const point1 = segment.points[0];
    console.log("Qx=", - slope * point1.x + point1.y);
    return - slope * point1.x + point1.y;
}
exports.getQy = function (M, segment) {
    const point1 = segment.points[0];
    console.log("Qx=", -M * point1.y + point1.x);
    return -M * point1.y + point1.x;
}
// la formula utilizza il coefficiente angolare, la quota e la quota di origine per calcolare un nuovo punto sulla retta passante per il segmento 
exports.segmentExtension = function (slope, point, intercept) {
    console.log("function=", slope, " *", point, " +", intercept);
    return slope * point + intercept;
}
exports.checkPointsInRange = function (nesting) {
    for (let i = 0; i < nesting.length; i++) {
        for (let j = 0; j < nesting[i].points.length; j++) {
            let point = nesting[i].points[j];
            if (point.x < 0 || point.x > 3000 || point.y < 0 || point.y > 1500) {
                console.log("Il punto " + point.x + ", " + point.y + " non è all'interno del range");
                return false;
            }
        }
    }
    console.log("Tutti i punti sono all'interno del range");
    return true;
};
// questa funzione ritorna la lunghezza tra 2 quote con la formula: d = √((x2-x1)² + (y2-y1)²)
exports.lengthSegment = function (segment) {
    const x1 = segment[0].x
    const y1 = segment[0].y
    const x2 = segment[1].x
    const y2 = segment[1].y
    const result = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)))
    return result
};
exports.getParallelSegment = function (segment, distanza) {
    let initial_point = segment[0];
    let final_point = segment[1];
    let vector_segment = { x: final_point.x - initial_point.x, y: final_point.y - initial_point.y };
    let length_segment = Math.sqrt(vector_segment.x * vector_segment.x + vector_segment.y * vector_segment.y);
    let normal_vector = { x: vector_segment.y / length_segment, y: -vector_segment.x / length_segment };
    let final_parallel1 = { x: initial_point.x + normal_vector.x * distanza, y: initial_point.y + normal_vector.y * distanza };
    let final_parallel2 = { x: final_point.x + normal_vector.x * distanza, y: final_point.y + normal_vector.y * distanza };
    return [initial_point, final_parallel1, final_parallel2, final_point];
}

exports.segment = function (polygon) {

    const distanza = 1;
    let parallel_segments = [];
    for (let i = 0; i < polygon.points.length; i++) {
        let segment = [polygon.points[i], polygon.points[(i + 1) % polygon.points.length]];
        let parallel_segment = this.getParallelSegment(segment, distanza);
        parallel_segments.push({ costa: parallel_segment });
    }
    return parallel_segments;

}

exports.checkSegmentIntersection = function (segment1, segment2) {

    // ciclo su tutti i punti del primo segmento
    for (let i = 0; i < segment1.points.length - 1; i++) {
        // ciclo su tutti i punti del secondo segmento
        for (let j = 0; j < segment2.points.length - 1; j++) {
            // estraiamo le coordinate x e y dei punti iniziali e finali dei segmenti
            let startX1 = segment1.points[i].x, startY1 = segment1.points[i].y;
            let endX1 = segment1.points[i + 1].x, endY1 = segment1.points[i + 1].y;
            let startX2 = segment2.points[j].x, startY2 = segment2.points[j].y;
            let endX2 = segment2.points[j + 1].x, endY2 = segment2.points[j + 1].y;
            // calcoliamo la differenza tra i punti finali e iniziali dei segmenti
            let deltaX1 = endX1 - startX1, deltaY1 = endY1 - startY1;
            let deltaX2 = endX2 - startX2, deltaY2 = endY2 - startY2;
            // calcoliamo il fattore di scala
            let d = (-deltaX2 * deltaY1) + (deltaX1 * deltaY2);
            // calcoliamo i fattori di scala per i punti di intersezione
            let s = (-deltaY1 * (startX1 - startX2) + deltaX1 * (startY1 - startY2)) / d;
            let t = (deltaX2 * (startY1 - startY2) - deltaY2 * (startX1 - startX2)) / d;

            // se i fattori di scala sono compresi tra 0 e 1 allora c'è un punto d'intersezione
            if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
                // calcoliamo le coordinate x e y del punto d'intersezione
                let intersectionX = startX1 + (t * deltaX1);
                let intersectionY = startY1 + (t * deltaY1);
                console.log(`Il punto di intersezione si trova in x: ${intersectionX}, y: ${intersectionY}`);
                return true;
            }
        }
    }
    return false;
}








/*
exports.extendSegments = function (polygon) {
    let extendedPolygon = [];
    for (let i = 0; i < polygon.points.length; i++) {
        let start = polygon.points[i];
        let end = polygon.points[(i + 1) % polygon.points.length];
        let extendedToStart = extendSegment({ start: start, end: end });
        let extendedToEnd = extendSegment({ start: end, end: start });
        //extendedPolygon.push(extendedToStart);
        extendedPolygon.push(extendedToEnd);
    }
    return extendedPolygon;
}

*/