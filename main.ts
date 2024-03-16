let TdP = 0
let heatindexC = 0
let TempF = 0
let humidityPercent = 0
let HI = 0
input.onButtonPressed(Button.A, function () {
    dewPoint()
    heatIndex()
    display()
    power.lowPowerEnable(LowPowerEnable.Allow)
})
function display () {
    kitronik_VIEW128x64.controlDisplayOnOff(kitronik_VIEW128x64.onOff(true))
    kitronik_VIEW128x64.setFontSize(kitronik_VIEW128x64.FontSelection.Normal)
    kitronik_VIEW128x64.show("Temperature:" + " " + Kitronik_klimate.temperature(Kitronik_klimate.TemperatureUnitList.C) + " " + "°C", 1)
    kitronik_VIEW128x64.show("Pressure:" + " " + Kitronik_klimate.pressure(Kitronik_klimate.PressureUnitList.mBar) + " " + "mBar", 2)
    kitronik_VIEW128x64.show("Humidity:" + " " + Kitronik_klimate.humidity() + " " + "%", 3)
    kitronik_VIEW128x64.show("Dew" + " " + "point:" + " " + TdP + " " + "°C", 4)
    kitronik_VIEW128x64.show("Heat" + " " + "index:" + "" + heatindexC + "" + "°C", 5)
    basic.pause(60000)
    kitronik_VIEW128x64.clear()
    kitronik_VIEW128x64.controlDisplayOnOff(kitronik_VIEW128x64.onOff(false))
}
input.onButtonPressed(Button.B, function () {
    kitronik_VIEW128x64.clear()
    kitronik_VIEW128x64.controlDisplayOnOff(kitronik_VIEW128x64.onOff(false))
})
function heatIndex () {
    if (Kitronik_klimate.temperature(Kitronik_klimate.TemperatureUnitList.C) >= 22) {
        TempF = Kitronik_klimate.temperature(Kitronik_klimate.TemperatureUnitList.F)
        humidityPercent = Kitronik_klimate.humidity()
        HI = Math.trunc(0.5 * (TempF + 61 + (TempF - 68) * 1.2 + humidityPercent * 0.094))
        if (HI >= 80) {
            HI = Math.trunc(-42.379 + 2.04901523 * TempF + 10.14333127 * humidityPercent - 0.22475541 * TempF * humidityPercent - 0.00683783 * TempF * TempF - 0.05481717 * humidityPercent * humidityPercent + 0.00122874 * TempF * TempF * humidityPercent + 0.00085282 * TempF * humidityPercent * humidityPercent - 0.00000199 * TempF * TempF * humidityPercent * humidityPercent)
            if (humidityPercent < 13 && (TempF > 80 || TempF <= 112)) {
                HI = Math.trunc(HI - (13 - humidityPercent) / 4 * Math.sqrt((17 - Math.abs(TempF - 95)) / 17))
            } else if (humidityPercent > 85 && (TempF > 80 || TempF <= 87)) {
                HI = Math.trunc(HI + (humidityPercent - 85) / 10 * ((87 - TempF) / 5))
            }
        }
        heatindexC = Math.trunc((HI - 32) * 5 / 9)
    }
}
function dewPoint () {
    TdP = Math.trunc(Kitronik_klimate.temperature(Kitronik_klimate.TemperatureUnitList.C) - (100 - Kitronik_klimate.humidity()) / 5)
}
