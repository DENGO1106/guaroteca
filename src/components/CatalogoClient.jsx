'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function CatalogoClient({ tragosIniciales }) {
  const [busqueda, setBusqueda] = useState('');
  const [filtroAlcohol, setFiltroAlcohol] = useState('Todos');
  
  // Filtrado instantaneo
  const tragosFiltrados = tragosIniciales.filter(trago => {
    const coincideTexto = trago.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideAlcohol = filtroAlcohol === 'Todos' || 
      (filtroAlcohol === 'Con' && trago.alcoholico === 'Alcoholic') ||
      (filtroAlcohol === 'Sin' && trago.alcoholico !== 'Alcoholic');
    
    return coincideTexto && coincideAlcohol;
  });

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-12 pt-6">
      <header className="mb-8 md:mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600 mb-4">
          Catálogo Completo
        </h1>
        <p className="text-slate-400">Encontrá tu bebida ideal entre más de 400 recetas.</p>
      </header>

      {/* Controles de Búsqueda y Filtros - Optimizados para Celular */}
      <div className="flex flex-col md:flex-row gap-4 mb-10 bg-slate-900/60 p-4 md:p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div className="w-full md:flex-1 relative">
          <span className="absolute left-4 top-3 text-slate-500">🔍</span>
          <input 
            type="text" 
            placeholder="Buscar trago (ej. Margarita)..." 
            className="w-full bg-slate-950/50 border border-slate-700 text-white pl-12 pr-4 py-3 rounded-2xl focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <button 
            onClick={() => setFiltroAlcohol('Todos')}
            className={`whitespace-nowrap flex-1 md:flex-none px-5 py-3 rounded-2xl text-sm font-bold transition-all shadow-sm ${filtroAlcohol === 'Todos' ? 'bg-amber-500 text-slate-900' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            Todos
          </button>
          <button 
            onClick={() => setFiltroAlcohol('Con')}
            className={`whitespace-nowrap flex-1 md:flex-none px-5 py-3 rounded-2xl text-sm font-bold transition-all shadow-sm ${filtroAlcohol === 'Con' ? 'bg-rose-900 text-rose-100 ring-2 ring-rose-500/50' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            Con Alcohol
          </button>
          <button 
            onClick={() => setFiltroAlcohol('Sin')}
            className={`whitespace-nowrap flex-1 md:flex-none px-5 py-3 rounded-2xl text-sm font-bold transition-all shadow-sm ${filtroAlcohol === 'Sin' ? 'bg-emerald-900 text-emerald-100 ring-2 ring-emerald-500/50' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            Sin Alcohol
          </button>
        </div>
      </div>

      {/* Galeria */}
      {tragosFiltrados.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-slate-800/50">
          <p className="text-2xl text-slate-400 mb-2">🍹</p>
          <p className="text-lg text-slate-400 font-medium">No se encontraron tragos con esa búsqueda</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {tragosFiltrados.map(trago => (
            <Link href={`/trago/${trago.id}`} key={trago.id}>
              <article className="h-full bg-slate-900/50 backdrop-blur-sm rounded-3xl overflow-hidden hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 border border-slate-800 flex flex-col cursor-pointer group">
                <div className="relative aspect-square w-full bg-slate-800 overflow-hidden">
                  <img 
                    src={trago.imagenLocal} 
                    alt={trago.nombre}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                  />
                  {trago.esTico && (
                    <div className="absolute top-3 right-3 bg-red-600/95 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-xl">
                      🇨🇷 Tico
                    </div>
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <h2 className="text-lg font-bold text-slate-100 leading-tight mb-3 group-hover:text-amber-400 transition-colors">
                    {trago.nombre}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-slate-950 text-amber-200/80 text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md border border-slate-800">
                      {trago.categoria}
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
