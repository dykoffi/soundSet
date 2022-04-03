# ################### Building Stage #######################

FROM dykoffi/node:light as base

WORKDIR /App
COPY package.json ./
RUN yarn install

COPY . ./

RUN yarn build

# ################### Release Stage #######################

FROM dykoffi/node:light as release

WORKDIR /App
COPY --from=base /App/build/ ./

EXPOSE 3000

CMD pm2 serve --spa --port 3000 --name audioset-recoder