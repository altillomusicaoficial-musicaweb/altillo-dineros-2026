/*  ============================================================
    ALTILLO · Dineros 2026 — Sincronización con Google Drive
    ------------------------------------------------------------
    Este script convierte una Hoja de Cálculo de Google en el
    "backup vivo" de la app. La app envía (push) y trae (pull)
    los movimientos de la pestaña "Datos_App".

    PUESTA EN MARCHA (5 min):
    1. Abre tu Excel DINEROS_2026 en Drive y guárdalo como
       Hoja de cálculo de Google  (Archivo ▸ Guardar como Hoja de cálculo).
       — o crea una Hoja nueva; la pestaña "Datos_App" se crea sola.
    2. Copia el ID de esa Hoja (está en la URL, entre /d/ y /edit):
       docs.google.com/spreadsheets/d/  ESTE_ES_EL_ID  /edit
    3. Ve a  script.google.com  ▸ Nuevo proyecto ▸ pega TODO este código.
    4. Rellena abajo SPREADSHEET_ID y (si quieres) cambia TOKEN.
    5. Desplegar ▸ Nueva implementación ▸ tipo "Aplicación web":
         - Ejecutar como:  Yo
         - Quién tiene acceso:  Cualquier usuario
       Copia la URL que termina en  /exec
    6. En la app: pestaña "Datos & Backup" ▸ pega esa URL y el TOKEN
       ▸ Guardar conexión. Ya puedes "Traer" y "Enviar".
    ============================================================ */

const SPREADSHEET_ID = '1flGqOSAv4WOxKzAqlEVYIefIoScKN44zi3r3rFlcX7c'; // DINEROS 2026
const SHEET         = 'Datos_App';
const TOKEN         = 'altillo-2026';            // debe coincidir con el de la app
const HEAD = ['Fecha','Mes','Tipo','Categoría','Quién','Importe','ID','Estado','Actualizado'];

/* ---- lectura (la app hace "Traer de Drive") ---- */
function doGet(e){
  try{
    if(String(e.parameter.token||'') !== TOKEN) return json({ok:false,error:'token'});
    return json({ok:true, transactions: readAll()});
  }catch(err){ return json({ok:false,error:String(err)}); }
}

/* ---- escritura (la app hace "Enviar a Drive") ---- */
function doPost(e){
  try{
    const body = JSON.parse((e.postData && e.postData.contents) || '{}');
    if(String(body.token||'') !== TOKEN) return json({ok:false,error:'token'});
    if(body.action === 'push'){
      const n = writeAll(body.transactions || []);
      return json({ok:true, count:n});
    }
    return json({ok:false,error:'accion desconocida'});
  }catch(err){ return json({ok:false,error:String(err)}); }
}

/* ---------- utilidades ---------- */
function sheet(){
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sh = ss.getSheetByName(SHEET);
  if(!sh){ sh = ss.insertSheet(SHEET); sh.getRange(1,1,1,HEAD.length).setValues([HEAD]); }
  return sh;
}
function readAll(){
  const sh = sheet();
  const vals = sh.getDataRange().getValues();
  if(vals.length < 2) return [];
  const head = vals[0].map(String);
  const at = k => head.indexOf(k);
  const out = [];
  for(let i=1;i<vals.length;i++){
    const r = vals[i];
    if(!r[at('Importe')] && !r[at('Categoría')]) continue;
    let f = r[at('Fecha')];
    if(f instanceof Date) f = Utilities.formatDate(f, Session.getScriptTimeZone(), 'yyyy-MM-dd');
    out.push({
      fecha: String(f).slice(0,10),
      mes: r[at('Mes')],
      tipo: r[at('Tipo')],
      categoria: r[at('Categoría')],
      quien: r[at('Quién')],
      importe: Number(r[at('Importe')]) || 0,
      id: String(r[at('ID')] || ''),
      estado: at('Estado') >= 0 ? r[at('Estado')] : '',
      actualizado: at('Actualizado') >= 0 ? (Number(r[at('Actualizado')]) || 0) : 0
    });
  }
  return out;
}
function writeAll(txs){
  const sh = sheet();
  const ss = sh.getParent();
  // copia de seguridad antes de sobrescribir (conserva las 5 últimas)
  try{
    const name = 'Backup_' + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd_HHmm');
    sh.copyTo(ss).setName(name);
    ss.getSheets().filter(s=>s.getName().indexOf('Backup_')===0)
      .sort((a,b)=> a.getName() < b.getName() ? 1 : -1)
      .slice(5).forEach(s=> ss.deleteSheet(s));
  }catch(err){}
  sh.clear();
  const data = [HEAD].concat(txs.map(t => [
    t.fecha, t.mes, t.tipo, t.categoria, t.quien, Number(t.importe)||0, String(t.id||''), t.estado||'', Number(t.actualizado)||0
  ]));
  sh.getRange(1,1,data.length,HEAD.length).setValues(data);
  return txs.length;
}
function json(o){
  return ContentService.createTextOutput(JSON.stringify(o))
    .setMimeType(ContentService.MimeType.JSON);
}
