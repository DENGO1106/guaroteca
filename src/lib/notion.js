export async function getTragos() {
  const databaseId = process.env.NOTION_DATABASE_ID;
  const token = process.env.NOTION_TOKEN;

  if (!databaseId || !token) {
    console.error("Faltan variables de entorno de Notion");
    return [];
  }

  const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    // Apagamos la caché para desarrollo. Cada vez que refrescás la página web, pide datos frescos.
    cache: 'no-store' 
  });

  if (!response.ok) {
    console.error("Error consultando Notion:", await response.text());
    return [];
  }

  const data = await response.json();
  
  return data.results.map(page => {
    const props = page.properties;
    const idOrig = props.ID_Original?.number || null;
    
    let nombre = 'Sin Nombre';
    if (props.Nombre?.title?.length > 0) {
      nombre = props.Nombre.title[0].text.content;
    }
    
    // Ahora busca la foto puramente por el ID (ej: 11007.jpg), es a prueba de balas.
    const localImage = idOrig ? `/cocktails/${idOrig}.jpg` : '/placeholder.jpg';

    return {
      id: page.id,
      nombre: nombre,
      categoria: props.Categoria?.select?.name || 'Otro',
      alcoholico: props.Alcoholico?.select?.name || 'Alcoholic',
      esTico: props.Es_Tico?.checkbox || false,
      imagenLocal: localImage,
    };
  });
}

// Nueva funcion para traer UN SOLO trago por su ID
export async function getTrago(pageId) {
  const token = process.env.NOTION_TOKEN;

  const response = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Notion-Version': '2022-06-28',
    },
    cache: 'no-store'
  });

  if (!response.ok) return null;
  const page = await response.json();
  const props = page.properties;
  const idOrig = props.ID_Original?.number || null;
  
  let nombre = 'Sin Nombre';
  if (props.Nombre?.title?.length > 0) {
    nombre = props.Nombre.title[0].text.content;
  }
  
  // Función de ayuda para extraer texto largo de Notion
  const extraerTexto = (prop) => {
    if (!prop || !prop.rich_text) return '';
    return prop.rich_text.map(t => t.text.content).join('');
  };

  return {
    id: page.id,
    nombre: nombre,
    categoria: props.Categoria?.select?.name || 'Otro',
    alcoholico: props.Alcoholico?.select?.name || 'Alcoholic',
    vaso: extraerTexto(props.Vaso),
    ingredientes: extraerTexto(props.Ingredientes),
    instrucciones: extraerTexto(props.Instrucciones),
    esTico: props.Es_Tico?.checkbox || false,
    imagenLocal: idOrig ? `/cocktails/${idOrig}.jpg` : '/placeholder.jpg',
  };
}
