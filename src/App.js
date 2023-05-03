import "./App.css";
import { useState, useEffect, useRef } from "react";
import Papa from "papaparse";
import DataTable from "./Components/DataTable.js";

function App() {
  const [csvFiles, setCsvFiles] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = () => {
    const files = fileInputRef.current.files;
    setLoading(true);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!csvFiles.includes(file.name)) {
        if (file.type === "text/csv") {
          const reader = new FileReader();
          reader.onload = (event) => {
            const text = event.target.result;
            Papa.parse(text, {
              header: true,
              worker: true, // Use web worker for parsing
              step: (row) => {
                setDistrictData((prevData) => {
                  const newData = [...prevData];
                  const csvIndex = newData.findIndex(
                    (item) => item.title === file.name
                  );
                  if (csvIndex === -1) {
                    newData.push({ title: file.name, data: [row.data] });
                  } else {
                    newData[csvIndex].data.push(row.data);
                  }
                  return newData;
                });
              },
              complete: () => {
                setCsvFiles((prevFiles) => [...prevFiles, file.name]);
                setLoading(false);
                alert(`File "${file.name}" was added successfully.`);
              },
            });
          };
          reader.readAsText(file);
        } else {
          alert(`"${file.name}" is not a CSV file`);
        }
      } else {
        alert(`"${file.name}" has already been added`);
      }
    }
  };

  return (
    <div className="App">
      <h1>Select CSV File</h1>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        multiple
      />
      {loading ? (
        <div>Loading...</div>
      ) : districtData.length > 0 ? (
        <div>
          {districtData.map((csvData) => (
            <div key={csvData.title}>
              <h2>{csvData.title}</h2>
              <DataTable data={csvData.data} />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <br />
          No data to display
        </div>
      )}
    </div>
  );
}

export default App;
