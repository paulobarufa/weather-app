export class Day {
    
    monoIconUrl = "https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/2nd%20Set%20-%20Monochrome/";
    colorIconUrl = "https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/2nd%20Set%20-%20Color/";
    
    constructor(jsonObj) {
        this.date = new Date(jsonObj.datetime);
        this.conditions = jsonObj.conditions;
        this.description = jsonObj.description;
        this.monoicon = `${this.monoIconUrl}${jsonObj.icon}.svg`;
        this.coloricon = `${this.colorIconUrl}${jsonObj.icon}.svg`;
        this.mintemp = Math.round(jsonObj.tempmin);
        this.maxtemp = Math.round(jsonObj.tempmax);
        this.minfeels = Math.round(jsonObj.feelslikemin);
        this.maxfeels = Math.round(jsonObj.feelslikemax);

        this.fmintemp = Math.round(jsonObj.tempmin * 9/5 + 32)
        this.fmaxtemp = Math.round(jsonObj.tempmax * 9/5 + 32)
        this.fminfeels = Math.round(jsonObj.feelslikemax * 9/5 + 32)
        this.fmaxfeels = Math.round(jsonObj.feelslikemax * 9/5 + 32)
    }
    
}