export const textEncoder = (text, maxLength)=> {
    let textToTest = text
    let fragments = []
    while(textToTest.length > maxLength) {
        
        fragments = [...fragments,textToTest.slice(0, maxLength)]
        textToTest = textToTest.substring(maxLength)

    }

    return fragments.join("\n")
}

export const messageEncoder = (message, maxLengthByWord) => {
    
    const MAX_LENGTH_BY_WORD = maxLengthByWord
    const fragments = message.split(" ")
    const messageEncoded = fragments.map(item=>item.length > MAX_LENGTH_BY_WORD ? textEncoder(item, MAX_LENGTH_BY_WORD) : item).join(" ")
    
        return messageEncoded
}