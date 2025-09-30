export class Hash {
    bucket: number;
    table: Array<number>;
    constructor(numBuckets: number) {
        //** hash buckets in hash tables are used
        //** 
        this.bucket = numBuckets;
        this.table = Array(V);
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
    insert(key: string) {
        const idx: number = this.hashingAlgorithm(key);
        this.table[idx].push(key);
        
        table.forEach(element => {
            
    })
    }
}
