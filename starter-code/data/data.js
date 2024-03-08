
class Item {
    constructor (name, price, category ) {
        this.name = name;
        this.price = price;
        this.category = category;
    }
    toString() {
        return `${this.name} - ${this.category}: $${this.price}`;
    }
}

// Firestore data converter
const itemConverter = {
    toFirestore: (Item) => {
        return {
            name: Item.name,
            price: Item.price,
            category: Item.category
            };
    },
    //not edit
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Item(data.name, data.price, data.category);
    }
};

import {db} from '../firebaseConfig';
import { collection, query, orderBy, getDocs, doc, where } from 'firebase/firestore';

const itemRef = collection(db,"listings");

function searchByName(inputName) {
    const q = query(itemRef, where("name", "==", "inputName"));
    console.log(q);
    return q
  }

export default searchByName;

