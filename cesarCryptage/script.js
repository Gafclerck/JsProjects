
let entrer = document.querySelector(".entrer")
let codeNumber = document.querySelector(".codeNumber")
let affichageZone = document.querySelector(".boxnoir h3")
let code = 1
    
function chiffrer(input , code){
    input = input.toLocaleLowerCase()
    let output = []

    for (let i = 0 ; i < input.length ; i++){
        let char = input[i]
        if (char >= 'a' && char <= 'z')
        {
            let aCode = "a".charCodeAt(0)
            let charCode = input.charCodeAt(i) - aCode
            charCode = (charCode + code + 26)%26
            charCode += aCode
            output.push(String.fromCharCode(charCode))
        }else{
            output.push(char)
        }
    }
    return output.join("").toLocaleUpperCase()
}

function mettreAjourAffichage(){
    let input = chiffrer(entrer.value , code)
    affichageZone.textContent = input
}

codeNumber.addEventListener("input" , ()=>{
    code = parseInt(codeNumber.value) || 1
    mettreAjourAffichage()
})

entrer.addEventListener("input" , mettreAjourAffichage)

console.log(chiffrer("amadou" , 1))