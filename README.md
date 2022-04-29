# 👯‍♀️ Easy Scroll Sync

![npm version](https://img.shields.io/npm/v/easy-scroll-sync.svg)
![bundlephobia](https://img.shields.io/bundlephobia/min/easy-scroll-sync.svg)

> Easily Synchronise scrolling between elements!

## Features 🔥

- Less than 2kb!
- Zero Dependencies
- Easy to use! 💪

## Install 🔮

#### NPM

```bash
npm install easy-scroll-sync
```

#### Yarn

```bash
yarn add easy-scroll-sync
```

#### Via Script Tag

At the bottom of you body tag

```html
<script src="https://cdn.jsdelivr.net/npm/easy-scroll-sync@latest/dist/easy-scroll-sync.min.js"></script>
```

## Usage 💻

If you are using a module loader you will need to import `easy-scroll-sync`

```js
import { easyScrollSync } from "easy-scroll-sync";
```

Set `data-scrollsync` on the elements you want to synchronise scrolling and you're done!

```html
<div data-scrollsync class="scrollable_item_1"></div>
<div data-scrollsync class="scrollable_item_2"></div>
```

You can also call `easyScrollSync()` to reset and recreate the elements scroll listeners.

## Support 💬

- 🐞 For Bug Reports and Enhancements please use the [issues section](https://github.com/Alex61NN5/easy-scroll-sync/issues)
