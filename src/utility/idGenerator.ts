export function idGenerator(): string
{
    // type annotations are used in typescript, which facilitates type checking by the compiler
    const combination: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";

    // 62 possible values, and with a length of ten, 62¹⁰ permutations (a really large number)
    var id: string = ""; // this variable will contain the id
    // since the length of the id is 10, we will use a count-controlled loop  
    for (let i = 0; i < 10; i++)
    {
        /* adding each character from the string into the variable
        the concat function combines multiple characters into a single string
        */
        id += "".concat(combination[Math.floor(Math.random() * combination.length)]);
        /* Math.floor() will return a whole number, while Math.random() will return a number between 0 and 1.
        the former is needed as you cannot access a position in an array with a fractional number. the multi-
        plication step comes in as it steps up the range from 0 and 1 to a much larger range, putting it from 0
        to the length of the string combination (62).
        */
    }
    return id; // returning the id that has been generated
}