var decimalOne = new Decimal(1)

function exponentialFormat(num, precision, mantissa = true) {
    let e = num.log10().floor()
    let m = num.div(Decimal.pow(10, e))
    if (m.toStringWithDecimalPlaces(precision) == 10) {
        m = decimalOne
        e = e.add(1)
    }
    e = (e.gte(1e4) ? format(e, 3) : (e.gte(10000) ? commaFormat(e, 0) : e.toStringWithDecimalPlaces(0)))
    if (mantissa)
        return m.toStringWithDecimalPlaces(precision) + "e" + e
    else return "e" + e
}

function commaFormat(num, precision) {
    if (num === null || num === undefined) return "NaN"
    if (num.mag < 0.001) return (0).toFixed(precision)
    let init = num.toStringWithDecimalPlaces(precision)
    let portions = init.split(".")
    portions[0] = portions[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    if (portions.length == 1) return portions[0]
    return portions[0] + "." + portions[1]
}


function regularFormat(num, precision) {
    if (num === null || num === undefined) return "NaN"
    if (num.mag < 0.0001) return (0).toFixed(precision)
    if (num.mag < 0.1 && precision !==0) precision = Math.max(precision, 2)
    return num.toStringWithDecimalPlaces(precision)
}

function fixValue(x, y = 0) {
    return x || new Decimal(y)
}

function sumValues(x) {
    x = Object.values(x)
    if (!x[0]) return decimalZero
    return x.reduce((a, b) => Decimal.add(a, b))
}

function format(decimal, precision = 2, small) {
    decimal = new Decimal(decimal)
    if (isNaN(decimal.sign) || isNaN(decimal.layer) || isNaN(decimal.mag)) {
        return "NaN"
    }
    if(decimal.sign<0){return "-"+format(decimal.neg(), precision, small)}
    if(decimal.mag == Number.POSITIVE_INFINITY){return "Infinity"}

    if(player.setting.notation=='scientific'){
        if(decimal.gte(1e4)){
            return exponentialFormat(decimal, precision)
        }else if(decimal.gte(0.0001) || !small){
            return regularFormat(decimal, precision)
        }else if(decimal.eq(0)){
            return n(0).toFixed(precision)
        }else if(decimal.lt(0.01)){
            return '<0.01'
        }
    }else if(player.setting.notation=='default'){
        let e = n(decimal).log10().ceil()
        let log = n(decimal).log10()
        let m = n(decimal).div(Decimal.pow(10, e))
        let max = 1
        let txt = ''
        let txtnum = ['','K','M','T','Qa','Qi','Sx','Sp','Oc','No','De','UnD','DD','TD','QaD','QiD','SxD','SpD','OcD','NoD','VT','UVT','DuT']
        for(let i=1;i<=max;i++){   
            if(log >= (i*3)){
                max += 1
            }else{
                txt = txtnum[max-1]
            }
        }

        if(decimal.eq(0)){
            return n(0).toFixed(3)
        }

        if(decimal.lt(0.001)){
            return '<0.001'
        }

        if(decimal)

        return n(m).mul(n(10).pow(n(e).sub(n(max).sub(1).mul(3)))).toFixed(3) + txt
    }else if(player.setting.notation=='engineering'){
        let e = n(decimal).log10().ceil()
        let log = n(decimal).log10()
        let m = n(decimal).div(Decimal.pow(10, e))
        let max = 1
        let showE = 0
        for(let i=1;i<=max;i++){   
            if(log >= (i*3+1)){
                max += 1
            }else{
                showE = (max-1)*3
            }
        }

        if(decimal.eq(0)){
            return n(0).toFixed(3)
        }
        
        if(decimal.lt(0.01)){
            return '<0.01'
        }
        
        let show = ''
        if(showE>0){
            show = 'e' + showE
        }

        return n(m).mul(n(10).pow(n(e).sub(n(max).sub(1).mul(3)))).toFixed(2) + show
    }else if(player.setting.notation=='letter'){
        let e = n(decimal).log10().ceil()
        let log = n(decimal).log10()
        let m = n(decimal).div(Decimal.pow(10, e))
        let max = 1
        let txt = ''
        let txtnum = ['','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','o','v','w','x','y','z','A']
        for(let i=1;i<=max;i++){   
            if(log >= (i*3+1)){
                max += 1
            }else{
                txt = txtnum[max-1]
            }
        }

        if(decimal.eq(0)){
            return n(0).toFixed(3)
        }
        
        if(decimal.lt(0.001)){
            return '<0.001'
        }

        return n(m).mul(n(10).pow(n(e).sub(n(max).sub(1).mul(3)))).toFixed(3) + txt
    }
}

function formatScientific(decimal, precision = 2, small) {
    decimal = new Decimal(decimal)
    if (isNaN(decimal.sign) || isNaN(decimal.layer) || isNaN(decimal.mag)) {
        return "NaN"
    }
    if(decimal.mag == Number.POSITIVE_INFINITY){return "Infinity"}

    if(decimal.gte(1e4)){
        return exponentialFormat(decimal, precision)
    }else if(decimal.gte(0.0001) || !small){
        return regularFormat(decimal, precision)
    }else if(decimal.eq(0)){
        return n(0).toFixed(precision)
    }else if(decimal.lt(0.01)){
        return '<0.01'
    }
}

function formatWhole(decimal) {
    decimal = new Decimal(decimal)
    return formatScientific(decimal, 0)
}

function formatA(decimal) {
    return decimal.gt(0) ? '+'+format(decimal) : format(decimal)
}

function formatTime(s) {
    if (s < 60) return formatScientific(s) + "秒"
    else if (s < 3600) return formatWhole(Math.floor(s / 60)) + "分" + formatScientific(s % 60) + "秒"
    else if (s < 86400) return formatWhole(Math.floor(s / 3600)) + "小时" + formatScientific((s / 60) % 60) + "分"
    else if (s < 31536000) return formatWhole(Math.floor(s / 86400) % 365) + "天" + formatScientific((s / 3600) % 24) + "小时"
    else return formatWhole(Math.floor(s / 31536000)) + "年" + formatWhole(Math.floor(s / 86400) % 365) + "天" + formatScientific((s / 3600) % 24)
}

function toPlaces(x, precision, maxAccepted) {
    x = new Decimal(x)
    let result = x.toStringWithDecimalPlaces(precision)
    if (new Decimal(result).gte(maxAccepted)) {
        result = new Decimal(maxAccepted - Math.pow(0.1, precision)).toStringWithDecimalPlaces(precision)
    }
    return result
}

// Will also display very small numbers
function formatSmall(x, precision=2) { 
    return format(x, precision, true)    
}

function invertOOM(x){
    let e = x.log10().ceil()
    let m = x.div(Decimal.pow(10, e))
    e = e.neg()
    x = new Decimal(10).pow(e).times(m)

    return x
}