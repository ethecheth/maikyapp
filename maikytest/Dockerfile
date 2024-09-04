FROM cypress/browsers
WORKDIR /opt/app
COPY package*.json ./
RUN npm install
COPY . .
RUN --mount=type=cache,target=/root/.cache/Cypress npx cypress install
CMD ["npx", "cypress", "run","--reporter","junit","--reporter-options","mochaFile=/opt/app/junit/test-results.xml"]