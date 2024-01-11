import path from 'path'
import { promises as fs } from 'fs'
import { root, excludeFromShelfDir, useAsync } from './util'

export default async () => {
  const [result, error] = await useAsync(async () => {
    const netlifyBaseConfig = path.join(root, 'netlify.base.toml')
    const configContent = await fs.readFile(netlifyBaseConfig, {
      encoding: 'utf8',
    })

    const result = excludeFromShelfDir.reduce(
      (acc, path) => {
        const redirectTemplate = `
[[redirects]]
  from = "/shelf/${path}"
  to = "/${path}"
  status = 301
  force = true`
        return acc.concat(redirectTemplate)
      },
      `# This is an autogenerated file, do not modify directly. Edit "netlify.base.toml" instead.
${configContent.replace(/\n$/, '')}`
    )

    await fs.writeFile(path.join(root, 'netlify.toml'), `${result}\n`)
  })

  if (error != null) {
    throw error
  }
  return result
}