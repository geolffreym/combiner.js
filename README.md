Simple Combiner
=========================
Simple Combiner.

Config
------
Configuration is very simple, you just have to create the folder /config/ and create the file init.js 

You need to set the APP_PATH, is who is responsible for setting the relative directory of your application, the default is '/' and finally the environment, which can be either development or production.

```js
    var setting = {
    	app_path      : '/',
    	env: 'development'
    };
    
    
    //Please install Node and run the command `npm install` and `npm start` to execute
    //Set Environment
    if ( typeof exports !== 'undefined' )
    	exports.setting = setting;
```  	

  
Joining files
-------------

Blend files is relatively simple, you must first establish the libraries you want to use in environment.

This is the /app/development/init

```js
    //Development
     exports.files = {
            js: {
                output: 'app/include/init', //The output default base/include/init
                src: [
                    'app/config/init', // Needed do not change
                    'system/base/init', // Needed do not change
    //              'lib/Form',
    //              'lib/Upload' // Add all the necessary scripts for startup
                ]
    
            }
        }
        
```

Please install Node and run the command `npm install` and `npm start` to execute
