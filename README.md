# SpellCasters
> SpellCasters is an educational spelling game. Defeat Lord Zett and his Alphagator minions by spelling words correctly.

[Game Play Details](https://github.com/SpaceToastCoastToCoast/spell-casters/wiki/Game-Information)

![](https://github.com/SpaceToastCoastToCoast/spell-casters/blob/develop/github_images/sc_mainscr.png)
![](https://github.com/SpaceToastCoastToCoast/spell-casters/blob/develop/github_images/sp_scr1.png)
![](https://github.com/SpaceToastCoastToCoast/spell-casters/blob/develop/github_images/sp_scr2.png)

---

##Installation

1. Open terminal and clone our repository

⋅⋅⋅`git clone git@github.com:SpaceToastCoastToCoast/spell-casters.git`⋅⋅⋅

2. Enter the cloned repository

⋅⋅⋅`cd spell-casters`⋅⋅⋅

3. Install all dependencies for the repository

⋅⋅⋅`npm install`⋅⋅⋅

4. Run Postgres on your computer

5. Open `sample.config.json` in your preferred text editor

⋅⋅⋅`subl config/sample.config.json`⋅⋅⋅

6. Copy the contents of `sample.config.json` and create a new file within the
config directory called `config.json`

⋅⋅⋅`touch config/config.json`⋅⋅⋅

7. Paste the contents into `config.json` and edit the username value within
development

8. In your terminal, enter into Postgres

⋅⋅⋅`psql`⋅⋅⋅

9. Within Postgres, create a database named `spellcasters`

⋅⋅⋅`create database spellcasters;`⋅⋅⋅

10. Sync the database

⋅⋅⋅`node server.js`⋅⋅⋅

11. Once Webpack completes the build, kill the server process

12. In the terminal, seed all files

⋅⋅⋅`sequelize db:seed:all`⋅⋅⋅

13. Once all files have been seeded, start the server again

⋅⋅⋅`node server.js`⋅⋅⋅

14. Navigate to `localhost:8080` in your browser to begin using SpellCasters
