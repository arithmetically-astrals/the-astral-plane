import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';

const QuestionModal = (props) => {

  const body = useRef('');
  const name = useRef('');
  const email = useRef('');
  const [emptyBody, setEmptyBody] = useState(false);
  const [emptyName, setEmptyName] = useState(false);
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const modal = useRef(null);

  useEffect(() => {
    const delta = 6;
    let startX;
    let startY;
    const handleOutsideClick = (e) => {
      if (modal.current && !modal.current.contains(e.target)) {
        props.setQuestionModal(false);
      }
    };
    const handleMouseDown = (e) => {
      startX = e.pageX;
      startY = e.pageY;
    };
    const handleMouseUp = (e) => {
      const diffX = Math.abs(e.pageX - startX);
      const diffY = Math.abs(e.pageY - startY);
      if (diffX < delta && diffY < delta) {
        handleOutsideClick(e);
      }
    };
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    }
  }, [modal]);

  let classObj = {
    qaClose: 'qa-close',
    qaModal: 'qa-modal',
    qaModalInput: 'qa-modal-input',
    qaModalButton: 'qa-button'
  };
  if (document.getElementsByClassName('bodyDark').length) {
    for (let key in classObj) {
      classObj[key] += '-dark';
    }
  }

  return (
    <div className='modal-background'>
      <div className={classObj.qaClose}/>
      <div data-testid='question-modal' className={classObj.qaModal} ref={modal}>
        <h2 className='qa-modal-title'>Ask Your Question</h2>
        <h6 className='qa-modal-title'>About the {props.productName}</h6>
        <div>
          <div className='qa-modal-header'>
            <div>
              <label><b>Your Question* </b></label>
            </div>
            <div>
              <textarea className={classObj.qaModalInput} maxLength='1000' rows='10' cols='80' onChange={(e) => {
                body.current = e.target.value;
              }}/>
            </div>
            {emptyBody
            ? <div className='qa-modal-error'>
                Question cannot be empty!
              </div>
            : null
            }
          </div>
          <div className='qa-modal-header'>
            <div>
              <label><b>What is your nickname* </b></label>
            </div>
            <div>
              <input className={classObj.qaModalInput} type='text' maxLength='60' placeholder='Example: jackson11!' onChange={(e) => {
                name.current = e.target.value;
              }}/>
            </div>
            {emptyName
            ? <div className='qa-modal-error'>
                Nickname cannot be empty!
              </div>
            : null
            }
            <div>
              For privacy reasons, do not use your full name or email address
            </div>
          </div>
          <div className='qa-modal-header'>
            <div>
              <label><b>Your email* </b></label>
            </div>
            <div>
              <input className={classObj.qaModalInput} type='text' maxLength='60' placeholder='Why did you like the product or not?' onChange={(e) => {
                email.current = e.target.value;
              }}/>
            </div>
            {emptyEmail
            ? <div className='qa-modal-error'>
                Email cannot be empty!
              </div>
            : null
            }
            {invalidEmail
            ? <div className='qa-modal-error'>
                Invalid email!
              </div>
            : null
            }
            <div>
              For authentication reasons, you will not be emailed
            </div>
          </div>
          <button className={`qa-modal-header ${classObj.qaModalButton}`} onClick={(e) => {
            let sendRequest = true;
            let alertMessages = [];
            if (body.current.trim() === '') {
              setEmptyBody(true);
              sendRequest = false;
              alertMessages.push('A valid question body');
            } else {
              setEmptyBody(false);
            }
            if (name.current.trim() === '') {
              setEmptyName(true);
              sendRequest = false;
              alertMessages.push('A valid nickname');
            } else {
              setEmptyName(false);
            }
            if (email.current.trim() === '') {
              setInvalidEmail(false);
              setEmptyEmail(true);
              sendRequest = false;
              alertMessages.push('A valid email');
            } else {
              setEmptyEmail(false);
              if (email.current.toLowerCase().match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              ) === null) {
                setInvalidEmail(true);
                sendRequest = false;
                alertMessages.push('A valid email');
              } else {
                setInvalidEmail(false);
              }
            }
            if (sendRequest) {
              props.setQuestionModal(false);
              axios.post('/qa/questions', {
                body: body.current.trim(),
                name: name.current.trim(),
                email: email.current.trim(),
                product_id: props.product_id
              })
                .then(() => {
                  axios.get('/qa/questions', {
                    params: {
                      product_id: props.product_id,
                      count: 10000
                    }
                  })
                    .then((response) => {
                      response.data.results.forEach((question) => {
                        if (!props.initialQuestionStates.current[question.question_id]) {
                          props.initialQuestionStates.current[question.question_id] = [false, false];
                        }
                      })
                      props.setQuestions(response.data.results);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              alert(`You must enter the following:\n${alertMessages.join('\n')}`);
            }
            }}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default QuestionModal;