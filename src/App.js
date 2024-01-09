import "./index.css";
import doc from "./document.docx";
import { useState } from "react";
import * as docx from "docx-preview";

console.log("window: ", docx);

export default function App() {

  const [isShow, setIsShow] = useState(false)

  const handlePreview = () => {
    fetch(doc).then((res) => {
      const template = res.arrayBuffer();
      docx
        .renderAsync(template, document.getElementById("panel-section"))
        .then((x) => console.log("docx: finished"));
      console.log("buffer: ", template);
    });
    setIsShow(true)
  }

  const handleClosePreview = () => {
    setIsShow(false)
  }

  const handleRedirect = () => {
    window.open('http://localhost:3000/rfelogs/create-rfelog?invokeAppId=4612376', '_blank')
    handleClosePreview()
  }

  return (
    <div className="App">
      {!isShow &&
        <div id="redirectButton" className="viewerButtons" onClick={handlePreview}>Open</div>
      }
      {
        isShow && <div id="pdfViewerContainer">
          <div
            id="panel-section"
            style={{ height: "800px", overflowY: "visible" }}
          />
          <div id="redirectButton" className="viewerButtons marginRight" onClick={handleRedirect}>Create RfE Log</div>
          <div id="closePdfButton" className="viewerButtons" onClick={handleClosePreview}>&times;</div>
        </div>
      }
    </div>
  );
}
