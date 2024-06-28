const themes = ['default', 'dark'];
    let currentThemeIndex = 0;

    function setTheme(themeName) {
      document.documentElement.setAttribute('data-theme', themeName);
      localStorage.setItem('theme', themeName);
    }

    function toggleTheme() {
      currentThemeIndex = (currentThemeIndex + 1) % themes.length; //Logic
      setTheme(themes[currentThemeIndex]);
    }

    function loadTheme() {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        currentThemeIndex = themes.indexOf(savedTheme);
        setTheme(savedTheme);
      } else {
        setTheme(themes[0]);
      }
    }
    const switchButton = document.querySelector(".switch")
    switchButton.addEventListener('click', ()=>{
        console.log("hi")
        toggleTheme()
        /* console.log(document.querySelector(':root')) */
        
    } );
    window.addEventListener('DOMContentLoaded', loadTheme());


const screen = document.querySelector(".screen")
const numbers = document.querySelectorAll(".num")
const screenDisplay = document.querySelector(".screen_Display")

//Adding numbers to screen
numbers.forEach(number => {
    number.addEventListener("click", ()=>{
         const newScreenDisplay = screenDisplay.textContent + number.innerHTML
         screenDisplay.textContent = newScreenDisplay
    })
})

//Deleting number from screen
document.querySelector("#Del").addEventListener("click", ()=>{
    const newScreenDisplay = screenDisplay.textContent.slice(0, (screenDisplay.textContent.length - 1)) /* This shows that the slice method does not count the last index */
    screenDisplay.textContent = newScreenDisplay
})

//Reset Function
document.querySelector("#reset").addEventListener("click", ()=>{
    screenDisplay.textContent = ""
})

//Key Operations
const additionOperation  = ()=> {
    const index = screenDisplay.textContent.indexOf("+")
    let firstNum;
    let result;
    const secondNum = screenDisplay.textContent.slice (index+ 1, screenDisplay.textContent.length)
    if(screenDisplay.textContent[0] === "-"){
        firstNum = screenDisplay.textContent.slice (1, index)
        if(firstNum>secondNum){
            result = "-" + (parseFloat(firstNum)  - parseFloat(secondNum))
        } else if ( secondNum > firstNum){
            result = parseInt(secondNum) - parseInt(firstNum)
        }
    }else{  
        firstNum = screenDisplay.textContent.slice (0, index)
        result = parseFloat(firstNum)  + parseFloat(secondNum)
    }
    console.log(result)
    if (isNaN(result) ){
        const newScreenDisplay = screenDisplay.textContent.slice(0, (screenDisplay.textContent.length - 1))
        return newScreenDisplay
    } else {
        console.log(result)
        return result
    }
    
    
}
const minusOperation = ()=> {
    const index = screenDisplay.textContent.indexOf("-")
    const firstNum = screenDisplay.textContent.slice (0, index)
    const secondNum = screenDisplay.textContent.slice (index+ 1, screenDisplay.textContent.length)
    const result = parseFloat(firstNum)  - parseFloat(secondNum)
    console.log(result)
    
    if (isNaN(result) ){
        const newScreenDisplay = screenDisplay.textContent.slice(0, (screenDisplay.textContent.length - 1))
        return newScreenDisplay
    } else {
        return result
    }
}
const divisionOperation = ()=> {
    const index = screenDisplay.textContent.indexOf("/")
    const firstNum = screenDisplay.textContent.slice (0, index)
    const secondNum = screenDisplay.textContent.slice (index+ 1, screenDisplay.textContent.length)
    const result = parseFloat(firstNum)/ parseFloat(secondNum)
    if (isNaN(result) ){
        const newScreenDisplay = screenDisplay.textContent.slice(0, (screenDisplay.textContent.length - 1))

        return newScreenDisplay
    } else {
        return result
    }
 
}
const multiplicationOperation = ()=> {
    const index = screenDisplay.textContent.indexOf("x")
    const firstNum = screenDisplay.textContent.slice (0, index)
    const secondNum = screenDisplay.textContent.slice (index+ 1, screenDisplay.textContent.length)
    const result = parseFloat(firstNum)  * parseFloat(secondNum)
    if (isNaN(result) ){
        const newScreenDisplay = screenDisplay.textContent.slice(0, (screenDisplay.textContent.length - 1))
        return newScreenDisplay
    } else {
        return result
    }
}
const multipleMinusOperation = (firstIndex, secondIndex)=>{
    const firstNum = screenDisplay.textContent.slice (firstIndex +1, secondIndex)
    const secondNum = screenDisplay.textContent.slice (secondIndex+ 1, (screenDisplay.textContent.length))
    result = "-" + (parseFloat(firstNum)  + parseFloat(secondNum))
    return result
}
const multipleSignsOperation = ()=>{

}

