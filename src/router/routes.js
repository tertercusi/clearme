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

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
