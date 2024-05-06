"use client";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchData from "./fetchData";
import toast from "react-hot-toast";
import Result from "./Result";

export default function Search() {
  const [url, setUrl] = useState<String>("");
  const result = useQuery(["url", url], fetchData, { enabled: !!url });
  const resultData = result?.data ?? [];
  const supportedSites = [
    "youtu",
    "tiktok",
    "instagram",
    "twitch",
    "twitter",
    "reddit",
    "facebook"
  ];

  function checkSupported(userInput: String) {
    return supportedSites.some((item) => userInput.includes(item));
  }

  return (
    <div className="mt-6 md:mt-8">
      <div className="flex flex-col w-min-16 w-full h-auto">
        <form
          className="flex relative"
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const extractURL = formData.get("url") as String;
            if (checkSupported(extractURL)) {
              if (extractURL.indexOf("list") === -1) {
                setUrl(extractURL);
              } else {
                toast.error("Không hỗ trợ tải playlist", {
                  duration: 2000,
                });
              }
            } else {
              toast.error("Chưa có hỗ trợ, nhập link khác đi", { duration: 2000 });
            }
          }}
        >
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="search" id="search" name="url" className="block w-full p-4 ps-10 text-sm text-white border-b border-gray-300 bg-black focus:outline-none focus:border-b" placeholder="Nhập link vô đây" required />
            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-zinc-900	border-gray-200 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Get ngay</button>
          </div>
        </form>
        {result.isFetching ? (
          <div className="flex justify-center items-center bg-zinc-900 text-white">
            <h1 className="truncate my-4 text-md sm:text-md">
              Đợi chút ...
            </h1>
            <Image
              src="/images/search/brr.svg"
              height={48}
              width={48}
              className="object-fit sm:pl-2"
              alt="Loading"
            />
          </div>
        ) : result.isFetched ? (
          <div>
            <Result data={resultData} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
