import { QueryFunctionContext } from "@tanstack/react-query";

type Keys = {
  url: string;
  type: string;
};

export default async function fetchData({ queryKey }: QueryFunctionContext) {
  const queryKeyArray: Keys[] = queryKey as Keys[];
  const { url, type } = queryKeyArray[1];

  const obj = {
    url: url,
    type: type,
  };

  if (url.includes("tiktok")) {
    var raw = JSON.stringify({
      "url": url,
      "vQuality": "max",
    });


    const resTik = await fetch("https://co.wuk.sh/api/json", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': "application/json"
      },
      body: raw,
      redirect: 'follow'
    })

    if (!resTik.ok) {
      throw new Error("Link preparation not ok");
    }

    return await resTik.json();

  } else {
    const res = await fetch(`https://namkit-8c9bfd4e30aa.herokuapp.com/get_me_link`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    if (!res.ok) {
      throw new Error("Link preparation not ok");
    }

    return await res.json();
  }
}
