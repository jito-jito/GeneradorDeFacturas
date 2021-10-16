const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
// para comprimir archivos css
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
// para comprimir archivos javascript
const TerserPlugin = require('terser-webpack-plugin')
// para variables de entorno
const Dotenv = require('dotenv-webpack')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: "assets/images/[hash][ext][query]"
    },    
    resolve: {
        extensions: ['.js'],
        alias: {
            // nombre del alias y direccion a la que corresponde
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@templates': path.resolve(__dirname, 'src/templates'),
            '@styles': path.resolve(__dirname, 'src/styles'),
            '@images': path.resolve(__dirname, 'src/assets/images'),

        }
    },
    mode: 'development',
    module: {
        rules:
        // reglas para trabajar con diferentes tipos de archivos
        [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.s?[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test:  /\.png/,
                type: 'asset/resource'
            },
            {
                test:  /\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        // Habilita o deshabilita la transformación de archivos en base64.
                        limit: 10000,
                        // Especifica el tipo MIME con el que se alineará el archivo. 
                        // Los MIME Types (Multipurpose Internet Mail Extensions)
                        // son la manera standard de mandar contenido a través de la red.
                        mimetype: "application/font-woff",
                        // EL NOMBRE INICIAL DEL ARCHIVO + SU EXTENSIÓN
                        // PUEDES AGREGARLE [name]hola.[ext] y el output del archivo seria 
                        // ubuntu-regularhola.woff
                        name: "[name].[contenthash].[ext]",
                        // EL DIRECTORIO DE SALIDA (SIN COMPLICACIONES)
                        outputPath: "./assets/fonts/",
                        // EL DIRECTORIO PUBLICO (SIN COMPLICACIONES)
                        publicPath:  "../assets/fonts/",
                        // AVISAR EXPLICITAMENTE SI ES UN MODULO
                        esModule: false,
                    }
                }
            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // inyecta todos los activos en el dado template o template content
            // pasar true lo agregará a la cabeza / cuerpo dependiendo de la
            // script loading opcion
            inject: true,
            // ruta relativa o absoluta de la plantilla
            template: './src/index.html',
            // archivo para escribir el html, pordefecto es index.html
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[contenthash].css'
        }),
        new CopyPlugin({
            //configuracion para decir que archivos vamos a copiar
            patterns: [
                {
                    // ruta con los archivos a copiar
                    from: path.resolve(__dirname, "src", "assets/images"),
                    // ruta para dejar los archivos copiados
                    to: "assets/images"
                }
            ]
        }),
        // new Dotenv(),
        new CleanWebpackPlugin()
    ],
    optimization: {
        // para habilitar la funcion de compresion en modo de desarrollo
        minimize: true,
        // para agregar los plugins que comprimen archivos
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ] 
    }
}