//Algorithm activated when equals-to is clicked
function makeChecks() {
    const checkPlus = screenDisplay.textContent.includes( "+")
    const checkMinus = screenDisplay.textContent.includes("-")
    const checkDivision = screenDisplay.textContent.includes("/")
    const checkMultiplication = screenDisplay.textContent.includes("x")
    
    const checksList = [checkPlus, checkMinus,checkDivision, checkMultiplication]
    return checksList
}

//Equivalency function
function equivalents() {
    const checksList = makeChecks()
    let result = 0
    let count = 0
    console.log(checksList)
    checksList.forEach(item=>{
        if (item === true){
            count += 1
        }
    })
    //There is only one sign in the expression
    if (count === 1){
        if (checksList[0] &&( screenDisplay.textContent[screenDisplay.textContent.length-1] != "+")){       
             result =  additionOperation() 
             console.log("added", result)   
         }
         if(checksList[1] &&( screenDisplay.textContent[screenDisplay.textContent.length-1] != "-") ){
            const firstIndex = screenDisplay.textContent.indexOf("-")
            const secondIndex = screenDisplay.textContent.lastIndexOf("-")
            // If there is only one minus
            if (  firstIndex === secondIndex){
                result =  minusOperation()
                console.log(result)
            } else if ( firstIndex != secondIndex){// there is more than one minus
                console.log("hi")
                result = multipleMinusOperation(firstIndex, secondIndex)
            }
            
            /* else if (secondIndex === 0){// there is only one minus, in the beginning
                " "
            } */
         }
         if(checksList[2] &&( screenDisplay.textContent[screenDisplay.textContent.length-1] != "/")){
             result =  divisionOperation()
         }
         if(checksList[3] &&( screenDisplay.textContent[screenDisplay.textContent.length-1] != "x")){
             result =  multiplicationOperation()
         }
    } else if( count === 2){//There are 2 signs in the expression
        let index;
        if(checksList[0]){
            index = screenDisplay.textContent.indexOf("+")
            const firstNum = screenDisplay.textContent.slice(1, index)
            const secondNum= screenDisplay.textContent.slice( index + 1, screenDisplay.textContent[screenDisplay.textContent.length])
            result = - parseFloat(firstNum) + parseFloat(secondNum)
        }
        if(checksList[2]){
            index = screenDisplay.textContent.indexOf("/")
            const firstNum = screenDisplay.textContent.slice(1, index)
            const secondNum= screenDisplay.textContent.slice( index + 1, screenDisplay.textContent[screenDisplay.textContent.length])
            result = -((parseFloat(firstNum))/ parseFloat(secondNum))
        }
        if(checksList[3]){
            index = screenDisplay.textContent.indexOf("x")
            const firstNum = screenDisplay.textContent.slice(1, index)
            const secondNum= screenDisplay.textContent.slice( index + 1, screenDisplay.textContent[screenDisplay.textContent.length])
            console.log("hi", firstNum, secondNum, index)   
            result = - (parseFloat(firstNum) * parseFloat(secondNum))
        }
    }
   
    console.log(count, result)
    return result
}
document.querySelector("#equals").addEventListener("click", ()=> {
    const result = equivalents()
    screenDisplay.textContent = result
})

//Algorithm When Plus is clicked
document.querySelector("#plus").addEventListener("click", (e)=> {
    let result = 0
    let counter = 0
    const checksList = makeChecks()
    checksList.forEach(item => {
        if (item === true && (screenDisplay.textContent[screenDisplay.textContent.length -1] + 1) > 1) {
            console.log("hi")
            if(screenDisplay.textContent.includes("-") && !screenDisplay.textContent.includes("+") ){
                const firstIndex = screenDisplay.textContent.indexOf("-")
                const secondIndex = screenDisplay.textContent.lastIndexOf("-")
                if (firstIndex != secondIndex){
                    result = equivalents()
                } else{
                    result = screenDisplay.textContent.slice(0, screenDisplay.textContent.length)
                }
            } else{
                result = equivalents()
            }
            screenDisplay.textContent = result + "+"
            counter += 1
        }
    }) 
    if (counter === 0 && screenDisplay.textContent.length != 0 && (screenDisplay.textContent[screenDisplay.textContent.length -1] + 1) > 1) {  
        console.log("hello")   
        screenDisplay.textContent = screenDisplay.textContent + "+"
    }
    })


