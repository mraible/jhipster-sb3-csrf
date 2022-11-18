To run this app, you'll need to clone and install the `jhipster-bom` repo:

```
git clone https://github.com/jhipster/jhipster-bom.git
cd jhipster-bom
./mvnw install -Dgpg.skip=true
```

Then, clone this repo and run the app.

```
git clone https://github.com/mraible/jhipster-sb3-csrf.git
cd jhipster-sb3-csrf
# start Docker Compose containers
npm run ci:e2e:prepare
# run the app
./gradlew
```
