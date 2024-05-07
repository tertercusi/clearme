const routes = [
  {
    path: "/",
    component: () => import("layouts/ClientLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "notifications",
        component: () => import("pages/NotificationPage.vue"),
      },
      {
        path: "profile",
        component: () => import("pages/ProfilePage.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/BlankLayout.vue"),
    children: [
      { path: "login", component: () => import("pages/LoginPage.vue") },
    ],
  },
  {
    path: "/admin",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      { path: "", component: () => import("pages/AdminHome.vue") },
      { path: "sections", component: () => import("pages/AdminSections.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
