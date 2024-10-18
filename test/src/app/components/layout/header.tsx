import Link from "next/link";

export default function Header (){
    return(
        <div>
            <Link href="/client/addProduct" className="text-black">
            <div>sell</div>
            </Link>
        </div>
    )
}