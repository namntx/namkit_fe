import { QueryFunctionContext } from "@tanstack/react-query";
export default async function fetchData({ queryKey }: QueryFunctionContext) {
  const url = queryKey[1];

  const res = await fetch(`https://namkit-8c9bfd4e30aa.herokuapp.com/extract_info`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(url),
  });

  if (!res.ok) {
    throw new Error("fetch not ok");
  }

  return res.json();
}
