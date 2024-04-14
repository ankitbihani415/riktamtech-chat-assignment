FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
RUN cd /usr/src/app
COPY . .
# RUN cp .env.example .env
# RUN cp .jest.env.js.example .jest.env.js
RUN npm install
EXPOSE 3000
ENV MONGODB_URI 'mongodb://mongodb:27017/riktamtech-chat'
ENV PORT 3000
ENV NODE_ENV 'development'
ENV JWT_SECRET 'jwtsupersecret'
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
