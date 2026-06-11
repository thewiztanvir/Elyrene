export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
      <div className="max-w-3xl rounded-3xl border border-slate-700 bg-slate-900/80 p-10 shadow-2xl shadow-slate-950/30 backdrop-blur-sm">
        <h1 className="text-4xl font-semibold text-white">Elyrene</h1>
        <p className="mt-4 text-lg text-slate-300">
          Welcome to your Next.js + TypeScript + Tailwind boilerplate.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-700 bg-slate-950/80 p-5">
            <h2 className="text-xl font-semibold">Run</h2>
            <p className="mt-2 text-slate-400">npm run dev</p>
          </div>
          <div className="rounded-2xl border border-slate-700 bg-slate-950/80 p-5">
            <h2 className="text-xl font-semibold">Build</h2>
            <p className="mt-2 text-slate-400">npm run build</p>
          </div>
          <div className="rounded-2xl border border-slate-700 bg-slate-950/80 p-5">
            <h2 className="text-xl font-semibold">Start</h2>
            <p className="mt-2 text-slate-400">npm run start</p>
          </div>
        </div>
      </div>
    </main>
  );
}
