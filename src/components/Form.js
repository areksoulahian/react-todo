import React, { useState } from 'react';

function Form(props) {

    const [name, setName] = useState("");

    function handleChange(e) {
        setName(e.target.value);
        console.log('Form.js hC');
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.addTask(name);
        setName("");
        console.log('Form.js hS');
      } 

    return (
        <form onSubmit={handleSubmit} >
            <h2 className='label-wrapper'>
            <label htmlFor="new-todo-input" className='label_large'>
                Insert Todo's
            </label>
            </h2>
            <input 
                type="text"
                id="new-todo-input"
                className="input input_large"
                name="text"
                autoComplete="off"
                value={name}
                onChange={handleChange}
            />
            <button 
                type="submit"
                id="btn-btn-primary"
                className="btn btn_primary btn_large"
            >
            Add
            </button>
        </form>
    );
  }

export default Form;