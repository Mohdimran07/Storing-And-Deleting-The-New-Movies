import React, { useState } from 'react';

import './Form.css';

const ExpenseForm = (props) => {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredReleaseDate, setEnteredReleaseDate] = useState('');
    const [enteredDate, setEnteredDate] = useState('');

    const titleChangeHandler = (event) => {
     setEnteredTitle(event.target.value);
    }
    const amountChangeHandler = (event) => {
        setEnteredReleaseDate(event.target.value);
    }
    const dateChangeHandler = (event) => {
        setEnteredDate(event.target.value);
    }
    const submitHandler = (event) => {
      event.preventDefault();

      const NewMovieObj = {
          title: enteredTitle,
          releaseDate:enteredReleaseDate,
          date: new Date(enteredDate)
      };
      
      console.log(NewMovieObj);
    //   setEnteredTitle('');
    //   setEnteredReleaseDate('');
    //   setEnteredDate('');
    }

    return (
        <form onSubmit={submitHandler}>
            <div className='new-expense__controls'>
                <div className='new-expense__control'>
                    <label>Title</label>
                    <input type='text' onChange={titleChangeHandler} />
                </div>
                <div className='new-expense__control'>
                    <label>opening Text</label>
                    <input type='text'  onChange={amountChangeHandler} />
                </div>
                <div className='new-expense__control'>
                    <label>Release Date</label>
                    <input type='date' min="2019-01-01" max="2022-12-31" onChange={dateChangeHandler} />
                </div>
            </div>
            <div className="new-expense__actions">
                <button type="submit" >Add Movie</button>
                
            </div>
        </form>
    );
}

export default ExpenseForm;