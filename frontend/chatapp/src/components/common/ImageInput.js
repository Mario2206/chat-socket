import React, {useState} from 'react'

function ImageInput({onChange}) {

    const MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/svg+xml"]

    const [ urlImg, setUrlImg ] = useState("https://img.freepik.com/vecteurs-libre/caricature-profil-homme-affaires_18591-58479.jpg?size=338&ext=jpg")
    let localStatus = false
    const reader = new FileReader()

    reader.addEventListener("load", ()=> {
        setUrlImg(reader.result)
    })

    const handleFiles = e => {
        const file = e.target.files[0]
        if(!file) {
            return
        }
        
        if(!checkFileType(file.type)) {
            return
        }  
        localStatus = true
        onChange(file, localStatus)
        reader.readAsDataURL(file)
        
    }

    const checkFileType = mimeType => MIME_TYPES.includes(mimeType)
        
    return(
        
        <label>
            <img src={urlImg}/>
            <input type="file" hidden onChange={handleFiles}/>
        </label>
       
        
    )
}

export default ImageInput