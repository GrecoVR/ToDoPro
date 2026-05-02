let tareasguardadas = JSON.parse(localStorage.getItem('tareas')) || [];
const formularioTarea = document.getElementById('formulario-tarea');
const nombreTarea = document.getElementById('nombre-tarea');
const listaTareas = document.getElementById('lista-tareas');
render();

formularioTarea.addEventListener('submit', function(event) {
    event.preventDefault();
    const tarea = nombreTarea.value.trim();
    if (tarea){
        agregarTarea(tarea);
        tareasguardadas.push(tarea);
        localStorage.setItem('tareas', JSON.stringify(tareasguardadas));
        render();
    }
    nombreTarea.value = '';
});

function agregarTarea(tarea) {
    const li = document.createElement('li');
    li.textContent = tarea;
    listaTareas.appendChild(li);
}

function eliminarTarea(index) {
    tareasguardadas.splice(index, 1);
    localStorage.setItem('tareas', JSON.stringify(tareasguardadas));
    render();
}
function render(){
    listaTareas.innerHTML = '';
    tareasguardadas.forEach((tarea, index) => {
        const li = document.createElement('li');
        li.textContent = tarea;
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', () => eliminarTarea(index));
        li.appendChild(botonEliminar);
        listaTareas.appendChild(li);
    });
}
