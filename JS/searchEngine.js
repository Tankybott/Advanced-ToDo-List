import {addClass, checkDataAttribute, getInnerText, getInputValue, removeClass, setDataAttribute } from "./globalFunctions.js";
// search engine variables
const searchPanel = document.querySelector('.main__search-panel');
export const searchInput = searchPanel.querySelector('.search-panel__input');
export const stateOfProgressSelect = searchPanel.querySelector('.search-panel__select');
const toDoList = document.querySelector('.todo-list__list')
const allTasks = toDoList.getElementsByClassName('todo-list__item'); // all tasks live collection

//Select Options 
const allOption = 'all';
const inProgressOption = 'inProgress';
const doneOption = 'done';

// css classes 
// hide classes are separated for search and select so both of search engine functions can exist and work together
const hiddenBySearchCss = "todo-list__item--hiddenBySearch";
const hiddenBySelectCss = 'todo-list__item--hiddenBySelect'


// data attributes 
const itemDataStatus = "taskstatus";
const itemDoneValue = "done";



//                             LOGIC

// Search engine
const startSearching = (searchInput) => {
    const inputValue = getInputValue(searchInput).toLowerCase(); //value inside search engine input


    //comparing inputValue to every single word inside each task, if matches to even one word inside task, makes whole task visible
    for (const task of allTasks) {
        const taskText = task.querySelector('.todo-list__item-text');
        const taskTextContent = getInnerText(taskText).toLowerCase();
        const taskTextWords = taskTextContent.split(' ');// splits whole text into separated words

        const match = taskTextWords.some((word) => word.includes((inputValue))); // checking if at least one of words in text matches input value

        // adds css class which hides list item if it doesnt match to input value
        if(!match) {
            addClass(task, hiddenBySearchCss);
        } else {
            removeClass(task, hiddenBySearchCss);
        }
    };
}

// State of progress 
const showTasksByStateOfProgress = (select) => {
    //checking which select option is selected
    const selectedIndex = select.selectedIndex;
    const selectedOption = select.options[selectedIndex];
    const selectedValue = selectedOption.value;

    //callback function which make visible tasks that are only in progress, condition is checking if list item DOESNT HAVE data attribute with done value
    const showInProgressOnly = (task) => {
        if(checkDataAttribute(task, itemDataStatus) != itemDoneValue){
            removeClass(task, hiddenBySelectCss);
        }
    }

    //callback function which make visible tasks that are only in progress, condition is checking if list item HAVE data attribute with done value
    const showDoneOnly = (task) => {
        if(checkDataAttribute(task, itemDataStatus) == itemDoneValue){
            removeClass(task, hiddenBySelectCss);
        } 
    }
    
    //Calling different function for each select option value
    for (const task of allTasks) {
        addClass(task, hiddenBySelectCss)

        if(selectedValue == allOption) {
            removeClass(task, hiddenBySelectCss);
        } else if(selectedValue == inProgressOption) {
            showInProgressOnly(task);
        } else if (selectedValue == doneOption){
            showDoneOnly(task);
        }
    }
}

//function that combines processes of search and shows items related to select options
export const filterTasks = () => {
    startSearching(searchInput);
    showTasksByStateOfProgress(stateOfProgressSelect);
}
