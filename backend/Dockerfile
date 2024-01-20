# Указываю базовый образ для Node.js
FROM node AS build

# Устанавливаю рабочую директорию
WORKDIR /app

# Копирую файлы package.json и package-lock.json
COPY package*.json /app

# Устанавливаю зависимости для серверной части
RUN npm install

# Копирую серверную часть
COPY . .

# Перехожу в директорию клиента
WORKDIR /app/CLIENT

# Устанавливаю зависимости для клиентской части
RUN npm install

# Собираю клиентскую часть
RUN npm run build
#!!!!!!!!!удалить после сборки nodemodules 
# Копирование результатов сборки в контейнер
#Если цель - включить результаты сборки клиентской части в Docker-образ, 
#чтобы запускать приложение в контейнере, 
#то необходимо скопировать эти результаты в контейнер. 
#COPY CLIENT/dist /app/CLIENT/dist

# Возвращаюсь в корневую директорию
WORKDIR /app

# ENV PORT 1111
# EXPOSE $PORT
# Открываю порт 1111 в контейнере, чтобы он был доступен извне
# EXPOSE не открывает фактически порт он документирует тот факт
# что приложение внутри контейнера ожидает входящие соединения на этом порту
# 80:1111 означает, что 
# контейнер ожидает входящие соединения на порту 1111 внутри контейнера
# но эти соединения будут проксированы на порт 80 внутри самого контейнера.
# Таким образом, при обращении к порту 80 на хост-системе (вне контейнера)
# эти соединения будут направлены на порт 1111 внутри контейнера.
EXPOSE 1111:1111


#ИЗМЕНИТЬ ДОКУМЕНТАЦИЮ !!!!!!!!!
# docker build . -t webdotg

# docker run -p 2525:1111 webdotg

# 1111 server app my!!!

# Команда для запуска сервера и клиента
CMD ["npm", "run", "deploy"]
# Запустит NPM RUN START и NPM RUN CLIENT-BUILD
# NPM RUN START запустит NODE и папку ./BIN/WWW
# NPM RUN CLIENT-BUILD запустит из папки client NPM RUN BUILD а он запустит TSC && VITE BUILD
#

# docker build -t webdotgmaster/webdotg .
# docker push webdotgmaster/webdotg:latest
# docker rmi webdotgmaster/webdotg:latest
# docker pull webdotgmaster/webdotg:latest
# docker images
# docker run -d -p 80:1111 --name webdotg --rm webdotgmaster/webdotg
# docker ps