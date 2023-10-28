import { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";

import "./styles.css";

const fileTypes = ["JPEG", "PNG", "GIF"];

export default function App() {
  const [file, setFile] = useState([]);

  // Function to handle file drop
  const handleFileDrop = (event) => {
    event.preventDefault(); // Prevent the browser's default behavior for file drops
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      setFile(prevFile=>[...prevFile,...droppedFiles]);
    }
  };

  // Attach event listeners when the component mounts
  useEffect(() => {
    const dropContainer = document.getElementById("app-container"); // Replace "app-container" with the appropriate container ID
    dropContainer.addEventListener("dragover", (event) =>
      event.preventDefault()
    );
    dropContainer.addEventListener("drop", handleFileDrop);

    // Clean up the event listeners when the component unmounts
    return () => {
      dropContainer.removeEventListener("dragover", (event) =>
        event.preventDefault()
      );
      dropContainer.removeEventListener("drop", handleFileDrop);
    };
  }, []);

  return (
    <div
      className="App"
      id="app-container"
      style={{
        // width: "100vw",
        minHeight: "100vh",
        margin: "0px",
        padding: "0px",
        boxSizing: "border-box",
        overflowY:'auto'
      }}
    >
      <h1>Hello To Drag & Drop Files</h1>
      <FileUploader
        multiple={true}
        handleChange={(uploadedFiles) => setFile(uploadedFiles[0])}
        name="file"
        types={fileTypes}
      />
      <div style={{display:'flex',justifyContent:"center",alignItems:"center",flexDirection:"row",flexWrap:"wrap",minWidth:"80vw"}}>

     {
       file.map((file)=>{
         return(
           <div >
         {/* <p>{file ? `File name: ${file.name}` : "No files uploaded yet"}</p> */}
         <img src={URL.createObjectURL(file)} alt="Uploaded Image" height={'200px'}/>

        </div>
      )
    })
  }
  </div>
    </div>
  );
}
