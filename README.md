# utr.ip

A simple Node.js CMS w/ Angular and .ejs for the frontend.

### Requirements

* Node.js
* MongoDB ``` $ mongod ``` in background
* Bower and Grunt

## Installation
In main folder:

```bash
$ npm install
```

In /vip/ folder:

```bash
$ npm install
$ bower install
```

## Running
The project has two parts, the API and the actual APP.
Make sure you have ``` $ mongod ``` running in background.

#### API
In main folder run
```
$ node run
```
The server will run on port 3333.
```
http://localhost:3333/
```

#### CMS
In /vip/ folder run
```
$ grunt serve
```
View the CMS running on port 9001.
```
http://localhost:9001/
```
