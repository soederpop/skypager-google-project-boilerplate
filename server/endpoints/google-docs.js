export default function sheetsEndpoints(app) {
  const { runtime } = this

  app.route('/google-docs')
    .all((req,res,next) => {
      req.googleDocs = runtime.googleDocs
      next()
    })
    .get(getGoogleDocs)
    .post(createGoogleDoc)

  app
    .route('/google-docs/:documentId')
    .all((req, res, next) => {
      const documentId = req.params.documentId  
      req.runtime = runtime

      if (!runtime.googleDocs.checkKey(documentId)) {
        res.status(404).json({ error: 'Not Found' })
        return
      }

      req.googleDoc = runtime.googleDoc(documentId)
      next()
    })
    .get(getGoogleDoc)
    .put(updateGoogleDoc)

  return app
}

export async function updateGoogleDoc(req, res) {

}

export async function getGoogleDoc(req, res) {
  const { runtime, googleDoc } = req
  
  if (!googleDoc) {
    res.status(200)
      .json(runtime.googleDocs.allInstances(d => d.documentId))
  }

  // await googleDoc.whenReady()
  await googleDoc.load()

  res
    .status(200)
    .json({
      ...googleDoc.pick('documentId', 'revisionId', 'title', 'name'),
      ...googleDoc.currentState.doc
    })
}

export async function getGoogleDocs(req, res) {
  const { googleDocs } = req

  const response = googleDocs.allInstances().map(doc => ({
    name: doc.name,
    documentId: doc.documentId,
    title: doc.title,
    info: doc.info
  }))

  res
    .status(200)
    .json(response)
}

export async function createGoogleDoc(req, res) {

}