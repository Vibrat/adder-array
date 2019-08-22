function integerAdder(a,b) {
    
    let sum = [];
    let systemNumber =  9;
    [a, b] = cleanData(a, b); 
    let remain = 0;

    for (let i = a.length - 1; i >= 0; i-- ) {
        let unit = a[i] + b[i] + remain;  
 
        if (unit > systemNumber) {
            
            unit   = unit % systemNumber - 1;
            remain = 1;  
        
        } else {         
            
            remain = 0;
        }

        sum.unshift(unit);
    }

    return sum;
} 


function cleanData(a, b) {
    
    if (!(a instanceof Array) || !(b instanceof Array)) {
        throw new Error('Parameters are not type of array')
    }
    
    while (a.length != b.length) {
        if (a.length > b.length) {
            b.unshift(0);
        } else {
            a.unshift(0);
        }
    }

    return [a, b]; 
}

let result1 = integerAdder([1,2,3,9,3,0,4,0], [0,2,3,4,5,7,8,9,0]);
console.log ('result 1', result1);

let result2 = integerAdder([1,1,1,1,5,6], [1,1,1,4,5,6]);
console.log ('result 2', result2);

let result3 = integerAdder([9], [1,1,1,1,1,2,1,0,1,1,1]);
console.log ('result 3', result3);

let result4 = integerAdder([1,2,2,3,4], [2,2,1]);
console.log ('result 4', result4);

// Test 50 charaters number
let result5 = integerAdder([1,2,2,3,4,1,2,2,3,4, 1,2,2,3,4,1,2,2,3,4, 1,2,2,3,4,1,2,2,3,4,1,2,2,3,4,1,2,2,3,4, 1,2,2,3,4,1,2,2,3,4, 1,2,2,3,4,1,2,2,3,4], [1,2,2,3,4,1,2,2,3,4, 1,2,2,3,4,1,2,2,3,4, 1,2,2,3,4,1,2,2,3,4,1,2,2,3,4,1,2,2,3,4, 1,2,2,3,4,1,2,2,3,4, 1,2,2,3,4,1,2,2,3,4]);
console.log ('result 5', result5);