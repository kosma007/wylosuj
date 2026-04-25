import Image from "next/image";
import Topka from "../components/layout/topka";
import { Inter } from 'next/font/google';
import Footer from "../components/layout/footer";
import Tarcza from "../components/tarcza/rodzic";
import Lotto from "../components/lotto/rodzic";
const inter = Inter({ subsets: ['latin'] });


export default function Home() {
  return (
    <div className={inter.className}>
      <main>
   <Lotto />
      </main>
    </div>
  );
}
