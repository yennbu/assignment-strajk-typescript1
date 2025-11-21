'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

import "./menu.css";

export default function Menu() {
    const pathname = usePathname();

    return (
        <div className="menu-container">
            <Link href="/">
                <div className={`menu__item ${pathname === "/" ? "active" : ""}`}></div>
            </Link>

            <Link href="/booking">
                <div
                    className={`menu__item ${pathname.startsWith("/booking") ? "active" : "" }`}></div>
            </Link>

            <Link href="/confirm">
                <div
                    className={`menu__item ${pathname.startsWith("/confirm") ? "active" : ""}`}></div>
            </Link>
        </div>
    );
};