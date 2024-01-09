import React from "react";
import Navbar from "../NavComponents/Navbar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";
import Footer from "../FooterComponents/Footer";
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';
function Landing() {
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.heading}>Choose your preferred language  <ArrowCircleDownOutlinedIcon sx={{ fontSize: '48px' }} /></h1>
        <div className={styles.buttons}>
          <Link to="/main">
            <Button variant="outlined" className={styles.button}>
              Tamil
            </Button>
          </Link>

          <Link to="/main">
            <Button variant="outlined" className={styles.button}>
              English
            </Button>
          </Link>
        </div>
      </div>
      <Footer className={styles.footer}/>
    </div>
  );
}

export default Landing;
