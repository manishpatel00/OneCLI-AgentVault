import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex h-svh flex-col items-center justify-center gap-4">
      <div className="flex items-center gap-2">
        <Image
          src="/agentvault-logo.png"
          alt="AgentVault"
          width={32}
          height={32}
        />
        <span className="font-bold text-xl tracking-tight">
          Onecli-AgentVault
        </span>
      </div>
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="text-muted-foreground text-sm">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="text-brand text-sm underline underline-offset-4"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
