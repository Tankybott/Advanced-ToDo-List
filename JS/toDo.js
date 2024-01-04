import { startCounting } from "./counter.js";

import {
  clearInput,
  addClass,
  checkIfInputNotEmpty,
  checkCheckbox,
  clearCheckbox,
  checkDataAttribute,
  checkIfContainsClass,
  removeClass,
  setDataAttribute,
  getInnerText,
  setCurrsorOnLastLetter,
  makeClickableOnly,
  resetClickableOnly,
  firstLetterToCapital,
  setInnerText,
  getInputValue,
} from "./globalFunctions.js";

import { filterTasks } from "./searchEngine.js";

// Setting addpanel variables
const addPanel = document.querySelector(".main__add-panel");
export const addInput = addPanel.querySelector(".add-panel__input");
const addCheckBox = addPanel.querySelector(".add-panel__radio");
export const addBtn = addPanel.querySelector(".add-panel__button");

// Setting todo list variables
const todo = document.querySelector(".todo-list-main");
const todoError = todo.querySelector(".todo-list__console");
const todoList = todo.querySelector(".todo-list__list");

// CSS CLASSES
//classes for list items
const listItemCss = "todo-list__item";
const listItemImportantCss = "todo-list__item--important";
const listItemDoneCss = "todo-list__item--done";
const listItemTextCss = "todo-list__item-text";
const listItemTextDoneCss = "todo-list__item-text--done";
const listItemTextImportantCss = "todo-list__item-text--important";

//classes for buttons inside list items
const itemBtnCss = "todo-list__item-button";
const itemBtnImportantCss = "todo-list__item-button--important";
const itemBtnImportantActiveCss = "todo-list__item-button--important-active";
const itemBtnDoneCss = "todo-list__item-button--done";
const itemBtnDoneActiveCss = "todo-list__item-button--done-active";
const itemBtnEditCss = "todo-list__item-button--edit";
const itemBtnEditActiveCss = "todo-list__item-button--edit-active";
const itemBtnDeleteCss = "todo-list__item-button--delete";
//clickable/non clickable classes
const clickableCss = "clickable";
const nonClickableCss = "non-clickable";

// DataAtributes
const itemDataStatus = "taskstatus";
const itemImportantValue = "important";
const itemDoneValue = "done";

//Live collection of all buttons that are inside list-item
const tasksButtons = document.getElementsByClassName("todo-list__item-button");

//                                     LOGIC

//adding task with value from add panel input, and setting correct CSS class
export const addTask = (input) => {
  const taskValue = firstLetterToCapital(getInputValue(input)); //declaring taskValue as a add-panel-input value with first letter capital
  //checking if input is not empty, if so, sending todo-console messege and breaking function
  if (!checkIfInputNotEmpty(input)) {
    sendTodoConsoleMsg("You can't add an empty task!", todoError);
    return;
  }

  const newItem = createNewTask(taskValue); // creating new task

  // checking if "important" checkbox is checked if so, function is adding task with important class and data attribute, else adding normal task
  if (checkCheckbox(addCheckBox)) {
    addClass(newItem, listItemImportantCss);
    setDataAttribute(newItem, `data-${itemDataStatus}`, itemImportantValue);
    sendTodoConsoleMsg("You added an important task", todoError);
  } else {
    sendTodoConsoleMsg("You added a task", todoError);
  }

  // adding css class, pushing list-item to todo-list and clearing inputs in form
  addClass(newItem, listItemCss);
  todoList.append(newItem);
  clearInput(input);
  clearCheckbox(addCheckBox);
  startCounting(); // runs counter
  runBtnsLogic(); // starting button events inside list items
};

// Creating new task
const createNewTask = (taskText) => {
  const newItem = document.createElement("li");
  newItem.innerHTML = `<span class="todo-list__item-text">${taskText}</span>
    <div class="todo-list__item-button-box">
        <button class="${itemBtnCss} ${itemBtnDoneCss}">
            <img src="img/svg/done-mini-1484-svgrepo-com.svg" alt="" class="todo-list__item-button-svg">
        </button>

        <button class="${itemBtnCss} ${itemBtnImportantCss}">
            <img src="img/svg/exclamation-mark-svgrepo-com.svg" alt="" class="todo-list__item-button-svg">
        </button>

        <button class="${itemBtnCss} ${itemBtnEditCss}">
            <img src="img/svg/edit-svgrepo-com.svg" alt="" class="todo-list__item-button-svg">
        </button>
         
        <button class="${itemBtnCss} ${itemBtnDeleteCss}">
            <img src="img/svg/cross-mark-svgrepo-com.svg" alt="" class="todo-list__item-button-svg">
        </button>
    </div>`;

  return newItem;
};

// changing messege is error info
const sendTodoConsoleMsg = (message, consoleElement) => {
  consoleElement.textContent = `${message}`;
};

//LIST ITEM BUTTONS LOGIC

