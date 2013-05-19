# winshare

Find the physical path for a windows share.

## Install

```bash
npm install winshare
```

## Usage

Case insensitive share lookup.  Nothing fancy here, this is a `net share` cli wrapper.

### Find a share by name

Input a string shareName and function callback.  Returns a share object.

```javascript
var winshare = require('winshare');

winshare('c$', function(err, share) {
  console.log(share);

  // { name: 'c$',
  //   path: 'c:\\',
  //   comment: 'Default c$ share'
  // }
  
});
```

### todo

- Return all shares if no sharename input 


## License

The MIT License

Copyright (c) 2012 Markit On Demand, Inc. http://markitondemand.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
