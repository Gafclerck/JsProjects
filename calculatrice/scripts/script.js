// afficahge de l'entre dans la zone de saisie
let zoneOperation = document.querySelector(".zoneOperation")
let inputs = document.querySelectorAll(".input")

function updateAffichage(text){
    let lastChar = zoneOperation.textContent.slice(-1)
    let isSign = /^[+\-x.\/]$/.test(lastChar)
    if (isSign && /^[+\-x.\/]$/.test(text)) return
    zoneOperation.textContent += text
}
inputs.forEach(function(input){
    input.addEventListener("click" , ()=>updateAffichage(input.textContent))
})

let ans = document.querySelector("#ans")
ans.addEventListener("click" , ()=> resultat !== undefined ? updateAffichage(`${resultat}`) : "")

// controle de saisi clavier physique
window.addEventListener("keydown" , (e) => {
    console.log(e.key)
    const regex = /^[+\-*.\/\d]$/
    if (regex.test(e.key)) {
        let key = e.key === "*" ? "x" : e.key
        updateAffichage(key)
    } 
})


// supprimer un caractere dans la zone de saisi lorsqu'on appuie sur del ou backspace
function deleleOne(){
    let k = zoneOperation.innerText.length
    zoneOperation.textContent = zoneOperation.textContent.slice(0 , k-1)
}

let del = document.getElementById("del")
del.addEventListener("click" , deleleOne)

window.addEventListener("keydown" , (event)=>{
    if (event.key === "Backspace") deleleOne()
})

// supprimer toute la zone de saisi lorsqu'on appuie sur ac
let ac = document.getElementById("ac")
ac.addEventListener("click" , ()=>{
    zoneOperation.textContent = ""
    zoneResultat.textContent = "0"
})

document.body.addEventListener("keydown" , (event)=>{
    if (event.key === "Delete"){
        zoneOperation.textContent = ""
        zoneResultat.textContent = "0"
    }
})

// caculer le resultat et l'afficher
let zoneResultat = document.querySelector(".zoneResultat")
let resultat
function affichageResultat(){
    let operation = zoneOperation.textContent.replaceAll("x" , "*")
    resultat = eval(operation)
    if (resultat != undefined){
        zoneResultat.textContent = `${resultat}`
    }
    
}

// afficher le resultat si l'on appuie sur entrer ou le signe égale sur l'ecran

let ok = document.getElementById("ok")
ok.addEventListener("click", affichageResultat)

document.body.addEventListener("keydown" , (event)=>{
    if (event.key === "Enter"){
        affichageResultat()
    }
})