import { imageData } from "./data.js"
const data = imageData

const subContainer = document.querySelector(".sub-container")
const mainApp = document.getElementById("main")

/* Burger Menu */

const menuBtn = document.getElementById("burger-menu")
const mobileNavbar = document.getElementById("mobile-navbar")
menuBtn.addEventListener("click", function() {
    menuBtn.classList.toggle("open")
    if (menuBtn.classList.contains("open")) {
        mobileNavbar.style.transform = "translateX(0)"
    } else {
        mobileNavbar.style.transform = "translateX(100%)"
    }
})

/* Burger Menu */

function createRadioContainer(tagClass) {
    const element = document.createElement("div")
    element.classList = tagClass

    return element
}

function createLabel(tagFor, tagText) {
    const element = document.createElement("label")
    element.setAttribute("for", tagFor)
    element.textContent = tagText

    return element
}

function createRadioElement(tagClass, tagID, tagValue) {
    const element = document.createElement("input")
    element.type = "radio"
    element.id = tagID
    element.classList = tagClass
    element.name = "category"
    element.value = tagValue

    return element
}


function renderToContainer() {
    let categoryArray = []

    for (let item of data) {
        categoryArray.push(item.category)
    }

    for (let category of categoryArray) {
        let firstContainer = createRadioContainer("radio-container flex")
        let firstRadio = createRadioElement("radio-input", category, category)
        let firstLabel = createLabel(category, category)

        firstContainer.append(firstLabel, firstRadio)
        subContainer.append(firstContainer)

        const parentEl = document.getElementsByClassName("radio-container")

        firstRadio.addEventListener("change", (event) => {
            for (let parent of parentEl) {
                parent.classList.remove("hover")
            }

            const radioID = document.getElementById(event.target.id)

            radioID.parentElement.classList.add("hover")
        })
    }

    const renderBtn = document.createElement("button")
    renderBtn.classList = "btn"
    renderBtn.textContent = "Generate"

    subContainer.append(renderBtn)

    renderBtn.addEventListener("click", function () {
        if (document.querySelector('input[type="radio"]:checked')) {

            const selectedCategory = document.querySelector('input[type="radio"]:checked').value

            const matchingArray = data.filter(function(category) {
                return category.images.includes(`${selectedCategory}.jpg`)              
            })

            const randomeImageArray = matchingArray[0].images

            const randomeImage = randomeImageArray[Math.floor( Math.random() * randomeImageArray.length )]

            console.log(randomeImage)

            mainApp.style.backgroundImage = `
                linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)),
                url(/images/${randomeImage})
                `
        }
    })
}

renderToContainer()