<script setup lang="ts">
import { VueFinalModal } from "vue-final-modal";

const commandList = [
  { name: "太字", shortcut: ["⌘", "b"] },
  { name: "斜字", shortcut: ["⌘", "i"] },
  { name: "打ち消し線", shortcut: ["⌘", "shift", "x"] },
  { name: "コード", shortcut: ["⌘", "e"] },
];

function join(shortcut: string[]) {
  return shortcut
    .map(
      (command) => ` 
    <pre
      style="
        background-color: rgba(0, 0, 0, 0.1);
        padding: 2px 6px;
        margin: 0 4px;
        border-radius: 2px;
      "
    >${command}</pre>`
    )
    .join("+");
}
</script>

<template>
  <VueFinalModal
    class="flex justify-center items-center"
    content-class="flex flex-col max-w-xl mx-4 p-4 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg space-y-2"
  >
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">コマンド</th>
            <th scope="col" class="px-6 py-3">ショートカット</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="{ name, shortcut } in commandList" :key="name">
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ name }}
              </th>
              <td class="px-6 py-4">
                <p class="flex" v-html="join(shortcut)"></p>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </VueFinalModal>
</template>
