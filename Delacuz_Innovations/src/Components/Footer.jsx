import {useState, useEffect} from 'react';
import { Facebook, Linkedin, Youtube, Instagram, X, TicketCheckIcon } from 'lucide-react';
import logo from '../assets/Images/logo.jpg';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { db } from '../Firebase/Firebase';
import { Link } from 'react-router-dom';    
const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
const [newsletterStatus, setNewsletterStatus] = useState('');
const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false);

// const handleNewsletterSubmit = async () => {
//   if (!newsletterEmail) {
//     setNewsletterStatus('error-empty');
//     setTimeout(() => setNewsletterStatus(''), 3000);
//     return;
//   }

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(newsletterEmail)) {
//     setNewsletterStatus('error-invalid');
//     setTimeout(() => setNewsletterStatus(''), 3000);
//     return;
//   }

//   setIsSubmittingNewsletter(true);

//   try {
//     // Check if email already exists
//     const { query, where, getDocs } = await import('firebase/firestore');
//     const q = query(
//       collection(db, 'newsletterSubscriptions'), 
//       where('email', '==', newsletterEmail)
//     );
//     const querySnapshot = await getDocs(q);

//     if (!querySnapshot.empty) {
//       setNewsletterStatus('error-duplicate');
//       setTimeout(() => setNewsletterStatus(''), 3000);
//       setIsSubmittingNewsletter(false);
//       return;
//     }

//     // If email doesn't exist, proceed with subscription
//     await addDoc(collection(db, 'newsletterSubscriptions'), {
//       email: newsletterEmail,
//       subscribedAt: serverTimestamp(),
//       status: 'active'
//     });

//     console.log('Newsletter subscription successful');
//     setNewsletterStatus('success');
//     setNewsletterEmail('');
//     setTimeout(() => setNewsletterStatus(''), 5000);
    
//   } catch (error) {
//     console.error('Error subscribing to newsletter: ', error);
//     setNewsletterStatus('error-send');
//     setTimeout(() => setNewsletterStatus(''), 3000);
//   } finally {
//     setIsSubmittingNewsletter(false);
//   }
// };
  
const handleNewsletterSubmit = async () => {
  if (!newsletterEmail) {
    setNewsletterStatus('error-empty');
    setTimeout(() => setNewsletterStatus(''), 3000);
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(newsletterEmail)) {
    setNewsletterStatus('error-invalid');
    setTimeout(() => setNewsletterStatus(''), 3000);
    return;
  }

  setIsSubmittingNewsletter(true);

  try {
    // Your Google Apps Script Web App URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyU_l3opu1oyFokC35kSkg2jA7Ap5ZjVpLvp86HfO9c4Lu4jVigs355ol9JfUrBqVuZ/exec'; // Paste your URL here

    // Send to Google Sheets
    const response = await fetch(scriptURL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: newsletterEmail,
        subscribedAt: new Date().toLocaleString(),
        status: 'active'
      })
    });

    // Since mode is 'no-cors', we can't read the response
    // So we assume success if no error is thrown
    
    // Also save to Firebase as backup
    await addDoc(collection(db, 'newsletterSubscriptions'), {
      email: newsletterEmail,
      subscribedAt: serverTimestamp(),
      status: 'active'
    });

    console.log('Newsletter subscription successful');
    setNewsletterStatus('success');
    setNewsletterEmail('');
    setTimeout(() => setNewsletterStatus(''), 5000);
    
  } catch (error) {
    console.error('Error subscribing to newsletter: ', error);
    setNewsletterStatus('error-send');
    setTimeout(() => setNewsletterStatus(''), 3000);
  } finally {
    setIsSubmittingNewsletter(false);
  }
};
return (
    <footer className="bg-black text-white py-10 px-4">
      <div className=" mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8 items-baseline">
          {/* Left: Logo and Newsletter */}
          <div>
            <div className="w-32 mb-4">
              <img src={logo} />
            </div>
             <p className="text-gray-300 text-sm font-medium italic">
              Innovation tomorrow. Delivering today.
            </p>
            
            <h4 className="font-semibold mb-3 text-white text-lg">Subscribe</h4>
            <p className="text-gray-400 text-sm mb-4 max-w-md">
              Select topics and stay current with our latest insights
            </p>
            
           <div>
  <div className="flex gap-2 mb-6">
    <input
      type="email"
      placeholder="Email address"
      value={newsletterEmail}
      onChange={(e) => setNewsletterEmail(e.target.value)}
      className="flex-1 bg-white text-black border-2 border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-purple-600 transition-colors"
    />
    <button 
      onClick={handleNewsletterSubmit}
      disabled={isSubmittingNewsletter}
      className="bg-purple-700 hover:bg-purple-600 disabled:bg-purple-900 disabled:cursor-not-allowed text-white px-8 py-2.5 rounded font-semibold text-sm transition-colors duration-300"
    >
      {isSubmittingNewsletter ? 'Submitting...' : 'Submit'}
    </button>
  </div>

  {/* Status Messages */}
  {newsletterStatus === 'success' && (
    <div className="mb-4 p-3 bg-green-900/50 border border-green-600 rounded-lg text-green-400 text-sm">
      ✓ Successfully subscribed to newsletter!
    </div>
  )}
  
  {newsletterStatus === 'error-empty' && (
    <div className="mb-4 p-3 bg-red-900/50 border border-red-600 rounded-lg text-red-400 text-sm">
      ✗ Please enter your email address
    </div>
  )}
  
  {newsletterStatus === 'error-invalid' && (
    <div className="mb-4 p-3 bg-red-900/50 border border-red-600 rounded-lg text-red-400 text-sm">
      ✗ Please enter a valid email address
    </div>
  )}
  
  {newsletterStatus === 'error-send' && (
    <div className="mb-4 p-3 bg-red-900/50 border border-red-600 rounded-lg text-red-400 text-sm">
      ✗ Failed to subscribe. Please try again.
    </div>
  )}
  {newsletterStatus === 'error-duplicate' && (
  <div className="mb-4 p-3 bg-yellow-900/50 border border-yellow-600 rounded-lg text-yellow-400 text-sm">
    ✗ This email is already subscribed to our newsletter
  </div>
)}
</div>

           
          </div>

          {/* Right: Links and Social */}
          <div className="md:text-right space-y-6">
            {/* Quick Links */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end text-sm">
              <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact us</Link>
              <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link>
              <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy policy</Link>
              <Link to="/terms-of-use" className="text-gray-400 hover:text-white transition-colors">Terms of use</Link>
              <Link to="/accessibility-statement" className="text-gray-400 hover:text-white transition-colors">Accessibility statement</Link>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex gap-3 md:justify-end">
              <a 
                href="https://www.linkedin.com/company/delacruz-innovations/"
                className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-purple-700 hover:text-white transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://www.facebook.com/share/1Ex9gJwHCi/" 
                className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-purple-700 hover:text-white transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/delacruzinnovations?igsh=dGxhZ2Q0Yncxd2cx" 
                className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-purple-700 hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://x.com/Delacruz_Inno/status/1983874642042613850?t=5tg2otbR1DHWUhHv4Dv1uQ&s=19" 
                className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-purple-700 hover:text-white transition-all duration-300"
                aria-label="YouTube"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
              </a>
               <a 
                href="https://www.tiktok.com/@delacruzinnovation?_r=1&_t=ZS-910LcadcHbO" 
                className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center p-2 hover:bg-purple-700 hover:text-white transition-all duration-300"
                aria-label="TikTok"
              >
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M448.5 209.9c-44 .1-87-13.6-122.8-39.2l0 178.7c0 33.1-10.1 65.4-29 92.6s-45.6 48-76.6 59.6-64.8 13.5-96.9 5.3-60.9-25.9-82.7-50.8-35.3-56-39-88.9 2.9-66.1 18.6-95.2 40-52.7 69.6-67.7 62.9-20.5 95.7-16l0 89.9c-15-4.7-31.1-4.6-46 .4s-27.9 14.6-37 27.3-14 28.1-13.9 43.9 5.2 31 14.5 43.7 22.4 22.1 37.4 26.9 31.1 4.8 46-.1 28-14.4 37.2-27.1 14.2-28.1 14.2-43.8l0-349.4 88 0c-.1 7.4 .6 14.9 1.9 22.2 3.1 16.3 9.4 31.9 18.7 45.7s21.3 25.6 35.2 34.6c19.9 13.1 43.2 20.1 67 20.1l0 87.4z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-gray-800 pt-6">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Delacruz Innovations. RC - 8432281. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;