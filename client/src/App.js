import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  // const displayInfo = () => {
  //   console.log(name + age + country + position + wage);
  // };

  const [newWage, setNewWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };

  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        },
      ]);
    });
  };

  const updateEmployeeWage = (id) => {
    Axios.put("http://localhost:3001/update", {
      wage: newWage,
      id: id,
    }).then((response) => {
      setEmployeeList(
        employeeList.map((val) => {
          return val.id === id
            ? {
                id: val.id,
                name: val.name,
                country: val.country,
                age: val.age,
                position: val.position,
                wage: newWage,
              }
            : val;
        })
      );
    });
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  //searching
  // const searchEmployee = () => {
  //   Axios.get("http://localhost:3001/search").then((response) => {});
  // };

  return (
    <div className="App">
      <div className="informations">
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter your Name"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <label>Age</label>
        <input
          type="number"
          placeholder="Enter your Age"
          onChange={(e) => setAge(e.target.value)}
        ></input>
        <label>Country</label>
        <input
          type="text"
          placeholder="Enter your Country"
          onChange={(e) => setCountry(e.target.value)}
        ></input>
        <label>Position</label>
        <input
          type="text"
          placeholder="Enter your Position"
          onChange={(e) => setPosition(e.target.value)}
        ></input>
        <label>Wage</label>
        <input
          type="text"
          placeholder="Enter your Wage"
          onChange={(e) => setWage(e.target.value)}
        ></input>
        <button type="submit" onClick={addEmployee}>
          ADD EMPLOYEE
        </button>
      </div>

      <div className="view-section">
        <button onClick={getEmployees} id="btn">
          SHOW EMPLOYEES
        </button>

        {employeeList.map((val, key) => {
          return (
            <div className="employee">
              <h3> Name : {val.name}</h3>
              <h3> Age : {val.age}</h3>
              <h3> Country : {val.country}</h3>
              <h3> Position : {val.position}</h3>
              <h3> Wage : {val.wage}</h3>
              <div className="update-section">
                <input
                  type="text"
                  placeholder=" new wage . . ."
                  onChange={(e) => {
                    setNewWage(e.target.value);
                  }}
                ></input>
                <button onClick={() => updateEmployeeWage(val.id)}>
                  UPDATE
                </button>
                <button
                  onClick={() => {
                    deleteEmployee(val.id);
                  }}
                >
                  DELETE
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="search-section">
        <input placeholder="set search key"></input>
        <button>SEARCH</button>
      </div>
    </div>
  );
}

export default App;