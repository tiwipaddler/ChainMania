"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./DemoComponents";
import { useOpenUrl } from "@coinbase/onchainkit/minikit";
import { sdk } from '@farcaster/frame-sdk';

// Placeholder quiz data
const quizQuestions = [
  {
    token: "USDT",
    options: ["Ethereum", "Solana", "Polygon", "Avalanche"],
    answer: "Ethereum",
  },
  {
    token: "SOL",
    options: ["Ethereum", "Solana", "Binance Smart Chain", "Arbitrum"],
    answer: "Solana",
  },
  {
    token: "MATIC",
    options: ["Polygon", "Ethereum", "Optimism", "Base"],
    answer: "Polygon",
  },
  {
    token: "UNI",
    options: ["Ethereum", "Solana", "Polygon", "Fantom"],
    answer: "Ethereum",
  },
  {
    token: "BNB",
    options: ["Binance Smart Chain", "Ethereum", "Solana", "Avalanche"],
    answer: "Binance Smart Chain",
  },
  {
    token: "OP",
    options: ["Optimism", "Ethereum", "Polygon", "Solana"],
    answer: "Optimism",
  },
  {
    token: "ARB",
    options: ["Arbitrum", "Ethereum", "Polygon", "Solana"],
    answer: "Arbitrum",
  },
  {
    token: "AVAX",
    options: ["Avalanche", "Ethereum", "Polygon", "Solana"],
    answer: "Avalanche",
  },
  {
    token: "BASE",
    options: ["Base", "Ethereum", "Polygon", "Solana"],
    answer: "Base",
  },
  {
    token: "FTM",
    options: ["Fantom", "Ethereum", "Polygon", "Solana"],
    answer: "Fantom",
  },
];

const QuizGame: React.FC = () => {
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const openUrl = useOpenUrl();

  const handleAnswer = (option: string) => {
    setSelected(option);
    if (option === quizQuestions[current].answer) {
      setScore((prev) => prev + 1);
    }
    setTimeout(() => {
      if (current < quizQuestions.length - 1) {
        setCurrent((prev) => prev + 1);
        setSelected(null);
      } else {
        setShowResult(true);
      }
    }, 700);
  };

  const handleShare = () => {
    // Example: share score via Farcaster (replace with actual sharing logic if available)
    const shareText = `I scored ${score}/10 in the Blockchain Token Quiz! Can you beat me?`;
    openUrl(
      `https://warpcast.com/compose?text=${encodeURIComponent(shareText)}`
    );
  };

  if (showResult) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-6">
        <h2 className="text-2xl font-bold">Quiz Complete!</h2>
        <p className="text-lg">Your score: <span className="font-semibold">{score} / 10</span></p>
        <Button onClick={handleShare} variant="primary">
          Share on Farcaster
        </Button>
      </div>
    );
  }

  const q = quizQuestions[current];

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-6">
      <div className="w-full max-w-md bg-white/10 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-2">Question {current + 1} of 10</h2>
        <p className="mb-4 text-lg">
          Which blockchain is the <span className="font-bold">{q.token}</span> token deployed on?
        </p>
        <div className="flex flex-col space-y-2">
          {q.options.map((option) => (
            <Button
              key={option}
              onClick={() => handleAnswer(option)}
              disabled={!!selected}
              variant={
                selected
                  ? option === q.answer
                    ? "primary"
                    : option === selected
                    ? "secondary"
                    : "ghost"
                  : "outline"
              }
              className="w-full"
            >
              {option}
            </Button>
          ))}
        </div>
        {selected && (
          <div className="mt-4 text-center">
            {selected === q.answer ? (
              <span className="text-green-600 font-medium">Correct!</span>
            ) : (
              <span className="text-red-600 font-medium">Incorrect. The answer is {q.answer}.</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizGame; 