"use client";

import { useState } from "react";

export default function HelloWorld() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <p className="text-lg">
        Hello from your first applet! This one is <strong>always on</strong>.
      </p>
      <button
        onClick={() => setCount((c) => c + 1)}
        className="rounded-xl bg-emerald-600 px-6 py-3 font-medium text-white transition hover:bg-emerald-500"
      >
        Click me: {count}
      </button>
    </div>
  );
}
