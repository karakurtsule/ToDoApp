var form = document.querySelector('#addTaskForm');
var input = document.querySelector('#txtTaskName');
var ekle = document.querySelector('#btnAddTaskNew');
var deleteAll = document.querySelector('#btnDeleteAll');
var ul = document.querySelector('#task-list');

var items;


loadItems();


function loadItems(){
    items = getItemForLS();
    items.forEach(function(item) {
        createItem(item);
    });
}

function getItemForLS(){
    if(localStorage.getItem('items')== null){
        items = [];
    }
    else{
        items = JSON.parse(localStorage.getItem('items'))
    }
    return items;
}

function setItemToLS(text){
    items = getItemForLS();
    items.push(text);
    localStorage.setItem('items',JSON.stringify(items));
}

function createItem(text){
    var li = document.createElement('li');
    li.className = "list-group-item list-group-item-secondary";

    var txt = document.createTextNode(text);
    li.appendChild(txt);

    var a = document.createElement('a');
    a.className = 'delete-item float-right'
    a.setAttribute('href','#')
    a.innerHTML = `<i class = "fas fa-times"></i>`;

    li.appendChild(a);

    ul.appendChild(li);
}

function deleteItemFromLS(text){
    items = getItemForLS();
    items.forEach(function(item,index){
        if(item === text){
            items.splice(index,1);
        }
    })
    localStorage.setItem('items', JSON.stringify(items));
}

form.addEventListener('submit',function(e){

    if(input.value == '')
    {
        alert("Lütfen listeye eklenecek elemanı giriniz...")
    }
       
    createItem(input.value);

    //save to LS

    setItemToLS(input.value);

    input.value == ' ';
    e.preventDefault();
    
})

ul.addEventListener('click',function(e){

    if(confirm("Bu elemanı silmek istediginize emin misiniz?")){
        if(e.target.className == 'fas fa-times'){
            e.target.parentElement.parentElement.remove();

            //delete item from LS

            deleteItemFromLS(e.target.parentElement.parentElement.textContent);
        }
    } 
    e.preventDefault();
})

deleteAll.addEventListener('click',function(e){

    if(confirm("Listedeki tüm elemanları silmek isstediginize emin misiniz?")){
        ul.remove();
    }
    localStorage.clear()
    e.preventDefault();
})