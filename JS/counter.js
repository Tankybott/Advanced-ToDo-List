import { filterArrayByData, setInnerText} from './globalFunctions.js';
//Numbers in display panel 
const counterAllNumber = document.querySelector('[data-numberType="all"]')
const counterImportantNumber = document.querySelector('[data-numberType="important"]')
const counterInProgressNumber = document.querySelector('[data-numberType="inprogress"]')

// DataAtributes
const itemDataStatus = "taskstatus";
const itemImportantValue = "important";
const itemDoneValue = "done"


//                                        LOGIC 

//Starting counting, its IMPORTANT!!! to call this function in every function that is changing "data-type" of list item in aplication
export const startCounting = () => {
    const allTasks = document.querySelectorAll('.todo-list__item');

    setAllTaskNumber(allTasks);
    setImportantTaskNumber(allTasks);
    setInProgressTaskNumber(allTasks);
}

//Setting number of new tasks
const setAllTaskNumber = (allTasks) => {
    const newAllNumber = allTasks.length;
    counterAllNumber.textContent = `${newAllNumber}`
}

//setting number of important tasks 

const setImportantTaskNumber = (allTasks) => {
    const allTasksArr = [...allTasks]
    const importantTasks = filterArrayByData(allTasksArr, itemDataStatus, itemImportantValue); //filtering alltasks array, if element in array has data-attribute important, pushes this element to new array
    const importantTasksNumber = importantTasks.length;
    setInnerText(counterImportantNumber, importantTasksNumber); //setting number of inportant task to counter
}

const setInProgressTaskNumber = (allTasks) => {
    const allTasksArr = [...allTasks]
    const doneTasks = filterArrayByData(allTasksArr, itemDataStatus, itemDoneValue);
    const inProgressTasksAmount = allTasks.length - doneTasks.length
    setInnerText(counterInProgressNumber, inProgressTasksAmount); //setting number of in progress task to counter
}




