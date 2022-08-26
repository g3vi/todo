console.log('Enlazado a JS')
const formulario = document.getElementById('formulario')
const listaTareas = document.getElementById('lista-tareas')
const template = document.getElementById('template').content
const fragment = document.createDocumentFragment()

let tareas = {}

document.addEventListener('DOMContentLoaded',()=>{
    //console.log(formulario,listaTareas,template)
    if(localStorage.getItem('tareas')){
        tareas = JSON.parse
    }
    //Necesitar pintar las tareas
    pintarTareas()
})

listaTareas.addEventListener('click',(event)=>{
    //console.log(event)
    btnAcciones(event)
})

formulario.addEventListener('submit',e =>{
    e.preventDefault()
    //console.log('evento', e)
    setTarea(e)
})

const setTarea = e =>{
    const texto = e.target.querySelector('input').value
    console.log('text',texto)
    if(texto.trim() === ''){
        console.log('cadena vacia')
        return
    }
    const tarea = {
        id: Date.now(),
        texto,
        estado: false
    }
    tareas[tarea.id] = tarea
    pintarTareas()
    formulario.reset()
    e.target.querySelector('input').focus()
}

const pintarTareas = () =>{
    localStorage.setItem('tareas',JSON.stringify(tareas))
    if(Object.values(tareas).length === 0){
        listaTareas.innerHTML = '<div class="alert alert-danger">Sin tareas Pendientes</div>'
        return
    }
    listaTareas.innerHTML = ''
    Object.values(tareas).forEach(tarea => {
        //console.log('tarea',tarea)
        const clone =template.cloneNode(true)
        clone.querySelector('p').texContent = tarea.texto
        if(tarea.estado){
            clone.querySelectorAll('.fas')[0].classList.replace('fa-check-circle','fa-undo-alt')
            clone.querySelector('.alert').classList.replace('alert-warning','alert-primary')
            clone.querySelector('p').style.textDecoration = 'line-through'
        }
        clone.querySelectorAll('.fas')[0].dataset.id=tarea.id
        clone.querySelectorAll('.fas')[1].dataset.id=tarea.id
        fragment.appendChild(clone)
    })
    listaTareas.appendChild(fragment)
}

const btnAcciones=(click)=>{
    //console.log(click)
    if(click.target.classList.contains('fa-check-circle')){
        tareas[click.target.dataset.id].estado=true
        pintarTareas()
    }
    if(click.target.classList.contains('fa-minus-circle')){
        delete tareas[click.target.dataset.id]
        pintarTareas()
    }
    if(click.target.classList.contains('fa-undo-alt')){
        tareas[click.target.dataset.id].estado=false
        pintarTareas()
    }
    click.stopPropagation();
}