const runtime = require('@skypager/node')

const { dirname } = runtime.pathUtils 
const { existsSync, mkdirSync, writeFileSync } = runtime.fsx

main()

async function main() {
  await handler()
}

async function handler() {
  const serviceAccountPath =
    runtime.argv.serviceAccountPath || process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    runtime.resolve("secrets", "serviceAccount.json");
    
  const credentialExists = existsSync(serviceAccountPath);
  
  if (!credentialExists && process.env.SERVICE_ACCOUNT_DATA) {
    !existsSync(dirname(serviceAccountPath)) &&
      mkdirSync(dirname(serviceAccountPath));
    writeFileSync(serviceAccountPath, process.env.SERVICE_ACCOUNT_DATA);
  } else if (!credentialExists && !process.env.SERVICE_ACCOUNT_DATA) {
    runtime.cli.print(
      `${runtime.cli.colors.red('SERVICE_ACCOUNT_DATA')} environment variable should include the service account JSON`
    )
    process.exit(1)
  }
}