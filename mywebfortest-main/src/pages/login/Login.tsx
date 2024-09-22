import React, { useState, useEffect, CSSProperties } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface FormData {
  email: string;
  password: string;
  name?: string;
}

interface FormProps {
  formData: FormData;
  errors: Partial<FormData>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent) => void;
  buttonLabel: string;
}

const Form: React.FC<FormProps> = ({ formData, errors, handleInputChange, handleSubmit, buttonLabel }) => (
  <form style={styles.form} onSubmit={handleSubmit}>
    <h1 style={styles.h1}>{buttonLabel === 'เข้าสู่ระบบ' ? 'เข้าสู่ระบบ' : 'สร้างบัญชีใหม่'}</h1>
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
    {buttonLabel === 'สมัครสมาชิก' && (
      <>
        <input
          style={styles.input}
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        {errors.name && <span style={styles.error}>{errors.name}</span>}
      </>
    )}
    <button style={styles.button} type="submit">
      {buttonLabel}
    </button>
  </form>
);

const Login: React.FC = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    name: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const error = params.get('error');

    if (token) {
      localStorage.setItem('token', token);
      navigate('/');
    } else if (error) {
      console.error('Login error:', error);
      setServerError('มีปัญหาขณะเข้าสู่ระบบ โปรดลองใหม่อีกครั้ง');
    }
  }, [location, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setServerError(null);
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      setServerError('มีปัญหากับการเข้าสู่ระบบ โปรดลองใหม่อีกครั้ง');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = '/auth/google';
  };

  return (
    <div style={styles.body}>
      {serverError && <div style={styles.error}>{serverError}</div>}
      {loading ? (
        <div>กำลังโหลด...</div>
      ) : (
        <div style={styles.container}>
          <div style={styles.signUp}>
            <Form
              formData={formData}
              errors={errors}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              buttonLabel="สมัครสมาชิก"
            />
          </div>
          <div style={styles.signIn}>
            <Form
              formData={formData}
              errors={errors}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              buttonLabel="เข้าสู่ระบบ"
            />
          </div>

          <div style={styles.overlayContainer}>
            <div style={styles.overlay}>
              <div style={{ ...styles.overlayPanel, ...styles.overlayLeft }}>
                <h1 style={styles.h1}>ยินดีตอนรับกลับนะเพื่อน</h1>
                <p>เข้าสู่ระบบเพื่อเชื่อมต่อกับเรา</p>
                <button
                  style={{ ...styles.button, ...styles.ghostButton }}
                  onClick={() => setIsRightPanelActive(false)}
                >
                  เข้าสู่ระบบ
                </button>
              </div>
              <div style={{ ...styles.overlayPanel, ...styles.overlayRight }}>
                <h1 style={styles.h1}>สวัสดีเพื่อน</h1>
                <p>สมัครสมาชิกและเริ่มการเดินทางกับเรา</p>
                <button
                  style={{ ...styles.button, ...styles.ghostButton }}
                  onClick={() => setIsRightPanelActive(true)}
                >
                  สร้างบัญชีใหม่
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  body: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
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
    fontSize: '25px',
    fontWeight: 100,
    lineHeight: '20px',
    letterSpacing: '0.5px',
    margin: '30px 0 30px',
  },
  input: {
    background: '#eee',
    padding: '12px 15px',
    margin: '8px 0',
    width: '100%',
    borderRadius: '5px',
    border: 'none',
    outline: 'none',
  },
  button: {
    borderRadius: '20px',
    border: '1px solid #FF4B2B',
    background: '#FF4B2B',
    color: '#FFFFFF',
    fontSize: '12px',
    fontWeight: 'bold',
    padding: '12px 45px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    transition: 'transform 80ms ease-in',
    marginTop: '10px',
  },
  ghostButton: {
    backgroundColor: 'transparent',
    borderColor: '#FFFFFF',
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
  },
  overlay: {
    background: 'linear-gradient(to right, #FF4B2B, #FF416C)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    color: '#FFFFFF',
    position: 'relative',
    left: '-100%',
    height: '100%',
    width: '200%',
    transform: isRightPanelActive ? 'translateX(50%)' : 'translateX(0)',
    transition: 'transform 0.6s ease-in-out',
  },
  overlayPanel: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 40px',
    textAlign: 'center',
    top: 0,
    height: '100%',
    width: '50%',
    transform: isRightPanelActive ? 'translateX(50%)' : 'none',
  },
  overlayLeft: {
    transform: 'translateX(-20%)',
  },
  overlayRight: {
    right: 0,
    transform: 'translateX(0)',
  },
  error: {
    color: 'red',
    fontSize: '12px',
    marginTop: '5px',
  },
};

