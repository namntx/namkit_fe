import { QueryFunctionContext } from "@tanstack/react-query";
export default async function fetchData({ queryKey }: QueryFunctionContext) {
  const url = queryKey[1];

  if (JSON.stringify(url).includes("instagram")) {
    var raw = JSON.stringify({
      "url": url,
    });


    const resTik = await fetch("https://co.wuk.sh/api/json", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': "application/json"
      },
      body: raw,
    })

    if (!resTik.ok) {
      throw new Error("Link preparation not ok");
    }

    return await resTik.json();

  } else {
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
}
