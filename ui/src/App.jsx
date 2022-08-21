import axios from 'axios';
import { useState } from 'react';
import './App.css';

function App() {
  const [uploadFile,setUploadFile] = useState('')
  
  const [uploadedFile, setUploadedFile] = useState({});

  const handleSubmit=async(e)=>{
e.preventDefault()
console.log(uploadFile);
const url = `http://localhost:8001/upload`
const formData = new FormData()
formData.append('uploadFile',uploadFile)
formData.append('fileName',uploadFile.name)
const config ={
  Headers:{
    'Content-type':'multipart/form-data'
  }
}

 await axios.post(url,formData,config)
.then((res)=>{
  const {fileName,filePath} = res.data
  setUploadedFile({fileName,filePath})

  console.log(filePath)
})
.catch((err)=>console.log(err))

  }
  const handleChange=(e)=>{
setUploadFile(e.target.files[0])
  }
  return (
  <>
<section style={{display:'grid',justifyContent:'center'}}>
 <h4>File upload</h4>
 <form onSubmit={handleSubmit}>
  <input type="file" onChange={handleChange} required multiple/>
  <button type='submit'>Upoad</button>
 </form>
<h4>Please upload your images </h4>
 <h3> Name of image: {uploadedFile.fileName}</h3>
            <img src={uploadFile.filePath} alt='' />


            </section>

  </>
  );
}

export default App;
