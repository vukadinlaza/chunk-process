## Install dependencies
Run 
```js
  npm i -g @nestjs/cli
```

The main logic is in file `app.service.ts`
- `concurrencyLimit`: The number of chunks are run in group
  
I already have a test for it
Please check the log
## Log message explanation 
- A group of chunks are selected to process
```js
 List:: [
      { id: 'chunk11', isCancelable: true, timeout: 10 },
      { id: 'chunk12', isCancelable: false, timeout: 1 }
    ]
```
- ` Chunk chunk12 processed` : means a chunked is processed
