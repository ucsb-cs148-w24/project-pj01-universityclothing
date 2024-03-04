
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

import firestore from '../firebaseConfig';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

const itemRef = collection(firestore,"items");

const q = query(itemRef, orderBy("name"));

async function getItems(){
    const querySnapshot = await getDocs(q);
    const item = [];
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data().toString());
        item.push(doc.data())
    });
    return item
};

export default getItems();
/*const listSnap = await getList(itemRef);

if (listSnap.exists()) {
  // Convert to City object
  const item = listSnap.data();
  // Use a City instance method
  console.log(item.toString());
} else {
  console.log("No such document!");
}
*/
