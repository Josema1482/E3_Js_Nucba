const pizzas = [
  {
    id: 1,
    nombre: "pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },

  {
    id: 2,
    nombre: "pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },

  {
    id: 3,
    nombre: "pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },

  {
    id: 4,
    nombre: "pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },

  {
    id: 5,
    nombre: "pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];


const pizzaSeleccionada = document.getElementById('selectedPizza') //el INPUT
const error = document.getElementById('errorContainer')//span de ERROR
const selectPizza = document.getElementById('selectPizza') //BOTON
const renderCard = document.querySelector('.renderContainer')// DIV para renderizar la CARD

//Mostrar Errores
const elError = (verificacion) => {
  valid = true

  if (!verificacion.length) {
    error.innerHTML = "Input vacio, ingresar un número válido"
    return
  } else if (verificacion > pizzas.length || verificacion < 1) {
    error.innerHTML = "La pizza elegida no existe"
    return
  }

  return valid
}

//Se crea la CARD
const renderizarPizza = (pizzaSeleccionada) => {
  const { nombre, ingredientes, precio, imagen } = pizzaSeleccionada

  return renderCard.innerHTML =
`<div class="card">
    <img src="${imagen}" alt="" srcset="">
    <h2>${nombre.toUpperCase()}</h2>
    <p class="typeofpizza">${ingredientes.join(', ')}</p>
    <p class="price">$ ${precio}</p>    
</div>
`
}

const saveLS = (selection) => {
  localStorage.setItem('pizzaGuardada', JSON.stringify(selection))
}

const filterPizza = (pizzasArray, pizzaSelected) => {
  const selectedPizza = pizzasArray.filter((pizza) => { return pizza.id == pizzaSelected })
  return selectedPizza[0]
}

const seleccionarPizza = () => {
    const valorPizza = pizzaSeleccionada.value
  renderCard.innerHTML = ""

  if (elError(valorPizza)) {
    error.innerHTML = ""
    saveLS(valorPizza)
    const pizzaFiltrada = filterPizza(pizzas,valorPizza)
    renderizarPizza(pizzaFiltrada)
  }

}

const pizzaGuardada = () => {
      const pizzaPorDefecto = JSON.parse(localStorage.getItem('pizzaGuardada'))
    if (pizzaPorDefecto) {
      const pizzaFiltrada = filterPizza(pizzas, pizzaPorDefecto)
     renderizarPizza(pizzaFiltrada)
    }
}

//Iniciliza los Eventos
const init = () => {
  pizzaSeleccionada.addEventListener('submit',(e) => {e.preventDefault})
  document.addEventListener("DOMContentLoaded", pizzaGuardada)
  selectPizza.addEventListener('click', seleccionarPizza)
  
}
init()