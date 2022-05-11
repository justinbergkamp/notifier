import React, { useState } from "react";
import Table from 'react-bootstrap/Table';


function UploadButton() {

  const [file, setFile] = useState();
  const [array, setArray] = useState([]);

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const logPerson = (person) => {
    console.log(person);
  };

  const csvFileToArray = string => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map(i => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setArray(array);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };

  const headerKeys = Object.keys(Object.assign({}, ...array));

  return (
      <div >
          <h1>REACTJS CSV IMPORT EXAMPLE </h1>
          <form>
              <input
                  type={"file"}
                  id={"csvFileInput"}
                  accept={".csv"}
                  onChange={handleOnChange}
              />

              <button onClick={(e) => { handleOnSubmit(e);  }} >
                  IMPORT CSV
              </button>
          </form>
          <br />

      <Table striped bordered hover>
        <thead>
          <tr>
              <th>Name</th>
              <th>Year</th>
              <th>Month</th>
              <th>Day</th>
              <th>Profile</th>
          </tr>
        </thead>
        <tbody>
        // {slice.map((el) => (
        //   <tr className={styles.tableRowItems} key={el.id}>
        //     <td className={styles.tableCell}>{el.name}</td>
        //     <td className={styles.tableCell}>{el.capital}</td>
        //     <td className={styles.tableCell}>{el.language}</td>
        //   </tr>
        // ))}
          {array.map((item) => (
            <tr key={item.id}   onClick={(e) => {logPerson(item)}}>
              {Object.values(item).map((val) => (
                <td>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>

      </div>
  );
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  todo: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export default UploadButton;
