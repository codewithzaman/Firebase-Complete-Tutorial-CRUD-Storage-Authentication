import React, { useState } from 'react';
import { storage } from '../config/firebaseConfig';
import { ref, uploadBytes } from 'firebase/storage';

const StoreImages = () => {
    // File Upload State
    const [fileUpload, setfileUpload] = useState(null);
    const uploadFile = async ()=>{
        if(!fileUpload) return;
        const filesFolderRef= ref(storage,`projectFile/${fileUpload.name}`)
        try {
            uploadBytes(filesFolderRef,fileUpload)
        } catch (error) {
            console.error(error);
        }
    }
  return (
    <div>
      <h1>Store and Display Images</h1>
      <div>
        <input type="file"
        onChange ={(e) => setfileUpload (e.target.files[0])}
        />
        <button onClick={uploadFile}>Upload Image</button>
      </div>
    </div>
  )
}

export default StoreImages
