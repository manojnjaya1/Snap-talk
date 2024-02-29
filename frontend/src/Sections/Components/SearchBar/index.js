import React, { useState } from "react";
import "./index.css";

// props: 
//     id, id of the input tag
//     searchUser: Input Value in input tag
//     setSearchUser: useState to change the value of input tag
//     handleUserSearch a function that calls every time you change something
//     show: it helps to either show search icon or cross
//     handleCloseSearch: helps to close the searching in text box

// Used in: 
//     Chat Box's Header (Side Menu)
//     Create Group Chat Box (Drawer)
export default function SearchBar(props) {
    return (
        <div className="search-container" style={props.style}>
            <input
                value={props.searchUser}
                onChange={(e) => {
                    props.setSearchUser(e.target.value)
                    props.handleUserSearch(e.target.value);
                }}
                id={props.id}
                name="search"
                type="text"
                className="search-input"
                placeholder="Search..."
            />
            {
                !props.show &&
                <label htmlFor={props.id} className="search-button">
                    <i className="fas fa-search"></i>
                </label>
            }
            {
                props.show &&
                <div className="search-button" onClick={() => {
                    props.handleCloseSearch();
                }}>
                    <i className="fas fa-times"></i>
                </div>
            }
        </div>
    );
}
