# Tiny Fingerprint

[![npm version](https://badgen.net/npm/v/tiny-fingerprint-js)](https://www.npmjs.com/package/tiny-fingerprint-js)
[![npm downloads](https://badgen.net/npm/dt/tiny-fingerprint-js)](https://www.npmjs.com/package/tiny-fingerprint-js)
[![bundle size](https://img.shields.io/bundlephobia/minzip/tiny-fingerprint-js)](https://bundlephobia.com/package/tiny-fingerprint-js)

This package provides a way to identify a user via a tiny script. The uniqueness of the fingerprint is not high. As such this shouldn't be relied upon for any data that requires precisions. Instead it can be used to track trends, track short lived events, or whatever else where accuracy isn't a big concern.

### Installation

Install using Yarn or NPM, or any other package manager you might prefer.
```js
yarn add tiny-fingerprint-js // Svelte 5
```
```js
npm install tiny-fingerprint-js // Svelte 5
```

## Usage

```js
import { getTinyFingerprint } from "tiny-fingerprint-js"

const fingerprint = getTinyFingerprint()
```

You can optionally pass additional data you might have on the user via an array.

```js
const additionalData = [user.shoe_size, user.fingernail_length]
const fingerprint = getTinyFingerprint(additionalData)
```

The function will always return an 8-character string of numbers and lowercase letters.
