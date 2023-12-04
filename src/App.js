import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [archivos, setArchivos] = useState({
    name : '',
    archivoFile: null
  })
  const [imagesS3, setImagesS3] = useState()

  useEffect(()=>{
    const data =async()=>{
      await axios.get('http://localhost:4000/allimage').then(res=> setImagesS3(res))
      
    }

    data()
  },[])
  

  console.log(archivos.archivoFile)

  const handleSubmint = async(e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("photo", archivos.archivoFile);
  
    const res = await axios.post('http://localhost:4000/upload', formData, {
      headers: {
        "content-type": "multipart/form-data"
      }
    });
  
    console.log(res);
  }

 
  return (
    <div className="bg-slate-800 text-white h-full flex flex-col justify-center items-center">
      <h1 className="text-2xl">Formulario para cargar archivos en AWS s3</h1>
      <form className="flex flex-col justify-center items-center bg-slate-900 rounded-3xl p-10 my-3 shadow-lg shadow-slate-700 w-1/3" onSubmit={e=>handleSubmint(e)}>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-green-50  ${archivos.archivoFile ? 'dark:bg-green-900' : 'dark:bg-gray-700 dark:hover:bg-gray-600'}  dark:border-gray-600 dark:hover:border-gray-500 `}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and
                drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" onChange={e=> setArchivos({...archivos, archivoFile: e.target.files[0]})} />
          </label>
        </div>
        <button className="bg-slate-800 hover:bg-slate-700 px-5 py-3 rounded-lg mt-4">
          Cargar datos
        </button>
      </form>
      <h3 className="text-3xl mt-10">Imagenes guardadas en la base de datos AWS s3:</h3>
      <div className="flex flex-row flex-wrap justify-center items-center bg-slate-900 rounded-3xl p-10 my-3 shadow-lg shadow-slate-700 w-3/4">

      {
        
       imagesS3 && imagesS3.data.resp.map(img=>{
         return(
           
           <img className='w-1/5 px-3 py-2' src={img.url} alt={img.key}/>
           
           )
          })
        }
        </div>
      
    </div>
  );
}

export default App;
