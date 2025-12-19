// ... (ऊपर का डिज़ाइन और लॉजिक)

              <h3 className="text-xl font-semibold border-b border-gray-600 pb-2 text-[#4D9DE0]">Login Details</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* 1. User ID इनपुट */}
                <div className="relative">
                  {/* आइकॉन और इनपुट */}
                  <input
                    type="text"
                    placeholder="User ID"
                    value={userId}
                    // ... (बाकी सेटिंग्स)
                  />
                </div>
                
                {/* 2. Password इनपुट */}
                <div className="relative">
                  {/* आइकॉन और इनपुट */}
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    // ... (बाकी सेटिंग्स)
                  />
                </div>
                
                {/* 3. Phone Number इनपुट */}
                <div className="relative">
                  {/* आइकॉन और इनपुट */}
                  <input
                    type="tel"
                    placeholder="10-digit phone number"
                    value={phoneNumber}
                    // ... (बाकी सेटिंग्स)
                  />
                </div>
                
                {/* भाषा चयन (Language selection) */}
                <div>
                    <select
                       // ... (सेलेक्ट सेटिंग्स)
                    >
                        {/* ऑप्शन्स */}
                    </select>
                </div>

                {/* LOGIN बटन */}
                <button
                type="submit"
                // ... (बटन सेटिंग्स)
                >
                {isSubmitting ? "PROCESSING..." : "LOGIN"}
                </button>

                {/* क्रिएट/रीसेट पासवर्ड बटन */}
                <button
                type="button"
                // ... (बटन सेटिंग्स)
                >
                Create / Reset Login Password
                </button>

            </form>
// ... (नीचे का डिज़ाइन)

