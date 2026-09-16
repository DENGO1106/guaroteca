import { getTragos } from '@/lib/notion';
import CatalogoClient from '@/components/CatalogoClient';
export const runtime = 'edge';

export default async function CatalogoPage() {
  const tragos = await getTragos();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <CatalogoClient tragosIniciales={tragos} />
    </main>
  );
}
