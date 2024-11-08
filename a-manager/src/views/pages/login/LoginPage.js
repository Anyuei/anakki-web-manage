import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CFormSelect,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilLockUnlocked, cilUser } from '@coreui/icons';
import LoginHeader from 'src/views/pages/login/LoginHeader';
import axiosInstance, { API_BASE_URL, setBaseURL } from 'src/axiosInstance';
import { message } from 'antd';
import './LoginPage.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [verify, setVerify] = useState('');
    const [notice, setNotice] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
    const [captcha, setCaptcha] = useState();
    const [apiBaseURL, setApiBaseURL] = useState('');
    const [protocol, setProtocol] = useState('http');
    const [loading, setLoading] = useState(false); // For button loading state
    const navigate = useNavigate();

    useEffect(() => {
        refreshCaptcha();
    }, []);

    const refreshCaptcha = () => {
        setCaptcha(`${API_BASE_URL + '/base/system/captcha'}?${new Date().getTime()}`);
    };

    const handleSetBaseURL = () => {
        if (apiBaseURL) {
            const fullURL = `${protocol}://${apiBaseURL}`;
            setBaseURL(fullURL);
            console.log('Set API base URL:', fullURL);
        } else {
            message.error('Please enter a valid API base URL');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true); // Disable button on request start
        try {
            const response = await axiosInstance.post('/base/anakki/manager/login', { username, password, verify });
            localStorage.setItem('jwtManageToken', response);
            navigate('/dashboard');
            setNotice('Login successful');
            message.success('Login successful');
        } catch (error) {
            message.error('Login failed. Please check your credentials.');
            console.error('Login error:', error);
        } finally {
            setLoading(false); // Re-enable button after request finishes
        }
    };

    return (
        <div>
            <LoginHeader />
            <div className="login-container">
                <CContainer>
                    <CRow className="justify-content-center">
                        <CCol md={8}>
                            <CCardGroup className="fade-in">
                                <CCard className="login-card">
                                    <CCardBody>
                                        <CCol xs={12}>
                                            <CRow>
                                                <CCol md={3}>
                                                    <CFormSelect value={protocol} onChange={(e) => setProtocol(e.target.value)}>
                                                        <option value="http">http</option>
                                                        <option value="https">https</option>
                                                    </CFormSelect>
                                                </CCol>
                                                <CCol xs={6}>
                                                    <CFormInput
                                                        placeholder="Enter API Base URL"
                                                        value={apiBaseURL}
                                                        onChange={(e) => setApiBaseURL(e.target.value)}
                                                    />
                                                </CCol>
                                                <CCol xs={3}>
                                                    <CButton color="primary" onClick={handleSetBaseURL} className="set-url-btn">
                                                        Set
                                                    </CButton>
                                                </CCol>
                                            </CRow>
                                        </CCol>
                                        <br />
                                        <CForm onSubmit={handleLogin}>
                                            <h4 className="login-title">Login</h4>
                                            {notice && <p id="manager-login-notice">{notice}</p>}
                                            <CInputGroup className="mb-3">
                                                <CInputGroupText>
                                                    <CIcon icon={cilUser} />
                                                </CInputGroupText>
                                                <CFormInput
                                                    placeholder="Username"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                />
                                            </CInputGroup>
                                            <CInputGroup className="mb-4">
                                                <CInputGroupText>
                                                    <CIcon icon={showPassword ? cilLockUnlocked : cilLockLocked} onClick={() => setShowPassword(!showPassword)} />
                                                </CInputGroupText>
                                                <CFormInput
                                                    type={showPassword ? 'text' : 'password'}
                                                    placeholder="Password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </CInputGroup>
                                            <CInputGroup className="mb-4 captcha-group">
                                                <img src={captcha} alt="Captcha" className="captcha-img" onClick={refreshCaptcha} title="Click to refresh" />
                                                <CFormInput
                                                    type="text"
                                                    placeholder="Enter Captcha"
                                                    maxLength="6"
                                                    value={verify}
                                                    onChange={(e) => setVerify(e.target.value)}
                                                />
                                            </CInputGroup>
                                            <CRow>
                                                <CCol xs={3}>
                                                    <CButton type="submit" color="primary" disabled={loading}>
                                                        {loading ? 'Logging in...' : 'Login'}
                                                    </CButton>
                                                </CCol>
                                                <CCol xs={3} className="text-right">
                                                    <CButton color="link" style={{ float: 'right' }}>
                                                        Forgot Password?
                                                    </CButton>
                                                </CCol>
                                            </CRow>
                                        </CForm>
                                    </CCardBody>
                                </CCard>
                            </CCardGroup>
                        </CCol>
                    </CRow>
                </CContainer>
            </div>
        </div>
    );
};

export default LoginPage;
