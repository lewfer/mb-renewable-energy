//% color="#ff7f50" icon="\uf2f1" block="Energy"
namespace renewableEnergy {

    //% blockId=getEnergy
    //% block="get energy from pin %pin"
    //% group="Power Station"
    //% weight=50
    export function getEnergy(pin: AnalogPin) {
        let energy 
        energy = pins.analogReadPin(pin)
        if (energy>maxEnergy)
            energy = 200
        return energy
    }

    //% blockId=sendEnergy
    //% block="send energy wind %wind solar %solar to grid"    
    //% group="Power Station"
    //% weight=40
    export function sendEnergy (wind: number, solar: number) {
        serial.writeLine("#" + wind + "," + solar + "," + (wind + solar) + ".")
    }

    //% blockId=panelMoveLeft
    //% block="panel move left"    
    //% group="Power Station"
    //% weight=30
    export function panelMoveLeft() {
        if (lrAngle > servoMoveIncrement)
            lrAngle -= servoMoveIncrement
        Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo1, lrAngle)
    }

    //% blockId=panelMoveRight
    //% block="panel move right"    
    //% group="Power Station"
    //% weight=29
    export function panelMoveRight() {
        if (lrAngle < 180-servoMoveIncrement)
            lrAngle += servoMoveIncrement
        Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo1, lrAngle)
    }

    //% blockId=panelMoveUp
    //% block="panel move up"    
    //% group="Power Station"
    //% weight=28
    export function panelMoveUp() {
        if (udAngle > servoMoveIncrement)
            udAngle -= servoMoveIncrement
        Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo2, udAngle)
    }

    //% blockId=panelMoveDown
    //% block="panel move down"    
    //% group="Power Station"
    //% weight=27
    export function panelMoveDown() {
        if (udAngle < 180-servoMoveIncrement)
            udAngle += servoMoveIncrement
        Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo2, udAngle)
    }

    //% blockId=useEnergy
    //% block="user energy for device %deviceName on pin %pin"
    //% group="House"
    export function useEnergy(pin: AnalogPin, deviceName: string) {
        
    }

    //% blockId=addDevice
    //% block="add device %name using power %power"
    //% group="House"
    export function addDevice (name: string, power: number) {
        
    }

    // Globals
    let maxEnergy = 200
    let lrAngle = 90
    let udAngle = 90
    let servoMoveIncrement = 20
}
