"use client";
import { Klee_One } from "next/font/google";

const KleeOneFont = Klee_One({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main>
      <div>
        <p className={KleeOneFont.className}>sadasこん追憶にちはsd</p>
      </div>
      <button>check</button>
    </main>
  );
}
