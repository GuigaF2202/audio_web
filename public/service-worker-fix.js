// Service Worker para lidar com erros de fetch
self.addEventListener('install', event => {
  self.skipWaiting();
  console.log('Service worker instalado com sucesso');
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
  console.log('Service worker ativado com sucesso');
});

self.addEventListener('fetch', event => {
  // Não interceptar requisições para o próprio service worker ou para o HMR do Vite
  if (event.request.url.includes('service-worker-fix.js') || 
      event.request.url.includes('__vite_hmr') ||
      event.request.url.includes('/@vite/')) {
    return;
  }

  // Verificar se a solicitação é para uma imagem de placeholder
  if (event.request.url.includes('placeholder.com')) {
    event.respondWith(
      fetch('/assets/placeholder.svg')
        .catch(() => {
          // Fallback para SVG inline caso o arquivo não seja encontrado
          return new Response(
            `<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
              <rect width="300" height="300" fill="#f0f0f0"/>
              <text x="50%" y="50%" fill="#999" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif">Imagem</text>
            </svg>`,
            { headers: { 'Content-Type': 'image/svg+xml' } }
          );
        })
    );
  } else {
    // Para outras solicitações, usar a estratégia padrão com tratamento de erros melhorado
    event.respondWith(
      fetch(event.request)
        .catch(error => {
          console.log('Falha na solicitação de rede:', error);
          
          // Se for uma solicitação de imagem, retornar uma imagem de fallback
          if (event.request.destination === 'image') {
            return fetch('/assets/placeholder.svg')
              .catch(() => {
                // Fallback para SVG inline caso o arquivo não seja encontrado
                return new Response(
                  `<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
                    <rect width="300" height="300" fill="#f0f0f0"/>
                    <text x="50%" y="50%" fill="#999" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif">Imagem</text>
                  </svg>`,
                  { headers: { 'Content-Type': 'image/svg+xml' } }
                );
              });
          }
          
          // Para outros recursos, retornar uma mensagem de offline
          return new Response('Falha na solicitação de rede. O aplicativo está funcionando no modo offline.');
        })
    );
  }
}); 