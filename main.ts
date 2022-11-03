//% color="#ff7f50" icon="\uf2f1" block="Energy"
namespace renewableEnergy {

    //% blockId=getEnergy
    //% block="get energy from pin %pin"
    export function getEnergy(pin: AnalogPin) {
        return pins.analogReadPin(pin)
    }

    //% blockId=sendEnergy
    //% block="send energy wind %wind solar %solar to grid"
    export function sendEnergy (wind: number, solar: number) {
        serial.writeLine("#" + wind + "," + solar + "," + (wind + solar) + ".")
    }

    //% blockId=useEnergy
    //% block="user energy for device %deviceName on pin %pin"
    export function useEnergy(pin: AnalogPin, deviceName: string) {
        
    }

    //% blockId=addDevice
    //% block="add device %name using power %power"
    export function addDevice (name: string, power: number) {
        
    }

}
