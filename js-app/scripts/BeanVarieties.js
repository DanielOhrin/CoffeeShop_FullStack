import { dbGetAll } from "./dataAccess.js"

export const BeanVarieties = async () => {
    const beanVarietyArr = await dbGetAll("beanvariety")

    let HTML = `<article id="bean_varieties-article">`

    if (beanVarietyArr.length) {
        HTML += beanVarietyArr.map(beanVarietyObj => {
            return `
            <div>
                <h3>${beanVarietyObj.name}</h3>
                <p>Region: ${beanVarietyObj.region}<p>
                ${beanVarietyObj.notes ? `<p>Notes: ${beanVarietyObj.notes}<p>` : ""}
                </div>
                    `
        }).join("")
    }

    return HTML += `</article>`
}