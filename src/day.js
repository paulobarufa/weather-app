export class Day {
    
    monoIconUrl = "https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/2nd%20Set%20-%20Monochrome/";
    colorIconUrl = "https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/2nd%20Set%20-%20Color/";
    
    constructor(jsonObj) {
        this.date = new Date(jsonObj.datetime);
        this.conditions = jsonObj.conditions;
        this.description = jsonObj.description;
        this.monoicon = `${this.monoIconUrl}${jsonObj.icon}.svg`;
        this.coloricon = `${this.colorIconUrl}${jsonObj.icon}.svg`;
        this.mintemp = jsonObj.tempmin;
        this.maxtemp = jsonObj.tempmax;
        this.minfeels = jsonObj.feelslikemin;
        this.maxfeels = jsonObj.feelslikemax;
    }
}