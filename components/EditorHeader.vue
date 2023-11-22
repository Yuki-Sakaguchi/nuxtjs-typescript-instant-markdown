<script setup lang="ts">
import type { Editor } from "@tiptap/vue-3";

const props = defineProps<{ editor: Editor }>();
</script>

<template>
  <div class="fixed w-full bg-gray-200 px-4 py-2 z-20 flex gap-3">
    <button
      @click="() => editor?.chain().focus().toggleHeading({ level: 1 }).run()"
    >
      <i class="ri-h-1"></i>
    </button>
    <button
      @click="() => editor?.chain().focus().toggleHeading({ level: 2 }).run()"
    >
      <i class="ri-h-2"></i>
    </button>
    <button
      @click="() => editor?.chain().focus().toggleHeading({ level: 3 }).run()"
    >
      <i class="ri-h-3"></i>
    </button>
    <button
      @click="() => editor?.chain().focus().toggleHeading({ level: 4 }).run()"
    >
      <i class="ri-h-4"></i>
    </button>
    <button
      @click="() => editor?.chain().focus().toggleHeading({ level: 5 }).run()"
    >
      <i class="ri-h-5"></i>
    </button>
    <button
      @click="() => editor?.chain().focus().toggleHeading({ level: 6 }).run()"
    >
      <i class="ri-h-6"></i>
    </button>
  </div>
</template>
