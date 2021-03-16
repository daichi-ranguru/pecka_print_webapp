FROM node:12.16-alpine as development

RUN mkdir -p /webapp
WORKDIR /webapp

COPY package.json ./
RUN yarn install

COPY . .
ENV PORT 3000
ENV NODE_ENV production
CMD ["sh","-c", "yarn export && npx serve __sapper__/export"]

