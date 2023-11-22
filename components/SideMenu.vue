<script setup lang="ts">
import { PlusIcon, TrashIcon } from "@heroicons/vue/24/outline";
const config = useAppConfig();

const displayList = [
  {
    id: "6393cd38-1e5e-4953-8dd7-357a86f04c2c",
    title: "title1",
    createdAt: "2023-11-06T08:38:43.700Z",
    updatedAt: "2023-11-06T09:10:22.886Z",
    body: "body1",
  },
  {
    id: "5393cd38-1e5e-4953-8dd7-357a86f04c2c",
    title: "title2",
    createdAt: "2023-11-06T08:38:43.700Z",
    updatedAt: "2023-11-06T09:10:22.886Z",
    body: "body2",
  },
];
</script>

<template>
  <div class="flex flex-col h-full px-4 pb-4 bg-gray-800 text-white">
    <h1 class="text-center text-lg font-bold mb-7">
      <div class="flex justify-center items-center">
        🚀 Instant Note<span class="ml-2 text-xs">(β)</span>
      </div>
      <p class="text-xs font-normal">v{{ config.version }}</p>
    </h1>
    <button
      class="bg-white text-gray-800 w-full py-2 rounded-tr-md rounded-bl-md transition-opacity hover:opacity-80"
    >
      <PlusIcon class="w-[20px] m-auto" />
    </button>
    <template v-if="displayList.length > 0">
      <button
        class="mt-2 bg-white text-gray-800 w-full py-2 rounded-tr-md rounded-bl-md transition-opacity hover:opacity-80"
      >
        <TrashIcon class="w-[20px] m-auto" />
      </button>
    </template>
    <div class="flex-1 mt-4 overflow-scroll">
      <template v-if="displayList.length > 0">
        <ul class="overflow-scroll">
          <SideMenuItem
            v-for="item in displayList"
            :key="item.id"
            :id="item.id"
            :title="item.title"
            :selected="false"
          />
        </ul>
      </template>
    </div>
    <footer class="pt-4 mt-auto opacity-60 text-xs text-center">
      &copy; Instant Note
    </footer>
  </div>
</template>
