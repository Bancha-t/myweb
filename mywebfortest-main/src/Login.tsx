import React, { useState } from 'react';
import './Login.css';

interface FormData {
  email: string;
  password: string;
  name?: string;
}

const Login: React.FC = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    name: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (isRightPanelActive && !formData.name) {
      newErrors.name = 'Name is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Sign Up:', formData);
      // ทำการส่งข้อมูลไปยัง API หรือจัดการการสมัครสมาชิกที่นี่
    }
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Sign In:', formData);
      // ทำการส่งข้อมูลไปยัง API หรือจัดการการเข้าสู่ระบบที่นี่
    }
  };

  return (
    <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`}>
      <div className="sign-up">
        <form onSubmit={handleSignUp}>
          <h1>สร้างบัญชีใหม่</h1>
          <div className="social-container">
            <a href="#" className="social">
              <img src="/photo/googlesignsin.png" alt="google" className="fab fa-google-plus-g" />
            </a>
          </div>
          <span>หรือสมัครสมาชิกด้วย Email</span>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
          <button type="submit">สมัครสมาชิก</button>
        </form>
      </div>
      <div className="sign-in">
        <form onSubmit={handleSignIn}>
          <h1>หรือเข้าสู่ระบบด้วย Email ของคุณ</h1>
          <div className="social-container">
            <a href="#" className="social">
              <img src="/photo/googlesignsin.png" alt="google" className="fab fa-google-plus-g" />
            </a>
          </div>
          <span>เข้าสู่ระบบด้วย Email ของคุณ</span>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
          <a href="#">ลืมรหัสผ่าน</a>
          <button type="submit">เข้าสู่ระบบ</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-left">
            <h1>ยินดีตอนรับกลับนะเพื่อน</h1>
            <p>เข้าสู่ระบบเพื่อเชื่อมต่อกับเรา</p>
            <button className="ghost" onClick={() => setIsRightPanelActive(false)}>เข้าสู่ระบบ</button>
          </div>
          <div className="overlay-right">
            <h1>สวัสดีเพื่อน</h1>
            <p>สมัครสมาชิกและเริ่มการเดินทางกับเรา</p>
            <button className="ghost" onClick={() => setIsRightPanelActive(true)}>สร้างบัญชีใหม่</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;