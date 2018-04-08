# Hazy

```bash
yarn
yarn start
```

**set the port**: `--port=<number>` default: 3000

> package.json

```json
{
    "scripts": {
        "dev": "cross-env NODE_ENV=development --port=3000 nodemon --watch 'src/**/*' -e ts,tsx --exec 'ts-node' ./src/app.ts",
    }
}
```

## UI

> semantic-ui

```bash
npm i semantic-ui --save
cd semantic
gulp build

npm update
```

```html
<!-- Include -->
<link rel="stylesheet" type="text/css" href="https://lencx.github.io/ui/s-ui/semantic/dist/semantic.min.css">
<script src="https://lencx.github.io/ui/s-ui/semantic/dist/jquery.min.js"></script>
<script src="https://lencx.github.io/ui/s-ui/semantic/dist/semantic.min.js"></script>
```