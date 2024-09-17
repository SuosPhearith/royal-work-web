import * as React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import the necessary CSS for the PDF viewer and plugins
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

interface Type {
  pdfUrl: string;
}

const PdfViewer = ({ pdfUrl }: Type) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
      <div style={{ height: "600px" }}>
        <Viewer
          fileUrl={pdfUrl}
          plugins={[defaultLayoutPluginInstance]}
          defaultScale={0}
        />
      </div>
    </Worker>
  );
};

export default PdfViewer;
