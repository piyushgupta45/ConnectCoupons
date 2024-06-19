import React from 'react';
import './sidebar.scss';

const Sidebar = ({ updateCategory, color = null }) => {

  const selectCategory = (category) => {
    updateCategory(category);
  };
  return (
    <div className='options' style={{ backgroundColor: color }}>
      <div className='options-wrap'>
        <h2>Categories</h2>
        <hr className='hr' />
        <ul>
          <li onClick={() => selectCategory("all")}>All</li>
          <li onClick={() => selectCategory("Fashion")}>Fashion</li>
          <li onClick={() => selectCategory("Bus")}>Bus Tickets</li>
          <li onClick={() => selectCategory("Movie")}>Movie Tickets</li>
          <li onClick={() => selectCategory("Food")}>Food</li>
          <li onClick={() => selectCategory("Pharmacy")}>Pharmacy</li>
          <li onClick={() => selectCategory("Electronics")}>Electronics</li>
          <li onClick={() => selectCategory("SkinCare")}>Skin Care</li>
          <li onClick={() => selectCategory("Grocery")}>Grocery</li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
