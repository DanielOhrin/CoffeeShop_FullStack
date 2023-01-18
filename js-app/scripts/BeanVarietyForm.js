import { dbPost } from "./dataAccess.js"

export const BeanVarietyForm = async () => {
    const HTML = `<form method="post">
        <fieldset>
            <label for="name">Name</label>
            <input type="text" name="name" maxlength="50"/>
        </fieldset>
        <fieldset>
            <label for="name">Region</label>
            <input type="text" name="region" maxlength="50"/>
        </fieldset>
        <fieldset>
            <label for="notes">Notes (Optional)</label>
            <textarea name="notes"></textarea>
        </fieldset>
        <button type="button" id="submit-add-bean_variety">Submit</button>
    </form>
    <span class="text-danger" style="display: none">An error occured with the form data.</span>`

    return HTML;
}

export const addBeanEventListeners = () => {
    const submitBeanVarietyButton = document.getElementById("submit-add-bean_variety");
    if (submitBeanVarietyButton) {
        submitBeanVarietyButton.addEventListener(
            "click",
            async () => {
                const beanVarietyObj = {
                    name: document.querySelector(`input[name="name"]`).value,
                    region: document.querySelector(`input[name="region"]`).value
                }

                // If notes not null or whitespace, add to object
                const notes = document.querySelector(`textarea[name="notes"]`).value
                if (notes != null && notes.trim() != "") {
                    beanVarietyObj.notes = notes
                }

                const beanVarietyValues = Object.values(beanVarietyObj);
                // If form has been filled out && api call returns good status
                if (!beanVarietyValues.includes(null) && !beanVarietyValues.includes("") && await dbPost("beanvariety", beanVarietyObj)) {
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