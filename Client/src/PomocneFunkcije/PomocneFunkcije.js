
const provjeraDatuma1 = (datum) => {
    const a = new Date()
    var c = a.getMonth() + 1
    if (c <= 9) {
        c = "0" + c.toString()
    }
    var dan = a.getDate()
    if (dan <= 9)
        dan = "0" + dan.toString()

    const danas = a.getFullYear() + "-" + c + "-" + dan
    if(datum > danas)
        return true
    else return false
}



const jeLiDatumProsao = (datum) => {
    const a = new Date()
    var c = a.getMonth() + 1
    if (c <= 9) {
        c = "0" + c.toString()
    }
    var dan = a.getDate()
    if (dan <= 9)
        dan = "0" + dan.toString()

    const danas = a.getFullYear() + "-" + c + "-" + dan
    if(datum <= danas)
        return true
    else return false
}

const datumProsliMjesec = (datum) => {
    const a = new Date()
    var c = a.getMonth()+1
    if(c <= 9) {
        c = "0" + c.toString()
    }
    var b = null
    if (a.getMonth() === 0) {
        b = 12
    }
    else b = a.getMonth()
    if(b <= 9) {
        b = "0" + b.toString()
    }

    var dan = a.getDate()
    if(dan <= 9)
        dan = "0" + dan.toString()

    const danas = a.getFullYear() + "-" + c + "-" + dan
    const prosliMjesec = a.getFullYear() + "-" + b + "-" + dan

    if (datum >= prosliMjesec && datum <= danas) {

        return true
    }
    return false
}

export {provjeraDatuma1, jeLiDatumProsao, datumProsliMjesec}