import React from 'react';
import { format, parseISO } from 'date-fns';
import { useFormikContext } from 'formik';
import { parseDate } from '../../utilities/date';

import './styles.css';

const Table = ({ data, onEditItem, onRemoveItem }) => {
  const { resetForm } = useFormikContext();

  const handleEdit = ({
    id,
    data: { expirationDate, publishDate, ...data },
  }) => {
    resetForm({
      values: {
        ...data,
        expirationDate: parseISO(expirationDate),
        publishDate: parseISO(publishDate),
      },
    });
    onEditItem({ id, data });
  };

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
              <td>{format(parseDate(publishDate), 'MM/dd/yy')}</td>
              <td>
                <button
                  type="button"
                  title="Edit Item"
                  onClick={() => handleEdit({ id, data: data[id] })}
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
