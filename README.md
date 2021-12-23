# WAGithubExport

A self-updating GitHub repository for backing up World Anvil worlds.

An example repository of my worlds can be found here: https://github.com/zuedev/WorldAnvilBackup

**Please keep in mind that this will make all of your world content public unless you make the repository private!**

## How to use

Just fork the repository and create the following two secrets:

- `WA_AUTH_TOKEN`: Your World Anvil API key. You can get one [here](https://www.worldanvil.com/api/auth/key).
- `WA_APP_KEY`: Your World Anvil application key. You get this from Dimitris right now.

Then select "allow all actions" in your repository's "actions" settings.

Your repository should start backing up your worlds every day at midnight.

## TODO

- [x] Initial functionality (all worlds' articles to json)
- [x] Include images
- [ ] Include user metadata (bio, avatar, etc.)
- [ ] Include world metadata (intro, world date, etc.)
- [ ] Include more than articles (timelines, maps, etc.)
- [ ] Selective backups
- [ ] Setup script instead of forking
