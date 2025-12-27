const contenedor = document.getElementById("contenedor-cards")
const btnTodo=document.getElementById("all")
const btnActive=document.getElementById("active")
const btninactive=document.getElementById("inactive")


let todasExte=[];

function cards(data){
    contenedor.innerHTML=""

    data.forEach(extension => {
            const cardhtml = `
                <div class="card">
                    <div class="card-header">
                        
                        <img id="imgIcon" src="${extension.logo}" alt="${extension.name}" ">
                        <div class="title"> 
                            <h2>${extension.name}</h2>
                            <p>${extension.description}</p>
                        </div>
                    </div>
                    
                    <div class="card-footer">
                        <button class="btn-card">
                            Remove
                        </button>
                        <label class="switch">
                            <input type="checkbox" ${extension.isActive ? 'checked' : ''}>
                            <span class="slider"></span>
                        </label>
                    </div>
                </div>`;


            contenedor.innerHTML += cardhtml;
        });

}
//fetch
fetch("./data.json")
    .then(res => res.json())
    .then(data => {

        todasExte=data;
        cards(todasExte);
        btnTodo.classList.add("btnActive")
        btnActive.classList.remove("btnActive")
        btninactive.classList.remove("btnActive")
        
        
    })

    botonSeleccionado=[btnTodo,btnActive,btninactive]

    function estadoBoton(botonActivado){

            botonSeleccionado.forEach(btn=>btn.classList.remove("btnActive"));

            botonActivado.classList.add("btnActive")
        }

    btnTodo.addEventListener("click",(e)=>{
        
        estadoBoton(btnTodo);
        cards(todasExte);
        
    })
    document.getElementById("active").addEventListener("click",(e)=>{
        estadoBoton(btnActive);
        const active=todasExte.filter(ext=>ext.isActive===true);
        cards(active)
    })
    document.getElementById("inactive").addEventListener("click",(e)=>{
        estadoBoton(btninactive);
        const inactive=todasExte.filter(ext=>ext.isActive===false);
        cards(inactive)
    })


//cambiar color
const temaBtn = document.getElementById("theme-btn");
const temaImg = document.getElementById("theme-img");
const body = document.body;


const luna = "./assets/images/icon-moon.svg"
const sol = "./assets/images/icon-sun.svg"


temaBtn.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        temaImg.src = sol;
    }
    else {
        temaImg.src = luna;
    }
})

//eliminar
const contenedorRemove = document.querySelector(".contenedor-cards")
const eliminar = document.getElementById("btn-card")

contenedor.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-card")) {
        const cardEliminar = e.target.closest(".card");

        if (!cardEliminar) {
            Swal.fire({
                title: "Ha ocurrido un error",
                icon: "warning"
            });

        } else {
            cardEliminar.remove();
            Swal.fire({
                title: "Se ha eliminado correctamente",
                icon: "success"
            });
        }
        
    }



})





