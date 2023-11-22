/**
 * IMEかどうかを判定する
 */
import { ref, onMounted, onUnmounted } from "vue";

export function useComposing() {
  const isComposing = ref(false);

  function handleStart() {
    isComposing.value = true;
  }

  function handleEnd() {
    isComposing.value = false;
  }

  onMounted(() => {
    window.addEventListener("compositionstart", handleStart);
    window.addEventListener("compositionend", handleEnd);
  });

  onUnmounted(() => {
    window.addEventListener("compositionstart", handleStart);
    window.addEventListener("compositionend", handleEnd);
  });

  return {
    isComposing,
  };
}
