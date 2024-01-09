import "./App.css";
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
    window.open('https://dlzchui.azurewebsites.net/rfelogs/create-rfelog?invokeAppId=4612376', '_blank')
    handleClosePreview()
  }

  return (
    <div style={{ position: 'relative' }}>
      <div className="container">
        <div>
          <header>
            <h1>Your Name</h1>
          </header>

          <nav>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#contact">Contact</a>
            {/* <a onClick={() => setOpen(true)}>Open PDF</a> */}
            <button
              className='pdf-tab'
              onClick={handlePreview}
            >
              Open Doc
            </button>
          </nav>

          <section id="home">
            <h2>Welcome to My Portfolio</h2>
            <p>Showcasing my work and passion for creating amazing things.</p>
          </section>

          <section id="about">
            <h2>About Me</h2>
            <p>I am a passionate web developer with a focus on creating user-friendly and visually appealing
              websites.</p>
          </section>

          <section id="portfolio">
            <h2>Portfolio</h2>

            <div className="portfolio-item">
              <img src="https://via.placeholder.com/400x300" alt="Project 1" />
              <p>Project 1 - Description goes here.</p>
            </div>

            <div className="portfolio-item">
              <img src="https://via.placeholder.com/400x300" alt="Project 2" />
              <p>Project 2 - Description goes here.</p>
            </div>

            <div className="portfolio-item">
              <img src="https://via.placeholder.com/400x300" alt="Project 3" />
              <p>Project 3 - Description goes here.</p>
            </div>
          </section>

          <section id="contact">
            <h2>Contact Me</h2>
            <p>Feel free to reach out for collaboration, questions, or just to say hello!</p>
          </section>

          <footer>
            <p>&copy; 2023 Your Name. All rights reserved.</p>
          </footer>
        </div>
      </div>
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
