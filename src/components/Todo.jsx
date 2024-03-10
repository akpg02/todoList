import React, { useState } from "react";
import PropTypes from "prop-types";

function Todo({ item, onDelete, onEdit }) {
  const [edit, setEdit] = useState(false);
  const [checked, setChecked] = useState(false);
  const [updatedItem, setUpdatedItem] = useState(item.description);

  const handleEdit = (e) => {
    setUpdatedItem(e.target.value);
  };

  const submitUpdate = () => {
    const newItem = updatedItem.charAt(0).toUpperCase() + updatedItem.slice(1);
    setUpdatedItem(newItem);

    const editedItem = {
      ...item,
      description: newItem,
    };
    onEdit(editedItem);
    setEdit(false);
  };

  return (
    <div className="todo">
      <div className="todo-description">
        <input type="checkbox" onChange={() => setChecked((c) => !c)} />
        <div className="todo-group">
          <input
            className={`${edit ? "edit" : "description"}`}
            type="text"
            style={{ textDecoration: checked ? "line-through" : null }}
            value={updatedItem}
            readOnly={!edit}
            onChange={(e) => handleEdit(e)}
          />
          <span className="date-time">{item.date}</span>
        </div>
      </div>

      {!edit ? (
        <div className="button-section">
          <button className="edit" onClick={() => setEdit((e) => !e)}>
            ✏️
          </button>
          <button onClick={() => onDelete(item)} className="delete">
            ❌
          </button>
        </div>
      ) : (
        <div className="button-section">
          <button className="save" onClick={submitUpdate}>
            💾
          </button>
        </div>
      )}
    </div>
  );
}

Todo.propTypes = {
  item: PropTypes.object,
};

export default Todo;
