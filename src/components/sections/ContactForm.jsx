import { useState } from 'react';
import './ContactForm.css';
import Button from '../common/Button';

const ContactForm = ({ title = "Ready to transform your space?" }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    projectDetails: '',
    hearAboutUs: ''
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
          <h2>
            <span className="underline-animated">Ready</span> to<br />
            transform<br />
            your space?
          </h2>
        </div>
        
        <div className="contact-right">
          <h3>REACH OUT TO US</h3>
          <p>Fill out the form below and we'll get back to you soon</p>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="field-group">
              <label>FULL NAME*</label>
              <input
                type="text"
                name="fullName"
                placeholder="Your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="field-group">
              <label>EMAIL ADDRESS*</label>
              <input
                type="email"
                name="email"
                placeholder="Your@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="field-group">
              <label>PHONE NUMBER</label>
              <input
                type="tel"
                name="phone"
                placeholder="+971 50 XXX XXXX"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            
            <div className="field-group project-details">
              <label>PROJECT DETAILS*</label>
              <textarea
                name="projectDetails"
                placeholder="Tell us about your project, timeline, budget range, and any specific requirement.."
                rows="6"
                value={formData.projectDetails}
                onChange={handleChange}
              ></textarea>
            </div>
            
            <div className="field-group dropdown-field">
              <label>HOW DID YOU HEAR ABOUT US?</label>
              <select
                name="hearAboutUs"
                value={formData.hearAboutUs || ''}
                onChange={handleChange}
              >
                <option value="">Select an option</option>
                <option value="social-media">Social Media</option>
                <option value="google">Google Search</option>
                <option value="referral">Referral</option>
                <option value="advertisement">Advertisement</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <Button variant="solid" type="submit">SUBMIT</Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
