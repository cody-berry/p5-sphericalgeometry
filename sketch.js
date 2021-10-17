// noinspection NonAsciiCharacters

/*
@author Cody
@date 2021-10-16

This project is simply the sphere function, but we're recreating everything.

version comments
.   use the sphere function, easyCam
.   axis, text
    make points using latitude and longitude
    make triangles using a separate loop
    make adjustable square pyramid
    Adam!!!!
 */
let font
let r
let cam
let x_hue, z_hue, y_hue, x_sat, z_sat, y_sat
const BRIGHT = 80
const DARK = 40
const BOUNDARY = 10000
const detail = 24
// globe is going to be a two-D array...
let globe = Array(detail+1)
// ...so let's fill it!
for (let i = 0; i < globe.length; i++) {
    globe[i] = Array(detail+1)
}


function preload() {
    font = loadFont('fonts/Meiryo-01.ttf')
}

function setup() {
    createCanvas(640, 360, WEBGL)
    colorMode(HSB, 360, 100, 100, 100)
    cam = new Dw.EasyCam(this._renderer, {distance:500, center:[0,0,0]});
    noFill()
    textFont(font, 10)
    textAlign(LEFT)
}

function draw() {
    background(234, 34, 24)
    drawBlenderAxisAndText()

    r = 150

    let φ, θ, x, y, z

    // let's reset our stroke!
    stroke(0, 0, 0)
    // ...and the fill.
    noFill()

    // Alright, let's fill our 2D array with PVectors!
    for (let i = 0; i < globe.length; i++) {
        // let's define our longitude here!
        // φ ranges from 0 to TAU.
        φ = map(i, 0, globe.length, 0, PI)
        for (let j = 0; j < globe[i].length; j++) {
            // let's define our latitude here!
            // θ ranges from 0 to PI.
            θ = map(j, 0, globe[i].length, 0, TAU)

            // Now, we can use formulas to compute our x, our y, and our z
            // coordinates.
            x = r*sin(φ)*cos(θ)
            y = r*sin(φ)*sin(θ)
            z = r*cos(φ)

            // Yay! Now we can set it to globe[i][j].
            globe[i][j] = new p5.Vector(x, y, z)
        }
    }

    let v

    stroke(0, 0, 50)

    // Here's where we're showing everything!
    for (let i = 0; i < globe.length; i++) {
        for (let j = 0; j < globe[i].length; j++) {
            v = globe[i][j]
            // let's draw points along the sphere!
            point(v.x, v.y, v.z)
        }
    }

    // let's draw the text!
    cam.beginHUD(this._renderer, width, height) //
    // x
    fill(x_hue, x_sat, BRIGHT) //
    text("x", 10, height-40) //
    // y
    fill(y_hue, y_sat, BRIGHT) //
    text("y", 10, height-30) //
    // z
    fill(z_hue, z_sat, BRIGHT) //
    text("z", 10, height-20) //
    cam.endHUD() //
}

function drawBlenderAxisAndText() {
    x_hue = 0
    x_sat = 70
    y_hue = 90
    y_sat = 80
    z_hue = 210
    z_sat = 90

    // now we can draw our lines! ...and our axis text.
    // x
    // positive
    stroke(x_hue, x_sat, BRIGHT)
    line(0, 0, 0, BOUNDARY, 0, 0)
    // negative
    stroke(x_hue, x_sat, DARK)
    line(0, 0, 0, -BOUNDARY, 0, 0)
    // y
    // positive
    stroke(y_hue, y_sat, BRIGHT)
    line(0, 0, 0, 0, BOUNDARY, 0)
    // negative
    stroke(y_hue, y_sat, DARK)
    line(0, 0, 0, 0, -BOUNDARY, 0)
    // z
    // positive
    stroke(z_hue, z_sat, BRIGHT)
    line(0, 0, 0, 0, 0, BOUNDARY)
    // negative
    stroke(z_hue, z_sat, DARK)
    line(0, 0, 0, 0, 0, -BOUNDARY)
}

