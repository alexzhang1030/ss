import { expect, test } from 'vitest'
import { parse } from 'yaml'

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
