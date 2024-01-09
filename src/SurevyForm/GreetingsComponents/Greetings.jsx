import React from 'react'
import "./Greetings.css";
// import Image from "../Screenshot (66).png";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
function Greetings() {
  return (
    <div className='greet'>
        {/* <img src={Image} alt="Thank you for your feedback" /> */}
        <h1 className='thanks'>Thank You So Much For your Response !!
        <br />
        Have A Good Day <EmojiEmotionsIcon sx={{ fontSize: '60px' }} /></h1>

    </div>
  )
}
export default Greetings

