import { boot } from "quasar/wrappers";
import { initializeApp } from "firebase/app";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  if (import.meta.env.PROD) {
    try {
      const response = await fetch("/__/firebase/init.json");
      initializeApp(await response.json());
    } catch {
      console.error("Failure to fetch SDK config.");
    }
  }

  if (import.meta.env.DEV) {
    const firebaseConfig = {
      apiKey: "AIzaSyCJLXzsS2S-HB2vaeQMlSsyA85Yivl5A5k",
      authDomain: "clearme-cbe0e.firebaseapp.com",
      projectId: "clearme-cbe0e",
      storageBucket: "clearme-cbe0e.appspot.com",
      messagingSenderId: "1647276513",
      appId: "1:1647276513:web:f56e9e95be20b2a5ca22a0",
      measurementId: "G-HS8STC3PH9",
    };

    const app = initializeApp(firebaseConfig);

    const { getFirestore, connectFirestoreEmulator } = await import(
      "firebase/firestore"
    );
    const { getAuth, connectAuthEmulator } = await import("firebase/auth");

    const firestore = getFirestore(app);
    const auth = getAuth(app);

    connectFirestoreEmulator(firestore, "localhost", 8080);
    connectAuthEmulator(auth, "http://localhost:9099");
  }
});
