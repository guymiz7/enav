import { asset } from "@/lib/asset";

export function Topbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-black/85 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[480px] items-center justify-center px-5">
        <img
          src={asset("/media/logo.png")}
          alt="ENAV"
          className="h-7 w-auto"
          style={{ filter: "brightness(0) invert(1)" }}
        />
      </div>
    </header>
  );
}
