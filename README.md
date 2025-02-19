<div align="justify">

# Adivina el personaje de Fire Emblem
> 🖥️  **Desarrolladores:** Nabil L.A. ([@nalleon](https://github.com/nalleon)) y José Maximiliano M. A. ([@mackstm](https://github.com/mackstm)) 

<div align="center">
    <img src="./img/cover.png">
</div>

## Índice

- [Descripción del Proyecto](#descripción-del-proyecto)
- [Intrucciones para la instalación y ejecución](#instrucciones-para-la-instalación-y-ejecución)
- [Documentación de VueDocGen](#documentación-de-vuedocgen)



## Descripción del Proyecto

El proyecto será un juego de adivinar los personajes del videojuego Fire Emblem: The Sacred Stones. Para ello no solo impleemntaremos el propio juego si no un sistema de pistas y un limite de errores permitidos para hacer una aplicación más completa. 

En cuanto a la api que utilizaremos para el juego será la siguiente:

```code
https://www.fe-api.com/fe8/units.json
```

## Instrucciones para la instalación y ejecución

Por parte de la instalación del proyecto simplemente se debe de ejecutar el siguiente comando:

```code
npm install
```

Tras esto, para poder ejecutarlo, únicamente debemos de introducir este comando:

```code
npm run
```

Para hacer comprobaciones con ESLint, lo ejecutamos con:
```code
npx eslint .
```

De cara a la aplicación multiplataforma de Electron:

```code
npm run electron:build
```

Y finalmente, para abrir el ejecutable generado:

```code
./dist/feapp-0.0.0.AppImage
```

## Documentación de VueDocGen

En cuanto a la documentación generado por VueDocGen, tenemos los siguientes componentes:

### FireEmblemPicture:

####  Props

| Prop name | Description                                                           | Type    | Values | Default |
| --------- | --------------------------------------------------------------------- | ------- | ------ | ------- |
| unitName  | The name of the unit to display in the image.                         | string  | -      |         |
| showUnit  | Determines whether the unit should be displayed.<br/>`@default` false | boolean | -      | false   |

---


> El archivo generado original lo podemos encontrar [aquí](./code/fe-project/docs/src/components/FireEmblemPicture.md) 



</div>
