import css from '!style-loader!css-loader!./css/style.css'
import 'components/test'
import img from 'images/test_icon.png'

class Gianni {
    private greeting: string
    constructor(message: string) {
        this.greeting = message
    }

    public greet() {
        return `Helllo, ${this.greeting} and the mai mai ${img} isor ${css} `
    }
}

document.write(new Gianni('gianni').greet())
