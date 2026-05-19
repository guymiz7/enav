import { asset } from "@/lib/asset";

export function Topbar() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      {/* subtle gradient strictly to keep the logo legible against bright frames */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/55 to-transparent"
      />
      <div className="relative mx-auto flex h-16 max-w-[480px] items-center justify-center px-5">
        <img
          src={asset("/media/logo.png")}
          alt="ENAV"
          className="pointer-events-auto h-10 w-auto"
          style={{ filter: "brightness(0) invert(1)" }}
        />
      </div>
    </header>
  );
}
