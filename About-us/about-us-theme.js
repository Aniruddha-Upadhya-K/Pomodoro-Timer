let defTheme = window.matchMedia('(prefers-color-scheme: dark)')
let theme
let root = document.querySelector(":root")
let rootProperties = getComputedStyle(root) 

if(!localStorage.getItem('theme'))
{
    localStorage.setItem('theme', (defTheme.matches) ? "dark" : "light")
}
else
{
    theme = localStorage.getItem('theme')
    themeChanger()
}

function themeChanger() {
    if(theme == "dark") {
        propertySetter("--background-img", "url('Assets/Background-Dark-Theme.png')")
        propertySetter("--background-color", "linear-gradient(180deg, #3D3D3D 0%, #131313 100%)")
        propertySetter("--inner-ellipse", "linear-gradient(180deg, #FF67A3 66.33%, rgba(255, 103, 176, 0.45) 100%)")
        propertySetter("--outer-ellipse", "#585858")
        propertySetter("--card-box-shadow", "none")
        propertySetter("--sun-icon", "inline-block")
        propertySetter("--moon-icon", "none")        
        propertySetter("--text-color", "#fff")
        propertySetter("--usn-color", "rgba(255, 255, 255, 0.5)")
        propertySetter("--hover-card-color", "rgba(71, 71, 71, 0.75)")
    }
    else
    {
        propertySetter("--background-img", "url('Assets/Background-Light-Theme.png')")
        propertySetter("--background-color", "linear-gradient(180deg, #FFFFFF 0%, #808080 100%)")
        propertySetter("--inner-ellipse", "linear-gradient(180deg, #FF67A3 66.33%, rgba(255, 103, 176, 0.45) 100%)")
        propertySetter("--outer-ellipse", "#C4C4C4")
        propertySetter("--card-box-shadow", "0px 10px 15px rgba(0, 0, 0, 0.25)")
        propertySetter("--sun-icon", "none")
        propertySetter("--moon-icon", "inline-block")        
        propertySetter("--text-color", "#454A55")
        propertySetter("--usn-color", "rgba(69, 74, 85, 0.65)")
        propertySetter("--hover-card-color", "rgba(255, 255, 255, 0.75)")
    }
}

function propertySetter(key, val) {
    root.style.setProperty(key, val)
}

function themeChangeClick() {
    if(localStorage.getItem("theme") == "dark")
    {
        theme = "light"
        localStorage.setItem("theme", "light")
        themeChanger()
    }
    else
    {
        theme = "dark"
        localStorage.setItem("theme", "dark")
        themeChanger()
    }
}

document.querySelector(".lightMode").addEventListener("click", themeChangeClick, false)
document.querySelector(".darkMode").addEventListener("click", themeChangeClick, false)