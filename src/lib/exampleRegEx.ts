let string = "AQA Education,[1] trading as AQA (formerly the Assessment and Qualifications Alliance),\
is an awarding body in England, Wales and Northern Ireland. It compiles specifications and holds examinations \
in various subjects at GCSE, AS and A Level \
and offers vocational qualifications. AQA is a registered charity and \
independent of the government. However, its qualifications and exam \
syllabi are regulated by the Government of the United Kingdom, which is \
the regulator for the public examinations system in England and Wales."

const regex = new RegExp("\\[\\d+\\]", "g")
let newString = string.replaceAll(regex, "")

console.log(newString)