import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faArrowUpFromBracket,
//   faTrash,
// } from "@fortawesome/free-solid-svg-icons";
import "./FileUpload.css";
import { MdUploadFile } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import PDFJSWorker from "pdfjs-dist/legacy/build/pdf.worker.entry";

const FileUpload = ({
  files,
  setFiles,
  type,
  text,
  required,
  removeFile,
  setFileText,
}) => {
  pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJSWorker;
  const uploadHandler = (event) => {
    const file = event.target.files[0];
    setFiles([file]);

    const reader = new FileReader();

    reader.onload = async (e) => {
      if (file.name.split(".").pop() === "txt") {
        const txt = e.target.result;
        event.target.files[0].text().then((text) => {
          setFileText(text);
        });
      } else if (file.name.split(".").pop() === "pdf") {
        extractTextFromPDF(reader.result).then((text) => {
          setFileText(text);
        });
      } else  {
        alert("File type not supported yet.")
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  async function extractTextFromPDF(file) {
    const pdf = await pdfjsLib.getDocument(file).promise;
    const maxPages = pdf.numPages;
    let text = "";
    for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();
      const pageText = content.items.map((item) => item.str).join("\n");
      text += pageText + "\n";
    }
    return text;
  }

  return (
    <>
      <div className="file-card2 relative w-full h-full flex">
        <div className="file-inputs2">
          <input
            required={required}
            accept={"application/pdf, text/plain, .docx"}
            onClick={(event) => {
              event.target.value = null;
            }}
            type="file"
            onChange={uploadHandler}
          />
          <button className="cursor-pointer ">
            {/* <i>
              <MdUploadFile size={24} />
            </i> */}
            {text}
          </button>
        </div>
        {files.length > 0 && (
          <div
            className="text-[#ff6666] cursor-pointer mr-2 text-[14px] absolute right-12"
            onClick={removeFile}
          >
            <BsFillTrashFill size={20} />
          </div>
        )}
      </div>
    </>
  );
};

export default FileUpload;
