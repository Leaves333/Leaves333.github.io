var uwu = 10
var pp = 1
var lastUpdate = Date.now()
var animeGirl = {
    baseCost: 10,
    amount: 0,
    scaling: 1.15
}

var recruit = {
    baseCost: 100,
    amount: 0,
    scaling: 1.15
}
var bank = 0
var doRecruit = true

var rituals = {
    baseCost: 500,
    amount: 0,
    scaling: 1.15
}
var doRituals = true

function format(amount) {
    let power = Math.floor(Math.log10(amount))
    let mantissa = amount / Math.pow(10, power)

    if (power < 3) {
        return amount.toFixed(2)
    }

    return mantissa.toFixed(2) + "e" + power
}

function updateGUI() {
    document.getElementById("currency").innerHTML = "you have " + format(uwu) + " uwus" + "<br> +" + format(animeGirl.amount * pp) + "/s"
    if (pp > 1) {
        document.getElementById("currency").innerHTML += "<br> x" + format(pp) + " from your big pp energy"
    }

    document.getElementById("girl").innerHTML = format(animeGirl.amount) + " anime girls<br>cost: " + format(Math.pow(animeGirl.scaling, animeGirl.amount) * animeGirl.baseCost)
    if (Math.pow(animeGirl.scaling, animeGirl.amount) * animeGirl.baseCost > uwu) document.getElementById("girl").classList.add("unaffordable") 
    else document.getElementById("girl").classList.remove("unaffordable")

    document.getElementById("recruit").innerHTML = format(recruit.amount) + " anime girl recruiting officers<br>cost: " + format(Math.pow(recruit.scaling, recruit.amount) * recruit.baseCost)
    if (Math.pow(recruit.scaling, recruit.amount) * recruit.baseCost > uwu) document.getElementById("recruit").classList.add("unaffordable") 
    else document.getElementById("recruit").classList.remove("unaffordable")

    document.getElementById("ritual").innerHTML = format(rituals.amount) + " dark rituals<br>cost: " + format(Math.pow(rituals.scaling, rituals.amount) * rituals.baseCost)
    if (Math.pow(rituals.scaling, rituals.amount) * rituals.baseCost > uwu) document.getElementById("ritual").classList.add("unaffordable") 
    else document.getElementById("ritual").classList.remove("unaffordable")

    let recruitString = ""
    if (doRecruit) recruitString = "recruiting anime girls"
    else recruitString = "not recruiting anime girls"
    document.getElementById("recruitToggle").textContent = recruitString

    let ritualString = ""
    if (doRituals) ritualString = "performing rituals"
    else ritualString = "not performing rituals"
    document.getElementById("ritualToggle").textContent = ritualString
}

function iterate(diff) {

    if (doRituals) {
        let sacrifice = Math.min(rituals.amount * 0.5, animeGirl.amount) * diff
        animeGirl.amount -= sacrifice
        pp += sacrifice * 0.1
    }
    
    if (doRecruit) {
        bank += ((recruit.amount * 0.5) * diff)

        //buy as many as can afford
        while (bank >= 1) {
            let cost = animeGirl.baseCost * Math.pow(animeGirl.scaling, animeGirl.amount)
            if (uwu >= cost) {
                uwu -= cost
                animeGirl.amount += 1
                bank -= 1
            } else {
                bank = 0
                break
            }
        }
    }

    uwu += animeGirl.amount * pp * diff
}

function mainLoop() {
    let diff = (Date.now() - lastUpdate) / 1000
    
    iterate(diff)
    updateGUI()

    lastUpdate = Date.now()
}

function buyItem(item) {
    cost = item.baseCost * Math.pow(item.scaling, item.amount)
    if (cost > uwu) return
    uwu -= cost
    item.amount += 1
}

function toggleRecruit() {
    doRecruit = !doRecruit
}

function toggleRitual() {
    doRituals = !doRituals
}

setInterval(mainLoop, 50)
updateGUI()
