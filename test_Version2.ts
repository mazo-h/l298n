// Example wiring: ENA→P1, IN1→P8, IN2→P12, ENB→P2, IN3→P16, IN4→P15
mqL298N.setup(AnalogPin.P1, DigitalPin.P8, DigitalPin.P12, AnalogPin.P2, DigitalPin.P16, DigitalPin.P15)

basic.forever(function () {
    mqL298N.forward(70)
    basic.pause(1000)
    mqL298N.turnLeft(70)
    basic.pause(500)
    mqL298N.forward(70)
    basic.pause(1000)
    mqL298N.stop()
    basic.pause(1000)
})