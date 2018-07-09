#Nodepop API

##features
* User Register (email, password, name)
* User Authentication
* Advertisements list
	* Filters 
		* Advertisement tags (sell and search)
		* Price range (min and max)
	* Name Search
* Advertisements tags list

##Requisites
 * nodejs >= 8.11.3
 * mongodb >= 4.0.0

##Installation

###MongoDB
Install [MongoDB](https://www.mongodb.com) and follow install instructions in the web page. Then Start services mongoDB

###In the root project exec the following commands:

Ins tall dependencies with:

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

The root directory of the API will contain a **localConfig.example.js**. You should duplicate the file with the name **localConfig.js**. **This should you do in developmenet and production environment**.

The localConfig.js has two properties that correspond to jsonwebtoken options

```
secret: 'secretKey',
expiresIn: '2d',
```

```expiresIn```: expressed in seconds or a string describing a time span zeit/ms. Eg: 60, "2 days", "10h", "7d". A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc), otherwise milliseconds unit is used by default ("120" is equal to "120ms").

##Getting Started
start the server

```
npm start
```

**you are ready to use the api**!

You first should do authentication 

#API Documentation Usage
 
##User Registration
* Entry point: api/v1/users/register
* Http Method: POST
* Params:
	* name: first name user (String)	
	* email: user email (string)
	* password: user password (string)
* Result: response in JSON format with 2 properties: **success** and **message**

##User authentication
* Entry point: api/v1/users/login
* Http Method: POST
* Params:
	* email: user email (String)
	* password: user password (String)
* Result: response in JSON format with one property: **token**


##Advertisements List
* Entry point: api/v1/advertisements
* Http Method: GET
* Params:
	* token: Authentication token (String)
	* fields: filter for advertisements attributes that you can , example: 	