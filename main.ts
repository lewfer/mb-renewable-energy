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
            energy = 0
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
    //% block="panel move left %steps steps"    
    //% group="Power Station"
    //% weight=30
    export function panelMoveLeft(steps : number) {
        if (lrAngle > minAngle + servoMoveIncrement * steps)
            lrAngle -= servoMoveIncrement * steps
        Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo1, lrAngle)
        basic.pause(moveServoWaitTime)
    }

    //% blockId=panelMoveRight
    //% block="panel move right %steps steps"    
    //% group="Power Station"
    //% weight=29
    export function panelMoveRight(steps: number) {
        if (lrAngle < maxAngle - servoMoveIncrement * steps)
            lrAngle += servoMoveIncrement * steps
        Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo1, lrAngle)
        basic.pause(moveServoWaitTime)
    }

    //% blockId=panelMoveUp
    //% block="panel move up %steps steps"
    //% group="Power Station"
    //% weight=28
    export function panelMoveUp(steps: number) {
        if (udAngle > minAngle + servoMoveIncrement * steps)
            udAngle -= servoMoveIncrement * steps
        Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo2, udAngle)
        basic.pause(moveServoWaitTime)
    }

    //% blockId=panelMoveDown
    //% block="panel move down %steps steps"
    //% group="Power Station"
    //% weight=27
    export function panelMoveDown(steps: number) {
        if (udAngle < maxAngle - servoMoveIncrement * steps)
            udAngle += servoMoveIncrement * steps
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
        devices[name] = 0
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
    //% block="check energy for device %deviceName"
    //% group="House"
    //% weight=19
    export function checkEnergy(deviceName: string)  {
        serial.writeLine("get=" + deviceName)
        let message = serial.readLine()
        //let deviceOn = parseInt(message)
        const arr = message.split("=");
        devices[arr[0]] = parseInt(arr[1])
        return devices[deviceName]
    }


    //% blockId=initialise
    //% block="initialise"
    //% group="Both"
    //% weight=50
    export function initialise() {
        serial.setBaudRate(BaudRate.BaudRate9600)
        led.enable(false)
        pins.setPull(DigitalPin.P0, PinPullMode.PullDown)
        pins.setPull(DigitalPin.P1, PinPullMode.PullDown)
        pins.setPull(DigitalPin.P2, PinPullMode.PullDown)
        pins.setPull(DigitalPin.P3, PinPullMode.PullDown)
    }

    //% blockId=setMaxEnergy
    //% block="set max energy %energy"
    //% energy.min=0 col.energy=1023
    //% group="Both"
    //% weight=40
    export function setMaxEnergy(energy: number) {
        maxEnergy = energy
    }

    //% blockId=setSendEnergyWaitTime
    //% block="set send energy wait time %time"
    //% group="Both"
    //% weight=30
    export function setSendEnergyWaitTime(time: number) {
        sendEnergyWaitTime = time
    }

    //% blockId=setMoveServoWaitTime
    //% block="set move servo wait time %time"
    //% group="Both"
    //% weight=20
    export function setMoveServoWaitTime(time: number) {
        moveServoWaitTime = time
    }

    //% blockId=servoMoveIncrement
    //% block="set servo move increment %angle"
    //% group="Both"
    //% weight=10
    export function setServoMoveIncrement(angle: number) {
        servoMoveIncrement = angle
    }


    //% blockId=version
    //% block="version6"
    //% group="Both"
    //% weight=1
    export function version7() {
    }




    // Globals
    let maxEnergy = 1023

    let lrAngle = 90                // current angle for left-right servo
    let udAngle = 90                // current angle for up-down servro
    let minAngle = 20               // min allowed angle for servo
    let maxAngle = 160              // max allowed angle for servo
    let servoMoveIncrement = 10     // amount to move servo 

    let sendEnergyWaitTime = 1000       // time to wait after sending energy, so we don't send too much
    let moveServoWaitTime = 300         // time to wait after moving a servo

    serial.setBaudRate(BaudRate.BaudRate9600)

    let devices: { [id: string] : number;} = {};
}
