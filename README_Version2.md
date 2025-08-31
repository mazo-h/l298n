# Maqueen→L298N (micro:bit MakeCode extension)

Maqueen-style blocks mapped to a generic L298N H-bridge. Use micro:bit PWM pins to drive ENA/ENB for speed and IN1/IN2/IN3/IN4 for direction.

## Wiring (example)
- Left motor: ENA→P1 (PWM), IN1→P8, IN2→P12
- Right motor: ENB→P2 (PWM), IN3→P16, IN4→P15
- Power motors 7–12V to the L298N. Share GND with micro:bit.
- Remove the ENA/ENB jumpers so PWM controls speed.

## Blocks
- Setup: choose pins for ENA/IN1/IN2 and ENB/IN3/IN4
- Motor: motor run (M1/M2/All, CW/CCW, speed%), motor stop, motor brake
- Motion: forward, backward, turn left, turn right, stop
- Invert: invert left, invert right to fix reversed wiring

## License
MIT