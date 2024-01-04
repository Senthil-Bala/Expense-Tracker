import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Link from '@mui/material/Link';
import { Routes,Route } from "react-router-dom";
import "./Expense.css";
import Greetings from "./Greetings";
function Expense() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [started, setStarted] = useState(false);
  const [showItems, setshowItems] = useState(false);
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [remaining, setremaining] = useState();
  const [products, setproducts] = useState([]);
  const [total, settotal] = useState(0);

  const handleAdd = () => {
    setshowItems(true);
    if (name.trim() !== "" && !isNaN(price)) {
      let value = parseInt(price);
      let newTotal = total + value;
      let newRemaining = remaining - value; // Calculate the remaining value first
  
      // Only add the transaction if the new total does not exceed Income
      if (newRemaining < 0) { // Use the calculated remaining value in your condition
        // alert('Total limit exceeded')
        setOpenSnackbar(true);
      } else {
        // Add the transaction if it doesn't exceed the remaining balance
        let newProducts = {
          productName: name,
          productPrice: value,
        };
        
        setproducts([...products, newProducts]);
        settotal(newTotal);
        setremaining(newRemaining); // Then update the state with the calculated value
        
        setname("");
        setprice("");
      }
    }
  };
  
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleclearAll=()=>{
    setproducts([])
    setname('')
    setprice('')
    setremaining(0)
  }

  // const handleDelete=(e,index)=>{
  //     let updated=[...products]
  //     updated.splice(index,1);
  //     setproducts(updated)
  // }

  return (
    <div className="container text-center d-flex flex-column p-3">
      <h1 className="title">Expense Tracker</h1>
      <button
        className="start-button mt-3"
        onClick={() => {
          setStarted(!false);
        }}
      >
        Lets get started
      </button>
      {started ? (
        <div className="container field mt-4">
          <TextField
            type="number"
            className="mt-2 textArea"
            id="outlined-basic"
            label="Monthly Income"
            variant="outlined"
            // placeholder="Enter your Monthly Income"
            // value={remaining}
            onChange={(e) => {
              setremaining(e.target.value);
            }}
            required
          />
          <TextField
            className="mt-2 textArea"
            id="outlined-basic"
            label="Description"
            variant="outlined"
            // placeholder="Enter your Description "
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
            required
          />
          <TextField
            type="number"
            className="mt-2 textArea"
            id="outlined-basic"
            label="Expense"
            variant="outlined"
            // placeholder="Enter your Expense"
            value={price}
            onChange={(e) => {
              setprice(e.target.value);
            }}
            required
          />

          <Button
            variant="contained"
            className="mt-2 add-btn"
            onClick={handleAdd}
          >
            Add Transaction
          </Button>

          <Button
            variant="contained"
            className="mt-2 add-btn"
            onClick={handleclearAll}
          >
            Clear All
          </Button>

          {/* <div className="container mt-5">
        {products.map((ele, index) => (
            <div>
                <h3>Your Items are : </h3>
          <h4
            key={index}
          >{`Description : ${ele.productName} || Price : ${ele.productPrice}`}</h4>
          <button onClick={(e)=>{handleDelete(e,index)}}>delete</button>
        </div>
        ))}
        <h2>Total : {total}</h2>
        <h2>Remaining Balance : {remaining}</h2>
      </div> */}
        </div>
      ) : null}

      {/* Tables */}

      {showItems && (
        <div>
          <Table striped bordered hover variant="dark" className="mt-4">
            <thead>
              <tr>
                <th>List No</th>
                <th>Description </th>
                <th>Amount / Expense</th>
                <th>Total Expense</th>
                <th>Remaining Amount</th>
              </tr>
            </thead>
            <tbody>
              {products.map((ele, index) => (
                <tr>
                  <td>{`${index + 1}`}</td>
                  <td>{ele.productName.toUpperCase()}</td>
                  <td>Rs.{ele.productPrice}</td>
                  {/* <td>Rs.{total}</td>
                  <td>Rs.{remaining}</td> */}
                  <td>Rs.{index === products.length - 1 ? total : 0}</td>
                  <td>Rs.{index === products.length - 1 ? remaining : 0}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
          >
            <MuiAlert
              onClose={handleCloseSnackbar}
              severity="error"
              elevation={6}
              variant="filled"
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              sx={{ width: 300, height: 100 }}
            >
              Total amount exceeded!
            </MuiAlert>
          </Snackbar>
          {/* <Link to='/greetings'><button>Submit</button></Link> */}
        </div>
      )}

      {/* <Routes>
        <Route path='/greetings' element={<Greetings/>}/>
      </Routes> */}
    </div>

    
  );
}

export default Expense;
