"use server";

import { revalidateTag } from "next/cache";

export async function revalidateTagByServerAction(tag: string) {
  revalidateTag(tag);
}
