# flash-cards-server

#### Work Is still in progress!

See old [Demo] (https://fierce-taiga-41516.herokuapp.com/)

See [full doc] (https://github.com/razawi/betterFlashCards)

### Future
server should Implement the [Leitner system] (https://en.wikipedia.org/wiki/Leitner_system)

### Technology
the server is a node js server using express 4.x for its routing and mongodb 3.x + mongoose 4.x for the data. cards data is managed
by the dataController module while users data Is managed via passport.js.
tests are done with mocha

### Architecture
This is only the API

### Installation Instruction

clone project
```
git clone https://github.com/razawi/flash-cards-server
```

cd Into project
```
cd flash-cards-server
```

Install project dependencies
```
npm install
```

Run local server
```
node server.js
```

Run tests - when server is running

```
node server.js
mocha test/apiTests.js
```

##### Notice the config directory and modify It by need.

Browse to *[localhost:8888](127.0.0.1:8888)* and debug / develop!

### Credentials and credits

It's open source (MIT license)

Feel free to whatever you want to do with it.