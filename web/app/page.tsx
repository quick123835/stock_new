import { platform } from "@stock-new/shared";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-4xl font-semibold tracking-tight">買賣力道基地</h1>
      <p className="text-zinc-500">台灣股市買賣壓力分析工具</p>
      <p className="font-mono text-sm text-zinc-400">platform: {platform}</p>
    </main>
  );
}
