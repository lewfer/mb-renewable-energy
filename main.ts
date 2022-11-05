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
        basic.pause(sendEnergyWaitTime)
    }

    //% blockId=panelMoveLeft
    //% block="panel move left"    
    //% group="Power Station"
    //% weight=30
    export function panelMoveLeft() {
        if (lrAngle > minAngle + servoMoveIncrement)
            lrAngle -= servoMoveIncrement
        Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo1, lrAngle)
        basic.pause(moveServoWaitTime)
    }

    //% blockId=panelMoveRight
    //% block="panel move right"    
    //% group="Power Station"
    //% weight=29
    export function panelMoveRight() {
        if (lrAngle < maxAngle-servoMoveIncrement)
            lrAngle += servoMoveIncrement
        Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo1, lrAngle)
        basic.pause(moveServoWaitTime)
    }

    //% blockId=panelMoveUp
    //% block="panel move up"    
    //% group="Power Station"
    //% weight=28
    export function panelMoveUp() {
        if (udAngle > minAngle + servoMoveIncrement)
            udAngle -= servoMoveIncrement
        Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo2, udAngle)
        basic.pause(moveServoWaitTime)
    }

    //% blockId=panelMoveDown
    //% block="panel move down"    
    //% group="Power Station"
    //% weight=27
    export function panelMoveDown() {
        if (udAngle < maxAngle-servoMoveIncrement)
            udAngle += servoMoveIncrement
        Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo2, udAngle)
        basic.pause(moveServoWaitTime)
    }

    //% blockId=setServoIncrement
    //% block="set servo move amount %amount"
    //% group="Power Station"
    export function setServoIncrement(amount: number) {
        servoMoveIncrement = amount
    }

    //% blockId=clearDevices
    //% block="clear devices"
    //% group="House"
    //% weight=50
    export function clearDevices() {
        serial.writeLine("clear")
    }

    //% blockId=addDevice
    //% block="add device %name using power %power"
    //% group="House"
    //% weight=40
    export function addDevice(name: string, power: number) {
        serial.writeLine(name + "=" + power)
    }

    //% blockId=ready
    //% block="ready"
    //% group="House"
    //% weight=30
    export function ready() {
        serial.writeLine("ready")
    }


    //% blockId=useEnergy
    //% block="use energy for device %deviceName on pin %pin"
    //% group="House"
    //% weight=20
    export function useEnergy(deviceName: string, pin: DigitalPin)  {
        serial.writeLine("get=" + deviceName)
        let message = serial.readLine()
        let deviceOn = parseInt(message)
        pins.digitalWritePin(pin, deviceOn)
    }

    //% blockId=checkEnergy
    //% block="chec energy for device %deviceName"
    //% group="House"
    //% weight=19
    export function checkEnergy(deviceName: string)  {
        serial.writeLine("get=" + deviceName)
        let message = serial.readLine()
        let deviceOn = parseInt(message)
        return deviceOn
    }



    //% blockId=version
    //% block="version3"
    //% group="House"
    //% weight=18
    export function version3() {
    }



    // Globals
    let maxEnergy = 200

    let lrAngle = 90                // current angle for left-right servo
    let udAngle = 90                // current angle for up-down servro
    let minAngle = 0                // min allowed angle for servo
    let maxAngle = 180              // max allowed angle for servo
    let servoMoveIncrement = 20     // amount to move servo 

    let sendEnergyWaitTime = 1000       // time to wait after sending energy, so we don't send too much
    let moveServoWaitTime = 500         // time to wait after moving a servo

    serial.setBaudRate(BaudRate.BaudRate9600)
}
