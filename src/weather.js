import { Day } from "./day"

export class Weather {

    days = []
    
    constructor(jsonObj) {
        this.location = jsonObj.resolvedAddress.replace(/(^\w|\s\w)(\S*)/g, (_,m1,m2) => m1.toUpperCase()+m2.toLowerCase())
        
        for (const day of jsonObj.days){
            this.days.push(new Day(day))
        }

    }
}