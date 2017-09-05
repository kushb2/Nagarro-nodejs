const  RESPONCE = 4;
const  STATUS =  200;
const  ActiveTodoId = "active";
const  CompleteTodoId = "Complete";
const  DeletedTodoId = "Deleted";
const  NewTodoId = "newTodo";
window.onload = getTodo();// getTodoAJAX

function addTodoElement(todoData) {
    //console.log(todoData);
     let ActiveParent =  document.getElementById(ActiveTodoId);
     let CompleteParent =  document.getElementById(CompleteTodoId);
     let DeletedParent =  document.getElementById(DeletedTodoId);
    ActiveParent.innerHTML = '';
        //= CompleteParent.innerHTML = DeletedParent.innerHTML = '';

    list = JSON.parse(todoData);

    keys = Object.keys(list);
    console.log(keys);
    keys.forEach(function (t) {
       element  =  createTodoElement(t,list[t]);
       if(element.parent === 'Active'){
          //console.log("Active " + t);
           ActiveParent.appendChild(element.element);
       }
        else if(element.parent === 'Delete'){
            ActiveParent.appendChild(element.element);
        }
        else if(element.parent === 'Complete'){
            ActiveParent.appendChild(element.element);
        }
    });
};


function createTodoElement(id,data) {
    newElement = document.createElement('div'); //create new layout div
    newElement.setAttribute('id',id);//set layout id as id key
    if(data.status !== 'Delete'){ // either active or completed
        // bith need a checkbox a lebel and a button with cross sign
        newElement.setAttribute('class','row'); // set class row
        checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.setAttribute('value',id);
        checkBox.setAttribute('data-id',id);
        checkBox.setAttribute('onchange','changeStatusTodoAjax('+id+')');
        if(data.status === 'Complete'){
            checkBox.checked = "TRUE";
        }
        checkBox.setAttribute('class','col-2 check_box');
        newElement.appendChild(checkBox);
        label = document.createElement('label');
        label.innerText = data.title;
        label.setAttribute('class', 'col-8');
        //label.setAttribute('for', id);
        newElement.appendChild(label);
         close = document.createElement('button');
        close.setAttribute('class', 'icon close');
        close.innerHTML = '&times;'; // cross sign
        close.setAttribute('onclick', 'deleteTodoAJAX('+id+')');
        newElement.appendChild(close);
    } else newElement.innerText = todo.title;

    return ({parent: data.status, element: newElement});
    }
    
    
    function changeStatusTodoAjax(id) {
            console.log("check1");
                console.log(id);
        let xhr = new XMLHttpRequest();
        xhr.open('PUT', '/api/todos/'+id, true);
        console.log("check2");
        xhr.onreadystatechange = function () {
            console.log("check2");
            if(xhr.readyState === RESPONCE){
                if(xhr.status === STATUS){
                    let ActiveParent = document.getElementById(ActiveTodoId);
                    let CompleteParent = document.getElementById(CompleteTodoId);
                    let oldchild = document.getElementById(id);
                    let data = JSON.parse(xhr.responseText);
                    let x = Object.keys(data)[0];
                    let newElement = createTodoElement(x,data[x]);
                    console.log(newElement);
                    if(newElement.parent === 'Active'){
                        console.log("check3");
                        CompleteParent.removeChild(oldchild);
                        ActiveParent.appendChild(newElement.element);
                    }
                    else{
                        console.log("check4");
                        ActiveParent.removeChild(oldchild);
                        CompleteParent.appendChild(newElement.element);
                    }
                }
            }
        };
        xhr.send(null);
    }



// get all todos from  db call addtodoelements
function getTodo() {
    xhr = new XMLHttpRequest();
      xhr.open("GET","/api/todos",true);
    xhr.onreadystatechange = function () {
        if(xhr.readyState === RESPONCE){
            if(xhr.status === STATUS){
                addTodoElement(xhr.responseText);
            }
        }
    };
    xhr.send(data = null);
}


function addTodoAjax() {
    let title = document.getElementById(NewTodoId).value;
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/todos/', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    let data = 'title='+encodeURI(title);
    xhr.onreadystatechange = function() {
        if (xhr.readyState===RESPONCE) {
            if (xhr.status===STATUS) {
                let Activeparent = document.getElementById(ActiveTodoId);
                let todos = JSON.parse(xhr.responseText);
                let x = Object.keys(todos)[0];
                console.log(todos);
                let newElement = createTodoElement(x, todos[x]);
                let inputElement = document.getElementById(NewTodoId);
                inputElement.value= '';
                inputElement.placeholder = 'ENTER A NEW TASK';
                Activeparent.appendChild(newElement.element);
            }
        }
    };
    xhr.send(data);
}

function deleteTodoAJAX(id) {
    let xhr =new XMLHttpRequest();
    xhr.open('DELETE','api/todos/'+id,true);
    xhr.onreadystatechange = function () {
      if(xhr.readyState === RESPONCE){
          if(xhr.status === STATUS){
              let oldchild = document.getElementById(id);
              let data = JSON.parse(xhr.responseText);
            if(data.status === 'Active'){
                let ActiveParent = document.getElementById(ActiveTodoId);
                ActiveParent.removeChild(oldchild);
            }
            else{
                let CompleteParent = document.getElementById(CompleteTodoId);
                CompleteParent.removeChild(oldchilds);
            }
            let newElement = createTodoElement(id,data.todo);
            let DeleteParent = document.getElementById(DeletedTodoId);
            DeleteParent.appendChild(newElement.element);
          }
      }

    };
    xhr.send(null);
}