const progressBar = document.querySelector(".progress-bar")
const bar = progressBar.getContext("2d")

progressBar.height = document.querySelector(".subcontainer").scrollHeight
progressBar.width = document.querySelector(".subcontainer").scrollWidth

const play = document.querySelector(".play")
const pause = document.querySelector(".pause")
const restart = document.querySelector(".restart")
const rePomodoro = document.querySelector("#restartPomodoro")
const audio = document.querySelector("audio")


const time = document.querySelector(".time")
const Break = document.querySelector(".break")
const pomodoroNum = document.querySelector(".interval")

var firstStart, intervalID

var settings = {
    pomodoroMin: 25,
    pomodoroSec: 0,
    totalPomodoro: 4,
    sbMin: 5,
    sbSec: 0,
    lbMin: 30, 
    lbSec: 0,
    lbInterval: 3,
    autoBreak: false,
    autoPomodoro: false
}

var curTime = {
    playerArr: ["pomodoro", "shortBreak", "longBreak"],
    player: "pomodoro",
    min: 25,
    sec: 0,
    pomodoroCount: 1,
}

function settingsWindow() {
    var settingsContainer = document.querySelector(".settings-container")
    settingsContainer.classList.toggle("closed")

    settingsContainer.scrollTo(0, 0)
}

function edit(e) {
    var prevHeading = document.querySelector(".setting-heading.active")
    
    prevHeading.classList.remove("active")
    e.classList.add("active")

    var clickData = e.dataset.timeSetting
    var editor = document.querySelector(`.edit-time[data-time-setting="${clickData}"]`)
    var prevEditor = document.querySelector(".edit-time.active")
    
    prevEditor.classList.remove("active")
    editor.classList.add("active")
}

function done() {
    settings.pomodoroMin = parseInt(document.querySelector(".min-input[data-time-setting='1']").value)
    settings.pomodoroSec = parseInt(document.querySelector(".sec-input[data-time-setting='1']").value)
    settings.sbMin = parseInt(document.querySelector(".min-input[data-time-setting='2']").value)
    settings.sbSec = parseInt(document.querySelector(".sec-input[data-time-setting='2']").value)
    settings.lbMin = parseInt(document.querySelector(".min-input[data-time-setting='3']").value)
    settings.lbSec = parseInt(document.querySelector(".sec-input[data-time-setting='3']").value)
    settings.totalPomodoro = parseInt(document.querySelector("#interval-count").value)
    settings.lbInterval = parseInt(document.querySelector("#break-interval").value)
    settings.autoPomodoro = document.querySelector("#auto-pomodoro").checked
    settings.autoBreak = document.querySelector("#auto-break").checked

    settings.pomodoroMin=secToMinConvertor(settings.pomodoroSec, settings.pomodoroMin)
    settings.sbMin=secToMinConvertor(settings.sbSec, settings.sbMin)
    settings.lbMin=secToMinConvertor(settings.lbSec, settings.lbMin)

    settings.pomodoroSec=secToSecConvertor(settings.pomodoroSec, settings.pomodoroMin)
    settings.sbSec=secToSecConvertor(settings.sbSec, settings.sbMin)
    settings.lbSec=secToSecConvertor(settings.lbSec, settings.lbMin)

    if(settings.lbInterval>=settings.totalPomodoro)
    {
        settings.lbInterval = settings.totalPomodoro - 1
    }

    curTime.min = settings.pomodoroMin
    curTime.sec = settings.pomodoroSec
    curTime.player = "pomodoro"
    curTime.pomodoroCount = 1

    Break.innerHTML = "Pomodoro"
    pomodoroNum.innerHTML = `interval 1/${settings.totalPomodoro}`

    time.textContent = `${settings.pomodoroMin.toString().padStart(2, 0)}:` + `${settings.pomodoroSec.toString().padStart(2, 0)}`

    if(!(play.classList.contains("paused")))
    {
        play.classList.toggle("paused")
        pause.classList.toggle("paused")
        restart.classList.toggle("paused")
    }

    if((restart.classList.contains("started")))
    {
        restart.classList.toggle("started")
        firstStart = undefined
    }

    if(intervalID != undefined)
    {
        clearInterval(intervalID)
        intervalID = undefined
    }

    rePomodoro.classList.remove("visible")

    pause.classList.remove("restartPomodoro")
    play.classList.remove("restartPomodoro")
    restart.classList.remove("restartPomodoro")
    

    settingsWindow()
}

function secToMinConvertor(sec, min) {
    if(sec>=60)
    {
        min++
    }
    
    return min
}

function secToSecConvertor(sec, min) {
    if(sec>=60)
    {
        sec = sec-60
    }

    (min == 0 && sec<30) ? sec=30 : sec=sec

    return sec
}


