const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const CopyPlugin = require('copy-webpack-plugin')

const Dotenv = require('dotenv-webpack')




module.exports = {
    entry: './src/index.js',
    output: {
        // dirección para guardar el archivo de salida
        path: path.resolve(__dirname, 'dist'),
        // nombre del archivo de salida
        filename: '[name].js',
        // para agregar las imagenes que vienen de asset module en la dirección indicada
        assetModuleFilename: "assets/images/[hash][ext][query]"
    },
    // para ser más especifico en el modo de webpack a ejecutar
    devtool: 'eval-source-map',
    // para activar el modo watch
    watch: true,
    //configuraciones a utilizar
    resolve: {
        //extenciones a trabajar
        extensions: ['.js'],
        //para agregar alias para las rutas del proyecto
        alias: {
            // nombre del alias y direccion a la que corresponde
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@templates': path.resolve(__dirname, 'src/templates'),
            '@styles': path.resolve(__dirname, 'src/styles'),
            '@images': path.resolve(__dirname, 'src/assets/images'),

        }
    },
    // modulo en base a reglas para trabajar ocn babel
    module: {
        rules:
        // reglas para trabajar con diferentes tipos de archivos
        [
            {
                // Test declara que extensión de archivos aplicara el loader
                // test recibe expresiones regulares
                test: /\.js$/,
                // Exclude permite omitir archivos o carpetas especificas
                exclude: /node_modules/,
                // Use es un arreglo u objeto donde dices que loader aplicaras
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
        // new Dotenv()
    ]
}