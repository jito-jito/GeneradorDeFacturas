# GeneradorDeFacturas
Prueba Técnica de Platzi, generador de facturas.

Esta es una aplicación que va generando una factura conforme vas escogiendo productos precargados desde una base de datos.

Puedes ver el resultado del proyecto [aquí.](https://jito-jito.github.io/GeneradorDeFacturas/)

## Diagrama de flujo

Este diagrama de flujo me ayudó a crear la lógica de la aplicación:


## Entorno de funcionamiento

Utilizo **webpack** como apoyo para separar la lógica de la aplicación por módulos, utilizar el preprocesador **sass**, añadir la lógica para traer información desde **firebase** y **dotenv** para la configuración con la misma.


## Indicaciones de descarga: 

Para que la aplicación se pueda conectar a la base de datos ya creada debes recibir las variables de entorno y agregarlas a tú correspondiente archivo .env, las variables a necesitar se pueden ver en el archivo '.env.example' de la ruta raiz del repositorio.

Por otro lado siéntete libre de hacer un fork de la aplicación o bien descargar directamente los archivos para tú entorno, una ves en tu entorno de desarrollo procura instalar las dependencias necesarias utilizando 'npm install'.

Si NO tienes las variables de entorno necesarias para acceder a la base de datos te invito a crear una o a utilizar el archivo 'data.json' incluido en la ruta raíz del repositorio.


- Si quieres hacer un build de la aplicación para un entorno de producción puedes usar el comando:

		npm run build

- Si estás trabajando en el proyecto puedes usar este comando para generar un build automático al guardar un archivo dentro del proyecto:

		npm run dev

	En conjunto utilizo la extensión **live server** de vsCode para visualizar el proyecto en el navegador.






