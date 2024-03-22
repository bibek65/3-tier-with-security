FROM node:21-alpine3.18 as base

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

# for build

FROM base as builder
WORKDIR /usr/src/app

RUN yarn build

# for production
FROM nginx:1.25.4 as main

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx","-g","daemon off;"]
