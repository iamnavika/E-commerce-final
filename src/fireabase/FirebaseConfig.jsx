// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArbHaR5VN08p4SycUMslVYimliu9BFvYc",
  authDomain: "e-commerce-e65d7.firebaseapp.com",
  projectId: "e-commerce-e65d7",
  storageBucket: "e-commerce-e65d7.firebasestorage.app",
  messagingSenderId: "117811901219",
  appId: "1:117811901219:web:f747e174f62355b882d296",
  measurementId: "G-W55YFTSE1Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const fireDB = getFirestore(app);
const auth = getAuth(app)

// signin with google


const SignInWithGoogle = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      setError(null);
      console.log("User info:", user);
    } catch (err) {
      setError(err.message);
      console.error("Error signing in with Google:", err);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Sign in with Google</h1>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}</p>
          <p>Email: {user.email}</p>
          <img src={user.photoURL} alt="Profile" style={{ borderRadius: '50%', width: '100px' }} />
        </div>
      ) : (
        <button onClick={handleSignIn} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
          Sign in with Google
        </button>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default SignInWithGoogle;

export {fireDB,auth };