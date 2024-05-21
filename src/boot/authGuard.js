import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import { boot } from "quasar/wrappers";
import { getCurrentUser } from "vuefire";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ router }) => {
  const firestore = getFirestore();
  const userCollection = collection(firestore, "users");

  router.beforeEach(async (to) => {
    const user = await getCurrentUser();

    if (!user && to.meta.requiresAuth) {
      return {
        path: "/login",
      };
    } else if (user) {
      const userDoc = await getDoc(doc(userCollection, user.uid));
      if (to.meta.isAdmin && userDoc.get("isStudent")) {
        return {
          path: "/",
        };
      } else if (!to.meta.isAdmin && !userDoc.get("isStudent")) {
        return {
          path: "/admin",
        };
      }
    }
  });
});
