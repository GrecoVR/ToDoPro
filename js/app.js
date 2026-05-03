let tareasguardadas = JSON.parse(localStorage.getItem('tareas')) || [];
let filtro = 'todasLasTareas';
const formularioTarea = document.getElementById('formulario-tarea');
const nombreTarea = document.getElementById('nombre-tarea');
const listaTareas = document.getElementById('lista-tareas');
const filtroTareas = document.querySelectorAll('.nav-list a');
render();

filtroTareas.forEach(boton => {
    boton.addEventListener('click', (e) => {
        e.preventDefault();

        const tarea = boton.textContent;
        if(tarea.includes('Todas las tareas')) {
            filtro = 'todasLasTareas';
        } else if(tarea.includes('Tareas completadas')) {
            filtro = 'tareasCompletadas';
        } else if(tarea.includes('Tareas pendientes')) {
            filtro = 'tareasPendientes';
        }
        render();
    });
});
formularioTarea.addEventListener('submit', function(event) {
    event.preventDefault();
    const tarea = nombreTarea.value.trim();
    if (tarea){
        tareasguardadas.push({
            texto: tarea,
            completed: false
        });
        guardarTareas();
        render();
    }
    nombreTarea.value = '';
});

function eliminarTarea(index) {
    tareasguardadas.splice(index, 1);
    guardarTareas();
    render();
}
function render(){
    listaTareas.innerHTML = '';
    let tareasFiltradas;
    if (filtro === 'tareasCompletadas') {
        tareasFiltradas = tareasguardadas.filter(tarea => tarea.completed);
    } else if (filtro === 'tareasPendientes') {
        tareasFiltradas = tareasguardadas.filter(tarea => !tarea.completed);
    } else {
        tareasFiltradas = tareasguardadas;
    }
    tareasFiltradas.forEach((tarea, index) => {
        const li = document.createElement('li');
        li.textContent = tarea.texto;
        if (tarea.completed){
            li.classList.add('completed');
        }

        li.addEventListener('click', () => {
            tarea.completed = !tarea.completed;
            guardarTareas();
            render();
        });

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', (e) => {
            e.stopPropagation();
            eliminarTarea(index);
        });
           
        li.appendChild(botonEliminar);
        listaTareas.appendChild(li);
    });
}

function guardarTareas() {
    localStorage.setItem('tareas', JSON.stringify(tareasguardadas));
}

