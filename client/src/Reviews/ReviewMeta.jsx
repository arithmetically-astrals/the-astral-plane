import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarScale from '../Shared/StarScale.jsx';

//renders the meta info box
const ReviewMeta = ({itemId, starRating, setstarRating, starCount, setstarCount, clickFilterStar, metaInfo, setmetaInfo, filterNum}) => {

  //makes a call to the db to populate the meta info box
  useEffect( () => {
    axios.get('/reviews/meta', {
      params: {
        product_id: itemId
      }
    }).then(response => {
      setmetaInfo(response.data);
      var totalStar = 0
      var totalVal = 0
      for (var key in response.data.ratings) {
        totalStar += (Number(response.data.ratings[key]) * Number(key));
        totalVal += Number(response.data.ratings[key]);
      }
      setstarRating((totalStar / totalVal).toFixed(1));
      setstarCount(totalVal);
    }).catch(err => {
      console.log('ReviewMeta err: ', err)
    })
  },[itemId])

  //sets the green bar for star ratings
  const barStyle  = (n) => {
    return {width: Math.round((n / starCount) * 100) + '%', height: '5px', backgroundColor: 'green', marginBottom: '5px'}
  }

  //sets red triangle above the bar for fit ratings
  const triangleStyle = (n) => {
    return {
      position: 'relative',
      marginLeft: Math.round((n / 5) * 100) + '%',
      top: '-4px',
      width: 0,
      height: 0,
      borderLeft: '7px solid transparent',
      borderRight: '7px solid transparent',
      borderTop: '7px solid red',
    }
  }

  if (metaInfo === 0) {
    return (<div id='review-meta-box'>Loading meta...</div>)
  } else {
    return (
      <div id='review-meta-box'>
        <a id='review-rating-number'>{starRating}</a>
        <div id='review-meta-stars'>{StarScale(starRating)}</div>
        <p>{Math.round(100 - (metaInfo.recommended.false / metaInfo.recommended.true) * 100)}% of reviews recommend this product.</p>
        <div>
          <div id='metaTextLeft' onClick={clickFilterStar}>{filterNum[4] ? <mark>5 stars:</mark>: '5 stars:'}</div>
          <div id='review-rating-bar'>
            <div style={barStyle(metaInfo.ratings[5] || 0)} />
          </div>
          <div id='metaTextRight'>{metaInfo.ratings[5] || 0}</div>
        </div>
        <div>
          <div id='metaTextLeft' onClick={clickFilterStar}>{filterNum[3] ? <mark>4 stars:</mark>: '4 stars:'}</div>
          <div id='review-rating-bar'>
            <div style={barStyle(metaInfo.ratings[4] || 0)} />
          </div>
          <div id='metaTextRight'>{metaInfo.ratings[4] || 0}</div>
        </div>
        <div>
          <div id='metaTextLeft' onClick={clickFilterStar}>{filterNum[2] ? <mark>3 stars:</mark>: '3 stars:'}</div>
          <div id='review-rating-bar'>
            <div style={barStyle(metaInfo.ratings[3] || 0)} />
          </div>
          <div id='metaTextRight'>{metaInfo.ratings[3] || 0}</div>
        </div>
        <div>
          <div id='metaTextLeft' onClick={clickFilterStar}>{filterNum[1] ? <mark>2 stars:</mark>: '2 stars:'}</div>
          <div id='review-rating-bar'>
            <div style={barStyle(metaInfo.ratings[2] || 0)} />
          </div>
          <div id='metaTextRight'>{metaInfo.ratings[2] || 0}</div>
        </div>
        <div>
          <div id='metaTextLeft' onClick={clickFilterStar}>{filterNum[0] ? <mark>1 stars:</mark>: '1 stars:'}</div>
          <div id='review-rating-bar'>
            <div style={barStyle(metaInfo.ratings[1] || 0)} />
          </div>
          <div id='metaTextRight'>{metaInfo.ratings[1] || 0}</div>
        </div>
        <div style={{marginTop: '10px'}}>{metaInfo.characteristics.Comfort ? <div>
            <a>Comfort</a>
            <div id='review-rating-char'>
              <div style={triangleStyle(metaInfo.characteristics.Comfort.value)} />
              <a id='meta-char-text'>Poor</a>
              <a id='meta-char-text'>Perfect</a>
            </div>
          </div> : null}
        </div>
        <div style={{marginTop: '10px'}}>{metaInfo.characteristics.Fit ? <div>
            <a>Fit</a>
            <div id='review-rating-char'>
              <div style={triangleStyle(metaInfo.characteristics.Fit.value)} />
              <a id='meta-char-text'>Small</a>
              <a id='meta-char-text'>Loose</a>
            </div>
          </div> : null}
        </div>
        <div style={{marginTop: '10px'}}>{metaInfo.characteristics.Length ? <div>
            <a>Length</a>
            <div id='review-rating-char'>
              <div style={triangleStyle(metaInfo.characteristics.Length.value)} />
              <a id='meta-char-text'>Short</a>
              <a id='meta-char-text'>Long</a>
            </div>
          </div> : null}
        </div>
        <div style={{marginTop: '10px'}}>{metaInfo.characteristics.Quality ? <div>
            <a>Quality</a>
            <div id='review-rating-char'>
              <div style={triangleStyle(metaInfo.characteristics.Quality.value)} />
              <a id='meta-char-text'>Poor</a>
              <a id='meta-char-text'>Good</a>
            </div>
          </div> : null}
        </div>
        <div style={{marginTop: '10px'}}>{metaInfo.characteristics.Size ? <div>
            <a>Size</a>
            <div id='review-rating-char'>
              <div style={triangleStyle(metaInfo.characteristics.Size.value)} />
              <a id='meta-char-text'>Small</a>
              <a id='meta-char-text'>Big</a>
            </div>
          </div> : null}
        </div>
        <div style={{marginTop: '10px'}}>{metaInfo.characteristics.Width ? <div>
            <a>Width</a>
            <div id='review-rating-char'>
              <div style={triangleStyle(metaInfo.characteristics.Width.value)} />
              <a id='meta-char-text'>Narrow</a>
              <a id='meta-char-text'>Wide</a>
            </div>
          </div> : null}
        </div>
      </div>
    )
  }
}

export default ReviewMeta;