module.exports = function check(str, bracketsConfig) {
    var arr = str.split('');
    let isCorrect = false;
   
    if(str.length % 2 !== 0)
    return isCorrect;
    else {
        let isHard = false;
        let count = 0;

        // simple check brackets
        for(let i = 0; arr.length > i; i++) {

            //check isHard brackets
            if(bracketsConfig.length > count && bracketsConfig.length > 1) {
                if(arr[i] === bracketsConfig[count][0]) {
                    count++;
                    if (count >= 1) {
                        isHard = true;
                        break;
                    }
                }
            }
            
            // simple check
            if(bracketsConfig[0][0] === arr[i]) {
                for(let j = i; arr.length > j; j++) {
                    if(bracketsConfig[0][1] === arr[j])
                    isCorrect = true; 
                    else
                    isCorrect = false;
                }
            }
        }
    

   
        //check isHard brackets
        if(bracketsConfig.length > 1 && isHard) {
            var exp = /[1-9]/;
            let isRepeat = false;
            let isNum = false;

            // check for duplicate brackets | and num
            for(let i = 0; bracketsConfig.length > i; i++) {
                if (bracketsConfig[i][0] === '|') 
                isRepeat = true;

                if(exp.test(bracketsConfig[i][0]))
                isNum = true;
            }

            if(isNum) {
                for(let j = 0; bracketsConfig.length > j; j++) {
                    let num = 0;

                    for(let i = 0; arr.length > i; i++) {
                      if(arr[i] === bracketsConfig[j][0]){
                        num++;
                      }
                    }
                    
                    if(num % 2 !== 0)
                    return false;
                }
                isCorrect = true;

            } else if(isRepeat) {
                for(let current = 0; arr.length > current; current++) {
                    if(arr[current] === '|') {
                        let count = 0;
                        for(let k = current ; arr.length > k; k++) {
                            if(count > 0) {
                            if (arr[k] === '|' && count === 1) {
                                break;
                            } else if (arr[k] === '|' && count === 2){
                                if(arr[k + 1] !== '|') {
                                return false;
                                }
                            } else if(arr[k] === '|' && count === 3) {
                                break;
                            }
                            }
                            count++;
                        }
                    }
                    isCorrect = true;
                }
            } else {
                // hard check
                // iterate complex brackets
                for(let current = 0; arr.length > current; current++) {
                    for(let j = 0; bracketsConfig.length > j; j++) {
                        // find position is opening bracket
                        if (arr[current] === bracketsConfig[j][0]) {
                            // to the end of the line
                            for(let k = current; arr.length > k; k++) {
                                    // iterate is closing bracket
                                for(let q = 0; bracketsConfig.length > q; q++) {
                                    // check for closing no-repeat bracket
                                    if(arr[k] === bracketsConfig[q][1] && 
                                    (j !== q) &&
                                    current + 1 === k) {
                                        return false;  
                                    }      
                                }
                            }
                        }
                    }
                }
                isCorrect = true; 
            }
        }
        return isCorrect;
    }
}
