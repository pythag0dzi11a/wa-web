import { ref } from "vue";
import axios from "axios";

export const notice=ref("")

export async function updateNotice() { // init at user-info.ts
  const res = await axios.get("/notice");
  notice.value = res.data;
}