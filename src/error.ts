export default class PayPalError extends Error {
    constructor(name: string, message: string) {
        super(message);
        this.name = `PayPalError[${name}]`
    }
}