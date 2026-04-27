import FirstCallForm from '@/components/FirstCallForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-black p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 border-b border-zinc-800 pb-4">
          <h1 className="text-4xl font-bold text-white tracking-tighter">Sovereign Funeral SaaS</h1>
          <p className="text-zinc-500 mt-2">Director Dashboard v1.0</p>
        </header>
        
        <FirstCallForm />
      </div>
    </main>
  );
}
