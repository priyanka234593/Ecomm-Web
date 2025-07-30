import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import axios from 'axios';

export default function LoginSignup() {
  const [isSignup, setIsSignup] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');
  const [imageResult, setImageResult] = useState('');

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 8;

  const handleSignup = async () => {
    setError('');
    setImageResult('');
    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      if (imageFile) {
        formData.append('file', imageFile);
      }

      const response = await axios.post('https://zap-api-dev.shaeryldatatech.in/signup', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.status === 200) {
        if (response.data.image_analysis) {
          setImageResult(JSON.stringify(response.data.image_analysis, null, 2));
        }
        alert('Signup successful!');
        window.location.href = '/login';
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setError('Signup blocked: Invalid or suspicious credentials.');
      } else {
        setError('Signup failed: ' + error.message);
      }
    }
  };

  const handleLogin = async () => {
    setError('');
    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }

    try {
      const response = await axios.post('https://zap-api-dev.shaeryldatatech.in//login', {
        email,
        password
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 200) {
        alert('Login successful!');
        window.location.href = '/dashboard';
      }
    } catch (error) {
      if (error.response) {
        setError(`Login failed: ${error.response.data?.detail || error.message}`);
      } else {
        setError('Login failed: ' + error.message);
      }
    }
  };

  const handleSubmit = () => {
    if (isSignup) {
      handleSignup();
    } else {
      handleLogin();
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{isSignup ? 'Signup' : 'Login'}</h1>
        <div className='loginsignup-fields'>
          {isSignup && (
            <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
          )}
          <input type="email" placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {isSignup && (
            <>
              <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
              <small>Upload a screenshot or QR code for firewall check (optional)</small>
            </>
          )}
        </div>
        <button onClick={handleSubmit}>{isSignup ? 'Continue' : 'Login'}</button>
        {error && <p className="error">{error}</p>}
        {imageResult && (
          <div className="image-analysis-result">
            <h4>Firewall Image Analysis:</h4>
            <pre>{imageResult}</pre>
          </div>
        )}
        <p className='loginsignup-login'>
          {isSignup ? (
            <>Already Have an Account? <span onClick={() => setIsSignup(false)}>Login here</span></>
          ) : (
            <>Don’t Have an Account? <span onClick={() => setIsSignup(true)}>Signup here</span></>
          )}
        </p>
        {isSignup && (
          <div className="loginsignup-agree">
            <input type="checkbox" />
            <p>By continuing, I agree to the Terms of Use & Privacy Policy</p>
          </div>
        )}
      </div>
    </div>
  );
}
