"use client";

export default function Loader() {
  const dots = [0, 1, 2];

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-t from-primary-500-50 to-primary-100 text-white">
      <div className="flex space-x-2">
        {dots.map((index) => (
          <div
            key={index}
            className="h-6 w-6 bg-primary-500-500 rounded-full animate-bounce"
            style={{ animationDelay: `${index * 0.2}s` }}
          ></div>
        ))}
      </div>
    </div>
  );
}
