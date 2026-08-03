<template>
  <div class="shell" :class="{ 'shell--dev': isDev }">
    <div class="viewport" :style="{ width: `${designWidth}px`, height: `${designHeight}px` }">
      <div
        class="screen"
        :style="{
          width: `${designWidth}px`,
          height: `${designHeight}px`,
          backgroundImage: `url(${partyUrl})`
        }"
      >
        <section class="body">
          <div class="body-left">
            <PartyLeft :data="screenData.left" />
          </div>
          <div class="body-center">
            <PartyCenter :data="screenData.center" />
          </div>
          <div class="body-right">
            <PartyRight :data="screenData.right" />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import partyUrl from '@/assets/img/party.jpg'
import { partyScreenMock } from './data'
import PartyCenter from './parts/PartyCenter.vue'
import PartyLeft from './parts/PartyLeft.vue'
import PartyRight from './parts/PartyRight.vue'

const designWidth = 11520
const designHeight = 2160

const isFile = typeof window !== 'undefined' && window.location.protocol === 'file:'
const isDev = import.meta.env.DEV || isFile

const screenData = ref(partyScreenMock)
</script>

<style scoped>
.shell {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1d0505;
}

.shell--dev {
  display: block;
  overflow: auto;
  padding: 24px;
  box-sizing: border-box;
}

.shell--dev .viewport {
  margin: 0 auto;
}

.viewport {
  overflow: hidden;
}

.screen {
  position: relative;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.body {
  position: absolute;
  inset: 0;
}

.body-left,
.body-center,
.body-right {
  position: absolute;
  top: 0;
}

.body-left {
  left: 0;
  width: 3840px;
  height: 2160px;
}

.body-center {
  left: 3840px;
  width: 3840px;
  height: 2160px;
}

.body-right {
  right: 0;
  width: 3840px;
  height: 2160px;
}
</style>
