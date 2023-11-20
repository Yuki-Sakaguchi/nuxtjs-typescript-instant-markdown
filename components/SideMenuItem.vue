<script setup lang="ts">
interface Props {
  id: string;
  title: string;
  selected: boolean;
}

const props = defineProps<Props>();
</script>

<template>
  <li class="flex hover:opacity-80">
    <button
      class="overflow-hidden text-ellipsis whitespace-nowrap text-left w-full py-2"
    >
      {{ title }}
    </button>
    <button class="p-2">削除</button>
  </li>
</template>
