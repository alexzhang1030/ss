# ss

ss means "Search, Search"

Just type something, ss will open corresponding website with your input keywords in your default browser.

## Install

```bash
npm i -g @alexzzz/ss

# or pnpm
pnpm i -g @alexzzz/ss
```

## Usage

### Basic Usage

```bash
ss [...keywords]

# such like this
ss javascript array reduce # <- will open google.com with query "javascript array reduce"
```

### Specific Website

```bash
ss -u <website-type> [...keywords]

# such like
ss -u github alexzhang1030 # <- will open github.com with query "alexzhang1030"
```

## Config

read `~/.ssrc` file(not test Windows, but I think it should be `C:\Users\<username>\.ssrc`)

```yaml
# target is the default website
target: google
# you can add your own website
# {keyword} will be replaced with your input
extend:
  - name: mdn
    rule: https://developer.mozilla.org/zh-CN/search?q={keyword}
  - name: npm
    rule: https://www.npmjs.com/search?q={keyword}
```

### Default Support Website

IF Your custom website name is the same as default, it will override default website.

```ts
[
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
```

## License

MIT, alexzhang1030
