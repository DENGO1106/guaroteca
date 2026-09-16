import Link from 'next/link';
export const runtime = 'edge';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col justify-center relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-amber-600/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-orange-600/20 rounded-full blur-[100px]"></div>
      
      <div className="max-w-4xl mx-auto px-6 text-center z-10">
        <div className="mb-8 inline-block">
          <span className="bg-slate-900 border border-amber-500/30 text-amber-400 text-sm font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-amber-500/10">
            Base de datos privada
          </span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-amber-300 via-amber-500 to-orange-600 mb-6 drop-shadow-sm leading-tight">
          GuaroTeca
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          El catálogo definitivo de cócteles y licores 🇨🇷. Descubrí más de 400 recetas o encontrá la inspiración para tu próxima fiesta.
        </p>
        
        <Link 
          href="/catalogo" 
          className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-black text-lg px-8 py-4 rounded-full shadow-xl shadow-orange-500/20 hover:scale-105 hover:shadow-orange-500/40 transition-all duration-300"
        >
          <span>Explorar Tragos</span>
          <span className="text-2xl">🍹</span>
        </Link>
      </div>
    </main>
  );
}
