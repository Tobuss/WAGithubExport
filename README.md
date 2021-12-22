# WAGithubExport

A self-updating GitHub repository for backing up World Anvil worlds.

## How to use

Just fork the repository and create the following two secrets:

- `WA_AUTH_TOKEN`: Your World Anvil API key. You can get one [here](https://www.worldanvil.com/api/auth/key).
- `WA_APP_KEY`: Your World Anvil application key. You get this from Dimitris right now.

Then select "allow all actions" in your repository's "actions" settings.

Your repository should start backing up your worlds every day at midnight.

## TODO

- [x] Initial functionality
- [ ] Include user metadata (bio, avatar, etc.)
- [ ] Include world metadata (intro, world date, etc.)
- [ ] Include more than articles (timelines, maps, images, etc.)
- [ ] Selective backups
