const list = document.querySelector('#item-list');
const submit = document.querySelector('button');
const form = document.querySelector('#add-form')

let renderTasks = (doc) => {
    let li = document.createElement('li');
    let task = document.createElement('span');
    let importance = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    importance.setAttribute('class', 'rating');
    task.textContent = doc.data().task;
    importance.textContent = doc.data().importance;
    cross.textContent = 'x';

    li.appendChild(task);
    li.appendChild(importance);
    li.appendChild(cross);
    list.append(li);

    //delete data
    cross.addEventListener('click', e => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        console.log(id);
        db.collection('tasks').doc(id).delete();
    })
}

//firestore
db.collection('tasks').orderBy('importance', 'desc').onSnapshot(s => {
    let changes = s.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){
            renderTasks(change.doc);
        }else if(change.type == 'removed'){
            let li = list.querySelector(`[data-id="${change.doc.id}"]`);
            list.removeChild(li);
        }
    });
})

//saving data
form.addEventListener('submit', e => {
    e.preventDefault();
    db.collection('tasks').add({
        importance: parseInt(form.num.value),
        task: form.txt.value
    });
    form.num.value = '';
    form.txt.value = '';
})

