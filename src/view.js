import { Weather } from "./weather";
import { format } from "date-fns"
import { WeatherAPI } from "./weatherAPI";

export class ViewController {

    constructor() {
        
        this.fahrenheit = false;

        this.contentWrapper = document.querySelector(".content-wrapper")
        this.loadingWrapper = document.querySelector(".loading-wrapper")

        this.form = document.querySelector("form")
        this.searchBar = document.querySelector("#search")
        this.tempSwitch = document.querySelector("#temp-switch")

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

        this.form.addEventListener("submit", (event) => {

            this.setLoading();

            const viewController = this;

            const weatherData = WeatherAPI.getWeatherData(this.searchBar.value)
            weatherData.then(function(data) {
                setTimeout(() => {
                    viewController.setContent();
                    viewController.setWeatherObj(data);
                }, 1500)
            })
            
            event.preventDefault()
        })

        this.tempSwitch.addEventListener("change", () => {
            this.fahrenheit = this.tempSwitch.checked;
            const viewController = this;

            if (this.weatherObj) {
                let index = 0;
                for (const dayObjEntries of this.dayBar.entries()) {
                    if (dayObjEntries[1].classList.contains("active")) {
                        index = dayObjEntries[0]
                    }
                }
                viewController.updateLocation(index)
            }
        })

    }

    setWeatherObj(weatherJson) {
        this.weatherObj = new Weather(weatherJson);
        this.updateLocation()
    }

    setLoading() {
        this.contentWrapper.style.display = "none";
        this.loadingWrapper.style.display = "flex";
    }

    setContent() {
        this.contentWrapper.style.display = "block";
        this.loadingWrapper.style.display = "none";
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

        const degreeSymbol = this.fahrenheit ? " °F" : " °C";
        
        this.tempHighs.textContent = (this.fahrenheit ? dayObj.fmaxtemp : dayObj.maxtemp) + degreeSymbol
        this.tempLows.textContent = (this.fahrenheit ? dayObj.fmintemp : dayObj.mintemp) + degreeSymbol

        this.feelHighs.textContent = (this.fahrenheit ? dayObj.fmaxfeels : dayObj.maxfeels) + degreeSymbol
        this.feelLows.textContent = (this.fahrenheit ? dayObj.fminfeels : dayObj.minfeels) + degreeSymbol

    }

    updateLocation(index = 0) {

        for (let i=0; i < this.weatherObj.days.length-1; i++) {
            const dayObj = this.weatherObj.days[i]
            const dayNode = this.dayBar[i]

            const dateNode = dayNode.querySelector(".box-date")
            dateNode.textContent = i == 0 ? "Today" : format(dayObj.date, "eee do")

            const iconNode = dayNode.querySelector(".box-icon")
            iconNode.src = dayObj.monoicon

            const tempNode = dayNode.querySelector(".box-temp")
            const maxTemp = this.fahrenheit ? dayObj.fmaxtemp : dayObj.maxtemp
            const minTemp = this.fahrenheit ? dayObj.fmintemp : dayObj.mintemp
            tempNode.innerHTML = `<b>${maxTemp}</b> / ${minTemp}`
        }

        this.updateContent(index);

    }


}