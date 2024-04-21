import fs from 'node:fs/promises';
import express from 'express';
import middleware from 'i18next-http-middleware';
import i18next from './src/i18n/config.ts';
import device from 'express-device';
// Constants
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5173;
const base = process.env.BASE || '/';

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : '';
const ssrManifest = isProduction
  ? await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8')
  : undefined;

// Create http server
const app = express();
app.use(middleware.handle(i18next));
app.use(device.capture());
// Add Vite or respective production middlewares
let vite;
if (!isProduction) {
  const { createServer } = await import('vite');
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import('compression')).default;
  const sirv = (await import('sirv')).default;
  app.use(compression());
  app.use(base, sirv('./dist/client', { extensions: [] }));
}

// Serve HTML
app.use('*', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '');

    let template;
    let render;
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      if (req.device.type === 'phone') {
        template = await fs.readFile('./index-mobile.html', 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        // Рендерим страницу для мобильных устройств
        render = (await vite.ssrLoadModule('/src/entry-server-mobile.tsx'))
          .render;
      } else {
        // Рендерим обычную страницу
        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
      }
    } else {
      template = templateHtml;
      render = (await import('./dist/server/entry-server.js')).render;
    }
    const userLang = 'fr'; // Устанавливаем язык на французский
    // const userLang = req.language; // Получаем язык пользователя
    req.language = 'fr';
    const rendered = await render(userLang, url, ssrManifest);

    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '');

    res
      .status(200)
      // .set({ 'Content-Type': 'text/html' })
      .set({ 'Content-Type': 'text/html', 'Content-Language': 'fr' })
      .send(html);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
