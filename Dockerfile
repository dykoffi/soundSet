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
RUN yarn global add serve

EXPOSE 3000

CMD serve -s 