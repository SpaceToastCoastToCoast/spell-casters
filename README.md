# SpellCasters
> SpellCasters is an educational spelling game. Defeat Lord Zett and his Alphagator minions by spelling words correctly.

>[Game Play Details](https://github.com/SpaceToastCoastToCoast/spell-casters/wiki/Game-Information)
---

![](https://github.com/SpaceToastCoastToCoast/spell-casters/blob/develop/github_images/sc_mainscr.png)
![](https://github.com/SpaceToastCoastToCoast/spell-casters/blob/develop/github_images/sp_scr1.png)
![](https://github.com/SpaceToastCoastToCoast/spell-casters/blob/develop/github_images/sp_scr2.png)

---

##Installation

- Open terminal and clone our repository
... `git clone git@github.com:SpaceToastCoastToCoast/spell-casters.git`...
- Enter the cloned repository
... `cd spell-casters`...
- Install all dependencies for the repository
... `npm install`...
- Run Postgres on your computer
- Open `sample.config.json` in your preferred text editor
... `subl config/sample.config.json`...
- Copy the contents of `sample.config.json` and create a new file within the config directory called `config.json`
... `touch config/config.json`...
- Paste the contents into `config.json` and edit the username value within development
- In your terminal, enter into Postgres
... `psql`...
- Within Postgres, create a database named `spellcasters`
... `create database spellcasters;`...
- Sync the database
... `node server.js`...
- Once Webpack completes the build, kill the server process
- In the terminal, seed all files
... `sequelize db:seed:all`...
- Once all files have been seeded, start the server again
... `node server.js`...
- Navigate to `localhost:8080` in your browser to begin using SpellCasters
