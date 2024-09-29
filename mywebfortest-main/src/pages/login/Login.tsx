import React, { useState, useEffect } from 'react';
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
  <form className="flex flex-col items-center justify-center h-full px-12 text-center bg-white" onSubmit={handleSubmit}>
    <h1 className="text-2xl font-thin leading-5 tracking-wider mb-7">
      {buttonLabel === 'เข้าสู่ระบบ' ? 'เข้าสู่ระบบ' : 'สร้างบัญชีใหม่'}
    </h1>
    <input
      className="w-full px-4 py-3 my-2 bg-gray-100 rounded-md border-none outline-none"
      type="email"
      placeholder="Email"
      name="email"
      value={formData.email}
      onChange={handleInputChange}
    />
    {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email}</span>}
    <input
      className="w-full px-4 py-3 my-2 bg-gray-100 rounded-md border-none outline-none"
      type="password"
      placeholder="Password"
      name="password"
      value={formData.password}
      onChange={handleInputChange}
    />
    {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password}</span>}
    {buttonLabel === 'สมัครสมาชิก' && (
      <>
        <input
          className="w-full px-4 py-3 my-2 bg-gray-100 rounded-md border-none outline-none"
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name}</span>}
      </>
    )}
    <button
      className="px-11 py-3 mt-3 text-white bg-red-500 rounded-full border border-red-500 font-bold text-xs uppercase tracking-wider transition duration-300 ease-in hover:bg-red-600"
      type="submit"
    >
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-sans my-[10%]">
      {serverError && <div className="text-red-500 text-sm mb-4">{serverError}</div>}
      {loading ? (
        <div>กำลังโหลด...</div>
      ) : (
        <div className="relative w-[1000px] max-w-full min-h-[550px] bg-white rounded-lg overflow-hidden shadow-2xl">
          <div
            className={`absolute top-0 left-0 h-full transition-all duration-600 ease-in-out w-1/2 ${
              isRightPanelActive ? 'opacity-100 z-5 translate-x-full' : 'opacity-0 z-1'
            }`}
          >
            <Form
              formData={formData}
              errors={errors}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              buttonLabel="สมัครสมาชิก"
            />
          </div>
          <div
            className={`absolute top-0 left-0 h-full transition-all duration-600 ease-in-out w-1/2 ${
              isRightPanelActive ? 'z-1 translate-x-full' : 'z-2'
            }`}
          >
            <Form
              formData={formData}
              errors={errors}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              buttonLabel="เข้าสู่ระบบ"
            />
          </div>

          <div className="absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-600 ease-in-out z-100">
            <div
              className={`bg-gradient-to-r from-red-500 to-pink-500 text-white relative left-[-100%] h-full w-[200%] ${
                isRightPanelActive ? 'translate-x-1/2' : 'translate-x-0'
              } transition-transform duration-600 ease-in-out`}
            >
              <div
                className={`absolute flex flex-col items-center justify-center px-10 text-center top-0 h-full w-1/2 ${
                  isRightPanelActive ? '-translate-x-[20%]' : ''
                }`}
              >
                <h1 className="text-2xl font-thin leading-5 tracking-wider mb-7">ยินดีตอนรับกลับนะเพื่อน</h1>
                <p>เข้าสู่ระบบเพื่อเชื่อมต่อกับเรา</p>
                <button
                  className="px-11 py-3 mt-3 bg-transparent border border-white rounded-full font-bold text-xs uppercase tracking-wider transition duration-300 ease-in hover:bg-white hover:text-red-500"
                  onClick={() => setIsRightPanelActive(false)}
                >
                  เข้าสู่ระบบ
                </button>
              </div>
              <div
                className={`absolute flex flex-col items-center justify-center px-10 text-center top-0 right-0 h-full w-1/2 ${
                  isRightPanelActive ? 'translate-x-0' : ''
                }`}
              >
                <h1 className="text-2xl font-thin leading-5 tracking-wider mb-7">สวัสดีเพื่อน</h1>
                <p>สมัครสมาชิกและเริ่มการเดินทางกับเรา</p>
                <button
                  className="px-11 py-3 mt-3 bg-transparent border border-white rounded-full font-bold text-xs uppercase tracking-wider transition duration-300 ease-in hover:bg-white hover:text-red-500"
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

export default Login;