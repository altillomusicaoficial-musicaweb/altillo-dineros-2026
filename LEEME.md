# ALTILLO · Dineros — Temporada 2

App de control de cuentas del proyecto. Un solo fichero (`index.html`), sin instalación.
Online en GitHub Pages; los datos se guardan en el navegador y se sincronizan con la hoja
`Datos_App` de Drive.

## Temporada 2 (desde el 18/09/2026)

- La temporada va del **18/09/2026 al 18/09/2027**.
- Todo lo anterior queda **archivado**: no suma, no resta y no sale en ninguna vista.
  Se puede consultar en el selector *Temporada ▸ Temporada 1 · archivo*.
- Lo único que se arrastró de antes es el **dinero real que había en la caja**, que aparece
  como un movimiento llamado *“Saldo inicial de caja (viene de Temporada 1)”*. Si no cuadra
  con lo que hay en el bote, se corrige con un **arqueo** (ver abajo).

## Cómo funciona el dinero

**Un caché NO es un ingreso.** Es el sueldo que Altillo os paga a David o a Ariana, así que
para el proyecto es un **gasto**. El orden es siempre:

1. Entra el dinero del bolo → tipo **Ingreso**.
2. Se aparta el **10%** para el bote de beneficio de Altillo.
3. De lo que queda salen los **cachés** pactados y los gastos.

Ejemplo con 600 € de un bolo: 60 € al bote de beneficio, y de los 540 € restantes salen
(por ejemplo) 100 € de caché para David y 100 € para Ariana.

## Tipos de movimiento

| Tipo | Qué es | Cómo afecta |
|---|---|---|
| **Ingreso** | Dinero que entra a Altillo | Suma a ingresos y genera la ficha del 10% |
| **Caché** | Sueldo que Altillo paga a David o Ariana | Gasto de Altillo |
| **Gasto Variable** | Gasto puntual (gasolina, publi, merchan…) | Gasto |
| **Gasto Fijo** | Gasto que se repite (local de ensayo, cuotas…) | Gasto |
| **Pá la Caja** | Meter o **sacar** dinero físico del bote | Sube o baja la caja |
| **Paguen Parseros** | Aviso de un gasto que vendrá | **No cuenta** hasta marcarlo pagado |

En cada ingreso se indica **dónde está ese dinero** (en la caja, en el banco o encima de una
persona) y en cada gasto **de dónde salió** (bolsillo, caja o banco). De ahí salen solos el
saldo de la caja y lo que cada uno debe a Altillo.

## Beneficio 10%

Cada ingreso crea una **ficha** en la sección *Beneficio 10%*. Esa ficha **no desaparece**
hasta que ese dinero está dentro de la caja: o bien se pulsa *“Ya lo he metido en la caja”*
(crea el movimiento en el bote) o *“Ya estaba dentro”* si el ingreso entró entero en efectivo.
El porcentaje se cambia en *Datos & Backup ▸ Beneficio de Altillo*.

## Paguen Parseros

Avisos de gastos futuros. Aparecen **al abrir la app** y en el aviso del Resumen. Mientras
están pendientes no restan nada. Al pulsar *“Ya está pagado”* se convierten en gasto real con
el mismo concepto, y se pregunta si salió de la caja.

## Arqueo de caja

*Pá la Caja ▸ Contar la caja (arqueo)*. Se cuenta el dinero físico, se escribe lo que hay de
verdad y la app apunta un movimiento de ajuste con la diferencia. No borra nada: deja rastro
del día que se contó y se sigue desde ahí.

## David & Ariana

Sección propia con, para cada uno: ingresos que ha traído, cachés cobrados, gastos a su
nombre, dinero metido en la caja y **lo que debe a Altillo** = dinero de bolos que todavía
tiene encima + el 10% de sus ingresos que aún no ha entrado en la caja.

## Don Cerdito

El cerdito con sombrero de abajo a la derecha. Funciona sin internet y conoce los números
reales de la app: cuánto hay en caja, qué falta por apartar, cómo repartir un bolo (“repartir
un bolo de 600”), cómo apuntar cada cosa y qué significa cada sección.

## Recordatorio quincenal

Si pasan **14 días** sin rellenar, salta un aviso con alarma que reaparece hasta confirmarlo.
Cada movimiento reinicia el contador.

## Backup en Drive

1. Pega `apps-script-sync.gs` en script.google.com y sigue los pasos del principio del archivo.
2. App ▸ *Datos & Backup* ▸ URL del Web App + token ▸ *Guardar conexión*.

**Importante:** la Temporada 2 añade las columnas `Destino`, `Pagado`, `Origen` y `Benef` a la
hoja `Datos_App`. Hay que volver a pegar el `apps-script-sync.gs` actualizado y crear una
**nueva versión** del despliegue (Implementar ▸ Gestionar implementaciones ▸ Editar ▸ Nueva
versión). Sin eso se pierden los campos nuevos al sincronizar.

También hay *Exportar Excel/CSV* e *Importar* para el modo manual.