// handling list item buttons click, calling different function according to targeted button class
const handleButtons = (event) => {
  const targetedTask = event.target.closest("li");
  const targetedButtonBox = event.target.closest(".todo-list__item-button-box");
  const targetedButton = event.target.closest("button");
  const targetedText = targetedTask.querySelector(`.${listItemTextCss}`);

  if (checkIfContainsClass(targetedButton, itemBtnImportantCss)) {
    handleImportantBtn(
      targetedTask,
      targetedButton,
      targetedText,
      targetedButtonBox
    );
  } else if (checkIfContainsClass(targetedButton, itemBtnDoneCss)) {
    handleDoneBtn(
      targetedTask,
      targetedButton,
      targetedText,
      targetedButtonBox
    );
  } else if (checkIfContainsClass(targetedButton, itemBtnDeleteCss)) {
    handleDeleteBtn(targetedTask, todoList);
  } else if (checkIfContainsClass(targetedButton, itemBtnEditCss)) {
    handleEditBtn(targetedTask, targetedButton, todoList);
  }
  startCounting(); //starts counter
};

// handling click on important button
const handleImportantBtn = (task, button, text, buttonBox) => {
  //function removes all settings that were adden when important status was on
  const removeDoneStatus = () => {
    const doneBtn = buttonBox.querySelector(`.${itemBtnDoneCss}`); //selecting important button insaide task which was clicked
    removeClass(doneBtn, itemBtnDoneActiveCss);
    removeClass(text, listItemTextDoneCss);
    removeClass(task, listItemDoneCss);
  };

  if (checkDataAttribute(task, itemDataStatus) == itemImportantValue) {
    removeClass(task, listItemImportantCss); //removes css class important from task
    removeClass(text, listItemTextImportantCss); //removes class that chaning underline from text
    removeClass(button, itemBtnImportantActiveCss); //removes css class important from button
    setDataAttribute(task, `data-${itemDataStatus}`, ""); //sets data attribute itemDataStatus empty
  } else {
    addClass(task, listItemImportantCss); //adding imporatnt css calss to task
    addClass(button, itemBtnImportantActiveCss); //adding important css class to button
    addClass(text, listItemTextImportantCss); //adds class that is changing color of text underline
    setDataAttribute(task, `data-${itemDataStatus}`, itemImportantValue);
    removeDoneStatus(); //removing styles from
  }
  sendTodoConsoleMsg("You have changed task status", todoError);
};

//handling click on done btn
const handleDoneBtn = (task, button, text, buttonBox) => {
  //function removes all settings that were adden when important status was on
  const removeImportantStatus = () => {
    const importantBtn = buttonBox.querySelector(`.${itemBtnImportantCss}`); //selecting important button insaide task which was clicked
    removeClass(importantBtn, itemBtnImportantActiveCss);
    removeClass(text, listItemTextImportantCss);
    removeClass(task, listItemImportantCss);
  };

  if (checkDataAttribute(task, itemDataStatus) == itemDoneValue) {
    removeClass(task, listItemDoneCss); //removing css class done from item
    removeClass(button, itemBtnDoneActiveCss); //removing css class done active from button
    removeClass(text, listItemTextDoneCss); //removing class that is changing color of text underline
    setDataAttribute(task, `data-${itemDataStatus}`, ""); //sets data attribute itemDataStatus for empty
  } else {
    addClass(task, listItemDoneCss); //adding css class done to task
    addClass(button, itemBtnDoneActiveCss); //adding css class done active to button
    addClass(text, listItemTextDoneCss); //adding class that changes color of text underline
    setDataAttribute(task, `data-${itemDataStatus}`, itemDoneValue);
    removeImportantStatus(); //removes setting of important stauts
  }

  sendTodoConsoleMsg("You have changed task status", todoError);
  filterTasks(); //this function reacts on search engine if done/inprogress status was changed
};

//handling click on delete button
const handleDeleteBtn = (task, list) => {
  list.removeChild(task);
  sendTodoConsoleMsg("You deleted task", todoError);
};

//handling edit button
const handleEditBtn = (task, targetedButton, list) => {
  const targetedText = task.querySelector(".todo-list__item-text");

  // function is adding edid status which means making span content-editable, adding css class to button which represents active status and setting cursor on last letter of task which is being edited
  const addEditStatus = () => {
    setDataAttribute(targetedText, "contenteditable", "true");
    setCurrsorOnLastLetter(targetedText);
    addClass(targetedButton, itemBtnEditActiveCss);
    targetedText.focus();
    addClass(targetedButton, nonClickableCss); // this line makes possible to turn off edit status by clicking edit button
    makeClickableOnly([targetedText], clickableCss, nonClickableCss); //making clickable only targeted task until edit status is active

    targetedText.addEventListener("blur", removeEditStatus); // closing edit status by clicking on background

    sendTodoConsoleMsg("You are editing task", todoError);
  };

  // function removes edit status
  const removeEditStatus = () => {
    // deletes task if user will delete content inside task when editing
    if (targetedText.textContent == "") {
      list.removeChild(task);
      sendTodoConsoleMsg("You deleted task", todoError);
      startCounting();
    }

    removeClass(targetedButton, itemBtnEditActiveCss);
    removeClass(targetedButton, nonClickableCss);
    resetClickableOnly([targetedText], clickableCss, nonClickableCss); // reseting document to be clickable again
    setDataAttribute(targetedText, "contenteditable", "false");
    setInnerText(
      targetedText,
      firstLetterToCapital(getInnerText(targetedText))
    ); // capitalizing first letter of task

    sendTodoConsoleMsg("Edited task has been saved", todoError);
  };

  // running edit status on first click
  addEditStatus();
};

// adding event listeners to buttons in list items, function is called in add task function
const runBtnsLogic = () => {
  for (const button of tasksButtons) {
    button.addEventListener("click", handleButtons);
  }
};
