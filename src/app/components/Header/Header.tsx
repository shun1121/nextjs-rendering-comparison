import Link from "next/link";

const Header = async () => {

  return (
    <div className="flex justify-start items-center gap-4 pl-[20px] w-full bg-slate-600 h-[40px]">
      <Link href="/ssr">
        SSR
      </Link>
      <Link href="/ssg">
        SSG
      </Link>
      <Link href="/spa">
        SPA
      </Link>
    </div>
  );
};

export default Header;
