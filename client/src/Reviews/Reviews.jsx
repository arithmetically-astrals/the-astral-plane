// the main component for reviews. contains form, list, and menu components as subcomponents
import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import ReviewList from './ReviewList.jsx';
import ReviewForm from './ReviewForm.jsx';
import ReviewMeta from './ReviewMeta.jsx';

// Huzzah for jsx!
const Reviews = ({itemId, starRating, setstarRating}) => {
  const [starCount, setstarCount] = useState(0)
  return (
  <div id='reviews' className='widget'>
    <h5>Ratings and Reviews</h5>
    <ReviewMeta itemId={itemId}  starRating={starRating} setstarRating={setstarRating} setstarCount={setstarCount} starCount={starCount} />
    <ReviewList itemId={itemId} starCount={starCount}/>
    <ReviewForm />

  </div>
  )
}

export default Reviews;