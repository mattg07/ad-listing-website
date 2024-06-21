"use client";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import { signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Header({ session }: { session: Session | null }) {
  const [showDropDown, setShowDropDown] = useState(false);
  const router = useRouter();
  return (
    <header className="flex justify-between border-b p-4 items-center">
      <Link href="/" className="text-blue-600 text-xl font-bold">
        Marketplace
      </Link>
      <nav className="flex gap-4  *:rounded  ">
        <span className="border-r"></span>
        {!session?.user && (
          <>
            {" "}
            <button
              onClick={() => signIn("google")}
              className=" bg-blue-600 text-white border-0 px-6 py-1"
            >
              Login
            </button>
            <button onClick={() => signIn("google")} className="border px-6">Register</button>
          </>
        )}
        {session?.user && (
          <div className="relative flex items center justify-center">
            <Link href="/new">
              {" "}
              <button className=" border text-blue-600 border-blue-600 inline-flex items-center mt-1 gap-1 px-3 mr-4">
                <AddIcon></AddIcon>
                Create new ad
              </button>{" "}
            </Link>{" "}
            <button onClick={() => setShowDropDown((prev) => !prev)}>
              <Image
                width={35}
                height={35}
                src={session.user.image as string}
                alt={"avatar"}
                className={
                  "rounded-lg relative " + (showDropDown ? "z-50" : "")
                }
              />
            </button>
            {showDropDown && (
              <>
                <div
                  onClick={() => setShowDropDown(false)}
                  className="bg-black/90 fixed inset-0 z-40"
                ></div>
                <div className="absolute z-50 right-0 top-9 w-24 bg-white rounded-md">
                  <button
                    onClick={() => {
                      setShowDropDown(false);
                      router.push("/my-ads");
                    }}
                    className="p-2  text-center block w-full"
                  >
                    My ads
                  </button>

                  <button
                    onClick={() => signOut()}
                    className="p-2  text-center block w-full"
                  >
                    Logout
                  </button>
                </div>{" "}
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
