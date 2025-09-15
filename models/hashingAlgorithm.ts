import argon2 from "argon2";

try {
    const hash = await argon2.hash("testing!");
    console.log(hash);

} catch (err) {
    console.log(`Caught error: ${err}`)
}