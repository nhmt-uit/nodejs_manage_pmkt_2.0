class Helpers {
    getIPAddress() {
        let myIP = "0.0.0.0"
        const interfaces = require("os").networkInterfaces()
        for (let devName in interfaces) {
            const iface = interfaces[devName]

            iface.forEach( item => {
                if (item.family === "IPv4" && item.address !== "127.0.0.1" && !item.internal)
                    myIP = item.address
            })
        }
        return myIP
    }

    getNumberPad(number, length = 3) {
        return number.toLocaleString(undefined, {useGrouping: false, minimumIntegerDigits: length})
    }
}

export default new Helpers