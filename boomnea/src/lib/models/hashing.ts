import { stringify } from "node:querystring";

/*
 * a linked list has nodes
 * which contain two types
 * of info: 'data'
 * which contains
 * the actual value and
 * 'next', the next node in
 * the sequence
*/
class ListNode<T> {
    // ** T means ' (generic) type', ClassName<T> as in
    // ** the type parameter that
    // ** is being specified which
    // ** represents the whole class
    data: T;
    nextNode: ListNode<T> | null;

    // ** we need to declare 'null' as nullable as we will 
    // ** need to pass it as an argument later in the program
    constructor(data: T, nextNode: ListNode<T> | null = null) {
        this.data = data;
        this.nextNode = nextNode;
    }
}

// ** the first node is called 'head'
// ** we are defining that first node here.
class LinkedList<T> {
    head: ListNode<T> | null;

    constructor() {
        this.head = null;
    }
    append(data: T): void {
        const newNode = new ListNode(data);

        if (!this.head)
        {
            this.head = newNode;
        } else {
            let currentNode: ListNode<T> = this.head;
            while (currentNode.nextNode) 
            {
                currentNode = currentNode.nextNode;
            }
        }
    }
    addFirst(data: T): void {
        const newNode = new ListNode(data);
        newNode.nextNode = this.head;
        this.head = newNode.nextNode;
    }

    delete(data: T): void {
        if (!this.head) {
            return;
        } else {
            if (this.head.data === data) {
                this.head = this.head.nextNode;
                return;
            }
        }

        let current: ListNode<T> = this.head;

        while (current.nextNode) {
            if (current.nextNode.data === data) {
                current.nextNode = current.nextNode.nextNode;
                return;
            }
            current = current.nextNode;
        }
        
    }
}

export class Hash {
    size: number;
    table: LinkedList<string>[] = [];
    // ** instantiating the class
    constructor(size: number) {
        this.size = size;
    }
    hashingAlgorithm(key: string): number {
        let hashValue: number = 0;
        key.split("").forEach(element => {
            /*
              *  '<<' is a bitwise shift operator to the left
              *   by 5 means we are multiplying by 32.

              *  charCodeAt() returns the unicode value of a character
              *  at a specified index (position) in a string, '0' means
              *  the letter in the first position of the string
            */

            hashValue = ((hashValue << 5) + hashValue) + element.charCodeAt(0);
        });
        /* 
           * Math.abs forces var hashValue to be positive and 
           * therefore a positive index when using MOD
        */
        return Math.abs(hashValue) % this.table.length;
    }
    insert(value: string): void {
        const index = this.hashingAlgorithm(value);

        // ** if there is nothing in the location where
        // ** the record should be stored
        if (!this.table[index])
        {
            this.table[index] = new LinkedList<string>(
                (a: string, b: string) => a ===
            )
        }
    }

}

