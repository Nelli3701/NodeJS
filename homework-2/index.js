function getAreaTriangle (a, b, c) {
    if ((a + b < c) || (a + c < b) || (b + c < a)) {
        return console.error("A triangle with such sides cannot exist.");
    }
    let halfP = (a + b + c) /2;
    return Math.sqrt(halfP * ((halfP - a) * (halfP - b) * (halfP - c)));
}

function getAreaSquare (a) {
    if (a <=0 ){
        return console.error("A square with such sides cannot exist.");
    }
    return Math.pow(a, 2);
}

function getAreaRectangle (a, b) {
    if ((a <= 0) || (b <= 0)){
        return console.error("A rectangle with such sides cannot exist.");
    }
    return a * b;
}

function getAreaCircle (radius) {
    if (radius <= 0) {
        return console.error("A circle with such radius cannot exist.");
    }
    return Math.PI * Math.pow(radius, 2);
}

module.exports = { getAreaTriangle, getAreaSquare, getAreaRectangle, getAreaCircle };