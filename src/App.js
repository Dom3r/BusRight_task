import "./App.css";
import { useState, useRef } from "react";
import Papa from "papaparse";
import DataTable from "./Components/DataTable.js";
// add input field with drivers name use that name
// combine all files into to one table
// filtering by driver name all tables in one
function App() {
  const [csvFiles, setCsvFiles] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterDriver, setFilterDriver] = useState("");
  const [combinedData, setCombinedData] = useState([]);
  const fileInputRef = useRef(null);

  const combineData = (data, filterDriver) => {
    const combinedData = [];

    data.forEach((csvData) => {
      const { title, data } = csvData;
      data.forEach((row) => {
        if (row.driverName.includes(filterDriver)) {
          combinedData.push({ ...row, fileName: title });
        }
      });
    });
    return combinedData;
  };
  const handleFilterChange = (e) => {
    const newFilter = e.target.value;
    const newCombinedData = combineData(districtData, newFilter);
    setFilterDriver(newFilter);
    setCombinedData(newCombinedData);
  };

  const handleFileUpload = () => {
    const files = fileInputRef.current.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!csvFiles.includes(file.name)) {
        if (file.type === "text/csv") {
          setLoading(true);
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
    setLoading(false);
  };
  combineData(districtData, filterDriver);

  return (
    <div className="App">
      <h1>Select CSV File</h1>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        multiple
      />
      <br />
      <p>Driver name</p>
      <input type="text" value={filterDriver} onChange={handleFilterChange} />

      {loading ? (
        <div>Loading...</div>
      ) : districtData.length > 0 ? (
        <div>
          <h2>Combined table</h2>
          <DataTable data={combinedData} />
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
