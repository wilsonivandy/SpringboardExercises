import React, { useState } from "react";

const NewBoxForm = ({ addBox }) => {
    const INITIAL_STATE = { color: "", width: 0, height: 0 };
    const [formData, setFormData] = useState(INITIAL_STATE);
  
    /** Send {name, quantity} to parent
     *    & clear form. */
  
    const handleSubmit = evt => {
      evt.preventDefault();
      addBox(formData);
      setFormData(INITIAL_STATE);
    };
  
    /** Update local state w/curr state of input elem */
  
    const handleChange = evt => {
      const { name, value }= evt.target;
      setFormData(fData => ({
        ...fData,
        [name]: value
      }));
    };
  
    /** render form */
  
    return (
      <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="backgroundColor">Color:</label>
            <input
            id="backgroundColor"
            name="backgroundColor"
            value={formData.backgroundColor}
            onChange={handleChange}
            /> 
          </div>


        <div>
            <label htmlFor="width">Width:</label>
            <input
            type="text"
            id="width"
            name="width"
            value={formData.width}
            onChange={handleChange}
            />
        </div>
        
        <div>
            <label htmlFor="height">Height:</label>
            <input
            type="text"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleChange}
            />
        </div>
        <button>Add a new box!</button>
      </form>
    );
  };
  
  export default NewBoxForm;