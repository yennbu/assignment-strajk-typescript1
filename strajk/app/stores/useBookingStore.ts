import { create } from "zustand";

interface BookingDetails {
    when: string;
    lanes: number;
    people: number;
    shoes: number[];
    price: number;
    bookingId: string;
    active: boolean;
}

interface BookingStore {
    booking: BookingDetails | null;
    setBooking: (details: BookingDetails) => void;
}

export const useBookingStore = create<BookingStore>((set) => ({
    booking: null,
    setBooking: (details) => set({ booking: details }),
}));
