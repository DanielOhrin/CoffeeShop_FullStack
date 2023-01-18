import { dbGetAll, dbPost } from "./dataAccess.js"

export const CoffeeForm = async () => {
    const beanVarietyArr = await dbGetAll("beanvariety")

    const HTML = `<form method="post">
        <fieldset>
            <label for="title">Title</label>
            <input type="text" name="title" maxlength="50"/>
        </fieldset>
        <fieldset>
            <label for="beanVarietyId">Bean Variety</label>
            <select name="beanVarietyId">
                <option value="">Choose Variety</option>
                ${beanVarietyArr.map(beanObj => {
        return `<option value="${beanObj.id}">${beanObj.name}</option>`
    }).join("")}
            </select>
        </fieldset>
        <button type="button" id="submit-add-coffee">Submit</button>
    </form>
    <span class="text-danger" style="display: none;">An error occured with the form data.</span>`

    return HTML;
}

export const addCoffeeEventListeners = () => {
    const submitCoffeeButton = document.getElementById("submit-add-coffee");
    if (submitCoffeeButton) {
        submitCoffeeButton.addEventListener(
            "click",
            async () => {
                const coffeeObj = {
                    title: document.querySelector(`input[name="title"]`).value,
                    beanvarietyid: parseInt(document.querySelector(`select[name="beanVarietyId"]`).value)
                }

                const coffeeValues = Object.values(coffeeObj);
                // If form has been filled out && api call returns good status
                if (!coffeeValues.includes(null) && !coffeeValues.includes("") && await dbPost("coffee", coffeeObj)) {
                    document.dispatchEvent(new CustomEvent("stateChanged"))
                } else {
                    document.querySelector(`span[class="text-danger"]`).style.display = "inline"
                    document.querySelector(`a[id="home"]`).style.display = "none"
                    document.querySelector(`button[id="submit-add-coffee"]`).disabled = true

                    setTimeout(() => {
                        document.querySelector(`span[class="text-danger"]`).style.display = "none"
                        document.querySelector(`a[id="home"]`).style.display = "inline"
                        document.querySelector(`button[id="submit-add-coffee"]`).disabled = false
                    }, 5000)
                }
            }
        )
    }
}