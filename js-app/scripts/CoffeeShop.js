import { Coffees } from "./Coffees.js";
import { BeanVarieties } from "./BeanVarieties.js"

export const CoffeeShop = async () => {
    return `
    <h2>Coffees</h2>
    ${await Coffees()}
    <button id="add-coffee">Add Coffee</button>

    <hr />

    <h2>BeanVarieties</h2>
    ${await BeanVarieties()}
    <button id="add-bean_variety">Add Bean Variety</button>
    `
}