import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
// import "./App.css";
import "./Expense.css";
import axios from "axios";

// import Greetings from "./Greetings";
function Expense() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [submitSnackbar, setsubmitSnackbar] = useState(false)
  const [started, setStarted] = useState(false);
  const [showItems, setshowItems] = useState(false);
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [remaining, setremaining] = useState();
  const [products, setproducts] = useState([]);
  const [total, settotal] = useState(0);
  const [netIncome, setNetIncome] = useState("");
  // const [newRem,setNewRem]=useState(0);

  const handleAdd = () => {
    setshowItems(true);
    if (name.trim() !== "" && !isNaN(price)) {
      let value = parseInt(price);
      let newTotal = total + value;
      let newRemaining = remaining - value; // Calculate the remaining value first

      // Only add the transaction if the new total does not exceed Income
      if (newRemaining < 0) {
        // Use the calculated remaining value in your condition
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
        setremaining(newRemaining);
        // Then update the state with the calculated value
        // setNewRem();
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

  const handleclearAll = () => {
    setproducts([]);
    setname("");
    setprice("");
    setremaining(0);
  };
  const prepareDataForSubmission = () => {
    // Prepare the array of all product details
    const allProducts = products.map((product, index) => ({
      ListNo: index + 1,
      Description: product.productName.toUpperCase(),
      Amount: `Rs.${product.productPrice}`,
      TotalExpense: index === products.length - 1 ? `Rs.${total}` : "Rs.0",
      RemainingAmount:
        index === products.length - 1 ? `Rs.${remaining}` : "Rs.0",
        NetIncome:netIncome,
    }));
    return allProducts;
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setsubmitSnackbar(true);

    // Prepare all products' data
    const allProductsData = prepareDataForSubmission();

    // Send all products' data in one go
    axios
      .post(
        "https://sheet.best/api/sheets/9b815455-e148-45d2-892f-a315fdb04332",
        allProductsData
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });

      setproducts([]);
      setremaining('')
  };

  // Usage example:
  const sendData = {
    productName: "Example Product",
    productPrice: 100,
  };

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
          {/* <TextField
            name="remaining"
            // value={remaining}
            type="number"
            className="mt-2 textArea"
            id="outlined-basic"
            label="NetIncome"
            variant="outlined"
            // placeholder="Enter your Monthly Income"
            // value={remaining}
            onChange={(e) => {
              setremaining(e.target.value);
            }}
            required
          /> */}

          <TextField
            name="remaining"
            // value={remaining}
            type="number"
            className="mt-2 textArea"
            id="outlined-basic"
            label="Monthly Income"
            variant="outlined"
            // placeholder="Enter your Monthly Income"
            // value={remaining}
            onChange={(e) => {
              setremaining(e.target.value);
              setNetIncome(e.target.value)
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
            name="Expense"
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
        </div>
      ) : null}

      {/* Tables */}

      {showItems && (
        <div>
          <form
            onSubmit={(e) => {
              handleClick(e);
            }}
          >
            <Table striped bordered hover variant="dark" className="mt-4">
              <thead>
                <tr>
                  <th>List No</th>
                  <th>Net Income</th>
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
                    <td>{netIncome}</td>
                    <td>{ele.productName.toUpperCase()}</td>
                    <td>Rs.{ele.productPrice}</td>
                    {/* <td>Rs.{total}</td>
                  <td>Rs.{remaining}</td> */}
                    <td>Rs.{index === products.length - 1 ? total : 0}</td>
                    <td name="Balance" value={remaining}>
                      Rs.{index === products.length - 1 ? remaining : 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button
              variant="contained"
              className="mt-2 add-btn"
              onClick={(e) => {
                handleClick(e);
              }}
              type="submit"
            >
              Submit
            </Button>
          </form>

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
          <Snackbar
            open={submitSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
          >
            <MuiAlert
              onClose={handleCloseSnackbar}
              severity="success"
              elevation={6}
              variant="filled"
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              sx={{ width: '100%' }}
            >
              Data Succcessfully Submitted !!
            </MuiAlert>
          </Snackbar>
        </div>
      )}
    </div>
  );
}

export default Expense;
