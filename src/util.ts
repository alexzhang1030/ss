import { writeFileSync } from 'fs'
import chalk from 'chalk'
import { $fetch } from 'ohmyfetch'
import { stringify } from 'yaml'
import localPkgJson from '../package.json'
import type { Config } from './config'
import { checkConfigExistThen, configPath, readConfig } from './config'

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

export function parseReadableInterval(delay: string) {
  const match = delay.match(/^(\d+)([smhd])$/)
  if (!match)
    return 0
  const [, num, unit] = match
  const n = Number(num)
  switch (unit) {
    case 's':
      return n * 1000
    case 'm':
      return n * 60 * 1000
    case 'h':
      return n * 60 * 60 * 1000
    case 'd':
      return n * 24 * 60 * 60 * 1000
    default:
      return 0
  }
}

export async function checkVersion(interval: string, lastCheck?: number) {
  const now = Date.now()
  const intervalMs = parseReadableInterval(interval)
  if (lastCheck && now - lastCheck < intervalMs)
    return

  const localVersion = localPkgJson.version
  const name = localPkgJson.name

  const res: { latest: string } = await $fetch(`https://registry.npmjs.org/-/package/${name}/dist-tags`, { parseResponse: JSON.parse })
  if (res.latest !== localVersion)
    // eslint-disable-next-line no-console
    console.log(chalk.yellow(`New version ${res.latest} is available, please update by running: npm i -g ${name}`))
  let config = {} as Config
  checkConfigExistThen(() => {
    config = readConfig()
  })
  config = { ...config, lastCheck: now }
  writeFileSync(configPath, stringify(config, null, 2))
}

