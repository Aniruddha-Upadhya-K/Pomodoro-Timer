let defTheme = window.matchMedia('(prefers-color-scheme: dark)')
let theme
let root = document.querySelector(":root")
let rootProperties = getComputedStyle(root) 

if(!localStorage.getItem('theme'))
{
    localStorage.setItem('theme', (defTheme.matches) ? "dark" : "light")
    theme = (defTheme.matches) ? "dark" : "light"
    themeChanger()
}
else
{
    theme = localStorage.getItem('theme')
    themeChanger()
}

function themeChanger() {
    if(theme == "dark") {
        propertySetter("--background-img", "url('Assets/Background-Dark-Theme.png')")
        propertySetter("--background", "linear-gradient(180deg, #3D3D3D 0%, #131313 100%)")
        propertySetter("--main-card-background", "linear-gradient(272.8deg, rgba(123, 123, 123, 0.9) 0%, rgba(70, 70, 70, 0.3) 100%)")
        propertySetter("--card-background", "linear-gradient(139.89deg, rgba(67, 67, 67, 0.3) 0%, rgba(60, 60, 60, 0.309375) 0.01%, rgba(60, 60, 60, 0.9) 100%)")
        propertySetter("--card-box-shadow", "none")
        propertySetter("--sun-icon", "inline-block")
        propertySetter("--moon-icon", "none")        
        propertySetter("--text-color", "#fff")
    }
    else
    {
        propertySetter("--background-img", "url('Assets/Background-Light-Theme.png')")
        propertySetter("--background", "linear-gradient(180deg, #FFFFFF 0%, #808080 100%)")
        propertySetter("--main-card-background", "linear-gradient(127.07deg, rgba(255, 255, 255, 0.3) 0%, rgba(222, 162, 183, 0.95) 100.01%)")
        propertySetter("--card-background", "linear-gradient(127.07deg, rgba(255, 255, 255, 0.5) 0%, rgba(222, 162, 183, 0.8) 100.01%)")
        propertySetter("--card-box-shadow", "0px 10px 15px rgba(0, 0, 0, 0.25)")
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