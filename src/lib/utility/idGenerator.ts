export function idGenerator()
{
    // type annotations are used in typescript, which facilitates type checking by the compiler
    const combination: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";

    // 62 possible values, and a length of ten, 62¹⁰ permutations (a really large number)
    var id: string = ""; // this variable will contain the id
    for (let i = 0; i < 10; i++)
    {
        id += "".concat(combination[Math.floor(Math.random() * combination.length)]); // chooses a random number from 0 to 61 which determines the position in the array
    }
    return id;
}