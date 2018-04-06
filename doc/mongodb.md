# MongoDB

## Shell

```bash
# ~/.zshrc
# Mac OSX
export PATH=/Users/lencx/.mongodb-osx-x86_64-3.4.5/bin:$PATH
```

```bash
# start
cd hazy
./mongo.sh
mongo

# stop
use admin
db.shutdownServer()

ps -ax|grep mongo

show dbs
show collections
show logs

use <db_name>
```

## mongoose

### [Schema](http://mongoosejs.com/docs/schematypes.html)

> SchemaTypes

* String
* Number
* Date
* Buffer
* Mixed
* ObjectId
* Array

> Schema Types

* `required`: boolean or function
* `default`: Any or function
* `select`: boolean
* `validate`: function
* `get`: funcntion
* `set`: function
* `alias`: string
* `index`: boolean
* `unique`: boolean
* `sparse`: boolean
* `lowercase`: boolean
* `uppercase`: boolean
* `trim`: boolean
* `match`: RegExp
* `enum`: Array
* `min`: Number or Date
* `max`: Number or Date
