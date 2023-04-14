
# Million Solutions

Una plantilla creada especificamente para trabajar nuevas app en Million
## Proceso Inicial

- Primero clonar el repositorio, agregando el nombre de proyecto nuevo.
    ```bash
     git clone git@github.com:Million-Solutions/template-expo.git <proyect-name>
    ```

- Instalar dependencias

    ```bash
     yarn install
    ```

- Iniciar Proyecto

    ```bash
     expo start
    ```

## Editar App.json

El app.json es una carpeta en la cual tenemos toda la informacion de la app que en aplicacionas nativas seria nuestro manifest.

https://docs.expo.dev/versions/latest/config/app/

Necesitamos editar:

- expo.name
- expo.slug
- expo.scheme
- expo.ios.bundleIdentifier
- expo.android.package

## Tener en cuenta

En esta plantilla tendremos dos Screen, 1 hook y un archivo de helpers.

Debemos tener en cuenta que estamos usando Native-Base para estilos.

https://nativebase.io/


Y React Navigation para controlar la navegacion.

https://reactnavigation.org/

