/* const date = new Date('1996/08/03')


console.log(date);


 */

let string ="10/30/256"

console.log(string);

string = string.replaceAll("/","")
console.log(string);

let cantChar = string.length
console.log(cantChar);

let fechaFinal=""

if (cantChar <= 2) {
    fechaFinal = string.substring(0, cantChar);
} else if (cantChar <= 4) {
    fechaFinal = string.substring(0, 2);
    fechaFinal += "/";
    fechaFinal += string.substring(2, cantChar);
} else if (cantChar >= 5) {
    fechaFinal = string.substring(0, 2);
    fechaFinal += "/";
    fechaFinal += string.substring(2, 4);
    fechaFinal += "/";
    fechaFinal += string.substring(4, cantChar);
}


console.log("Fecha Final : ",fechaFinal);



