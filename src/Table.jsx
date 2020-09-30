import React from "react";

const Table = ({ data, onEditItem, onRemoveItem }) => {
  return (
    <table className="Table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Section</th>
          <th>Order</th>
          <th>Description</th>
          <th>
            <span role="img" aria-label="remove item">
              ✏️
            </span>
          </th>
          <th>
            <span role="img" aria-label="remove item">
              ❌
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(data).map((id) => {
          const { title, section, order, description } = data[id];

          return (
            <tr key={id}>
              <td>{title}</td>
              <td>{section}</td>
              <td>{order}</td>
              <td>{description}</td>
              <td>
                <button
                  type="button"
                  title="Edit Item"
                  onClick={() => onEditItem({ id, data: data[id] })}
                >
                  <span role="img" aria-label="Edit Item">
                    ✏️
                  </span>
                </button>
              </td>
              <td>
                <button
                  type="button"
                  title="Remove Item"
                  onClick={() => onRemoveItem({ id })}
                >
                  <span role="img" aria-label="Remove Item">
                    ❌
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
