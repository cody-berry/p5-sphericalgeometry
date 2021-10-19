// noinspection NonAsciiCharacters

/*
@author Cody
@date 2021-10-16

This project is simply the sphere function, but we're recreating everything.

version comments
.   use the sphere function, easyCam
.   axis, text
.   make points using latitude and longitude
.   make triangles using a separate loop
.   make adjustable square pyramid
    Adam!!!!
 */
let font
let cam
let x_hue, z_hue, y_hue, x_sat, z_sat, y_sat
const BRIGHT = 80
const DARK = 40
const BOUNDARY = 10000
const detail = 15
// globe is going to be a two-D array...
let globe = Array(detail+1)
// ...so let's fill it!
for (let i = 0; i < globe.length; i++) {
    globe[i] = Array((detail+1)*2)
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

    let φ, θ, x, y, z

    // let's reset our stroke!
    stroke(0, 0, 0)
    // ...and the fill.
    noFill()

    // Alright, let's fill our 2D array with PVectors!
    for (let i = 0; i < globe.length; i++) {
        // let's define our longitude here!
        // φ ranges from 0 to TAU.
        θ = map(i, 0, globe.length-1, 0, PI)
        for (let j = 0; j < globe[i].length; j++) {
            // let's define our latitude here!
            // θ ranges from 0 to PI.
            φ = map(j, 0, globe[i].length-1, 0, PI)

            // Now, we can use formulas to compute our x, our y, and our z
            // coordinates.
            x = sin(φ)*cos(θ)
            y = sin(φ)*sin(θ)
            z = cos(φ)

            // Yay! Now we can set it to globe[i][j].
            globe[i][j] = new p5.Vector(x, y, z)
        }
    }

    let v1, v2, v3, v4

    stroke(0, 0, 50)

    // beginShape()
    //
    // // Here's where we're showing everything!
    // for (let i = 0; i < globe.length-1; i++) {
    //     for (let j = 0; j < globe[i].length-1; j++) {
    //         v1 = globe[i][j]
    //         v2 = globe[i+1][j]
    //         v3 = globe[i+1][j+1]
    //         v4 = globe[i][j+1]
    //         // let's draw points along the sphere!
    //
    //         vertex(v1.x, v1.y, v1.z)
    //         vertex(v2.x, v2.y, v2.z)
    //         vertex(v3.x, v3.y, v3.z)
    //         vertex(v4.x, v4.y, v4.z)
    //     }
    // }
    //
    // endShape()

    // let's fill our pyramid base!

    fill(0, 0, 100)
    noStroke()

    let inc_x = 1
    let inc_y = 2
    let max_r = 50

    for (let x_index = 0; x_index < globe.length-inc_x; x_index+=inc_x) {
        for (let y_index = 0; y_index < globe[x_index].length-inc_y; y_index+=inc_y) {
            fill(210, 100, 20)

            let x = x_index - (globe.length-1)/2
            let y = y_index - (globe[x_index].length-1)/2



            beginShape()
            v1 = globe[x_index][y_index]
            v2 = globe[x_index + inc_x][y_index]
            v3 = globe[x_index + inc_x][y_index + inc_y]
            v4 = globe[x_index][y_index + inc_y]

            let psf

            // we need a radius modifier
            if (sqrt(v1.x*v1.x + v1.z*v1.z) < max_r) {
                psf = 100 + 10 * sin(sqrt(x * x +
                    y * y) + frameCount / 20)
            } else {
                psf = 100
            }

            vertex(v1.x*psf, v1.y*psf, v1.z*psf)
            vertex(v2.x*psf, v2.y*psf, v2.z*psf)
            vertex(v3.x*psf, v3.y*psf, v3.z*psf)
            vertex(v4.x*psf, v4.y*psf, v4.z*psf)

            endShape(CLOSE)

            // we need to draw the base triangles
            fill(180, 100, 100)
            beginShape()
            vertex(v1.x*psf, v1.y*psf, v1.z*psf)
            vertex(0, 0, 0)
            vertex(v2.x*psf, v2.y*psf, v2.z*psf)
            endShape(CLOSE)
            beginShape()
            vertex(v2.x*psf, v2.y*psf, v2.z*psf)
            vertex(0, 0, 0)
            vertex(v3.x*psf, v3.y*psf, v3.z*psf)
            endShape(CLOSE)
            beginShape()
            vertex(v3.x*psf, v3.y*psf, v3.z*psf)
            vertex(0, 0, 0)
            vertex(v4.x*psf, v4.y*psf, v4.z*psf)
            endShape(CLOSE)
            beginShape()
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

