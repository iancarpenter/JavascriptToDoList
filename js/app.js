const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

let LIST, id;

// get item from local storage
let data = localStorage.getItem("TODO");

if (data) {
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST);
} else {
    LIST = [];
    id = 0;
}

// load the items into the user interface
function loadList(array) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// clear local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

// show todays date
const options = {weekday: "long", month: "short", day: "numeric" };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-UK", options);

function addToDo(toDo, id, done, trash) {

    if (trash) {
        return;
    }

    const DONE = done ? CHECK : UNCHECK;

    const LINE = done ? LINE_THROUGH : "";

    const text =  `<li class="item">
                     <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                     <p class="text ${LINE}">${toDo}</p>
                     <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>`;

    const position = "beforeend";
    list.insertAdjacentHTML(position, text);
}

function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);    
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

list.addEventListener("click", function () {
    let element = event.target;
    let elementJOB = element.attributes.job.value; // delete or complete

    if (elementJOB == "complete") {
        completeToDo(element);
    } else if (elementJOB == "delete") {
        removeToDo(element)
    }
    // add item to local storage
    localStorage.setItem("TODO", JSON.stringify(LIST));
});


document.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
        const toDo = input.value;
        // call addToDo if the input field has something in it...
        if (toDo) {
            addToDo(toDo, id, false, false);
            LIST.push(
                {
                    name: toDo,
                    id: id,
                    done: false,
                    trash: false
                }
            );
            // add this item to local storage
            localStorage.setItem("TODO", JSON.stringify(LIST));            
            id++;
        }
        input.value = "";
    }
});



