//% color=190 weight=100 icon="\uf1b9" block="Maqueen→L298N"
namespace mqL298N {
    export enum Motors { M1, M2, All }
    export enum Dir { CW, CCW }

    let ENA: AnalogPin = AnalogPin.P1
    let IN1: DigitalPin = DigitalPin.P8
    let IN2: DigitalPin = DigitalPin.P12

    let ENB: AnalogPin = AnalogPin.P2
    let IN3: DigitalPin = DigitalPin.P16
    let IN4: DigitalPin = DigitalPin.P15

    let invertL = false
    let invertR = false

    function clamp(v: number, a: number, b: number) { return Math.max(a, Math.min(b, v)) }
    function pctToAnalog(pct: number) { return Math.idiv(Math.max(0, Math.min(100, pct)) * 1023, 100) }

    function setLR(leftForward: boolean, rightForward: boolean, speedPctL: number, speedPctR: number) {
        const lf = invertL ? !leftForward : leftForward
        pins.digitalWritePin(IN1, lf ? 1 : 0)
        pins.digitalWritePin(IN2, lf ? 0 : 1)
        pins.analogWritePin(ENA, pctToAnalog(speedPctL))

        const rf = invertR ? !rightForward : rightForward
        pins.digitalWritePin(IN3, rf ? 1 : 0)
        pins.digitalWritePin(IN4, rf ? 0 : 1)
        pins.analogWritePin(ENB, pctToAnalog(speedPctR))
    }

    //% block="motor run %m | dir %d | speed %s \\%"
    //% s.min=0 s.max=100 s.defl=70
    export function motorRun(m: Motors, d: Dir, s: number) {
        const forward = (d == Dir.CW)
        if (m == Motors.M1) {
            const lf = invertL ? !forward : forward
            pins.digitalWritePin(IN1, lf ? 1 : 0)
            pins.digitalWritePin(IN2, lf ? 0 : 1)
            pins.analogWritePin(ENA, pctToAnalog(s))
        } else if (m == Motors.M2) {
            const rf = invertR ? !forward : forward
            pins.digitalWritePin(IN3, rf ? 1 : 0)
            pins.digitalWritePin(IN4, rf ? 0 : 1)
            pins.analogWritePin(ENB, pctToAnalog(s))
        } else {
            setLR(forward, forward, s, s)
        }
    }

    //% block="motor stop %m"
    export function motorStop(m: Motors) {
        if (m == Motors.M1) pins.analogWritePin(ENA, 0)
        else if (m == Motors.M2) pins.analogWritePin(ENB, 0)
        else { pins.analogWritePin(ENA, 0); pins.analogWritePin(ENB, 0) }
    }

    //% block="motor brake %m"
    export function motorBrake(m: Motors) {
        if (m == Motors.M1 || m == Motors.All) { pins.digitalWritePin(IN1, 1); pins.digitalWritePin(IN2, 1); pins.analogWritePin(ENA, 0) }
        if (m == Motors.M2 || m == Motors.All) { pins.digitalWritePin(IN3, 1); pins.digitalWritePin(IN4, 1); pins.analogWritePin(ENB, 0) }
    }

    //% block="setup L298N ENA %ena IN1 %in1 IN2 %in2 ENB %enb IN3 %in3 IN4 %in4"
    export function setup(ena: AnalogPin, in1: DigitalPin, in2: DigitalPin, enb: AnalogPin, in3: DigitalPin, in4: DigitalPin) {
        ENA = ena; IN1 = in1; IN2 = in2; ENB = enb; IN3 = in3; IN4 = in4
        motorStop(Motors.All)
    }

    //% block="invert left %on"
    export function invertLeft(on: boolean) { invertL = on }
    //% block="invert right %on"
    export function invertRight(on: boolean) { invertR = on }

    //% block="forward speed %s \\%"
    export function forward(s: number) { setLR(true, true, s, s) }
    //% block="backward speed %s \\%"
    export function backward(s: number) { setLR(false, false, s, s) }
    //% block="turn left speed %s \\%"
    export function turnLeft(s: number) { setLR(true, true, 0, s) }
    //% block="turn right speed %s \\%"
    export function turnRight(s: number) { setLR(true, true, s, 0) }
    //% block="stop"
    export function stop() { motorStop(Motors.All) }
}