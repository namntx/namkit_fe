export default async function fetchHistory() {
  const res = await fetch("https://namkit-8c9bfd4e30aa.herokuapp.com/history", {
    next: { revalidate: 20 },
  });
  if (!res.ok) {
    throw new Error("History API fetch failed.");
  }

  return res.json();
}
