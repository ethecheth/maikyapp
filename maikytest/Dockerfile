FROM cypress/browsers
WORKDIR /opt/app
COPY package*.json ./
RUN npm install
COPY . .
RUN --mount=type=cache,target=/root/.cache/Cypress npx cypress install
RUN mkdir -p /opt/app/junit
CMD ["npx", "cypress", "run","--reporter","junit","--reporter-options","mochaFile=/opt/app/junit/test-results.xml"]