## Node and NPM Version
```
Node v18.14.0
NPM v9.3.1
```

## Run Project
```
git clone https://github.com/secondlast21/garlic-ts.git
npm install
npm run dev
```

## Deploy to Docker
```
sudo docker build -t inaagro/garlic-fe
sudo docker login
sudo docker push inaagro/garlic-fe:latest
```
Open https://panel.ina-agro.apps.cs.ipb.ac.id/ and login, then open garlic-fe container.  Stop the container, then recreate the container.  After that, restart the container.
