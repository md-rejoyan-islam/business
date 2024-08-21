import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-full w-full  grid place-content-center">
      <Image
        src={"/not_found.gif"}
        alt="Not Found"
        width={400}
        height={400}
        className="px-10"
      />
      <p className="text-center md:text-2xl text-xl py-2">Page Not Found!</p>
    </div>
  );
}
