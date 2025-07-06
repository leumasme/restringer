import { defineConfig } from 'vite';
import inject from '@rollup/plugin-inject';
import { resolve } from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export default defineConfig(async () => {
	const { default: stdLibBrowser } = await import('node-stdlib-browser');
	const esbuildShim = resolve(
		require.resolve('node-stdlib-browser/helpers/esbuild/shim')
	);

	return {
		define: {
			__VERSION__: JSON.stringify('2.0.7'),
		},
		resolve: {
			alias: stdLibBrowser,
		},
		optimizeDeps: {
			include: ['buffer', 'process'],
		},
		plugins: [
			{
				...inject({
					global: [esbuildShim, 'global'],
					process: [esbuildShim, 'process'],
					Buffer: [esbuildShim, 'Buffer'],
				}),
				enforce: 'post',
			},
		],
		build: {
			lib: {
				entry: resolve(__dirname, 'index.js'),
				name: 'restringer',
				fileName: (format) => `restringer.${format}.js`,
				formats: ['es'],
			},
			rollupOptions: {
				// external: ['flast', 'obfuscation-detector'],
			},
		},
	};
});