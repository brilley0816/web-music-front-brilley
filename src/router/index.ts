import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
      path: "/:pathMatch(.*)*",
      redirect: "/404",
    },
    {
    //点击子路由，父路由的界面不会改变，也就是最下面的音乐bar一直存在
    path: '/',
    name: "yin-container",
    component: () => import("@/views/YinContainer.vue"),
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("@/views/HomeView.vue"),
      },
      {
        path: "/sign-in",
        name: "sign-in",
        component: () => import("@/views/SignIn.vue"),
      },
        {
            path: "/sign-up",
            name: "sign-up",
            component: () => import("@/views/SignUp.vue"),
        },
        {
            path: "/search",
            name: "search",
            component: () => import("@/views/search/Search.vue"),
        },
        {
            path: "/personal",
            name: "personal",
            meta: {
                requireAuth: true,
            },
            component: () => import("@/views/personal/PersonalPro.vue"),
        },
        {
            path: "/personal-data",
            name: "personal-data",
            component: () => import("@/views/setting/PersonalData.vue"),
        },
        {
          path: "/song-sheet",
          name: "song-sheet",
          component: () => import("@/views/song-sheet/SongSheet.vue"),
        },
        {
          path: "/song-sheet-detail/:id",
          name: "song-sheet-detail",
          component: () => import("@/views/song-sheet/SongSheetDetail.vue"),
        },
        {
          path: "/singer",
          name: "singer",
          component: () => import("@/views/singer/Singer.vue"),
        },
        {
          path: "/singer-detail/:id",
          name: "singer-detail",
          component: () => import("@/views/singer/SingerDetail.vue"),
        },
        {
          path: "/setting",
          name: "setting",
          meta: {
            requireAuth: true,
          },
          component: () => import("@/views/setting/Setting.vue"),
          children: [
            {
              path: "/setting/PersonalData",
              name: "personalData",
              meta: {
                requireAuth: true,
              },
              component: () => import("@/views/setting/PersonalData.vue"),
            }
          ]
        },
        {
          path: "/chat",
          name: "chat",
          component: () => import("@/views/chat/chat.vue"),
        },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
