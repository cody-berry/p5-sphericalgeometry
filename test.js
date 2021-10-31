/*
@author Cody
@date 2021-

A blank project to test .getLevel

 */

let font
let p5amp, voice

function touchStarted() {
    if (getAudioContext().state !== 'running') {
        getAudioContext().resume().then(r => {});
    }
}

function preload() {
    font = loadFont('fonts/Meiryo-01.ttf')
    voice = loadSound('adam.mp3')
}

function setup() {
    createCanvas(640, 360)
    colorMode(HSB, 360, 100, 100, 100)
    p5amp = new p5.Amplitude()
    voice.play()
}

function draw() {
    background(234, 34, 24)
    console.log(p5amp.getLevel())
}