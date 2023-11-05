/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  print() {
    let current = this.head;

    while (current !== null) {
      console.log(current.val);
      current = current.next;
    }
  }

  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val);
    // console.log("newNode:", newNode)
    // console.log("this.head:", this.head)
    // console.log("this.head === null", this.head === null)
    if(this.head === null) {
      this.head = newNode;
      // console.log("this.head2:", this.head)
    } else {
    // if(this.tail !== null) {
      this.tail.next = newNode;
    }

    this.tail = newNode;
    // console.log("this.tail", this.tail)
    this.length ++;
  }

  // push(val) {
  //   let newNode = new Node(val);

  //   if (this.head === null) this.head = newNode;

  //   if (this.tail !== null) this.tail.next = newNode;

  //   this.tail = newNode;
  // }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    console.log("value:", val)
    let newNode = new Node(val);

    if(!this.tail){
      this.tail = newNode; 
    } 
    if(this.head) {
      newNode.next = this.head; 
      this.head = newNode;
    } else {
      this.head = newNode;
    }
    this.length ++; 
  }

  /** pop(): return & remove last item. */

  pop() {
    let lastNode; 
    // if list has no items 
    if(!this.head) {
      throw new Error("The list is empty!")

    // if list has one item
    } else if(this.head.val === this.tail.val) {
      lastNode = this.head
      this.head = null;
      this.tail = null;

    // if list has more than one item
    } else { 
    let headNode = this.head;
    let newLastNode = this.locateNewLastNode(headNode);
    lastNode = newLastNode.next
    newLastNode.next = null;
    this.tail = newLastNode;
    }
    this.length --;
    return lastNode.val
  }

  locateNewLastNode(lastNode) {
    while (lastNode.next.next) {
      lastNode = lastNode.next;
    }
    return lastNode
  }


  /** shift(): return & remove first item. */

  shift() {
    let head = this.head; 
 
    if(!this.head){
      throw new Error("The list is empty!")
    } else if(this.head.val === this.tail.val) {
      let headItem = this.head.val;
      this.head = null; 
      this.tail = null; 
      this.length = 0; 
      return headItem
    } else {
      this.head = this.head.next; 
    }
    this.length --; 
    return head.val; 
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {

    if(this.head.val === this.tail.val) {
      if(idx === 0) {
       return this.head.val
      } else {
       throw new Error("The index is invalid")
      }
    }

    let currentNode = this.head
    let count = 0;  

    while (count <= idx) {
      if(count === idx) {
        return currentNode.val
      }
      if(!currentNode.next) {
        throw new Error("That is not a valid index")
      }
      currentNode = currentNode.next;
      count ++; 
    }
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    let value = this.getAt(idx); 
    let currentNode = this.head; 

    while(currentNode.val) {
   
      if(currentNode.val === value) {
        currentNode.val = val;
        return currentNode
      }
      currentNode = currentNode.next; 
    }
  }

  /** insertAt(idx, val): add node w/val before idx. */

  // [5, 10, 15, 20]

  insertAt(idx, val) {
    let valuePrevious; 
    if(idx !== 0){
      valuePrevious = this.getAt(idx -1 ); 
      console.log("valuePrevious:", valuePrevious)
    }
   
    let newNode = new Node(val);
    let nodeAFter; 
    let currentNode = this.head; 

    if(idx === 0){
      newNode.next = currentNode;
      this.head = newNode; 
      this.tail = newNode; 
      this.length ++;

     }

    while(currentNode) {

      if(currentNode.val === valuePrevious) {
        console.log("first if is running")
      
        if(idx !== 0 && currentNode.next) {
            nodeAFter = currentNode.next
            currentNode.next = newNode; 
            newNode.next = nodeAFter; 
        } else {
          currentNode.next = newNode; 
          this.tail = newNode
          newNode.next = null; 
        }
      this.length ++;
    }
    currentNode = currentNode.next; 
  }
}

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    let previousItem; 

    if(idx !== 0) {
      previousItem = this.getAt(idx - 1); 
    }  

    let currentNode = this.head
    
    while(currentNode) {
      let returnedItem;

      if(idx === 0) {
        this.head = null; 
        this.tail = null; 
        returnedItem = currentNode;
      }

      if(currentNode.val === previousItem){  
        if( currentNode.next && currentNode !== 0) {
          returnedItem = currentNode; 
          let postItem = currentNode.next.next
          currentNode.next = postItem; 
          
        } else {
        returnedItem = currentNode.next;
        currentNode.next = null; 
        this.tail = currentNode;

        }
      }
      this.length --; 
      return returnedItem
    }
  }
  /** average(): return an average of all values in the list */

  average() {

    if(!this.head){
      return 0;
    }
    let currentNode = this.head; 
    let totalVal = 0;
    let count = 0;

    while(currentNode) { 
      totalVal += currentNode.val;
      currentNode = currentNode.next;
      count++;
    }
    return(totalVal / count)
  }

}


// let train = new LinkedList(); 
// console.log("train:", train)
// train.push("Engine")
// train.push("Box1")
// train.push("Box2")
// // train.unshift("Box1"); 
// console.log("train1:", train);
// train.print();
// // train.pop(); 
// // train.shift(); 
// train.getAt(1)
// console.log("train:", train);
// train.print();

// let numsList = new LinkedList([5,10]); 
// console.log("nums list with 2 nums:", numsList);
// numsList.print(); 
// numsList.getAt(1); 
// numsList.insertAt(0, 1)
// numsList.shift()
// console.log("numsList should have one item:", numsList)
// numsList.print(); 
// numsList.shift(); 
// console.log("numsList should have zero item:", numsList)
// numsList.print();

// let numsList = new LinkedList([5, 10, 12, 15, 20]); 
// let numsList = new LinkedList([5])
let numsList = new LinkedList([19, 7, 8])
console.log("nums list with 0 nums:", numsList);
numsList.print(); 
// numsList.getAt(1); 
// numsList.insertAt(0, 25)
// numsList.average()
numsList.removeAt(0)
// numsList.shift()
console.log("numsList should have 1 nums:", numsList)
numsList.print(); 
// numsList.shift(); 
// console.log("numsList should have zero item:", numsList)
// numsList.print();




// let train1 = new LinkedList(); 
// console.log("train with one item:", train1)
// train1.push("Engine")
// // train.unshift("Box1"); 
// console.log("train1:", train1);
// train1.print();
// train1.pop(); 
// console.log("train2:", train1);
// train1.print();

// let train2 = new LinkedList(); 
// console.log("train with no items:", train2);
// train2.shift(); 
// train2.print(); 

module.exports = LinkedList;
