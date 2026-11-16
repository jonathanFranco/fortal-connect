export default function Logo({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  const common = {
    width: 480,
    height: 165,
    decoding: "async" as const,
    loading: priority ? ("eager" as const) : ("lazy" as const),
    fetchPriority: priority ? ("high" as const) : undefined,
  };
  return (
    <>
      <img
        {...common}
        src="/logo-dark.png"
        alt="Fortal Connect — Informática e Segurança Eletrônica"
        className={`hidden object-contain dark:block ${className}`}
      />
      <img
        {...common}
        src="/logo-light.png"
        alt="Fortal Connect — Informática e Segurança Eletrônica"
        className={`object-contain dark:hidden ${className}`}
      />
    </>
  );
}
