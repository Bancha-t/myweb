import React, { useState, CSSProperties } from 'react';

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
    }
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Sign In:', formData);
    }
  };

  const styles: { [key: string]: CSSProperties } = {
    body: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      background: '#f6f5f7',
      fontFamily: 'Arial, sans-serif',
      minHeight: '100%',
      margin: '10%',
    },
    container: {
      position: 'relative',
      width: '1000px',
      maxWidth: '100%',
      minHeight: '550px',
      background: '#fff',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
    },
    signUp: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      transition: 'all 0.6s ease-in-out',
      width: '50%',
      opacity: isRightPanelActive ? 1 : 0,
      zIndex: isRightPanelActive ? 5 : 1,
      transform: isRightPanelActive ? 'translateX(100%)' : 'none',
    },
    signIn: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      transition: 'all 0.6s ease-in-out',
      width: '50%',
      zIndex: isRightPanelActive ? 1 : 2,
      transform: isRightPanelActive ? 'translateX(100%)' : 'none',
    },
    form: {
      background: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '0 50px',
      height: '100%',
      textAlign: 'center',
    },
    h1: {
      fontSize: '20px',
      fontWeight: 100,
      lineHeight: '20px',
      letterSpacing: '0.5px',
      margin: '15px 0 20px',
    },
    input: {
      background: '#eee',
      padding: '12px 15px',
      margin: '8px 15px',
      width: '100%',
      borderRadius: '5px',
      border: 'none',
      outline: 'none',
    },
    a: {
      color: '#333',
      fontSize: '14px',
      textDecoration: 'none',
      margin: '15px 0',
    },
    fab: {
      width: '300px',
      height: 'auto',
    },
    button: {
      color: '#fff',
      background: '#667848',
      fontSize: '12px',
      fontWeight: 'bold',
      padding: '12px 55px',
      margin: '20px',
      borderRadius: '20px',
      border: '1px solid',
      outline: 'none',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      transition: 'transform 80ms ease-in',
      cursor: 'pointer',
    },
    ghostButton: {
      background: 'transparent',
      border: '2px solid #fff',
    },
    overlayContainer: {
      position: 'absolute',
      top: 0,
      left: '50%',
      width: '50%',
      height: '100%',
      overflow: 'hidden',
      transition: 'transform 0.6s ease-in-out',
      zIndex: 100,
      transform: isRightPanelActive ? 'translateX(-100%)' : 'none',
    },
    overlay: {
      position: 'relative',
      color: '#fff',
      background: 'linear-gradient(to right, #a27eb5, #667848)',
      left: '-100%',
      height: '100%',
      width: '200%',
      transform: isRightPanelActive ? 'translateX(50%)' : 'translateX(0)',
      transition: 'transform 0.6s ease-in-out',
    },
    overlayPanel: {
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '0 50px',
      textAlign: 'center',
      top: 0,
      height: '100%',
      width: '50%',
      transform: 'translateX(0)',
      transition: 'transform 0.6s ease-in-out',
    },
    overlayLeft: {
      transform: isRightPanelActive ? 'translateX(0)' : 'translateX(-20%)',
    },
    overlayRight: {
      right: 0,
      transform: isRightPanelActive ? 'translateX(20%)' : 'translateX(0)',
    },
    socialContainer: {
      margin: '20px 0',
    },
    socialLink: {
      height: '40px',
      width: '40px',
      margin: '0 5px',
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    error: {
      color: 'red',
      fontSize: '12px',
      marginTop: '5px',
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={styles.signUp}>
          <form style={styles.form} onSubmit={handleSignUp}>
            <h1 style={styles.h1}>สร้างบัญชีใหม่</h1>
            <div style={styles.socialContainer}>
              <a href="#" style={styles.socialLink}>
                <img src="/api/placeholder/300/300" alt="google" style={styles.fab} />
              </a>
            </div>
            <span>หรือสมัครสมาชิกด้วย Email</span>
            <input
              style={styles.input}
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && <span style={styles.error}>{errors.name}</span>}
            <input
              style={styles.input}
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <span style={styles.error}>{errors.email}</span>}
            <input
              style={styles.input}
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && <span style={styles.error}>{errors.password}</span>}
            <button style={styles.button} type="submit">สมัครสมาชิก</button>
          </form>
        </div>
        <div style={styles.signIn}>
          <form style={styles.form} onSubmit={handleSignIn}>
            <h1 style={styles.h1}>หรือเข้าสู่ระบบด้วย Email ของคุณ</h1>
            <div style={styles.socialContainer}>
              <a href="#" style={styles.socialLink}>
                <img src="/api/placeholder/300/300" alt="google" style={styles.fab} />
              </a>
            </div>
            <span>เข้าสู่ระบบด้วย Email ของคุณ</span>
            <input
              style={styles.input}
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <span style={styles.error}>{errors.email}</span>}
            <input
              style={styles.input}
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && <span style={styles.error}>{errors.password}</span>}
            <a href="#" style={styles.a}>ลืมรหัสผ่าน</a>
            <button style={styles.button} type="submit">เข้าสู่ระบบ</button>
          </form>
        </div>
        <div style={styles.overlayContainer}>
          <div style={styles.overlay}>
            <div style={{...styles.overlayPanel, ...styles.overlayLeft}}>
              <h1 style={styles.h1}>ยินดีตอนรับกลับนะเพื่อน</h1>
              <p>เข้าสู่ระบบเพื่อเชื่อมต่อกับเรา</p>
              <button style={{...styles.button, ...styles.ghostButton}} onClick={() => setIsRightPanelActive(false)}>เข้าสู่ระบบ</button>
            </div>
            <div style={{...styles.overlayPanel, ...styles.overlayRight}}>
              <h1 style={styles.h1}>สวัสดีเพื่อน</h1>
              <p>สมัครสมาชิกและเริ่มการเดินทางกับเรา</p>
              <button style={{...styles.button, ...styles.ghostButton}} onClick={() => setIsRightPanelActive(true)}>สร้างบัญชีใหม่</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;