function Play() {
    play.classList.toggle("paused")
    pause.classList.toggle("paused")
    restart.classList.toggle("paused")

    audio.pause()
    audio.currentTime = 0
    audio.loop = false

    if(firstStart == undefined)
    {
        restart.classList.toggle("started")
        firstStart = 0
    }

    intervalID = setInterval(countDown, 1000)
}

function Pause() {
    play.classList.toggle("paused")
    pause.classList.toggle("paused")
    restart.classList.toggle("paused")

    clearInterval(intervalID)
    intervalID = undefined
}

function Restart() {
    play.classList.toggle("paused")
    pause.classList.toggle("paused")
    restart.classList.toggle("paused")

    if(curTime.player == "pomodoro")
    {
        Break.innerHTML = "Pomodoro"

        curTime.min = settings.pomodoroMin
        curTime.sec = settings.pomodoroSec
    }
    else if(curTime.player == "shortBreak")
    {
        Break.innerHTML = "Short Break"

        curTime.min = settings.sbMin
        curTime.sec = settings.sbSec
    }
    else
    {
        Break.innerHTML = "Long Break"

        curTime.min = settings.lbMin
        curTime.sec = settings.lbSec
    }

    clearInterval(intervalID)
    intervalID = setInterval(countDown, 1000)

    time.textContent = `${curTime.min.toString().padStart(2, 0)}:` + `${curTime.sec.toString().padStart(2, 0)}`

    audio.pause()
    audio.currentTime = 0
    audio.loop = false
}

function countDown() {
    if(curTime.sec == 0)
    {
        curTime.sec = 59
        curTime.min--
    }
    else
    curTime.sec--

    var secString = curTime.sec.toString().padStart(2, 0)
    var minString = curTime.min.toString().padStart(2, 0)

    if(curTime.min == 0 && curTime.sec == 0) {

        audio.currentTime = 0
        audio.play()
        audio.loop = false

        for(let i=0; i<curTime.playerArr.length; i++)
        {
            if(curTime.playerArr[i] == curTime.player)
            {
                if(i!=0)
                {
                    curTime.player = curTime.playerArr[0]
                }
                else if((i == 0) && (curTime.pomodoroCount % (parseInt(settings.lbInterval)+1) != 0))
                {
                    curTime.player = curTime.playerArr[1]
                }
                else if((curTime.pomodoroCount % (parseInt(settings.lbInterval)+1) == 0) && (i == 0))
                    {
                        curTime.player = curTime.playerArr[2]
                    }
                break
            }
        }
        if(curTime.player == "pomodoro")
        {
            curTime.min = settings.pomodoroMin
            curTime.sec = settings.pomodoroSec

            curTime.pomodoroCount ++ 

            let temp = curTime.pomodoroCount

            pomodoroNum.innerHTML = `interval ${curTime.pomodoroCount}/${settings.totalPomodoro}`

            if(curTime.pomodoroCount > settings.totalPomodoro)
            {
                clearInterval(intervalID)
                intervalID = undefined

                restartPomodoro()
            }
            if(!settings.autoPomodoro)
            {
                if(temp <= settings.totalPomodoro)
                {
                    play.classList.toggle("paused")
                    pause.classList.toggle("paused")
                    restart.classList.toggle("paused")
    
                    if((restart.classList.contains("started")))
                    {
                        restart.classList.toggle("started")
                        firstStart = undefined
                    }
                }

                clearInterval(intervalID)
                intervalID = undefined

                reset("Pomodoro")
            }
            else
            {
                Break.innerHTML = "Pomodoro"
                reset("Pomodoro")
            }

        }
        else if(curTime.player == "shortBreak")
        {
            curTime.min = settings.sbMin
            curTime.sec = settings.sbSec

            if(!settings.autoBreak)
            {
                play.classList.toggle("paused")
                pause.classList.toggle("paused")
                restart.classList.toggle("paused")

                if((restart.classList.contains("started")))
                {
                    restart.classList.toggle("started")
                    firstStart = undefined
                }

                clearInterval(intervalID)
                intervalID = undefined

                reset("Short Break")
            }
            else
            {
                Break.innerHTML = "Short Break"
                reset("Short Break")
            }
        }
        else
        {
            curTime.min = settings.lbMin
            curTime.sec = settings.lbSec

            if(!settings.autoBreak)
            {
                play.classList.toggle("paused")
                pause.classList.toggle("paused")
                restart.classList.toggle("paused")

                if((restart.classList.contains("started")))
                {
                    restart.classList.toggle("started")
                    firstStart = undefined
                }

                reset("Long Break")
                
                clearInterval(intervalID)
                intervalID = undefined
            }
            else
            {
                Break.innerHTML = "Long Break"
                reset("Long Break")
            }
        }
    }
    else
        time.textContent = `${minString}:` + `${secString}`
}

function reset(string) {
    var secString = curTime.sec.toString().padStart(2, 0)
    var minString = curTime.min.toString().padStart(2, 0)

    time.textContent = `${minString}:` + `${secString}`

    Break.innerHTML = string
}