//Algorithm When Minus is clicked
document.querySelector("#minus").addEventListener("click", ()=> {
    let result = 0
    let counter = 0
    const checksList = makeChecks()
    checksList.forEach(item => {
        if (item === true) {
            counter += 1
            console.log(checksList)
            const firstIndex = screenDisplay.textContent.indexOf("-")
            const secondIndex = screenDisplay.textContent.lastIndexOf("-")
            console.log(firstIndex, secondIndex)
    
            //TO show that there are 2 minus signs at different position
            if( firstIndex != secondIndex){
                if(screenDisplay.textContent[screenDisplay.textContent.length - 1] === "-"){
                    result = screenDisplay.textContent.slice(0, screenDisplay.textContent.length - 1)
                    console.log(result)
                } else{
                    result = multipleMinusOperation(firstIndex, secondIndex)
                }
                
            }
            else{//Just one minus sign
                if(screenDisplay.textContent[screenDisplay.textContent.length - 1] === "-"){//Ensuring One minus sign is not beside another
                    console.log(screenDisplay.textContent[screenDisplay.textContent.length - 1])
                    result = screenDisplay.textContent.slice(0, screenDisplay.textContent.length - 1)
                } 
                else{
                    console.log("hey")    
                    result = equivalents()
                }     
                
            }
            
            screenDisplay.textContent = result + "-"
            
        }
    }) 
    if (counter === 0) {
        screenDisplay.textContent = screenDisplay.textContent + "-"
    }
})


//Algorithm When Division is clicked
document.querySelector("#divide").addEventListener("click", ()=> {
    let result = 0
    let counter = 0
    const checksList = makeChecks()
    checksList.forEach(item => {
        if (item === true && (screenDisplay.textContent[screenDisplay.textContent.length -1] + 1) > 1) {
            console.log("hi")
            if(screenDisplay.textContent.includes("-") && !screenDisplay.textContent.includes("/") && screenDisplay.textContent[screenDisplay.textContent.length- 1] != "-" ){
                const firstIndex = screenDisplay.textContent.indexOf("-")
                const secondIndex = screenDisplay.textContent.lastIndexOf("-")
                if (firstIndex != secondIndex){
                    result = equivalents()
                } else{
                    result = screenDisplay.textContent.slice(0, screenDisplay.textContent.length)
                }
                
            } else{
                console.log("hi1")
                result = equivalents()
                
            }
            console.log(screenDisplay.textContent, result)
            counter += 1
            screenDisplay.textContent = result + "/"
            
        }
    }) 
    if (counter === 0 && screenDisplay.textContent.length != 0) {
        console.log("hi3")
        screenDisplay.textContent = screenDisplay.textContent + "/"
    }
})


//Algorithm When Multiply is clicked
document.querySelector("#multiply").addEventListener("click", ()=> {
    let result = 0
    let counter = 0
    const checksList = makeChecks()
    checksList.forEach(item => {
        if (item === true && (screenDisplay.textContent[screenDisplay.textContent.length -1] + 1) > 1) {
            console.log("hi")
            if(screenDisplay.textContent.includes("-") && !screenDisplay.textContent.includes("x") ){
                const firstIndex = screenDisplay.textContent.indexOf("-")
                const secondIndex = screenDisplay.textContent.lastIndexOf("-")
                if (firstIndex != secondIndex){
                    result = equivalents()
                } else{
                    result = screenDisplay.textContent.slice(0, screenDisplay.textContent.length)
                }
            } else{
                result = equivalents()
            }
            screenDisplay.textContent = result + "x"
            counter += 1
        }
    }) 
    if (counter === 0 && screenDisplay.textContent.length != 0 && (screenDisplay.textContent[screenDisplay.textContent.length -1] + 1) > 1) {  
        console.log("hello")   
        screenDisplay.textContent = screenDisplay.textContent + "x"
    }
})