import React from 'react';
import './style/FileUploadField.css';

function FileUploadField({ label, name, onChange }) {
  return (
    <div className="file-upload-field">
      <label>{label}</label>
      <input type="file" name={name} onChange={onChange} required />
    </div>
  );
}

export default FileUploadField;
