export default function sheetsEndpoints(app) {
  const { runtime } = this

  app.route('/sheets')
    .all((req,res,next) => {
      req.sheets = runtime.sheets
      next()
    })
    .get(getSheets)
    .post(createSheet)

  app
    .route('/sheets/:sheetId')
    .all((req, res, next) => {
      const sheetId = req.params.sheetId  
      req.sheet = runtime.sheet(sheetId)
      next()
    })
    .get(getSheet)
    .put(updateSheet)

  return app
}

export async function updateSheet(req, res) {

}

export async function getSheet(req, res) {
  const { sheet } = req

  await sheet.whenReady()
  await sheet.loadAll()
  
  res.status(200).json({
    sheetId: sheet.sheetId,
    name: sheet.name,
    data: sheet.data,
    worksheetIds: sheet.worksheetIds,
    state: sheet.currentState,
  })
}

export async function getSheets(req, res) {
  const { sheets } = req

  const response = sheets.allInstances().map(sheet => ({
    name: sheet.name,
    sheetId: sheet.sheetId,
    title: sheet.title,
    info: sheet.info
  }))

  res
    .status(200)
    .json(response)
}

export async function createSheet(req, res) {

}