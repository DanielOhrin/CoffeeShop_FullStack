import { dbGetAll } from "./dataAccess.js";

export const Coffees = async () => {
    const coffeeArr = await dbGetAll("coffee")

    let HTML = `<article id="coffees-article">`

    if (coffeeArr.length) {
        HTML += coffeeArr.map(coffeeObj => {
            return `
            <div>
                <h3>${coffeeObj.title}</h3>
                <p>BeanVariety: ${coffeeObj.beanVariety.name}<p>
            </div>
            `
        }).join("")
    }

    return HTML += `</article>`
}