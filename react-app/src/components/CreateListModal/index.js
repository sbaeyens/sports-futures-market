import React from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import "./CreateListModal.css";
import { createList } from "../../store/watchlists";

const CreateListModal = () => {

  const dispatch = useDispatch();
    const [name, setName] = useState("");

  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newList = {
      name: name,
    };

    await dispatch(createList(newList));
    closeModal();
  };

  return (
    <form className="list-form">
      <h2>Create a List</h2>
      <div className="list-text-div">
        <input
          className="list-input-text"
          placeholder="List Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
      </div>

      <button
        className="submit-form-btn"
        onClick={handleSubmit}
        // disabled={errors.length ? true : false}
      >
        Create List
      </button>
    </form>
  );
};

export default CreateListModal;