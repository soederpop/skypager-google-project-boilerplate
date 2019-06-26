import runtime from '@skypager/node'
import * as GoogleSheets from '@skypager/helpers-sheet'
import * as GoogleDocs from '@skypager/helpers-google-doc'

runtime.use(function loadGoogleHelpers(next) {
  const serviceAccount = runtime.resolve("secrets", "serviceAccount.json");
  const googleProject = runtime.fsx.readJsonSync(serviceAccount).project_id;

  runtime
    .use(GoogleDocs, {
      serviceAccount,
      googleProject
    })
    .use(GoogleSheets, {
      serviceAccount,
      googleProject
    });

  next()
})

export default runtime