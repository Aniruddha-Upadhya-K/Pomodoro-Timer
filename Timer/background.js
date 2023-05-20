let canvas = document.querySelector(".canvas")

let ctx = canvas.getContext("2d")

canvas.height = document.body.clientHeight
canvas.width = document.body.clientWidth

class ribbon {
    constructor(radius, size) {
        this.x1
        this.y1
        this.x2
        this.y2
        this.radius = radius
        this.newX
        this.newY
        this.direction
        this.traverseDir
        this.arr = []
        this.hue
        this.saturation
        this.lightness
        this.color = []
        this.size = size
        this.dx = []
        this.dy = []
    }
    draw() {
        

        if(this.arr.length == 0)
        this.initializer()
        else 
        {
            this.x1 = this.arr[this.arr.length-1][2][0]
            this.y1 = this.arr[this.arr.length-1][2][1]

            if(Math.floor(random(1, 3)) == 1)
            {
                this.direction = 1
                this.x2 = this.arr[this.arr.length-1][0][0]
                this.y2 = this.arr[this.arr.length-1][0][1]
            }
            else
            {
                this.direction = 2
                this.x2 = this.arr[this.arr.length-1][1][0]
                this.y2 = this.arr[this.arr.length-1][1][1]
            }

            if(this.traverseDir==0)
            { 
                this.newX = random(this.x1+5, this.x1 + this.radius)
                this.newY = random(this.y1-this.radius, this.y1 + this.radius)
            }
            else
            {
                this.newX = random(this.x1-5, this.x1 - this.radius)
                this.newY = random(this.y1 - this.radius, this.y1 + this.radius)
            }

            if(this.newY < 0)
            {
                this.newY = random(0, this.radius)
            }
            else if(this.newY > canvas.height)
            {
                this.newY = random(canvas.height, canvas.height - this.radius)
            }

            this.hue += 1
            if(this.hue > 360)
            {
                this.hue = this.hue - 360
            }

            this.dx.push(random(-0.2, 0.2))
            this.dy.push(random(-0.2, 0.2))
            this.color.push(this.hue)
            this.arr.push([[this.x1, this.y1], [this.x2, this.y2], [this.newX, this.newY]])
        }
        
        if(this.arr.length > this.size)
        {
            this.arr.shift()
            this.color.shift()
            this.dx.shift()
            this.dy.shift()
        }

        let x1 = this.arr[this.arr.length-1][0][0]
        let y1 = this.arr[this.arr.length-1][0][1]

        let x2 = this.arr[this.arr.length-1][1][0]
        let y2 = this.arr[this.arr.length-1][1][1]

        let x3 = this.arr[this.arr.length-1][2][0]
        let y3 = this.arr[this.arr.length-1][2][1]

        if(x1>canvas.width || y1>canvas.height || x1<0 || y1<0)
            if(x2>canvas.width || y2>canvas.height || x2<0 || y2<0)
                if(x3>canvas.width || y3>canvas.height || x3<0 || y3<0)
                    {
                        this.arr.splice(0, this.arr.length)
                        this.color.splice(0, this.color.length)
                        this.dx.splice(0, this.dx.length)
                        this.dy.splice(0, this.dy.length)
                    }
        
        for(let i=0; i<this.arr.length; i++)
        {
            let ele = this.arr
            
            ctx.beginPath()
            ctx.moveTo(ele[i][0][0], ele[i][0][1])
            ctx.lineTo(ele[i][1][0], ele[i][1][1])
            ctx.lineTo(ele[i][2][0], ele[i][2][1])
            ctx.closePath()

            ctx.fillStyle = `hsla(${this.color[i]}, ${this.saturation}%, ${this.lightness}%, ${50 - 4*this.arr.length + (10*i)}%)`
            ctx.fill()

            ele[i][0][0] += this.dx[i]
            ele[i][0][1] += this.dy[i]
            ele[i][1][0] += this.dx[i]
            ele[i][1][1] += this.dy[i]
            ele[i][2][0] += this.dx[i]
            ele[i][2][1] += this.dy[i]
        }
    }
    initializer() {
        this.traverseDir = Math.floor(random(0, 2))

        this.y1 = random(0, canvas.height)
        let randomVar = random(-20, 20)
        this.y2 = this.y1 + randomVar == 0? 10 : randomVar 
        
        if(this.traverseDir==0)
        {
            this.x1 = 0
            this.x2 = 0
            
            this.newX = random(this.x1, this.x1 + this.radius)
            this.newY = random(this.y1 - this.radius, this.y1 + this.radius)
        }

        else 
        {
            this.x1 = canvas.width
            this.x2 = canvas.width
            
            this.newX = random(this.x1, this.x1 - this.radius)
            this.newY = random(this.y1 - this.radius, this.y1 + this.radius)
        }
        
        this.hue = Math.floor(random(320, 330))
        this.saturation = Math.floor(random(75, 86))
        this.lightness = Math.floor(random(50, 71))

        this.dx.push(random(-0.2, 0.2))
        this.dy.push(random(-0.2, 0.2))
        this.color.push(this.hue)
        this.arr.push([[this.x1, this.y1], [this.x2, this.y2], [this.newX, this.newY]])
    }
}

var ribbonElement = []
var ribbonElementCount = 4

// ribbonElement[0] = new ribbon(200, 120)
// ribbonElement[1] = new ribbon(150, 100)
// ribbonElement[2] = new ribbon(100, 100)

if(document.body.clientWidth > 768)
for(let i=0; i<ribbonElementCount; i++)
{
    ribbonElement.push(new ribbon(random(100, 200), random(5, 15)))
}
else if(document.body.clientWidth > 500)
for(let i=0; i<ribbonElementCount; i++)
{
    ribbonElement.push(new ribbon(random(80, 120), random(5, 15)))
}
else
for(let i=0; i<ribbonElementCount; i++)
{
    ribbonElement.push(new ribbon(random(50, 80), random(5, 15)))
}

function update() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height)

    for(let i=0; i<ribbonElement.length; i++)
    ribbonElement[i].draw()
}

function random(a, b)
{
    let ran = (Math.random() * (b-a)) + a
    return ran
}
setInterval(update, 150)

window.addEventListener('resize', canvasResize)

function canvasResize() {
    canvas.height = document.body.clientHeight
    canvas.width = document.body.clientWidth
}
