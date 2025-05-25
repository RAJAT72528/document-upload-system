import { Plugin } from 'vite';
import { promises as fs } from 'fs';
import { join } from 'path';

function resolveFilePath(urlPath: string): string {

  return join(process.cwd(), ...urlPath.split('/').filter(Boolean));
}

export function fsPlugin(): Plugin {
  return {
    name: 'vite-plugin-fs',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.startsWith('/_fs/')) {
          try {
            const [, , method, ...pathParts] = req.url.split('/');
            const filePath = resolveFilePath(pathParts.join('/'));

            if (method === 'write' && req.method === 'POST') {
              const chunks: Buffer[] = [];
              req.on('data', chunk => chunks.push(chunk));
              req.on('end', async () => {
                const buffer = Buffer.concat(chunks);

                await fs.mkdir(join(filePath, '..'), { recursive: true });
                await fs.writeFile(filePath, buffer);
                res.end('File written successfully');
              });
            } else if (method === 'delete' && req.method === 'DELETE') {
              await fs.unlink(filePath);
              res.end('File deleted successfully');
            } else if (method === 'list' && req.method === 'GET') {
              const files = await fs.readdir(filePath);
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(files));
            } else {
              next();
            }
          } catch (error) {
            console.error('File operation error:', error);
            res.statusCode = 500;
            res.end('File operation failed');
          }
        } else {
          next();
        }
      });
    }
  };
}
