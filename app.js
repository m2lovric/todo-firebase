let input = document.querySelector('input');
let list = document.querySelector('#item-list');
let submit = document.querySelector('button');
let value;

submit.addEventListener('click',e => {
    e.preventDefault();
    value = input.value;
    let li = document.createElement('li');
    let text = document.createTextNode(value);
    li.append(text);
    list.append(li);
    input.value = '';
});

//firestore
db.collection



