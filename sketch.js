/*
@author Cody
@date 2021-10-16

This project is simply the sphere function, but we're recreating everything.

version comments
    use the sphere function, easyCam
    axis, text
    make points using latitude and longitude
    make triangles using a separate loop
    make adjustable square pyramid
    Adam!!!!
 */
let font
let radius
let cam
let x_hue, z_hue, y_hue, x_sat, z_sat, y_sat
const BRIGHT = 80
const DARK = 40
const BOUNDARY = 1000000000


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

    radius = 150

    // let's reset our stroke!
    stroke(0, 0, 0)
    // ...and the fill.
    noFill()

    stroke(0, 0, 50)
    sphere(radius)
    cam.beginHUD(this._renderer, width, height)
    // x
    fill(x_hue, x_sat, BRIGHT)
    text("x", 10, height-40)
    // y
    fill(y_hue, y_sat, BRIGHT)
    text("y", 10, height-30)
    // z
    fill(z_hue, z_sat, BRIGHT)
    text("z", 10, height-20)
    cam.endHUD()
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

