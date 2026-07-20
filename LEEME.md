# ALTILLO · Dineros 2026

App de control de cuentas del proyecto, construida sobre tu Excel `DINEROS_2026`
(pestaña `Datos_App`). Un solo fichero, sin instalación.

**Única fuente de datos: la pestaña `Datos_App`.** Es una tabla plana (Fecha, Mes,
Tipo, Categoría, Quién, Importe, ID, Estado, Actualizado) sin límite de filas — el
script la borra y reescribe entera cada vez, así que da igual si un mes tiene 5
movimientos o 500. La pestaña `CUENTAS 2026` (el diseño manual con celdas combinadas
y huecos fijos por mes) queda **descontinuada**: no la toca el script ni la app, y
tiene un número de filas fijo por bloque que se puede quedar corto. Anota todo desde
la app (Resumen ▸ Reportes ya calcula lo mismo, sin límite) y no sigas rellenando esa
hoja a mano.

## Cómo abrirla
- **Doble clic** en `index.html` → se abre en tu navegador. Ya trae tus 40 movimientos cargados.
- O súbela a **GitHub Pages** (como el Live Manager) y la tenéis online en el móvil.

Los datos se guardan solos en el navegador (localStorage). No se pierde nada al cerrar.

## Qué hace
- **Resumen**: KPIs (ingresos, gastos, beneficio, efectivo en caja, pendiente brokers), evolución mensual, distribución de ingresos y gastos, flujo de caja, metas.
- **Ingresos / Gastos / Efectivo**: vistas filtradas con su detalle.
- **Brokers / Deudas**: lo que hay que devolver a quien os consigue bolos. Marcas "pagado" cuando devuelves. *No se os olvida.*
- **Movimientos**: tabla con búsqueda; añadir / editar / borrar.
- **Reportes**: resumen mensual + balance por persona (David / Ariana).
- **Metas**: objetivos editables con barras de progreso.

## Recordatorio quincenal (firme)
- Al abrir, si han pasado **14 días o más** desde el último relleno, salta un aviso con **alarma sonora** que **reaparece** hasta que confirmes.
- Chip de estado siempre visible en la cabecera (verde / ámbar / rojo).
- Cada movimiento que añades **reinicia el contador**. También puedes pulsar "Confirmar relleno".
- Opcional: notificaciones del navegador (Datos & Backup ▸ Activar).

## Backup en Drive (automático, casi en tiempo real)
1. Abre `apps-script-sync.gs` y sigue los 6 pasos del principio del archivo.
2. En la app ▸ **Datos & Backup** ▸ pega la URL del Web App y el token ▸ **Guardar conexión**.
3. **Traer de Drive** / **Enviar a Drive**. Además, cada vez que añades, editas o borras algo, se envía solo.
4. La app también trae sola lo nuevo de Drive: al abrir, cada ~90 segundos y al volver a la pestaña.
   Así si David añade un movimiento, a Ariana le aparece solo sin que nadie tenga que darle a "Traer".
5. El script guarda una copia de seguridad automática (las 5 últimas) en la propia Hoja.

**Importante:** si ya tenías el script de Apps Script desplegado antes de este cambio, vuelve a pegar
el `apps-script-sync.gs` actualizado (añade la columna "Actualizado") y crea una **nueva versión**
del despliegue (Implementar ▸ Gestionar implementaciones ▸ Editar ▸ Nueva versión). Sin eso, los
movimientos nuevos igual se sincronizan bien, pero editar un movimiento que ya existe en los dos
sitios a la vez podría no fusionarse correctamente.

### Si prefieres el modo manual
En la misma pestaña: **Exportar Excel** (misma estructura `Datos_App` que tu original) o **Importar Excel** para reemplazar/combinar. Perfecto para llevar el maestro en Drive a mano.

## Tipos de movimiento
Ingreso · Caché · Gasto Variable · Gasto Fijo · Efectivo (bote) · Deuda Broker.
Ingresos y Cachés suman a ingresos; los dos gastos restan; Efectivo alimenta la caja; Deuda Broker es lo pendiente de devolver.
