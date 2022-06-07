let result = document.querySelector("#result")
// eventListner for "="
document.querySelector(".equal").addEventListener("click", equalClicked)
// eventListeners for all other buttons
let buttons = Array.from(document.querySelectorAll(".button"))
buttons.map(button => {
    button.addEventListener("click", clicked)
})


// runs after "=" is clicked
function equalClicked() {
    let arr = result.innerText
    let checked = checkIfValidExpression(arr)
    // console.log(checked) will be undefined if not validExpression
    if (checked) {
        let indexesOfOperators = []
        let operators = []
        let nums = []

        // puts operators and their indexes in variables above
        getIndexesAndOperators(arr, indexesOfOperators, operators)
        // puts numbers in variable "nums"
        splitNums(arr, indexesOfOperators, nums)

        doCalc(nums, operators)
    }
}


function checkIfValidExpression(expression) {
    if (expression === "") {
        alert("Enter something in order to calculate")
        // checks if last pressed button is number. Example :  4*789-32+ invalid expression because ends with operator ++++
    } else if (expression.slice(-1) < '0' || expression.slice(-1) > "9") {
        alert("Please finish expression with number")
    } else if (!hasOperator()) {
        alert("Please put in some operators in order to calculate")
    } else {
        return true
    }
}

// check if expression has operator or it is just a number. Cant calculate without operator
function hasOperator() {
    if (result.innerText.includes("+") || result.innerText.includes("-") || result.innerText.includes("*") || result.innerText.includes("/") || result.innerText.includes("%")) {
        return true
    }
}


// return list of operators and their indexes
function getIndexesAndOperators(arr, indexesOfOperators, operators) {
    // If char is operator then we copy him and his index into their arrays. Arr stays same.
    for (let i = 0; i < arr.length; i++) {
        if (isOperator(arr[i]) ) {
            indexesOfOperators.push(i)
            operators.push(arr[i])
        }
    }
}

// split all NUMBERS (NOT digits) from expression into array
function splitNums(arr, indexesOfOperators, nums) {
    for (let i = 0; i < indexesOfOperators.length; i++) {
        // adding first number
        if (!nums[0]) {
            nums.push(Number(arr.slice(0, indexesOfOperators[i])))

        } else {
            // if there is no +1 then it takes operator[i-1] as first digit
            nums.push(Number(arr.slice(indexesOfOperators[i - 1] + 1, indexesOfOperators[i])))
        }
    }
    // adding last number (after last operator)
    nums.push(Number(arr.slice(indexesOfOperators[indexesOfOperators.length - 1] + 1)))
}


// calculate * / % first, then + and -
function doCalc(nums, operators) {
    doOperatorsWithPriority(nums, operators)
    addAndSubtract(nums, operators)
    // just to clear memory, we only need last Num because it is solution
    nums = nums[nums.length - 1]
    result.innerText = nums
}

function doOperatorsWithPriority(nums, operators) {
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === "*") {
            // result in 2nd number, 1st number goes to 0 because it is already calculated into 2nd 
            nums[i + 1] = nums[i] * nums[i + 1]
            nums[i] = 0
        } else if (operators[i] === "/") {
            nums[i + 1] = nums[i] / nums[i + 1]
            nums[i] = 0
        } else if (operators[i] === "%") {
            nums[i + 1] = nums[i] % nums[i + 1]
            nums[i] = 0
        }
    }
}

function addAndSubtract(nums, operators) {
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === "+") {
            nums[i + 1] = nums[i] + nums[i + 1]
            nums[i] = 0
        } else if (operators[i] === "-") {
            nums[i + 1] = nums[i] - nums[i + 1]
            nums[i] = 0
        }
    }
}


// handles what happends when we click some button
function clicked() {
    let current = this.innerText
    let last = result.innerText.slice(-1)

    // AC deletes whole expression
    if (current === "AC") {
        result.innerText = ""
        // DEL delete just last char
    } else if (current === "DEL") {
        result.innerText = result.innerText.slice(0, -1)
        // if it is operation % / * - + or dot "."
    } else if (isOperator(current) || isDot(current)) {
        handleOperator(current, last)
    } else{
        result.innerText += current
    }
}

function handleOperator(current, last){
    // must start with number
    if (result.innerText.length === 0) {
        alert("Please start expression with number")
        // handles case of 2 operations in a row ++, %*, /+, or something like that
    }else if (isDot(last) || isOperator(last)) {
        alert("Please put number before another operation")
        // cant have 45.454.545 (2 dots in 1 number)
    } else if(isDot(current) && alreadyDecimal()){
            alert("This number is already decimal, please put number or operation")
    } else {
        result.innerText += current
    }
}

// check if char is operator or "."
function isOperator(current) {
    if (isAdd(current) || isSubtract(current) || isMultiply(current) || isDivide(current) || isModule(current)) {
        return true
    }
}

function isAdd(current) {
    if (current === "+") {
        return true
    }
}

function isSubtract(current) {
    if (current === "-") {
        return true
    }
}

function isMultiply(current) {
    if (current === "*") {
        return true
    }
}

function isDivide(current) {
    if (current === "/") {
        return true
    }
}

function isModule(current) {
    if (current === "%") {
        return true
    }
}

function isDot(current) {
    if (current === ".") {
        return true
    }
}

function alreadyDecimal(){
    let indexLastDot=0
    arr = result.innerText
    for(let i=1; i<arr.length; i++){
        if(isDot(arr[i])){
            indexLastDot = i
        }
    }
    if(indexLastDot>0){
        let afterLastDot = Number (arr.slice(indexLastDot+1) )
        console.log(afterLastDot)
        // if it is number that means after last dot "." we dont have any operators, so number is already decimal and cant put dot again
        if( !isNaN(afterLastDot)){
            return true
        }
    }
}
