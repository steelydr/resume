"use client";
import React, { useState } from 'react';

export default function EditPage() {
  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    summary: "",
    experience: "",
    education: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResumeData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Resume Data:', resumeData);
    // Add API call or other actions to save the data
  };

  return (
    <div>
      <h1>Edit Resume</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:
          <input type="text" name="name" value={resumeData.name} onChange={handleChange} />
        </label>
        <br />
        <label>Email:
          <input type="email" name="email" value={resumeData.email} onChange={handleChange} />
        </label>
        <br />
        <label>Summary:
          <textarea name="summary" value={resumeData.summary} onChange={handleChange} />
        </label>
        <br />
        <label>Experience:
          <textarea name="experience" value={resumeData.experience} onChange={handleChange} />
        </label>
        <br />
        <label>Education:
          <textarea name="education" value={resumeData.education} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
