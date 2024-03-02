import postcss from 'rollup-plugin-postcss';

export default {
    input: 'src/main.js',
    output: {
        file: 'build/bundle.js',
        format: 'cjs'
    },
    plugins: [postcss({
        extensions: ['.css'],
    })]
};