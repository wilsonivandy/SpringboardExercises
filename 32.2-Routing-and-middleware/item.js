const items = require('./fakeDb');

class Item {
    constructor(name, price) {
        this.name = name;
        this.price = price;

        items.push(this);
    }

    static getAll(){
        return items;
    }

    static find(name){
        let item = items.find(i => i.name == name);
        if (item === undefined) {
            throw {message: "Not Found", status: 404};
        } 
        return item;
    } 

    static remove(name) {
        let itemIndex = items.findIndex(i => i.name == name);
        if (itemIndex === -1) {
            throw {message: "Not Found", status: 404};
        } 
        return items.splice(itemIndex, 1);
    }

    static change(name, data) {
        let item = Item.find(name);
        if (item === undefined) {
            throw {message: "Not Found", status: 404};
        }
        item.name = data.name;
        item.price = data.price;
        return item;
    }

}

module.exports = Item;



