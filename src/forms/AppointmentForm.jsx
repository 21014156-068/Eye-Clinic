import { startTransition, useState } from "react";

export function AppointmentForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    startTransition(() => {
      setSubmitted(true);
    });
  };

  return (
    <form className="form-card" id="appointment-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Full name
          <input placeholder="Enter your full name" required type="text" />
        </label>
        <label>
          Phone number
          <input placeholder="+92 3xx xxxxxxx" required type="tel" />
        </label>
        <label>
          Email address
          <input placeholder="name@example.com" required type="email" />
        </label>
        <label>
          Service line
          <select defaultValue="Comprehensive Eye Mapping">
            <option>Comprehensive Eye Mapping</option>
            <option>LASIK Consultation</option>
            <option>Cataract Review</option>
            <option>Retina & Glaucoma Review</option>
            <option>Pediatric Eye Care</option>
            <option>Dry Eye & Contact Lens Studio</option>
          </select>
        </label>
        <label>
          Preferred date
          <input type="date" />
        </label>
        <label>
          Best time
          <select defaultValue="Morning">
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Evening</option>
          </select>
        </label>
      </div>

      <label className="form-full">
        Describe your concern
        <textarea
          placeholder="Blurred vision, surgery enquiry, diabetic eye screening, regular eye checkup..."
          rows="6"
        />
      </label>

      <button className="button button-primary form-submit" type="submit">
        Send appointment request
      </button>

      <p className={`form-message${submitted ? " form-message-active" : ""}`}>
        {submitted
          ? "Frontend demo submitted successfully. Next step: connect this form to your MERN appointment API and notification flow."
          : "This booking form is structured to plug into your backend for appointments, CRM, and patient follow-up later."}
      </p>
    </form>
  );
}

