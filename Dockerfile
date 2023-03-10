FROM node:16

WORKDIR /app

COPY . /app

RUN cd frontend
RUN npm install

CMD ["npm", "start"]