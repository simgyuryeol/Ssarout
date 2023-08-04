const sassPlugin = require('@es-pack/esbuild-sass-plugin');

const esbuild = require('esbuild');
const plugins = [sassPlugin.sassPlugin()];

const options = {
    entryPoints: ['src/index.js'],
    bundle: true,
    outdir: 'dist',
    minify: true,
    platform: 'browser',
    plugins,
};

let watch = false;

if (process.argv.includes('watch')) {
    options.sourcemap = 'external';
    options.watch = {
        onRebuild(err, result) {
            if (err) console.error('Watch build failed', err);
            else console.log('watch build success', result);
        }
    }
    watch = true;
}

if (process.argv.includes('serve')) {
    options.sourcemap = 'inline';
    esbuild.serve({
        servedir: __dirname,
    }, options).then(result => {
        const { host, port } = result;

        console.log('server is running', host, port);
    });
} else {
    esbuild.build(options).then(result => {
        if (watch) {
            console.log('watching...');
        }
    });
}