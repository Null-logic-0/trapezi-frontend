import Link from "next/link";
import Logout from "@/components/Auth/Logout";

function Page() {
    return (
        <div className="flex flex-col items-center justify-center w-xl mx-auto gap-4">


            <h1 className="text-2xl font-bold text-gray-900">
                HOME PAGE
            </h1>

            <Logout/>

            <Link href={'/login'}>
                login
            </Link>
            <Link href={'/signup'}>
                signup
            </Link>
        </div>
    );
}

export default Page;
