import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import "../Landings/Landing.module.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Survey() {
  const [surveyData, setSurveyData] = useState([]);
  const [formData, setFormData] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  // const history = useHistory();
  
  const theme = useTheme();

  useEffect(() => {
    handleClick();
  }, []);

  const handleClick = () => {
    axios
      .get("https://sheet.best/api/sheets/d3cd7a1e-e6f2-4ec5-964b-5dcb8e1f8481")
      .then((res) => {
        setSurveyData(res.data);
        console.log(res.data);
        // history.push("/greetings");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const renderInput = (type, options) => {
    if (type === "radio") {
      return options.split(",").map((ele, index) => (
        <div key={ele} style={{ marginBottom: "15px" }}>
          <input
            type="radio"
            name={`question_${activeStep}`}
            id={`option_${index}`}
            value={ele.trim()}
            onChange={handleChange}
            checked={formData[`question_${activeStep}`] === ele.trim()}
            required
          />
          <label htmlFor={`option_${index}`} style={{ marginLeft: "8px" }}>
            {ele.trim()}
          </label>
        </div>
      ));
    } else if (type === "text") {
      return (
        <input
          type="text"
          name={`question_${activeStep}`}
          // placeholder={`Enter your ${surveyData[activeStep].Questions}`}
          style={{
            width: "100%",
            border: "none",
            boxsizing: "border-box",
            padding: "0.5rem",
            borderRadius: "0.5rem",
          }}
          onChange={handleChange}
          value={formData[`question_${activeStep}`] || ""}
          required
        />
      );
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitted data:", formData);
    try {
      const response = await axios.post(
        "https://sheet.best/api/sheets/ea6e286d-638d-4c1a-9bab-e9e9784a2f80",
        formData
      );

      console.log("Response:", response.data); 
      setFormData({});
    } catch (error) {
      console.error("Error submitting data:", error);
    }
    // setFormData({})
  };

  return (
    <>
      <h2 className="mt-3 header">Survey Form</h2>

      <Box
        sx={{
          maxWidth: 500,
          width: "100%",
          height: 600,
          padding: "20px",
          margin: "20px auto",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
        {surveyData.length > 0 && (
          <Paper
            square
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 120,

              padding: "2rem",
              bgcolor: "#1a237e",
            }}
          >
            <Typography
              sx={{
                color: "white",
                textAlign: "center",
                fontWeight: "bolder",
                fontFamily: "Comic Sans MS",
              }}
            >
              {surveyData[activeStep].Questions}
            </Typography>
          </Paper>
        )}
        {surveyData.length > 0 && (
          <Box
            style={{
              padding: "20px",
              marginTop: "10px",
              backgroundColor: "#f0f8ff",
              width: "100%",
            }}
          >
            {renderInput(
              surveyData[activeStep].Type,
              surveyData[activeStep].Options
            )}
          </Box>
        )}

        {surveyData.length > 0 && (
          <MobileStepper
            variant="text"
            steps={surveyData.length}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === surveyData.length - 1}
                sx={{
                  backgroundColor: "#ff9800",
                  color: "white",
                  marginTop: "20px",
                  paddingLeft: "18px",
                }}
              >
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
                sx={{
                  backgroundColor: "#ff9800",
                  color: "white",
                  marginTop: "20px",
                  paddingRight: "18px",
                }}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        )}

        {surveyData.length > 0 && activeStep === surveyData.length - 1 && (
          <Link to='/greetings'>
          <Button
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#4caf50",
              color: "white",
              marginTop: "20px",
              fontWeight: "bolder",
              padding: "10px",
              paddingX: "14px",
            }}
          >
            Submit
          </Button>
          </Link>
        )}
      </Box>
    </>
  );
}

export default Survey;
