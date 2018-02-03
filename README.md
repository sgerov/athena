# Athena ![CI status](https://img.shields.io/badge/build-passing-brightgreen.svg)

Athena is a Phoenix + Redux + React app for tracking and measuring books and online resource you consume which also serves as personal profile. 

*It's an MVP still to be validated*

## 🤙 Usage [(live demo)](https://gerov.es)

Paste links you just read, give a summary and rate how much you have retained by memory (supports autocomplete).

Add books you are reading along with impressions (supports autocomplete for amazon book urls).

## 💻 Running locally
Database runs through `docker`, BE through `elixir` and FE through `npm dev-server`
### Requirements
* elixir
* npm
* docker & docker-compose

`$ mix deps.get`

`$ mix ecto.create && mix ecto.migrate`

`$ mix phx.server`

## 🚀 Deploying

Install elixir & npm on the server you want to build your app (CI / local / production). 

Add the following env vars in the production server:

```bash
export POSTGRES_PASSWORD=db_password
export ADMIN_PASSWORD=web_password
export PORT=80
```

Edit `.deliver/config`, for the simplest case it might look like this:

```bash
APP="yourapp"

BUILD_HOST="your.ip"
BUILD_USER="root"
BUILD_AT="/root/web/app_build"

PRODUCTION_HOSTS="your.ip" 
PRODUCTION_USER="root" 
DELIVER_TO="/root/web/app_release" 
```

Spin up the database in the production server with `docker-compose up -d` (`scp` the docker-compose file before).

Deploy through `edeliver`:
```bash
mix edeliver deploy
```
Some other useful commands:

```bash
mix edeliver ping production # shows which nodes are up and running
mix edeliver version production # shows the release version running on the nodes
mix edeliver show migrations on production # shows pending database migrations
mix edeliver migrate production # run database migrations
mix edeliver restart production # or start or stop
```

## ❤️ Contributing
Pull requests are welcome.

Please make sure to update tests as appropriate.

### Roadmap

- Add GIF to README on how the app works
- Use env vars in `.deliver/config`
- Add graph of last month performance (articles read, retention score, books read)
- Allow to choose the preview image after autocomplete for urls
- Make addition more user-friendly
- Add timing to measure how long reading an article takes
- Count words of articles automagically
- Embed mind maps for personal improvement
- Make generic for non-devs (easy setup & deploy)

## 📄 License
[MIT](https://choosealicense.com/licenses/mit/)
