module.exports = {
  attach(runtime) {
    const { existsSync, readJsonSync } = runtime.fsx
    const serviceAccountPath = runtime.resolve('secrets', 'serviceAccount.json')

    if (existsSync(serviceAccountPath)) {
      const googleOptions = {
        serviceAccount: serviceAccountPath,
        googleProject: readJsonSync(serviceAccountPath).project_id
      }

      // hacky way until i fix the require function used in skypager.js script loader
      runtime.use(
        require(runtime.packageFinder.attemptResolve('@skypager/helpers-sheet')), googleOptions
      )
            // hacky way until i fix the require function used in skypager.js script loader
      runtime.use(
        require(runtime.packageFinder.attemptResolve('@skypager/helpers-google-doc')), googleOptions
      )
    }
  }
}