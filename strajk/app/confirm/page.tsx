'use client';
import Image from "next/image";
import {useRouter} from "next/navigation";

import "./confirm.css";
import "../globals.css";

import { useBookingStore } from "../stores/useBookingStore";
import Menu from "../components/menu";

export default function Confirm() {
    const router = useRouter();
    const booking = useBookingStore((state) => state.booking);

    if (!booking) {
        return  <div className="no-booking"><p>No booking found ... :(</p> <Menu/></div>
    }

    function formatBookingDate(when: string) {
    const date = new Date(when);

    const formatted = date.toLocaleString("sv-SE", {
        hour: "2-digit",
        minute: "2-digit",
        day: "numeric",
        month: "short",
    });

    // Detta ger t.ex. "3 februari 2025 19:30"
    return formatted.replace(".", ",");
}

const formatted = formatBookingDate(booking.when);

    const shortId = booking.bookingId.slice(0, 8);

    return (
        <div className="confirm-container">
            <Image
                src="/logo.png"
                width={100}
                height={100}
                alt="Bowling ball on fire"
                className="strajk-logo--confirm"
            ></Image>
            <h1 className="title h1">SEE YOU SOON!</h1>
            <h2 className="title--confirm h2">BOOKING DETAILS</h2>
            <form action="" className="confirm__form" >
                <div className="confirm__form--what">
                    <h3 className="h3">When</h3>
                    <p className="confirm__detail">{formatted} </p>
                    <h3 className="h3">Who</h3>
                    <p className="confirm__detail">{booking.people} pers</p>
                    <h3 className="h3">Lanes</h3>
                    <p className="confirm__detail">{booking.lanes}</p>
                    <h3 className="h3">Booking number</h3>
                    <p className="confirm__detail">{shortId}</p>
                </div>
                <div className="confirm__total">
                    <p className="confirm__total--bold">Total</p><p>{booking.price}sek</p>
                </div>
                <button className="confirm__btn" type="button" onClick={() => router.push('/')}>SWEET, LET'S GO!</button>
            </form>
            <Menu />
        </div>
    );
}