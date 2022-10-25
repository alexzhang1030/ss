import { resolve } from 'node:path'
import { accessSync, constants, readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { parse } from 'yaml'

interface CustomConfig {
  name: string
  rule: string
}

type DefaultTarget = 'baidu' | 'google'

export interface Config {
  target: string | DefaultTarget
  extend: CustomConfig[]
  vci: string
  lastCheck?: number
}

const defaultTarget: CustomConfig[] = [
  {
    name: 'baidu',
    rule: 'https://www.baidu.com/s?wd={keyword}',
  },
  {
    name: 'google',
    rule: 'https://www.google.com/search?q={keyword}',
  },
  {
    name: 'mdn',
    rule: 'https://developer.mozilla.org/zh-CN/search?q={keyword}',
  },
  {
    name: 'npm',
    rule: 'https://www.npmjs.com/search?q={keyword}',
  },
  {
    name: 'github',
    rule: 'https://github.com/search?q={keyword}',
  },
]

const defaultConfig: Config = {
  target: 'google',
  extend: [],
  vci: '1h',
}

export const configPath = resolve(homedir(), '.ssrc')
export const checkConfigExistThen = (cb: () => void) => {
  try {
    accessSync(configPath, constants.R_OK)
    cb()
  }
  catch (error) {
  }
}

export const readConfig = () => {
  let config: Config = defaultConfig
  checkConfigExistThen(() => {
    config = { ...defaultConfig, ...parse(readFileSync(configPath, 'utf-8')) }
  })
  return config
}

export const produceConfig = () => {
  const config = readConfig()
  config.extend = [...defaultTarget, ...config.extend]
  return config
}
