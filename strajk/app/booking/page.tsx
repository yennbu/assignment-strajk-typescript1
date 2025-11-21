'use client';
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import "./booking.css"
import "../globals.css"

import Menu from "../components/menu";
import { useBookingStore } from "../stores/useBookingStore";

interface Request {
    when: string,
    lanes: number,
    people: number,
    shoes: number[]
};

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export default function Booking() {
    const router = useRouter();

    const [lanes, setLanes] = useState<number>(0);
    const [people, setPeople] = useState<number>(0);
    const [shoes, setShoes] = useState<number[]>([]);
    const [date, setDate] = useState<string>("");
    const [time, setTime] = useState<string>("");

    const setBooking = useBookingStore((state) => state.setBooking);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (date === "" || time === "") {
            alert("Please enter date, and time");
            return;
        }

        if (people === 0 || lanes === 0) {
            alert("Please fill in bowlers and lanes");
            return;
        }

        if (shoes.length > people) {
            alert("Maximum of one pair of shoes per player");
            return;
        }

        if (people / lanes > 4) {
            alert("Maximum 4 players per lane");
            return;
        }

        if (lanes > people) {
            alert("You cannot book more lanes than players");
            return;
        }

        if (!apiKey) {
            alert("API key is not configured. Please check your environment variables.");
            console.error("NEXT_PUBLIC_API_KEY is undefined");
            return;
        }

        const data: Request = {
            when: `${date}T${time}`,
            lanes: Number(lanes),
            people: Number(people),
            shoes
        }

        try {
            const response: Response = await fetch("https://731xy9c2ak.execute-api.eu-north-1.amazonaws.com/booking",
                {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': apiKey,
                    }
                });

            const result = await response.json();

            if (result.success == true) {
                setBooking(result.bookingDetails);
                router.push('/confirm');
            } else {
                return alert("Booking failed, try again!");
            };

        } catch (error) {
            console.error("Error booking: ", error);
            alert("Error sending booking!");
        }
    };

    const addShoe = () => {
        setShoes([...shoes, 38]);
    };

    const removeShoe = (index: number) => {
        setShoes(shoes.filter((_, i) => i !== index));
    };

    const updateShoeSize = (index: number, size: number) => {
        const updatedShoes = [...shoes];
        updatedShoes[index] = size;
        setShoes(updatedShoes);
    };

    return (
        <div className="booking-container">
            <Image
                src="/logo.png"
                width={100}
                height={100}
                alt="Bowling ball on fire"
                className="strajk-logo--booking"
            ></Image>
            <h1 className="title h1">BOOKING</h1>
            <h2 className="title--booking h2">WHEN, WHAT & WHO</h2>
            <form action="" className="booking__form" onSubmit={handleSubmit}>
                <div className="bookin__form--when">
                    <input
                        type="date"
                        className="form__input date"
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <input
                        type="time"
                        className="form__input time"
                        onChange={(e) => setTime(e.target.value)}
                    />
                </div>
                <div className="booking__form--what">
                    <h3 className="h3">Bowlers</h3>
                    <input
                        type="number"
                        min="0"
                        value={people}
                        onChange={(e) => setPeople(Number(e.target.value))}
                        className="form__input"
                    />
                    <h3 className="h3">Lanes</h3>
                    <input
                        type="number"
                        min="0"
                        value={lanes}
                        onChange={(e) => setLanes(Number(e.target.value))}
                        className="form__input"
                    />
                </div>
                <div className="shoes-container">
                    <h3 className="title--booking h3">SHOES</h3>
                    <ul className="shoes__list">
                        {shoes.map((size, index) => (
                            <li key={index} className="shoes__item">
                                <input
                                    type="number"
                                    className="shoes__size"
                                    value={size}
                                    onChange={(e) => updateShoeSize(index, Number(e.target.value))}
                                    min="20"
                                    max="50"
                                />
                                <button
                                    type="button"
                                    className="shoes__remove-btn"
                                    onClick={() => removeShoe(index)}
                                >
                                    -
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button
                        className="shoes__add-btn"
                        onClick={addShoe}
                        type="button"
                    >+</button>
                </div>
                <button className="booking__btn" type="submit">STRIKE</button>
            </form>
            <Menu />
        </div>
    )
}