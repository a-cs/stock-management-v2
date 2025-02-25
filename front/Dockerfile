FROM node:lts-alpine

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

ARG VITE_LAB_NAME
ENV VITE_LAB_NAME=$VITE_LAB_NAME

WORKDIR /srcs

COPY ./ ./

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]