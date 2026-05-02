import Image from "next/image";
import Topka from "../components/layout/topka";
import { Inter } from 'next/font/google';

import Drabinka from "../components/drabinka/rodzic";
const inter = Inter({ subsets: ['latin'] });


export default function Home() {
  return (
    <div className={inter.className}>
      <main>
   <Drabinka />
      </main>
    </div>
  );
}
