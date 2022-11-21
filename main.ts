input.onButtonPressed(Button.A, function () {
    light2 += 10
    radio.sendValue("light", light2)
})
radio.onReceivedValue(function (name, value) {
    if (name == "speed") {
        Rover.Move(value)
    }
    if (name == "light") {
        light2 = value
        Rover.setBrightness(light2)
    }
})
let Z = 0
let Y = 0
let X = 0
let light2 = 0
Rover.Move(1024)
radio.setGroup(1)
Rover.setALLRGB(Rover.colors(RoverColors.White))
basic.forever(function () {
    X = pins.analogReadPin(AnalogPin.P4)
    Y = pins.analogReadPin(AnalogPin.P0)
    Z = X * -1 + 1024
    basic.clearScreen()
    led.plot(Z / 210, Y / 210)
    serial.writeLine("" + convertToText(Z) + ("\",\"" + convertToText(Y)))
    radio.sendValue("speed", Z)
    radio.sendValue("turn", Y)
})
