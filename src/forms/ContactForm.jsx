import { startTransition, useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    startTransition(() => {
      setSent(true);
    });
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Full name
          <input placeholder="Your name" required type="text" />
        </label>
        <label>
          Contact method
          <select defaultValue="Phone">
            <option>Phone</option>
            <option>Email</option>
            <option>WhatsApp</option>
          </select>
        </label>
        <label>
          Phone number
          <input placeholder="+92 3xx xxxxxxx" type="tel" />
        </label>
        <label>
          Email address
          <input placeholder="name@example.com" type="email" />
        </label>
      </div>

      <label className="form-full">
        Message
        <textarea placeholder="How can EyeCon help you today?" rows="6" />
      </label>

      <button className="button button-primary form-submit" type="submit">
        Send message
      </button>

      <p className={`form-message${sent ? " form-message-active" : ""}`}>
        {sent
          ? "Frontend demo message submitted. This form is ready to connect with your backend or CRM workflow."
          : "Use this form for enquiries, referral messages, or patient support requests once your backend is connected."}
      </p>
    </form>
  );
}
