import React from "react";
import { format } from "date-fns";

const Table = ({ data, onEditItem, onRemoveItem }) => {
  return (
    <table className="Table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Date</th>
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
          const { title, publishDate, description } = data[id];

          return (
            <tr key={id}>
              <td>{title}</td>
              <td>{description}</td>
              <td>{format(publishDate, "MM/dd/yy")}</td>
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
