import Image from "next/image";

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/logo_fortal.png"
        alt="Logo da Fortal Connect"
        width={100}
        height={40}
        className="h-10 w-full object-contain"
      />
    </div>
  );
}
