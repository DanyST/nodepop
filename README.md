# Nodepop API

## Demo
### Devops module bootcamp
``` https://api.lherreral.me ```

Static file: ``` https://api.lherreral.me/images/nintendo.jpg ```

IP Server for the Bootcamp practice``` 34.194.179.177 ```

## features
* User Register (email, password, name)
* User Authentication
* Advertisements list
	* Filters 
		* Advertisement tags (sell and search)
		* Price range (min and max)
	* Name Search
* Advertisements tags list

## Requisites
 * nodejs >= 8.11.3
 * mongodb >= 4.0.0

## Installation

### MongoDB
Install [MongoDB](https://www.mongodb.com) and follow install instructions in the web page. Then Start services mongoDB

### In the root project exec the following commands:

Install dependencies with:

```shell
npm install
```

At the beginning, you can load some advertisements and 2 test users, you can do this using **install_db.js** script with:

```shell
npm run installDB
```
Credetials for tests

```
user: smith@matrix.com
password: 1234

user: brown@matrix.com
password: 1234
```

### Enviroment variables
In the project there are 3 Enviroment Variables:

*MONGODB_URI*: URI connection to mongoDB, if no exist this variable, the default value is ``` mongodb://localhost:27017/nodepop ```

*JWT_SECRET_KEY*: if no exists this variable, the default value is ```$2b$10$gsHv1d/F17zS0mpTd/v.tuBfVFW6/0QJkbWPTKAz5enplP9nTNTQS```

*JWT_EXPIRE_IN*: expiration time for JWT, if no exist this variable, the default value is ``` 1d ```

More information about ```JWT_EXPIRE_IN```: expressed in seconds or a string describing a time span zeit/ms. Eg: 60, "2 days", "10h", "7d". A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc), otherwise milliseconds unit is used by default ("120" is equal to "120ms").

## Getting Started
start the server

```
npm start
```

**you are ready to use the api**!

You first should do authentication 

# API Documentation Usage
 
## User Registration
* Entry point: api/v1/users/register
* Http Method: POST
* Params:
	* name: first name user (String)	
	* email: user email (string)
	* password: user password (string)
* Result: response in JSON format with 2 properties: **success** and **message**

## User authentication
* Entry point: api/v1/users/login
* Http Method: POST
* Params:
	* email: user email (String)
	* password: user password (String)
* Result: response in JSON format with one property: **token**


## Advertisements List
* Entry point: api/v1/advertisements
* Http Method: GET
* Params:
	* token: Authentication token (String)
	* fields: filter for advertisements attributes that you want to get with spaces , example: filter name and quit id ```?fields=name -id```
    * limit: advertisements number what you want to get 
    * skip: advertisements number what you want to escape
    * name: filter for search advertisements with a name
    * tags: filter for search advertisements with tags with comma or space, example: ```?tags=work, mobile ```
    * price: filter for search advertisements with a price range
        * minimum price: ad d dash before the price. Example ```?price=-50```
        * maximum price: add dash after the price. Example ```?price=50-```
        * range price: add dash between two price. Example ```?price=10-80```
        * equal price: only add a price. Example ```?price=50```
    * sell: filter for search advertisements in **sell** or **buy** status. Example: ```?sell=true```
* results: response in JSON format with two properties, **success** and **results** with advertisements data.

## Advertisements Tag List
* Entry point: api/v1/advertisements/tags
* Http Method: GET
* Params: params not require
* result: response in JSON format with two properties, **success** and **results** with tags data.