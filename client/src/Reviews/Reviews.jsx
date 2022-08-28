// the main component for reviews. contains form, list, and menu components as subcomponents
import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import ReviewList from './ReviewList.jsx';
import ReviewForm from './ReviewForm.jsx';
import ReviewMeta from './ReviewMeta.jsx';

// Huzzah for jsx!
const Reviews = ({itemId, starRating, setstarRating}) => {
  return (
  <div>
    <ReviewMeta itemId={itemId}  starRating={starRating} setstarRating={setstarRating} />
    <ReviewList />
    <ReviewForm />
  </div>
  )
}

export default Reviews;