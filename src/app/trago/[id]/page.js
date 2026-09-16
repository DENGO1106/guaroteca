import { getTrago } from '@/lib/notion';
import Link from 'next/link';
export const runtime = 'edge';

export default async function TragoDetalle({ params }) {
  // Sacamos el ID que viene en la URL
  const { id } = await params;
  const trago = await getTrago(id);

  if (!trago) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <h1 className="text-2xl">Trago no encontrado 🥃</h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        
        {/* Boton volver */}
        <Link 
          href="/" 
          className="inline-flex items-center text-amber-400 hover:text-amber-300 mb-8 font-medium transition-colors"
        >
          ← Volver a la galería
        </Link>

        <div className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col md:flex-row">
          
          {/* Lado Izquierdo: Imagen */}
          <div className="w-full md:w-1/2 relative bg-slate-800 aspect-square md:aspect-auto">
            <img 
              src={trago.imagenLocal} 
              alt={trago.nombre} 
              className="object-cover w-full h-full"
            />
            {trago.esTico && (
              <div className="absolute top-4 left-4 bg-red-600/90 backdrop-blur text-white font-bold px-4 py-2 rounded-full shadow-lg">
                🇨🇷 Orgullo Tico
              </div>
            )}
          </div>

          {/* Lado Derecho: Detalles */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
            
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-extrabold text-amber-500 mb-4">{trago.nombre}</h1>
              
              <div className="flex flex-wrap gap-3">
                <span className="bg-slate-800 text-amber-200 px-3 py-1.5 rounded-lg text-sm font-semibold">
                  {trago.categoria}
                </span>
                <span className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${
                  trago.alcoholico === 'Alcoholic' ? 'bg-rose-950 text-rose-300' : 'bg-emerald-950 text-emerald-300'
                }`}>
                  {trago.alcoholico === 'Alcoholic' ? 'Contiene Alcohol' : 'Sin Alcohol'}
                </span>
                {trago.vaso && (
                  <span className="bg-indigo-950 text-indigo-300 px-3 py-1.5 rounded-lg text-sm font-semibold">
                    🍸 {trago.vaso}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-8 flex-1">
              {/* Ingredientes */}
              <section>
                <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                  <span>🛒</span> Ingredientes
                </h2>
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
                  <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                    {trago.ingredientes || 'No hay ingredientes especificados.'}
                  </p>
                </div>
              </section>

              {/* Instrucciones */}
              <section>
                <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                  <span>📜</span> Preparación
                </h2>
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
                  <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                    {trago.instrucciones || 'Mezclar al gusto.'}
                  </p>
                </div>
              </section>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
