import Image from "next/image";
import Topka from "../components/layout/topka";
import { Inter } from 'next/font/google';
import Footer from "../components/layout/footer";
import Tarcza from "../components/tarcza/rodzic";
import Moneta from "../components/moneta/rodzic";
import Liczby from "../components/liczby/rodzic";
const inter = Inter({ subsets: ['latin'] });


export default function Home() {
  return (
    <div className={inter.className}>
      <main>
   <Liczby />
      </main>
    </div>
  );
}
