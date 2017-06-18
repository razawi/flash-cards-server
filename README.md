# flash-cards-server

#### Work Is still in progress!


This Is an API for the [betterFlashCards project](https://github.com/razawi/betterFlashCards) 
It Is written In node and uses mongo db and express routing.

[Heoku deployment](https://better-flash-cards-api.herokuapp.com/api/cardsList)

### The displayed Data
The first data here which is used both as an example and for development purposses is a list of common words in spoken Arabic
In the Palastinian dialect and the matching transcript in English and meaning in Hebrew. hopefully in the future more people will donate flash cards for
any type of use. SAT words, foreign languages, academic classes terminology etc...

### The server side
the server is provides a full Restfull API using node js and express 4.x for its routing and mongodb 3.x + mongoose 4.x for the data management.

### utils
`` utils/dbBackup ``  a necessary for development tool 

``utils/dbInit`` recreates the db from json files, has some nice ES6 Iterators


### Installation Instruction

clone project
```
git clone https://github.com/razawi/flash-cards-server.git
```

cd Into project
```
cd flash-cards-server
```

Install project dependencies
```
npm install
```

Run tests by
```
mocha tests/apiTests.js
```
Init db, notice the config file
```
node util/dbInit
```

Run local server
```
node server.js
```


##### Notice the config directory and modify It by need.


Browse to [localhost](127.0.0.1:8888/api) and debug / develop!


### Client
There Is a seperate client project in [development](https://github.com/razawi/flashCards-client) 

### Credentials and credits

It's open source (MIT license)

Feel free to whatever you want to do with it.


# istanbul report
this is kind of undocument so I'm writing it here

to see the istanbul report
`` cd project_directory``

``./node_modules/.bin/istanbul cover --handle-sigint  server.js``

and from another prompt in the same directory run:
``mocha tests/apiTests.js``

after the tests end, go back to the server prompt and stop it
``ctrl + c`` 

results will be in the /coverage directory