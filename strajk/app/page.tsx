import Image from "next/image";
import Menu from "./components/menu";

export default function Home() {
  return (
    <div >
      <main>
        <div className="home-container">

          <Image
            src="/logo.png"
            width={200}
            height={200}
            alt="Picture of a bowlingball on fire"
            className="strajk-logo"
          ></Image>
          <div className="home__title">
            <h1 className="title h1">STRAJK</h1>
            <h2 className="title h2">BOWLING</h2>
          </div>
          <Menu />
        </div>
      </main>
    </div>
  );
}
