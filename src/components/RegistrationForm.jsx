import { useState } from "react";
import { useNavigate } from "react-router-dom";

const countries = {
  India: ["Delhi", "Mumbai", "Bangalore"],
  USA: ["New York", "Los Angeles", "Chicago"],
};

export default function RegistrationForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    showPassword: false,
    phoneCountryCode: "",
    phoneNumber: "",
    country: "",
    city: "",
    pan: "",
    aadhar: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "showPassword" && value.trim() === "") {
        newErrors[key] = "This field is required.";
      }
    });

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (formData.aadhar && !/^\d{12}$/.test(formData.aadhar)) {
      newErrors.aadhar = "Aadhar must be 12 digits.";
    }
    if (formData.pan && !/^[A-Z]{5}\d{4}[A-Z]$/.test(formData.pan)) {
      newErrors.pan = "Invalid PAN format.";
    }
    if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "country" ? { city: "" } : {}),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate("/success", { state: formData });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Registration Form</h2>

      {[
        ["firstName", "First Name"],
        ["lastName", "Last Name"],
        ["username", "Username"],
        ["email", "Email"],
      ].map(([name, label]) => (
        <div className="form-group" key={name}>
          <label>{label}</label>
          <input name={name} value={formData[name]} onChange={handleChange} />
          {errors[name] && <span className="error">{errors[name]}</span>}
        </div>
      ))}

      <div className="form-group">
        <label>Password</label>
        <input
          type={formData.showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <div className="checkbox-inline">
          <span>Show Password</span>
          <input
            type="checkbox"
            name="showPassword"
            checked={formData.showPassword}
            onChange={handleChange}
          />
        </div>
        {errors.password && <span className="error">{errors.password}</span>}
      </div>


      <div className="form-group">
        <label>Phone Number</label>
        <div className="phone-input">
          <input
            name="phoneCountryCode"
            placeholder="+91"
            value={formData.phoneCountryCode}
            onChange={handleChange}
          />
          <input
            name="phoneNumber"
            placeholder="1234567890"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
      </div>

      <div className="form-group">
        <label>Country</label>
        <select name="country" value={formData.country} onChange={handleChange}>
          <option value="">Select Country</option>
          {Object.keys(countries).map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.country && <span className="error">{errors.country}</span>}
      </div>

      <div className="form-group">
        <label>City</label>
        <select name="city" value={formData.city} onChange={handleChange}>
          <option value="">Select City</option>
          {(countries[formData.country] || []).map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        {errors.city && <span className="error">{errors.city}</span>}
      </div>

      {[
        ["pan", "PAN Number"],
        ["aadhar", "Aadhar Number"],
      ].map(([name, label]) => (
        <div className="form-group" key={name}>
          <label>{label}</label>
          <input name={name} value={formData[name]} onChange={handleChange} />
          {errors[name] && <span className="error">{errors[name]}</span>}
        </div>
      ))}

      <button type="submit">
        Submit
      </button>
    </form>
  );
}
