# spell-casters
An educational game to teach proper spelling

![](https://github.com/SpaceToastCoastToCoast/spell-casters/blob/develop/src/public/img/sc_mainscr.png)
![](https://github.com/SpaceToastCoastToCoast/spell-casters/blob/develop/src/public/img/sp_scr1.png)

* [Game Information](https://github.com/SpaceToastCoastToCoast/spell-casters/wiki/Game-Information)

##Project setup

- create a database and a database owner like in config/sample.config.json
- create a config.json in the config directory with the database name and owner
- `npm install`
- `node server.js` will sync the database
- kill server process and run `sequelize db:seed:all`
- `node server.js` again
- navigate to localhost:8080
