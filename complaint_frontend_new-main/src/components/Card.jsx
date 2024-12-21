import React from 'react';

function Card({ report }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-5 m-5 max-w-md">
      <div className="text-gray-800">
        <h2 className="mb-5 text-lg font-semibold">Contact Information</h2>
        <p className="my-2"><strong>Name:</strong> {report.Category}</p>
        <p className="my-2"><strong>Email:</strong> johndoe@example.com</p>
        <p className="my-2"><strong>Phone:</strong> +1 123-456-7890</p>
        <p className="my-2"><strong>Address:</strong> 1234 Maple Street, Springfield, USA</p>
      </div>
    </div>
  );
}

export default Card;

