<script setup lang="ts">
import { TrashIcon, ExclamationCircleIcon } from "@heroicons/vue/24/outline";

import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TiptapImage from "@tiptap/extension-image";
import { format } from "date-fns";
import { handleDropImage } from "@/utils/ImageLoader";

const updateTimer = ref<NodeJS.Timeout>();
const cursorPoint = ref(0);
const isOpenModal = ref(false);

const store = useList();
const { selectedItem } = storeToRefs(store);
const { removeItem, onChange } = store;

const { isComposing } = useComposing();

const editor = useEditor({
  extensions: [
    StarterKit,
    TiptapImage.configure({
      allowBase64: true,
      HTMLAttributes: {
        class: "border",
      },
    }),
    Placeholder.configure({
      placeholder: "メモを書きましょう！",
    }),
  ],
  editorProps: {
    handleDrop: handleDropImage,
  },
  onUpdate,
});

/**
 * データの更新処理
 *
 * 更新するたびに実行しないように setTimeout を用いて一番最後の update 時のみに動くように調整
 * IME入力中の場合にも変更を無視する
 * また、更新時のカーソルの位置も保存して、データ更新後に使う
 */
function onUpdate() {
  if (editor == null) return;
  if (updateTimer.value) clearTimeout(updateTimer.value);
  updateTimer.value = setTimeout(() => {
    if (isComposing.value) return;
    if (editor.value == null) return;
    cursorPoint.value = editor.value.state.selection.anchor;
    onChange(editor.value.getHTML());
  }, 400);
}

function deleteItem() {
  if (selectedItem == null || selectedItem.value == null) return;
  if (confirm("記事を削除してもよろしいでしょうか？")) {
    removeItem(selectedItem.value.id);
  }
}

function formatDate(date: Date) {
  return format(new Date(date), "yyyy-MM-dd HH:mm:ss");
}

watch(isComposing, () => {
  onUpdate();
});

watch([selectedItem, editor], () => {
  if (editor == null || selectedItem == null) return;
  if (editor.value == null || selectedItem.value == null) return;
  editor.value.commands.setContent(selectedItem.value.body);
  editor.value.commands.focus(cursorPoint.value);
  if (!editor.value.isFocused) editor.value.commands.focus();
});
</script>

<template>
  <template v-if="editor == null || selectedItem == null">
    <div class="h-full flex justify-center items-center">
      <AboutView />
    </div>
  </template>
  <template v-else>
    <EditorHeader :editor="editor" />
    <div id="editor" class="relative h-full pl-4">
      <template v-if="editor">
        <div class="overflow-scroll relative h-full flex flex-col pt-16 pb-4">
          <div class="flex flex-col absolute top-12 right-3 p-2">
            <button
              class="transition-opacity opacity-50 hover:opacity-100"
              @click="deleteItem"
            >
              <TrashIcon class="w-[20px]" />
            </button>
            <button
              class="mt-5 transition-opacity opacity-50 hover:opacity-100"
              @click="isOpenModal = true"
            >
              <ExclamationCircleIcon class="w-[20px]" />
            </button>
          </div>
          <div class="mb-4">
            <time class="block text-xs text-gray-400">
              作成日 : {{ formatDate(selectedItem.createdAt) }}
            </time>
            <time class="block text-xs text-gray-400">
              更新日 : {{ formatDate(selectedItem.updatedAt) }}
            </time>
            <hr class="w-[200px] mt-4 border-0 border-dashed border-t-2" />
          </div>
          <EditorContent class="flex-1" :editor="editor" />
        </div>
      </template>
    </div>
  </template>
</template>
