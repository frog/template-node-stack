import './test'
class Gianni {
    private greeting: string
    constructor(message: string) {
        this.greeting = message
    }
    public greet() {
        return 'Hello, ' + this.greeting
    }
}
document.write(new Gianni('gianni').greet())
