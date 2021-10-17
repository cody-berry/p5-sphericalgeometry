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
let red_hue, blue_hue, green_hue, red_sat, blue_sat, green_sat
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
}

function drawBlenderAxisAndText() {
    red_hue = 0
    red_sat = 70
    green_hue = 90
    green_sat = 80
    blue_hue = 210
    blue_sat = 90

    // now we can draw our lines! ...and our axis text.
    // x
    // positive
    stroke(red_hue, red_sat, BRIGHT)
    line(0, 0, 0, BOUNDARY, 0, 0)
    // negative
    stroke(red_hue, red_sat, DARK)
    line(0, 0, 0, -BOUNDARY, 0, 0)
    // text
    fill(red_hue, red_sat, 50)
    // y
    // positive
    stroke(green_hue, green_sat, BRIGHT)
    line(0, 0, 0, 0, BOUNDARY, 0)
    // negative
    stroke(green_hue, green_sat, DARK)
    line(0, 0, 0, 0, -BOUNDARY, 0)
    // z
    // positive
    stroke(blue_hue, blue_sat, BRIGHT)
    line(0, 0, 0, 0, 0, BOUNDARY)
    // negative
    stroke(blue_hue, blue_sat, DARK)
    line(0, 0, 0, 0, 0, -BOUNDARY)
}

