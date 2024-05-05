import "./globals.css";
import type { Metadata } from "next";
import { Noto_Sans_Mono } from "next/font/google";
import Image from "next/image";
import ReactQueryProvider from "../providers/ReactQueryProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import {
  BsYoutube,
  BsTiktok,
  BsFacebook,
  BsTwitter,
  BsInstagram,
} from "react-icons/bs";

const customFont = Noto_Sans_Mono({ weight: "400", subsets: ["vietnamese"] });

export const metadata: Metadata = {
  title: "Ủa alo ...",
  description:
    "Có gì cần tải à?",
  keywords: [
    "tiktok",
    "youtube",
    "twitter",
    "instagram",
    "download",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${customFont.className} bg-main flex min-h-screen flex-col items-center overflow-x-hidden antialiased`}
      >
        <ToasterProvider />
        <ReactQueryProvider>
          {/* <Navbar /> */}
          <main className="w-full px-2 lg:w-3/5 2xl:w-3/5 max-w-3xl mb-8">
            <section className="relative select-none mt-6 md:mt-10 h-full w-full flex flex-col items-center justify-center sm:gap-x-3 ">
              <div className="relative flex items-center">
                <Image
                  src="/images/logo/yt.svg"
                  width={155}
                  height={170}
                  className="object-contain -rotate-12 h-[8rem] sm:h-full "
                  alt="ytb logo"
                />
                <h1 className="text-6xl sm:text-8xl text-white">NamKit</h1>
              </div>
              <h3 className="text-xl text-white">Tải mọi thứ trên đời</h3>
              <div className="mt-3 text-3xl flex gap-x-4">
                <div className="bg-zinc-900	border-gray-200 p-2 rounded-md shadown-md flex gap-x-4">
                  <BsYoutube className="text-logo drop-shadow-sm" />
                  <p className="drop-shadow-[1px_1px_0px_rgba(255,0,0,0.75)]">
                    <BsTiktok className="drop-shadow-[-1px_-1.5px_0px_rgba(0,250,255,0.5)]" />
                  </p>
                  <BsFacebook className="text-blue-900/100 drop-shadow-sm" />
                  <BsTwitter className="text-sky-600/70 drop-shadow-sm" />
                  <BsInstagram className="p-1 rounded-lg bg-gradient-to-tr from-orange-500 to-purple-600 text-white drop-shadow-sm" />

                </div>
                
              </div>
            </section>
            {children}
          </main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
