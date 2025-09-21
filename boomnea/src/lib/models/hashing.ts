export class Hash {
    table: Array<number>;
    size: number;

    constructor(size = 10) {
        this.size = size;
        this.table = Array(size);
    }
    hashingAlgorithm(key: string) {
        var hashValue: number = 0;
        key.split("").forEach(element => {
            // << 5 means multiply by 32, this is a bitwise shift to the left
            hashValue = ((hashValue << 5) + hashValue) + element.charCodeAt(0);
        });
        /* Math.abs forces hashValue to be positive and 
        therefore a positive index when using MOD
        */
        return Math.abs(hashValue) % this.table.length;
    }
    /* TODO: figure out how to do this part...
    insert(key: string, value: number) {

    }
    */
}