import { boot } from "quasar/wrappers";
import { getApp } from "firebase/app";
import { VueFire, VueFireAuth } from "vuefire";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  const firebaseApp = getApp();

  app.use(VueFire, {
    firebaseApp,
    modules: [VueFireAuth()],
  });
});
