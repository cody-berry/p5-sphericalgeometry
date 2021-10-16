/*
@author Cody
@date 2021-10-16

This project is simply the sphere function, but we're recreating everything.

version comments
    use the sphere function, easyCam
    make points using latitude and longitude
    make triangles using a separate loop
    make adjustable square pyramid
    Adam!!!!
 */
let font
let radius

function preload() {
    font = loadFont('fonts/Meiryo-01.ttf')
}

function setup() {
    createCanvas(640, 360, WEBGL)
    colorMode(HSB, 360, 100, 100, 100)
}

function draw() {
    background(234, 34, 24)

    radius = 150

    noFill()

    sphere(radius)

}