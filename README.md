# Sudoku Moderno

Sudoku Moderno es un videojuego web de lógica desarrollado con HTML5, CSS3 y JavaScript ES6 puro. Está pensado para funcionar en navegadores modernos, tanto en escritorio como en dispositivos móviles, y puede desplegarse directamente en Vercel sin ninguna configuración especial.

## Descripción

Sudoku es un rompecabezas de lógica en el que el objetivo es completar una cuadrícula de 9×9 con los números del 1 al 9. Cada fila, columna y bloque de 3×3 debe contener todos los números exactamente una vez.

El objetivo principal del juego es completar el tablero respetando las reglas del Sudoku, utilizando la lógica y las pistas disponibles para resolver cada partida.

## Características

- Generación automática de tableros válidos con solución única.
- Cuatro niveles de dificultad: Fácil, Medio, Difícil y Extremo.
- Sistema de errores con límite configurable por dificultad.
- Temporizador visible en formato MM:SS.
- Función de pausa con overlay dedicado.
- Modo lápiz para introducir notas y múltiples opciones por celda.
- Historial de movimientos con deshacer.
- Hasta 3 pistas por partida.
- Tutorial interactivo que se muestra la primera vez y puede volver a consultarse.
- Persistencia local mediante localStorage para continuar partidas.
- Diseño responsive optimizado para móviles, tablets y escritorio.
- Soporte de teclado en PC y teclado táctil en móviles.
- Pantallas de victoria y derrota con resumen final.

## Tecnologías

- HTML5
- CSS3
- JavaScript ES6

## Instalación local

```bash
git clone <url-del-repositorio>
cd sudoku
```

Una vez descargado el proyecto, basta con abrir el archivo `index.html` en un navegador moderno.

## Despliegue en Vercel

Vercel puede desplegar este proyecto de forma directa porque está compuesto únicamente por archivos estáticos.

1. Crea un repositorio en GitHub o GitLab.
2. Sube los archivos del proyecto.
3. Inicia sesión en Vercel y selecciona "Import Project".
4. Elige el repositorio recién creado.
5. Confirma la configuración y pulsa "Deploy".

No se requiere Node.js, frameworks ni procesos de build.

## Cómo jugar

1. Selecciona una dificultad.
2. Completa las celdas vacías con números del 1 al 9.
3. Respeta las reglas del Sudoku en filas, columnas y bloques.
4. Usa el modo lápiz para dejar anotaciones.
5. Utiliza las pistas con moderación para avanzar cuando lo necesites.
6. Completa el tablero para ganar.

## Reglas

- Cada fila debe contener los números 1 al 9 una vez cada uno.
- Cada columna debe contener los números 1 al 9 una vez cada uno.
- Cada bloque de 3×3 debe contener los números 1 al 9 una vez cada uno.
- Las celdas iniciales del tablero no pueden modificarse.

## Sistema de puntuación

La puntuación final se calcula con la siguiente lógica:

```text
Puntos base + Bonificación de dificultad - Penalización por tiempo - Penalización por errores - Penalización por pistas
```

Cuanto más rápido completes el tablero, menos errores cometas y menos pistas uses, mayor será tu puntuación final.

## Sistema de errores

Cada movimiento incorrecto incrementa el contador de errores. Si superas el límite permitido para la dificultad elegida, la partida termina y se muestra la pantalla de derrota.

## Sistema de pistas

Cada partida permite hasta 3 pistas. Al usar una pista, el juego revela automáticamente el valor correcto de una celda vacía y reduce la puntuación final obtenida.

## Compatibilidad

Este proyecto ha sido probado conceptualmente para funcionar en:

- Chrome
- Edge
- Firefox
- Safari
- Android
- iOS
