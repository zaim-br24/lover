"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HER_NAME = "Awicha"; // 👉 change this later

type Step = {
  image: string;
  question: string;
  yesReaction: string;
  noReaction: string;
};

const steps: Step[] = [
  {
    image: "/images/1.jpg",
    question: `Do you remember how it all started, ${HER_NAME}? ✨`,
    yesReaction: "That beginning still lives inside me ❤️",
    noReaction: "Even if it faded for you… I still remember every detail 💭",
  },
  {
    image: "/images/2.jpg",
    question:
      "Do you remember our night walks… when the world felt quiet just for us? 🌙",
    yesReaction: "Those nights felt like home 🤍",
    noReaction: "I still walk those memories alone sometimes… thinking of you",
  },
  {
    image: "/images/3.jpg",
    question:
      "Do you remember how we shared the smallest things… like they meant everything? ☕",
    yesReaction: "Those little moments were my whole world ❤️",
    noReaction: "Maybe they were small… but they were everything to me",
  },
  {
    image: "/images/4.jpg",
    question:
      "Do you remember how we tried new things together… like we were discovering life? 🌍",
    yesReaction: "Every experience was better with you by my side 🤍",
    noReaction: "I wish I could relive those first moments again… with you",
  },
  {
    image: "/images/5.jpg",
    question:
      "Do you remember how we loved each other… in our own imperfect way? ❤️",
    yesReaction: "That love was real… no matter what happened",
    noReaction: "Even if it didn’t feel perfect… it was real to me",
  },
  {
    image: "/images/6.jpg",
    question:
      "Do you remember the way we used to hug each other… like we didn’t want to let go? 🤍",
    yesReaction: "I still miss that feeling… more than anything",
    noReaction: "I guess I was the one holding on tighter…",
  },
  {
    image: "/images/7.jpg",
    question:
      "Do you remember how we were always there for each other… no matter what? 🫶",
    yesReaction: "That support meant everything to me ❤️",
    noReaction: "I wish I had been better for you… truly",
  },
  {
    image: "/images/8.jpg",
    question: "Do you remember how we dreamed about our future together? 🌅",
    yesReaction: "Those dreams still live in my heart 🤍",
    noReaction: "I still think about what could’ve been…",
  },
  {
    image: "/images/9.jpg",
    question: `Do you remember when we talked about our children… Abir & Joud? 👶`,
    yesReaction: "Those dreams felt so real to me ❤️",
    noReaction: "Maybe they were just dreams… but they meant everything",
  },
  {
    image: "/images/10.jpg",
    question: "Do you remember the places we wanted to travel together? ✈️",
    yesReaction: "I still imagine those trips… with you 🤍",
    noReaction: "I still hope one day… somehow…",
  },
  {
    image: "/images/11.jpg",
    question: "Do you remember laughing until nothing else mattered? 😂",
    yesReaction: "That laughter was my happiness ❤️",
    noReaction: "I wish I could hear that laugh again…",
  },
  {
    image: "/images/12.jpg",
    question: "Do you think what we had… was something special? ✨",
    yesReaction: "I knew it… it wasn’t just me 🤍",
    noReaction: "Even if you doubt it… I never did",
  },
  {
    image: "/images/13.jpg",
    question: "Do you believe people can grow… and love better? 🌱",
    yesReaction: "Then maybe there’s still hope for us ❤️",
    noReaction: "I understand… but I’m still trying",
  },
  {
    image: "/images/14.jpg",
    question: `Be honest… do you still feel something, ${HER_NAME}? 🤍`,
    yesReaction: "Then maybe this isn’t the end ❤️",
    noReaction: "Even if it’s gone for you… my love is still here",
  },
];

const finalMessage = `
Zin dyali… hado some memories but I hope they remind you of the love we shared.

No matter what you answered… yes or no…

I didn’t create this to change your mind.
I created this to remind you of what we had.

Because for me… it was real.
Every moment. Every laugh. Every dream.

I know we weren’t perfect.
But what we had… was something people search for their whole life.

And maybe… just maybe…
somewhere deep inside you…

there’s still a small piece of us 🤍

I’m not asking for the past back.
I’m just asking for a chance…

to build something better.

Kanbghik bzaf, Hobino

– Me ❤️
`;
export default function Home() {
  const [index, setIndex] = useState(0);
  const [reaction, setReaction] = useState("");
  const [showReaction, setShowReaction] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 🎵 Auto play music (after user interaction)
  useEffect(() => {
    const playMusic = () => {
      audioRef.current?.play().catch(() => {});
      window.removeEventListener("click", playMusic);
    };

    window.addEventListener("click", playMusic);

    return () => window.removeEventListener("click", playMusic);
  }, []);

  const current = steps[index];

  const handleAnswer = (type: "yes" | "no") => {
    const text = type === "yes" ? current.yesReaction : current.noReaction;

    setReaction(text);
    setShowReaction(true);

    setTimeout(() => {
      setShowReaction(false);
      setIndex((prev) => prev + 1);
    }, 2200);
  };

  // 💔 FINAL SCREEN
  if (index >= steps.length) {
    return (
      <div className="h-screen flex items-center justify-center bg-[rgb(28,28,26)] text-white px-6 text-center">
        <audio ref={audioRef} src="/music/love.mp3" loop />

        <div className="max-w-xl">
          <h1 className="text-4xl font-bold mb-6">{HER_NAME}…</h1>

          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            &${finalMessage}
          </p>

          <button className="bg-[rgb(235,168,61)] text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
            Do you want to try again… with me?
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center bg-[rgb(28,28,26)] px-4">
      {/* 🎵 Hidden Audio */}
      <audio ref={audioRef} src="/music/love.mp3" loop />

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
        >
          {/* IMAGE */}
          <img src={current.image} className="w-full object-cover" />

          {/* CONTENT */}
          <div className="p-6 text-center">
            <h2 className="text-xl font-semibold text-amber-500 mb-6">{current.question}</h2>

            {showReaction && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4 text-gray-500 italic"
              >
                {reaction}
              </motion.p>
            )}

            {!showReaction && (
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => handleAnswer("yes")}
                  className="bg-green-400 text-white px-5 py-2 rounded-lg hover:scale-105 transition"
                >
                  Yes
                </button>

                <button
                  onClick={() => handleAnswer("no")}
                  className="bg-red-400 text-white px-5 py-2 rounded-lg hover:scale-105 transition"
                >
                  No
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
