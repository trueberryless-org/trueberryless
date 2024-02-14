# Verwenden Sie eine offizielle Node.js-Image-Version als Basis
FROM node:18-alpine

# Setzen Sie das Arbeitsverzeichnis im Container
WORKDIR /usr/src/app

# Kopieren Sie die package.json- und package-lock.json-Dateien, um die Abhängigkeiten zu installieren
COPY package*.json ./

# Installieren Sie die Abhängigkeiten
RUN npm install

# Kopieren Sie den restlichen Anwendungscode
COPY . .

# Erstellen Sie die statischen Dateien
RUN npm run build

# Exponieren Sie den Port, auf dem die Anwendung läuft
EXPOSE 3000

# Starten Sie die Anwendung
CMD ["npm", "start"]