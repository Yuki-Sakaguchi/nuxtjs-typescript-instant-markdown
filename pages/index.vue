<script setup lang="ts">
import { ref } from "vue";

const isMenuOpen = ref(false);
const sp = ref(false);
</script>

<template>
  <div class="flex flex-col h-screen">
    <header class="relative px-1 flex h-10 bg-gray-800 z-20">
      <template v-if="sp">
        <template v-if="isMenuOpen">
          <button class="p-1" @click="isMenuOpen = true">開く</button>
        </template>
        <template v-else>
          <button class="p-1" @click="isMenuOpen = false">閉じる</button>
        </template>
      </template>
    </header>
    <div class="relative flex flex-1 overflow-hidden">
      <div
        class="transition-transform absolute top-0 left-0 w-[200px] h-full z-20"
      >
        <SideMenu />
      </div>
      <div
        id="editor-wrapper"
        class="relative transition-all ml-[200px] flex-1"
      >
        <Editor />
      </div>
    </div>
  </div>
</template>