function restartPomodoro() {
    curTime.pomodoroCount = 1
    curTime.player = "pomodoro"

    pomodoroNum.innerHTML = `interval ${curTime.pomodoroCount}/${settings.totalPomodoro}`

    pause.classList.toggle("restartPomodoro")
    play.classList.toggle("restartPomodoro")
    restart.classList.toggle("restartPomodoro")

    play.classList.remove("paused")

    rePomodoro.classList.add("visible")

    audio.pause()
    audio.currentTime = 0
    audio.play()
    audio.loop = true
}

function removeRestartPomodoro() {

    rePomodoro.classList.remove("visible")
    pause.classList.toggle("restartPomodoro")
    play.classList.toggle("restartPomodoro")
    restart.classList.toggle("restartPomodoro")

    intervalID = setInterval(countDown, 1000)

    audio.pause()
    audio.currentTime = 0
    audio.loop = false
}

window.addEventListener('resize', resize)

function resize() {
    progressBar.height = document.querySelector(".subcontainer").scrollHeight
    progressBar.width = document.querySelector(".subcontainer").scrollWidth
}

function progressBarAnimation() {
    let totalAngle, totalTime, currentTime, currentAngle, currentCycleTime, currentCycleTotalTime
    let curPomodoroTime, cursbTime, curlbTime, curlbMultiplier

    let pomodoroTime = settings.pomodoroMin * 60 + settings.pomodoroSec
    let sbTime = settings.sbMin * 60 + settings.sbSec
    let lbTime = settings.lbMin * 60 + settings.lbSec

    let totalPomodoroTime = settings.totalPomodoro * pomodoroTime
    let lbMultiplier = parseInt(settings.totalPomodoro/(settings.lbInterval + 1))
    let totalsbTime = (settings.totalPomodoro - lbMultiplier) * sbTime
    let totallbTime = lbMultiplier * lbTime
    
    totalTime = totalPomodoroTime + totalsbTime + totallbTime

    if(curTime.player == "pomodoro")
    {
        curPomodoroTime = (curTime.pomodoroCount) * pomodoroTime - (curTime.min * 60 + curTime.sec)
        curlbMultiplier = parseInt((curTime.pomodoroCount-1)/(settings.lbInterval + 1))
        curlbTime = curlbMultiplier * lbTime
        cursbTime = (curTime.pomodoroCount - 1 - curlbMultiplier) * sbTime

        currentCycleTotalTime = settings.pomodoroMin*60 + settings.pomodoroSec
    }
    else if(curTime.player == "shortBreak")
    {
        curPomodoroTime = curTime.pomodoroCount * pomodoroTime
        curlbMultiplier = parseInt((curTime.pomodoroCount-1)/(settings.lbInterval + 1))
        curlbTime = curlbMultiplier * lbTime
        cursbTime = ((curTime.pomodoroCount - curlbMultiplier) * sbTime) - (curTime.min*60 + curTime.sec)

        currentCycleTotalTime = settings.sbMin * 60 + settings.sbSec
    }
    else 
    {
        curPomodoroTime = curTime.pomodoroCount * pomodoroTime
        curlbMultiplier = parseInt((curTime.pomodoroCount-1)/(settings.lbInterval + 1))
        curlbTime = (curlbMultiplier * lbTime) + lbTime - (curTime.min * 60 + curTime.sec)
        cursbTime = (curTime.pomodoroCount - 1 - curlbMultiplier) * sbTime

        currentCycleTotalTime = settings.lbMin * 60 + settings.lbSec
    }

    currentTime = curPomodoroTime + curlbTime + cursbTime
    currentCycleTime = curTime.min*60 + curTime.sec

    totalAngle = ((totalTime - currentTime) / totalTime) * 2 * Math.PI
    currentAngle = (currentCycleTime / currentCycleTotalTime) * 2 * Math.PI

    let barRadius

    if(document.body.clientWidth > 550)
    {
        barRadius = 240
    }
    else if(document.body.clientWidth > 350) {
        barRadius = document.body.clientWidth / 2 - 50
    }
    else {
        barRadius = document.body.clientWidth / 2 - 40
    }

    bar.clearRect(0, 0, progressBar.width, progressBar.height)

    bar.beginPath()
    bar.arc(progressBar.width/2, progressBar.width/2, barRadius, 0,totalAngle)
    bar.strokeStyle = "#FF67B0"
    bar.lineWidth = 15
    bar.stroke()

    bar.beginPath()
    bar.arc(progressBar.width/2, progressBar.width/2, barRadius-20, 0, currentAngle)
    bar.strokeStyle = "#FF3D82"
    bar.lineWidth = 15
    bar.stroke()

    requestAnimationFrame(progressBarAnimation)
}

progressBarAnimation()

window.addEventListener('resize', progressBarResize)

function progressBarResize() {
    progressBar.height = document.querySelector(".subcontainer").scrollHeight
    progressBar.width = document.querySelector(".subcontainer").scrollWidth
}