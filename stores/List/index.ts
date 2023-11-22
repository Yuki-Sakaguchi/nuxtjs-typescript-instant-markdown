import { v4 as uuidv4 } from "uuid";
import type { ListItem } from "@/types";

export const keyName = "nuxtjs-typescript-instant-markdown";

export const useList = defineStore("list", () => {
  const list = ref<ListItem[]>([]);
  const isEnable = ref(false);
  const selectedItemId = ref<string>("");

  const selectedItem = computed(() => {
    if (list == null || list.value.length == 0 || selectedItemId.value == "") {
      return null;
    }
    return list.value.find((item) => item.id === selectedItemId.value);
  });

  function getContent() {
    const raw = localStorage.getItem(keyName);
    if (raw == null) return null;
    return JSON.parse(raw);
  }

  function onChange(body: string) {
    // 選択しているアイテムがなければ終了
    const targetItem = list.value.find(
      (item) => item.id === selectedItemId.value
    );
    if (targetItem == null) return;

    // 本文の中の１つ目のタグの内容をタイトルに置き換える
    const title = (() => {
      const regex = /<[^>]*>([^<]*)<\/[^>]*>/;
      const match = body.match(regex);
      return match == null || match[1] === "" ? "no title" : match[1];
    })();

    // 更新対象のアイテムを作成
    const updateItem = {
      ...targetItem,
      title,
      body,
      updatedAt: new Date(),
    };

    // 選択中以外のアイテムはそのまま更新したいので取得
    const baseList = list.value.filter(
      (item) => item.id !== selectedItemId.value
    );
    list.value = [...baseList, updateItem];
  }

  function addItem() {
    const id = uuidv4();
    list.value = [
      ...list.value,
      {
        id,
        title: "no title",
        createdAt: new Date(),
        updatedAt: new Date(),
        body: "",
      },
    ];
    selectedItemId.value = id;
  }

  function removeItem(id: string) {
    // 選択しているアイテムがなければ終了
    const targetItem = list.value.find((item) => item.id === id);
    if (targetItem == null) return;

    // 選択中以外のアイテム以外で更新
    const baseList = list.value.filter((item) => item.id !== id);
    list.value = [...baseList];
  }

  function deleteAll() {
    list.value = [];
  }

  // watchEffect(() => {
  //   if (isEnable.value) return;
  //   const data = getContent();
  //   if (data != null) {
  //     list.value = [...data];
  //   }
  //   isEnable.value = true;
  // });

  // watch(list.value, () => {
  //   if (!isEnable) return;
  //   if (list == null) return;
  //   localStorage.setItem(keyName, JSON.stringify(list, null, 2));
  // });

  return {
    list,
    isEnable,
    selectedItemId,
    selectedItem,
    onChange,
    addItem,
    removeItem,
    deleteAll,
  };
});
