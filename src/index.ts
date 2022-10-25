import open from 'open'
import cac from 'cac'
import chalk from 'chalk'
import pkg from '../package.json'
import { produceConfig } from './config'
import { checkVersion, log, panic } from './util'

async function main() {
  const cli = cac()
  cli.option('-u [website-type]', 'use specific website type, such as google, baidu')
  cli.help()
  cli.version(pkg.version)
  const parsed = cli.parse()
  const { options, args } = parsed
  if (options.v || options.h)
    return
  if (!args.length)
    return panic('Nothing to search')
  const config = produceConfig()
  if ('u' in options)
    config.target = options.u
  const target = config.extend.find(item => item.name === config.target)
  if (!target)
    return panic(`Cannot find ${chalk.cyan(options.u)}'s rule`)
  const keywords = args.join(' ')
  const url = target.rule.replace('{keyword}', encodeURIComponent(keywords))
  await open(url)
  log(`search ${chalk.blue(keywords)} by ${chalk.cyan(config.target)} `)
  checkVersion()
}

main()
