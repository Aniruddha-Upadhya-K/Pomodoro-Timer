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
        propertySetter("--background", "linear-gradient(180deg, #3D3D3D 0%, #131313 100%)")
        propertySetter("--card-background", "linear-gradient(127.07deg, rgba(91, 91, 91, 0.75) 0%, rgba(92, 92, 92, 0.15) 100.01%)")
        // propertySetter("--card-box-shadow", "none")
        propertySetter("--sun-icon", "inline-block")
        propertySetter("--moon-icon", "none")        
        propertySetter("--text-color", "#fff")
    }
    else
    {
        propertySetter("--background", "linear-gradient(180deg, #FFFFFF 0%, #808080 100%)")
        propertySetter("--card-background", "linear-gradient(127.07deg, rgba(255, 126, 173, 0.75) 0%, rgba(148, 145, 145, 0.15) 100.01%)")
        // propertySetter("--card-box-shadow", "0px 10px 15px rgba(0, 0, 0, 0.25)")
        propertySetter("--sun-icon", "none")
        propertySetter("--moon-icon", "inline-block")        
        propertySetter("--text-color", "#454A55")
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