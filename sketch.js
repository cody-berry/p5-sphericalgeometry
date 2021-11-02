// noinspection NonAsciiCharacters

/*
@author Cody
@date 2021-10-16

This project is simply the sphere function, but we're recreating everything.

version comments
.           use the sphere function, easyCam
.           axis, text
.           make points using latitude and longitude
.           make triangles using a separate loop
.           make adjustable square pyramid
*           Adam!!!!
 */
let font
let cam
let x_hue, z_hue, y_hue, x_sat, z_sat, y_sat
const BRIGHT = 80
const DARK = 40
const BOUNDARY = 10000
const detail = 36
// globe is going to be a two-D array...
let globe = Array(detail+1)
// ...so let's fill it!
for (let i = 0; i < globe.length; i++) {
    globe[i] = Array(detail+1)
}
// what is our angle for our Adam?
let angle = 0
// what is our amplitude?
let p5amp
let voice
let lastVoiceAmp = 0


function preload() {
    font = loadFont('data/Meiryo-01.ttf')
    voice = loadSound('data/adam.mp3')
}

// prevent the context menu from showing up :3 nya~
document.oncontextmenu = function() {
    return false;
}

function touchStarted() {
    if (getAudioContext().state !== 'running') {
        getAudioContext().resume().then(r => {
        });
    }
}

function setup() {
    createCanvas(640, 360, WEBGL)
    colorMode(HSB, 360, 100, 100, 100)
    cam = new Dw.EasyCam(this._renderer, {distance:500, center:[0,0,0]});
    noFill()
    textFont(font, 10)
    textAlign(LEFT)
    p5amp = new p5.Amplitude()
    voice.play()
    cam.rotateX(-PI/2)
}


function setupGlobe() {
    let φ, θ, x, y, z

    // let's reset our stroke!
    stroke(0, 0, 0)
    // ...and the fill.
    fill(234, 34, 24)

    // Alright, let's fill our 2D array with PVectors!
    for (let i = 0; i < globe.length; i++) {
        // let's define our longitude here!
        // φ ranges from 0 to TAU.
        φ = map(i, 0, globe.length-1, 0, PI)
        for (let j = 0; j < globe[i].length; j++) {
            // let's define our latitude here!
            // θ ranges from 0 to PI.
            θ = map(j, 0, globe[i].length-1, 0, PI)

            // Now, we can use formulas to compute our x, our y, and our z
            // coordinates.
            x = sin(φ)*cos(θ)
            y = sin(φ)*sin(θ)
            z = cos(φ)

            // Yay! Now we can set it to globe[i][j].
            globe[i][j] = new p5.Vector(x, y, z)
        }
    }
}

function draw() {
    background(223, 29, 35)
    drawBlenderAxisAndText()
    // let's light up the room!
    ambientLight(250)
    directionalLight(0, 0, 10, .5, 1, 0)
    // let's also make light material.

    setupGlobe()
    displayGlobe()

    angle -= 1/10

    drawTorus()
}

// draws 2 toruses around Adam
function drawTorus() {
    translate(0, 0, -5)
    fill(0, 0, 100)
    torus(101, // radius
    2, // tube radius
    detail, // detailX
    detail, // detailY
    )
    fill(200, 100, 20)
    translate(0, 0, 10)
    torus(107, 8, detail, detail)
}

function displayGlobe() {
    console.log(p5amp.getLevel())

    let v1, v2, v3, v4
    fill(0, 0, 100)

    let inc_x = 1
    let inc_y = 1
    let max_r = 75

    for (let x_index = 0; x_index < globe.length - inc_x; x_index += inc_x) {
        for (let y_index = 0; y_index < globe[x_index].length - inc_y; y_index += inc_y) {
            v1 = globe[x_index][y_index]
            v2 = globe[x_index + inc_x][y_index]
            v3 = globe[x_index + inc_x][y_index + inc_y]
            v4 = globe[x_index][y_index + inc_y]

            // what is the average of our 4 vertices
            let avg = new p5.Vector(
                (v1.x+v2.x+v3.x+v4.x)/4,
                (v1.y+v2.y+v3.y+v4.y)/4,
                (v1.z+v2.z+v3.z+v4.z)/4
            )

            let psf
            let distance = sqrt(avg.x*avg.x + avg.z*avg.z)

            // we want our angle to increase by distance*40 because we want
            // to have every square have a different angle
            angle += distance*40

            // we want to average the last amplitude with the current one
            let currentVoiceAmp = (p5amp.getLevel() + lastVoiceAmp) / 2
            lastVoiceAmp = currentVoiceAmp

            // we want our angle to increase by distance*40 because we want
            // to have every square have a different angle
            // angle += distance*40

            // so we've made our voice amplitude...we should make it have a
            // greater effect in the center and less as we get outer.
            currentVoiceAmp = 25*map(currentVoiceAmp, 0, 0.25, 0, 1)/
                ((distance*10)**1.9)

            // console.log(distance*10)
            // console.log((distance*10)**1.9)

            // console.log(currentVoiceAmp)

            // we need a radius modifier
            noStroke()
            if (distance >= max_r/100) {
                psf = 100
            } else {
                // what is our amplitude?
                let amp = map(distance, 0, max_r/100, 10, 5)
                // currentVoiceAmp = constrain(currentVoiceAmp, 0, 30)
                // also, we want our default radius to give a smoother
                // transition from the outer-most face that is moving and
                // the inner-most face that isn't moving.
                // let's try setting the voice amplitude!

                let radius = map(amp, 5, 10, 100, 95) - currentVoiceAmp
                psf = radius + amp * sin(2/5*angle) + amp/2
                psf = constrain(psf, 20, 100+amp)
                psf = map(psf, 20, 100, 50, 100)
                // psf = radius

                console.log(psf)
                // we need to draw the base triangles
                fill(180, 100, 100)
                beginShape()
                vertex(v1.x * psf, v1.y * psf, v1.z * psf)
                vertex(0, 0, 0)
                vertex(v2.x * psf, v2.y * psf, v2.z * psf)
                endShape(CLOSE)
                beginShape()
                vertex(v2.x * psf, v2.y * psf, v2.z * psf)
                vertex(0, 0, 0)
                vertex(v3.x * psf, v3.y * psf, v3.z * psf)
                endShape(CLOSE)
                beginShape()
                vertex(v3.x * psf, v3.y * psf, v3.z * psf)
                vertex(0, 0, 0)
                vertex(v4.x * psf, v4.y * psf, v4.z * psf)
                endShape(CLOSE)
            }

            specularMaterial(223, 34, 24) // specular material reflects less light.
            // On the contrary, it lights up more.
            shininess(100)

            fill(210, 100, 20)
            beginShape()
            vertex(v1.x*psf, v1.y*psf, v1.z*psf)
            vertex(v2.x*psf, v2.y*psf, v2.z*psf)
            vertex(v3.x*psf, v3.y*psf, v3.z*psf)
            vertex(v4.x*psf, v4.y*psf, v4.z*psf)

            endShape(CLOSE)
            // we don't want a clobber effect, so let's revert our addition
            angle -= distance*40
        }
    }

    // let's add a circular background to our sphere
    fill(180, 100, 100)
    rotateX(PI/2)
    circle(0, 0, 200)
    // but also one that's a little bit upward
    fill(200, 100, 20)
    strokeWeight(0.1)
    translate(0, 0, 1)
    circle(0, 0, 200)
}

function drawBlenderAxisAndText() {
    x_hue = 0
    x_sat = 70
    y_hue = 90
    y_sat = 80
    z_hue = 210
    z_sat = 90

    strokeWeight(3)

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