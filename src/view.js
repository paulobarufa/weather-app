import { Weather } from "./weather";
import { format } from "date-fns"

export class ViewController {

    constructor(weatherJson) {
        this.weatherObj = new Weather(weatherJson);
        
        this.contentWrapper = document.querySelector(".content-wrapper")

        this.locationTitle = document.querySelector(".location-title")
        this.dayBar = document.querySelectorAll(".day-box")

        this.contentDate = document.querySelector(".content-date")
        this.contentDescription = document.querySelector(".content-description")

        this.largeIcon = document.querySelector(".large-icon")
        this.iconConditions = document.querySelector(".icon-conditions")

        this.tempHighs = document.querySelector("#temp-highs")
        this.tempLows = document.querySelector("#temp-lows")

        this.feelHighs = document.querySelector("#feel-highs")
        this.feelLows = document.querySelector("#feel-lows")

        for (let i=0; i < this.dayBar.length; i++) {
            this.dayBar[i].addEventListener("click", () => {this.updateContent(i)})
        }

        this.updateLocation()

    }

    setWeatherObj(weatherObj) {
        this.weatherObj = weatherObj;
    }

    updateContent(index) {

        for (const dayObjEntries of this.dayBar.entries()) {
            dayObjEntries[0] == index ? dayObjEntries[1].classList.add("active") : dayObjEntries[1].classList.remove("active");
        }

        const dayObj = this.weatherObj.days[index]
        this.locationTitle.textContent = this.weatherObj.location

        this.contentDate.textContent = format(dayObj.date, "eeee do MMMM")
        this.contentDescription.textContent = dayObj.description

        this.largeIcon.src = dayObj.coloricon
        this.iconConditions.textContent = dayObj.conditions
        
        this.tempHighs.textContent = dayObj.maxtemp
        this.tempLows.textContent = dayObj.mintemp

        this.feelHighs.textContent = dayObj.maxfeels
        this.feelLows.textContent = dayObj.minfeels

    }

    updateLocation() {

        for (let i=0; i < this.weatherObj.days.length-1; i++) {
            const dayObj = this.weatherObj.days[i]
            const dayNode = this.dayBar[i]

            const dateNode = dayNode.querySelector(".box-date")
            dateNode.textContent = i == 0 ? "Today" : format(dayObj.date, "eee do")

            const iconNode = dayNode.querySelector(".box-icon")
            iconNode.src = dayObj.monoicon

            const tempNode = dayNode.querySelector(".box-temp")
            tempNode.innerHTML = `<b>${dayObj.maxtemp}</b> / ${dayObj.mintemp}`
        }

        this.updateContent(0);

    }


}