import React, { useState } from "react";
import "./addBudgetCard.css";

const AddBudgetCard = ({ onSubmit,remainBudget }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameRegex = /^(?=(.*[a-zA-Z]){2,}).*$/;
    const numberRegex = /^[0-9]+$/;

    if (!formData.name || !formData.price || !formData.date) {
      setErrors({
        name: !formData.name ? "Name is required" : "",
        price: !formData.price ? "Price is required" : "",
        date: !formData.date ? "Date is required" : "",
      });
      return;
    } else if (!nameRegex.test(formData.name)) {
      setErrors({
        name: "Enter Valid Name",
      });
      return;
    } else if (!numberRegex.test(formData.price)) {
      setErrors({
        price: "Enter a valid Budget",
      });
      return;
    }

    else if(formData.price>remainBudget)
    {
      setErrors({
        price: "Price is exceeding your budget",
      });
      return;
    }

    setErrors({});

    onSubmit(formData);
    console.log("Form submitted:", formData);
  };




  


  return (
    <div className="card">
      <div className="card-header">
        <h2>Add Budget</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {errors.name && <span className="error">{errors.name}</span>}
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        {errors.price && <span className="error">{errors.price}</span>}
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        {errors.date && <span className="error">{errors.date}</span>}
        <button type="submit" className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBudgetCard;
