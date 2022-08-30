import React, { useState, useEffect } from "react";
import StarScale from '../shared/StarScale.jsx';
import axios from 'axios';

const ReviewTile = ({info, setList, itemId, count}) => {
  const [yesCount, setYesCount] = useState(info.helpfulness)

  const clickYes = (e) => {
    axios.put('/reviews/helpful', {
      review_id: info.review_id
    }).then(response => {
      setYesCount(yesCount + 1);
    }).catch(err => {
      console.log('Yes error: ', err)
    })
  }

  const clickReport = (e) => {
    axios.put('/reviews/report', {
      review_id: info.review_id
    }).then(reply => {
      axios.get('/reviews', {
        params: {
          product_id: itemId,
          count: count
        }
      }).then(response => {
        setList(response.data.results);
      }).catch(err => {
        console.log('Report error: ', err)
      })
    }).catch(err => {
      console.log('Report error: ', err)
    })
  }

  return (
    <div id='review-tile'>
      <div id='review-tile-name'>{info.reviewer_name}, {new Date(info.date).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"}) }</div>
      <div id='review-tile-stars'>
        <h5>{StarScale(info.rating)}</h5>
      </div>
      <h4>{info.summary}</h4>
      <p>{info.body}</p>
      <div>{info.recommend ? <div>✓ I recommend this product</div>: null}</div>
      {info.photos.length > 0 ? <div id='review-tile-photobox'>
        {info.photos.map(photo => {
          return (<img  src={photo.url} style={{width: '40px', height: '40px'}} key={photo.id} />)
        })}
      </div>: null}
      <div>Was this review helpful? <span onClick={clickYes} style={{textDecoration: 'underline', cursor: 'pointer'}} >Yes</span> ({yesCount})
      | <span onClick={clickReport} style={{textDecoration: 'underline', cursor: 'pointer'}}>Report</span></div>
    </div>
  )
}


export default ReviewTile;