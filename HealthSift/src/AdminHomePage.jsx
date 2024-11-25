// AdminHomePage.jsx
import React, { useState, useEffect } from "react";
import Navbar from "./homepage/Navbar.jsx";
import Search from "./homepage/Search.jsx";
import APIRequest from "./APIRequest.js";
import "./index.css"; // Ensure your CSS is imported

function AdminHomePage() {
  const [navItems, setNavItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", link: "" });

  // Fetch navbar items from the backend when the component mounts
  useEffect(() => {
    APIRequest.getNavItems()
      .then(data => {
        if (data && Array.isArray(data)) {
          setNavItems(data);
        }
      })
      .catch(error => console.log(error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prevItem => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItem.name.trim() === "" || newItem.link.trim() === "") {
      alert("Please enter both name and link for the new item.");
      return;
    }

    // Add the new item via the API
    APIRequest.addNavItem(newItem)
      .then(data => {
        // Update the navItems state with the new list
        setNavItems(data);
        setNewItem({ name: "", link: "" }); // Reset form fields
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="homePage">
      {/* Display Navbar with dynamic items */}
      <Navbar items={navItems} />

      {/* Display Search bar */}
      <Search />

      {/* Admin Form to Add New Navbar Items */}
      <div className="addItemForm">
        <h2>Add New Navbar Item</h2>
        <form onSubmit={handleAddItem} className="adminForm">
          <div className="formGroup">
            <label htmlFor="name" className="adminLabel">
              <p>Item Name:</p>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="adminInformation"
              value={newItem.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="link" className="adminLabel">
              <p>Item Link:</p>
            </label>
            <input
              type="text"
              id="link"
              name="link"
              className="adminInformation"
              value={newItem.link}
              onChange={handleChange}
              required
              placeholder="/example"
            />
          </div>
          <button type="submit" className="adminbtn">
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminHomePage;