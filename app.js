let input = document.querySelector('input');
let list = document.querySelector('#item-list');
let submit = document.querySelector('button');
let value;

let renderTasks = (doc) => {
    let li = document.createElement('li');
    li.setAttribute('data.id', doc.id);
    let task = document.createElement('span');
    let importance = document.createElement('span');
    importance.setAttribute('class', 'rating');

    task.textContent = doc.data().task;
    importance.textContent = doc.data().importance;
    li.appendChild(task);
    li.appendChild(importance);
    list.append(li);
}

submit.addEventListener('click',e => {
    e.preventDefault();
    value = input.value;
    
    input.value = '';
});

//firestore
db.collection('tasks').get().then((s) => {
    s.docs.forEach(el => {
        renderTasks(el);
    });
});



