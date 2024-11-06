import React from "react";

export default function DropListField({label, id, selectOption}) {
  return (
    <div className="mb-3 d-flex align-items-center">
      <label className="col-2 d-flex justify-content-end align-items-center form-label me-2">
        {label}
      </label>
      <div className="col-7 mx-auto rounded border-black">
        <select className="form-select col-7 border-black" aria-label="Default select example">
          <option selected>{selectOption}</option>
          <option value="1">One</option>
        </select>
      </div>

    </div>

  )
}