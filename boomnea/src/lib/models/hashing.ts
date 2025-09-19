export async function hashingAlgorithm(key: string): number {
    let table: Array = new Array();
    var sumofCharacters = 0;

    key.split("").forEach(element: char => {
        sumofCharacters += element.charCodeAt()
    });
    return sumofCharacters % 10
}

console.log*