    // GLOBAL FUNCTIONS 

    //clear input
    export const clearInput = (input) => {
        input.value = "";
    };

    //getting input value
    export const getInputValue = (input) => {
        return input.value;
    }

    //adding CSS class
    export const addClass = (element, className) => {
        element.classList.add(`${className}`);
    } 

    //removing CSS class
    export const removeClass = (element, className) => {
        element.classList.remove(`${className}`);
    }

    //checking if element contains css class
    export const checkIfContainsClass = (element, elementClass) => {
        return element.classList.contains(elementClass);
    }

    //checking if input is not empty
    export const checkIfInputNotEmpty = (input) => {
        return input.value !== "";
    }

    //check if checkbox is clicked
    export const checkCheckbox = (checkbox) => {
        if(checkbox.checked == true) {
            return true;
        }
    }

    //clearing checkbox to default
    export const clearCheckbox = (checkbox) => {
        checkbox.checked = false;
    }

    // Checking data attribute type in element
    export const checkDataAttribute = (element, data) => {
        return element.dataset[data];
    }

    // filtering out elements with given datta attribute to new array. Its important to as data use attribute only, exapmple wrong('data-attribute') good('attribute')
    export const filterArrayByData = (arr, data, value ) => {
        const newArray = arr.filter(element => element.dataset[data] === value);
        return newArray;
    }

    //setting data Attribute
    export const setDataAttribute = (element, data, value) => {
        element.setAttribute(data,value);
    }

    //returns text content of element
    export const getInnerText = (element) => {
        return element.textContent;
    }

    //sets new text content of element
    export  const setInnerText = (element, text) => {
        element.textContent = text;
    }

    //setting cursor on last letter of span
    export const setCurrsorOnLastLetter = (element) => {
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(element);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
    }

    //make clickable only elements sent to function in array 
    export const makeClickableOnly = (elements, elementEnableClass, bodyDissableClass) => { 
        elements.forEach(element => {
            element.classList.add(`${elementEnableClass}`);
        });
        document.body.classList.add(`${bodyDissableClass}`);
    }

    //reseting clickability of elements to default 
    export const resetClickableOnly = (elements, elementEnableClass, bodyDissableClass) => { 
        elements.forEach(element => {
            element.classList.remove(`${elementEnableClass}`);
        });
        document.body.classList.remove(`${bodyDissableClass}`);
    }

    //making first letter of string caitalized 
    export const firstLetterToCapital = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
