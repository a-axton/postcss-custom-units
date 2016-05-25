# postcss-custom-units
A collection of some custom CSS units using PostCSS, mostly an experiment.

## Usage
```js
postcss([
  customUnits({
    containerWidth: 1140, // main container width in px
    columns: 12, // num of columns
    base: 16 // base units in px for modular scale
  })
])
  .process(css)
  .then((res) => {
    console.log(res);
  });
```
### Container Width Unit
A percentage of the width of your main container element.

```css
.element {
  width: 50cw;
  height: 50cw;
}
```

### Grid Width Unit
Similar to container width unit but it uses increments based on a grid system.

```css
.grid-6 {
  width: 6gw;
  height: 6gw;
}
```

### Golden Unit
A modular scale based on the golden ratio.

```css
h1 {
  margin-top: 2gu;
  margin-bottom: 1gu;
  line-height: 1gu;
}
```

## Development
#### Install
```npm install```

#### Dev
```npm run watch```

#### Test Browser
```npm run test-web```

then go to: http://localhost:8080/webpack-dev-server/tmp/tests

#### Test Node
```npm run test-node```

#### Build
```npm run build```
