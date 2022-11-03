function sendEnergy (wind: number, solar: number) {
    serial.writeLine("#" + wind + "," + solar + "," + (wind + solar) + ".")
}
function useEnergy (pin: number, deviceName: string) {
	
}
function addDevice (name: string, watts: number) {
	
}
function getEnergy (pin: number) {
    return pins.analogReadPin(AnalogPin.P0)
}
basic.forever(function () {
	
})
