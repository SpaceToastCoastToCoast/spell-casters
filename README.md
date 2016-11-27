# SpellCasters
> SpellCasters is an educational spelling game. Defeat Lord Zett and his Alphagator minions by spelling words correctly.

[Game Play Details](https://github.com/SpaceToastCoastToCoast/spell-casters/wiki/Game-Information)

[License](https://github.com/SpaceToastCoastToCoast/spell-casters/blob/master/LICENSE)

![](https://github.com/SpaceToastCoastToCoast/spell-casters/blob/master/github_images/sc_mainscr.png)
![](https://github.com/SpaceToastCoastToCoast/spell-casters/blob/master/github_images/sp_scr1.png)
![](https://github.com/SpaceToastCoastToCoast/spell-casters/blob/master/github_images/sp_scr2.png)

---

##Installation

1. Open terminal and clone our repository
  `git clone git@github.com:SpaceToastCoastToCoast/spell-casters.git`
2. Enter the cloned repository
  `cd spell-casters`
3. Install all dependencies for the repository
  `npm install`
4. Create a secret.json in the spell-casters directory
  `touch secret.json`
5. Paste the following text into secret.json. The secret should be something difficult to guess--a long keysmash is ideal:
  `{"secret": "your secret here"}`
6. Run Postgres on your computer
7. Open `sample.config.json` in your preferred text editor
  `subl config/sample.config.json`
8. Copy the contents of `sample.config.json` and create a new file within the config directory called `config.json`
  `touch config/config.json`
9. Paste the contents into `config.json` and edit the username value within development
10. In your terminal, enter into Postgres
  `psql`
11. Within Postgres, create a database with a name matching that in your `config.json` e.g. `spellcasters`
  `create database spellcasters;`
12. Sync the database
  `node server.js`
13. Once Webpack completes the build, kill the server process
14. In the terminal, seed all files
  `sequelize db:seed:all`
15. Once all files have been seeded, start the server again
  `node server.js`
16. Navigate to `localhost:8080` in your browser to begin playing SpellCasters
