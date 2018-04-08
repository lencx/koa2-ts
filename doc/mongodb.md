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

# create database
use <DATABASE NAME>
show dbs
db.db_name.insert({"key": "value"})

# delete database
db.dropDatabase()

show collections
show tables

# delecte collection
db.collection_name.drop()

# create collection
db.createCollection(name[, options])

# insert
db.col.insert(document)
db.col.insertOne()
db.col.insertMany()

# update
db.col.update(<query>, <update>, {
    upsert: <boolean>,
    multi: <boolean>,
    writeConcern: <document>
})
db.col.updateOne()
db.col.updateMany()

# save
db.col.save(<document>, {
    writeConcern: <document>
})

# delete
db.col.deleteOne()
db.col.deleteMany()

db.col.find(query[, projection]).pretty()
```

> `Collection Options:`

| Fields      | Type    |
| ----------- | ------- |
| capped      | Boolean |
| autoIndexId | Boolean |
| size        | Number  |
| max         | Number  |

## Operators

### Comparison Query Operators

> *Syntax*: `{field: {$gt: value} }`

| Name | Description                                                  |
| ---- | ------------------------------------------------------------ |
| $eq  | Matches values that are equal to a specified value.          |
| $gt  | Matches values that are greater than a specified value.      |
| $gte | Matches values that are greater than or equal to a specified value. |
| $in  | Matches any of the values specified in an array.             |
| $lt  | Matches values that are less than a specified value.         |
| $lte | Matches values that are less than or equal to a specified value. |
| $ne  | Matches all values that are not equal to a specified value.  |
| $nin | Matches none of the values specified in an array.            |

### Logical Query Operators

| Name | Description                                                  |
| ---- | ------------------------------------------------------------ |
| $and | Joins query clauses with a logical **AND** returns all documents that match the conditions of both clauses. |
| $not | Inverts the effect of a query expression and returns documents that do not match the query expression. |
| $nor | Joins query clauses with a logical **NOR** returns all documents that fail to match botn clauses. |
| $or  | Joins query clauses with a logical **OR** returns all documents that match the conditions of either clause. |

### Element Query Operators

* **$exists**

> *Syntax*: `{ field: { $exists: <boolean> } }`

* **$type**

> *Syntax*:
>
> > { field: { $type: <BSON type> } }
> > { field: { $type: [ <BSON type1> , <BSON type2>, ... ] } }

| Type                   | Number | Alias                 | Notes               |
| ---------------------- | ------ | --------------------- | ------------------- |
| Double                 | 1      | "double"              |                     |
| String                 | 2      | "string"              |                     |
| Object                 | 3      | "object"              |                     |
| Array                  | 4      | "array"               |                     |
| Binary data            | 5      | "binData"             |                     |
| Undefined              | 6      | "undefined"           | Deprecated.         |
| ObjectId               | 7      | "objectId"            |                     |
| Boolean                | 8      | "bool"                |                     |
| Date                   | 9      | "date"                |                     |
| Null                   | 10     | "null"                |                     |
| Regular Expression     | 11     | "regex"               |                     |
| DBPointer              | 12     | "dbPointer"           | Deprecated.         |
| JavaScript             | 13     | "javascript"          |                     |
| Symbol                 | 14     | "symbol"              | Deprecated.         |
| JavaScript(with scope) | 15     | "javascriptWithScope" |                     |
| 32-bit integer         | 16     | "int"                 |                     |
| Timestamp              | 17     | "timestamp"           |                     |
| 64-bit integer         | 18     | "long"                |                     |
| Decimal128             | 19     | "decimal"             | New in version 3.4. |
| Min key                | -1     | "minKey"              |                     |
| Max key                | 127    | "maxKey"              |                     |

### Evaluation Query Operators

| Name        | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| $expr       | Allows use of aggregation expressions within the query language. |
| $jsonSchema | Validate documents against the given JSON Schema.            |
| $mod        | Performs a modulo operation on the value of a field and selects documents with a specified result. |
| $regex      | Selects documents where values match a specified regular expression. |
| $text       | Performs text search.                                        |
| $where      | Matches documents that satisfy a JavaScript expression.      |

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
