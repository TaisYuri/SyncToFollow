
export function transformDate(date: string):String{
    if(!date){
        return "";
    }
    return `${date.slice(8,10)}/${date.slice(5,7)}/${date.slice(0,4)}`
}

export function transformHour(hour: string):String{
    if(!hour){
        return "";
    }
    return `${hour.slice(0,5)}hr`
}