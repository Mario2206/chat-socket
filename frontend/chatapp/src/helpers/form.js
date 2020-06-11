export function testStatus(objectData) {

    for(let key in objectData) {

        if(!objectData[key].status) {
            return false
        }

    }
    return true

}

export function createFormData(data) {

    const formData = new FormData()

    for(let key in data) {
        formData.append(key, data[key].value)
    }
    return formData
}