import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import axios from 'axios';
export default function LoginSignup() {
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
const response = await axios.post('http://127.0.0.1:8000/signup', formData, {
headers: { 'Content-Type': 'multipart/form-data' }
});
if (response.status === 200) {
if (response.data.image_analysis) {
setImageResult(JSON.stringify(response.data.image_analysis, null, 2));
}
alert('Signup successful!');
window.location.href = '/dashboard';
}
} catch (error) {
if (error.response && error.response.status === 403) {
setError('Signup blocked: Invalid or suspicious credentials.');
} else {
setError('Signup failed: ' + error.message);
}
}
};
return (
<div className='loginsignup'>
<div className="loginsignup-container">
<h1>Signup</h1>
<div className='loginsignup-fields'>
<input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
<input type="email" placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
<input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
<small>Upload a screenshot or QR code for firewall check (optional)</small>
</div>
<button onClick={handleSignup}>Continue</button>
{error && <p className="error">{error}</p>}
{imageResult && (
<div className="image-analysis-result">
<h4>Firewall Image Analysis:</h4>
<pre>{imageResult}</pre>
</div>
)}
<p className='loginsignup-login'>
Already Have an Account? <span>Login here</span>
</p>
<div className="loginsignup-agree">
<input type="checkbox"/>
<p>By continuing, I agree to the Terms of Use & Privacy Policy</p>
</div>
</div>
</div>
);
} 
