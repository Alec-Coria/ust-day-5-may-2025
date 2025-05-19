class Book {
    constructor(title, price){
        this.title = title;
        this.cost = price;
    }
    borrow(){
        console.log(`${this.title} is borrowed`)
    }
    static rent(){
        console.log(this.title);
    }
}

class FinctionBook extends Book {
    borrow() {
        console.log('override');
        super.borrow;
    }
}

const b1 = new Book("Learn HTML", 100);
console.log(b1.cost);
Book.rent();
const fb = new FinctionBook('Caves of Steel', 101);
console.log(fb.title)
fb.borrow();