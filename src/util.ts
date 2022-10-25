import chalk from 'chalk'
import { $fetch } from 'ohmyfetch'
import localPkgJson from '../package.json'

export function panic(message: string) {
  // eslint-disable-next-line no-console
  console.log(chalk.red(message))
}

export function log(message: string) {
  // eslint-disable-next-line no-console
  console.log('use ss to', message)
}

export function tip(message: string) {
  // eslint-disable-next-line no-console
  console.log(chalk.gray(message))
}

export async function checkVersion() {
  const localVersion = localPkgJson.version
  const name = localPkgJson.name

  const res: { latest: string } = await $fetch(`https://registry.npmjs.org/-/package/${name}/dist-tags`, { parseResponse: JSON.parse })
  if (res.latest !== localVersion)
    // eslint-disable-next-line no-console
    console.log(chalk.yellow(`New version ${res.latest} is available, please update by running: npm i -g ${name}`))
}
