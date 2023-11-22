<script setup lang="ts">
import { TrashIcon } from "@heroicons/vue/24/outline";

const store = useList();
const { selectedItemId } = storeToRefs(store);
const { removeItem } = store;

const props = defineProps<{
  id: string;
  title: string;
  selected: boolean;
}>();

const isHover = ref(false);

const classObject = computed(() => [
  "flex",
  "hover:opacity-80",
  !props.selected && "opacity-100",
  props.selected && "opacity-50 pointer-events-none",
]);

function deleteItem(id: string) {
  if (confirm("記事を削除してもよろしいでしょうか？")) {
    removeItem(id);
  }
}
</script>

<template>
  <li
    :class="classObject"
    @pointerenter="isHover = true"
    @pointerleave="isHover = false"
  >
    <button
      class="overflow-hidden text-ellipsis whitespace-nowrap text-left w-full py-2"
      @click="selectedItemId = id"
    >
      {{ title }}
    </button>
    <template v-if="isHover">
      <button class="p-2" @click="deleteItem(id)">
        <TrashIcon class="w-[16px]" />
      </button>
    </template>
  </li>
</template>
