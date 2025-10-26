import { useState } from 'react';
import './ContactForm.css';
import Button from '../common/Button';

const ContactForm = ({ title = "Ready to transform your space?" }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    projectDetails: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add form submission logic here
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-left">
          <h2>{title}</h2>
        </div>
        
        <div className="contact-right">
          <h3>REACH OUT TO US</h3>
          <p>Fill out the form and we'll get back to you soon.</p>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                name="fullName"
                placeholder="FULL NAME*"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="EMAIL ADDRESS*"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-row">
              <input
                type="tel"
                name="phone"
                placeholder="PHONE NUMBER"
                value={formData.phone}
                onChange={handleChange}
              />
              <input
                type="text"
                name="projectDetails"
                placeholder="PROJECT DETAILS"
                value={formData.projectDetails}
                onChange={handleChange}
              />
            </div>
            
            <textarea
              name="message"
              placeholder="HOW CAN THE TEAM ASSIST YOU?"
              rows="4"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            
            <Button variant="solid" type="submit">SUBMIT</Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
