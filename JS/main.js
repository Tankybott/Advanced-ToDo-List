import {addTask, addInput, addBtn,} from './toDo.js';
import {searchInput, stateOfProgressSelect, filterTasks} from './searchEngine.js';


//starting app after dom content loaded
document.addEventListener('DOMContentLoaded', () => {

    //starting adding task logic
    addBtn.addEventListener('click', (e) => {
        e.preventDefault();
        addTask(addInput)});

    //preventing search input from reloading webpage after clicking enter;
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    });
    
    //starting search engine procesess
    searchInput.addEventListener('input', () => filterTasks());
    stateOfProgressSelect.addEventListener('change', () =>  filterTasks());

});


