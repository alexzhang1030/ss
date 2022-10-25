import { resolve } from 'node:path'
import { accessSync, constants, readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { parse } from 'yaml'

interface CustomConfig {
  name: string
  rule: string
}

type DefaultTarget = 'baidu' | 'google'

interface Config {
  target: string | DefaultTarget
  extend: CustomConfig[]
}

const defaultTarget: CustomConfig[] = [
  {
    name: 'baidu',
    rule: 'https://www.baidu.com/s?wd={keyword}',
  }, {
    name: 'google',
    rule: 'https://www.google.com/search?q={keyword}',
  }, {
    name: 'mdn',
    rule: 'https://developer.mozilla.org/zh-CN/search?q={keyword}',
  }, {
    name: 'npm',
    rule: 'https://www.npmjs.com/search?q={keyword}',
  },
]

const defaultConfig: Config = {
  target: 'google',
  extend: [],
}

const readConfig = () => {
  const configPath = resolve(homedir(), '.ssrc')
  let config: Config = defaultConfig
  try {
    accessSync(configPath, constants.R_OK)
    config = parse(readFileSync(configPath, 'utf-8'))
  }
  catch (error) {}
  if (!config.target)
    config.target = defaultConfig.target
  return config
}

export const produceConfig = () => {
  const config = readConfig()
  config.extend = [...defaultTarget, ...config.extend]
  return config
}
