/**
 * IMEかどうかを判定する
 */
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
