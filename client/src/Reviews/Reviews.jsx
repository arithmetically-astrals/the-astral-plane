// the main component for reviews. contains form, list, and menu components as subcomponents
import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import ReviewList from './ReviewList.jsx';
import ReviewForm from './ReviewForm.jsx';
import ReviewMeta from './ReviewMeta.jsx';

// Huzzah for jsx!
const Reviews = ({itemId, starRating, setstarRating}) => {
  //gives total count of reviews for item
  const [starCount, setstarCount] = useState(0);
  //filtered list of reviews
  const [list, setList] = useState([]);
  //unfiltered list of reviews
  const [defaultList, setDefaultList] = useState([]);
  //flags for the current filter bring used
  const [filterNum, setFilterNum] = useState([false, false, false, false, false]);
  //shows the write new review modal
  const [writeReview, setWriteReview] = useState(false);
  //hold all the info from the DB
  const [metaInfo, setmetaInfo] = useState(0)

  const clickWriteReview = () => {
    setWriteReview(true);
  }

  //filters the current reviews
  const clickFilterStar = (e) => {
    var num = Number(e.target.innerText.slice(0, 1))
    var copy = filterNum.slice()
    if (!filterNum[num - 1]) {
      copy[num - 1] = true
      setFilterNum(copy);
      setList(list.concat(defaultList.filter((item) => {
        return item.rating === num
      })))
    } else {
      copy[num - 1] = false
      setFilterNum(copy);
      setList(list.filter((item) => {
        return item.rating !== num
      }))
    }
  }

  const searchReviews = (e) => {
    var text = e.target.value;
    if (text.length < 3) {
      setList([]);
      return;
    }
    var searchFilter = defaultList.filter((item) => {
      return item.body.includes(text) || item.summary.includes(text)
    })

    setList(searchFilter);
  }

  return (
  <div id='reviews' className='widget'>
    <div className='widget-header'>Ratings and Reviews</div>
    <ReviewMeta itemId={itemId}  starRating={starRating} setstarRating={setstarRating} setstarCount={setstarCount} starCount={starCount} clickFilterStar={clickFilterStar} metaInfo={metaInfo} setmetaInfo={setmetaInfo} filterNum={filterNum}/>
    <ReviewList itemId={itemId} starCount={starCount} list={list} setList={setList} defaultList={defaultList} setDefaultList={setDefaultList} clickWriteReview={clickWriteReview} searchReviews={searchReviews}/>
    {writeReview ? <ReviewForm itemId={itemId} setWriteReview={setWriteReview} metaInfo={metaInfo} setDefaultList={setDefaultList}/> : null}

  </div>
  )
}

export default Reviews;