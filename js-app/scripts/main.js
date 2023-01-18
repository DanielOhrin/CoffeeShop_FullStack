import { CoffeeShop } from "./CoffeeShop.js"
import { CoffeeForm, addCoffeeEventListeners } from "./CoffeeForm.js"
import { BeanVarietyForm, addBeanEventListeners } from "./BeanVarietyForm.js"

// Initially render the elements
renderHTML()

async function renderHTML(lambda) {
    const container = document.getElementById("main-content")
    container.innerHTML = await (lambda ?? CoffeeShop)()

    switch (lambda) {
        case BeanVarietyForm:
            addBeanEventListeners()
            break
        case CoffeeForm:
            addCoffeeEventListeners()
            break
        default:
            break;
    }

    if (!lambda) {
        const addCoffeeButton = document.getElementById("add-coffee")
        addCoffeeButton.addEventListener(
            "click",
            async () => renderHTML(CoffeeForm)
        )


        const addBeanVarietyButton = document.getElementById("add-bean_variety")
        addBeanVarietyButton.addEventListener(
            "click",
            async () => renderHTML(BeanVarietyForm)
        )
    }
}

document.addEventListener(
    "stateChanged",
    async () => await renderHTML()
)

const homeButton = document.querySelector(`a[id="home"]`)
homeButton.addEventListener(
    "click",
    e => {
        e.preventDefault()
        document.dispatchEvent(new CustomEvent("stateChanged"))
    }
)