import { expect, test } from 'vitest'
import { parse } from 'yaml'
import { parseReadableInterval } from '../src/util'

test('yaml parser test', () => {
  const yaml = `
    target: google
    extend:
      - name: mdn
        rule: https://developer.mozilla.org/zh-CN/search?q={keyword}
      - name: npm
        rule: https://www.npmjs.com/search?q={keyword}
  `
  expect(parse(yaml)).toMatchInlineSnapshot(`
    {
      "extend": [
        {
          "name": "mdn",
          "rule": "https://developer.mozilla.org/zh-CN/search?q={keyword}",
        },
        {
          "name": "npm",
          "rule": "https://www.npmjs.com/search?q={keyword}",
        },
      ],
      "target": "google",
    }
  `)
})

test('readable time parse', () => {
  expect(parseReadableInterval('1s')).toEqual(1000)
  expect(parseReadableInterval('1m')).toEqual(parseReadableInterval('1s') * 60)
  expect(parseReadableInterval('1h')).toEqual(parseReadableInterval('1m') * 60)
  expect(parseReadableInterval('1d')).toEqual(parseReadableInterval('1h') * 24)
})
