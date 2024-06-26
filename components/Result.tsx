import Image from "next/image";
import Download from "./Download";
import Link from "next/link";
import moment from "moment";

type ResultDataProps = {
  data: {
    url?: string;
    error?: string;
    id: string;
    upload_date: number;
    title: string;
    fulltitle: string;
    thumbnail: string;
    duration: number;
    length: number;
    original_url: string;
  };
};

export default function Result({ data }: ResultDataProps) {
  const videoDate = moment(data.upload_date).format("DD-MM-YYYY");
  return (
    <>
      {data.thumbnail
        ? <div className="py-4 px-6 bg-zinc-900 text-white">
          <div className="flex justify-between text-md">
            {!data.fulltitle ? (
              <p className="truncate max-w-md">{data.title}</p>
            ) : (
              <p className="truncate max-w-md">{data.fulltitle}</p>
            )}
            <p className="truncate max-w-fit invisible xl:visible">{videoDate}</p>
          </div>
          <div className="flex mt-4 gap-2 lg:flex-nowrap flex-wrap">
            <div className="flex flex-col items-center sm:items-left">
              <Image
                className="object-cover aspect-video md:max-w-xs xl:max-w-md rounded-3xl border border-black"
                src={data.thumbnail}
                width={1280}
                height={720}
                quality={80}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAGAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAiEAACAAUEAwEAAAAAAAAAAAABAgMEBxESAAUGIQgJUmH/xAAVAQEBAAAAAAAAAAAAAAAAAAAABf/EAB4RAQABAgcAAAAAAAAAAAAAAAECAAQFERIiQaGx/9oADAMBAAIRAxEAPwBTLyRptRzcY3KeH0tMSb3YTUlGydJa6qVZ2LJkbEYgILKMQez2aI/tcSTdpNaQm0AmGLbl89fH5pppDaaSpWEwiW0U5y6A8K//2Q=="
                alt="thumb"
              />

              <Link
                className="flex items-center justify-center py-3 hover:underline"
                href={data.thumbnail}
                target="_blank"
              >
                <p className="text-base sm:text-base md:text-base">
                  Tải ảnh thumbnail...
                </p>
                <Image
                  src="/images/search/download.svg"
                  width={32}
                  height={32}
                  alt="download"
                />
              </Link>
            </div>
            <div className="flex flex-col justify-center mb-10 gap-6 w-full md:w-1/2">
              {data.duration > 5000 ? (
                <div>
                  <p className="text-xl lg:text-base text-center">
                    Tải video ngắn thôi, dưới 1h30p nhé!
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between gap-2 mx-auto">
                    <p className="text-xl lg:text-base sm:block">Audio</p>
                    <Download url={data.original_url} type="audio" format="MP3" />
                  </div>
                  <div className="flex items-center justify-between gap-2 mx-auto">
                    <p className="text-xl lg:text-base sm:block">Video</p>
                    <Download url={data.original_url} type="video" format="MP4" />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        : <div className="py-4 px-6 bg-zinc-900 text-white">
          <div className="flex items-center justify-between gap-2 mx-auto">
            <p className="text-xl lg:text-base sm:block">Video</p>
            <a
              className="flex gap-x-2 items-center justify-center 
    bg-button max-sm:w-[10rem] w-[12rem] h-[3rem] 
    rounded-full text-sm md:text-xl font-semibold  
    border border-black/40 transition 
    hover:bg-logo hover:border-black hover:border-2"
              href={data.url}
            >
              Download
              <Image
                className="object-fit"
                src="/images/search/download.svg"
                width={32}
                height={32}
                alt="download"
              />
            </a>
          </div>
        </div>
      }
    </>
  );
}
