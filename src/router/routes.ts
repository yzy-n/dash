import type { RouteRecordRaw } from 'vue-router'

import DashScreen from '@/views/screens/dash/index.vue'
import BusScreen from '@/views/screens/bus/index.vue'
import DisasterScreen from '@/views/screens/disaster/index.vue'
import PartyScreen from '@/views/screens/party/index.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'big-screen',
    component: DashScreen
  },
  {
    path: '/bus',
    name: 'bus-screen',
    component: BusScreen
  },
  {
    path: '/disaster',
    name: 'disaster-screen',
    component: DisasterScreen
  },
  {
    path: '/party',
    name: 'party-screen',
    component: PartyScreen
  }
]
