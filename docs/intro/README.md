# Програмний модуль **"molfar-monitor"** | Вступ

**Програмний модуль [`molfar-monitor`](https://github.com/wdc-molfar/molfar-monitor) – "Програмний модуль для моніторингу стану мікросервісів"** - це RESTfull сервіс, написаний мовою програмування `JavaScript`, який надає можливості для моніторингу стану мікросервісів, зокрема: обробляти запити від мікросервісів для додавання їх до реєстру моніторингу, надсилання запитів до мікросервісів з метою визначити їх стан, доступність та працездатність, видаляти мікросервіси з реєстру моніторингу; та надає можливості управління мікросервісами, зокрема: перенаправляти запити до [`molfar-node`](https://github.com/wdc-molfar/molfar-node) на розгортання, запуск, налаштування, зупинку та згортання мікросервісів; а також зберігає інформацію про поточний стан всіх зареєстрованих мікросервісів.

### Зміст
- [Позначення та найменування програмного модуля](#name)
- [Програмне забезпечення, необхідне для функціонування програмного модуля](#software)
- [Функціональне призначення](#function)
- [Опис логічної структури](#structure)
- [Використовувані технічні засоби](#hardware)
- [Виклик та завантаження](#run)

<a name="name"></a>
<h2>Позначення та найменування програмного модуля</h2>

Програмний модуль має позначення **"molfar-monitor"**.

Повне найменування програмного модуля – **"Програмний модуль для моніторингу стану мікросервісів"**.


<a name="software"></a>
<h2>Програмне забезпечення, необхідне для функціонування програмного модуля</h2>

Для функціонування програмного модуля, написаного мовами програмування `Python` та `JavaScript`, необхідне наступне програмне забезпечення:

- `Docker` [v20.10](https://docs.docker.com/engine/release-notes/#version-2010)
- `Kubernetes` [v1.22.4](https://github.com/kubernetes/kubernetes/releases/tag/v1.22.4)

 та пакети:

- `npm` [v.6.13.4](https://www.npmjs.com/package/npm/v/6.13.4)
- `node` [v.12.16.1](https://nodejs.org/ru/blog/release/v12.16.1/)
- `axios` [v0.21.0](https://github.com/axios/axios/releases)
- `body-parser` [v1.19.0](https://www.npmjs.com/package/body-parser/v/1.19.0)
- `cookie-parser` [v1.4.5](https://www.npmjs.com/package/cookie-parser/v/1.4.5)
- `cors` [v2.8.5](https://www.npmjs.com/package/cors/v/2.8.5)
- `express` [v4.17.1](https://www.npmjs.com/package/express/v/4.17.1)
- `fs-extra` [v9.1.0](https://www.npmjs.com/package/fs-extra/v/9.1.0)
- `guid` [v0.0.12](https://www.npmjs.com/package/guid/v/0.0.12)
- `js-yaml` [v4.1.0](https://www.npmjs.com/package/js-yaml/v/4.1.0)
- `lodash` [v4.17.20](https://www.npmjs.com/package/lodash/v/4.17.20)
- `moment` [v2.29.4](https://www.npmjs.com/package/moment/v/2.29.4)
- `node-cron` [v3.0.1](https://www.npmjs.com/package/node-cron/v/3.0.1)
- `request-ip` [v3.3.0](https://www.npmjs.com/package/request-ip/v/3.3.0)
- `simpl.db` [v2.10.2](https://www.npmjs.com/package/simpl.db/v/2.10.2)
- `swagger-stats` [v0.99.2](https://www.npmjs.com/package/swagger-stats/v/0.99.2)
- `swagger-ui-express` [v4.4.0](https://www.npmjs.com/package/swagger-ui-express/v/4.4.0)
- `winston` [v3.8.1](https://www.npmjs.com/package/winston/v/3.8.1)
- `winston-daily-rotate-file` [v4.7.1](https://www.npmjs.com/package/winston-daily-rotate-file/v/4.7.1)
- `yaml-js` [v0.3.0](https://www.npmjs.com/package/yaml-js/v/0.3.0)

<a name="function"></a>
<h2>Функціональне призначення</h2>


Програмний модуль призначений для моніторингу стану мікросервісів, зокрема надає можливості для обробки запитів від мікросервісів для додавання їх до реєстру моніторингу, надсилання запитів до мікросервісів з метою визначити їх стан, доступність та працездатність, видаляти мікросервіси з реєстру моніторингу; а також призначений для управління мікросервісами, і зокрема дозволяє перенаправляти запити до [`molfar-node`](https://github.com/wdc-molfar/molfar-node) на розгортання, запуск, налаштування, зупинку та згортання мікросервісів. Також програмний модуль зберігає інформацію про поточний стан всіх зареєстрованих мікросервісів.

<a name="structure"></a>
<h2>Опис логічної структури</h2>

Програмний модуль складається з:
- `javascript` – програмний підмодуль, що приймає та оброблює запити

<a name="hardware"></a>
<h2>Використовувані технічні засоби</h2>

Програмний модуль експлуатується на сервері під управлінням `Node.js`, а також HTTP-клієнт `axios` на основі промісів для нього. 
В основі управління викликів з теміналу є менеджер пакетів `npm`.
В основі управління всіх сервісів є система оркестрації `Kubernetes`, де всі контейнери працюють з використанням `Docker`.

<a name="run"></a>
<h2>Виклик та завантаження</h2>

Для запуску програмного модуля **`molfar-monitor`** необхідно:
1. Клонувати репозиторій:
```sh
git clone https://github.com/wdc-molfar/molfar-monitor.git
```
2. Перейти в директорію склонованого репозиторія та проінсталювати всі залежності:
```sh
cd /molfar-monitor
npm install
```

Завантаження програмного модуля забезпечується введенням в WEB-браузері адреси завантажувального модуля [http://{hostname}](http://localhost:8080/) з можливими вказівками:
- [/state](http://localhost:8080/state) - метод `GET` для отримання інформації про стан та працездатність контейнера
- [/node/register](http://localhost:8080/node/register) - метод `POST` для додавання вузла в реєстр моніторингу
- [/node/unregister](http://localhost:8080/node/unregister) - метод `POST` для видалення вузла з реєстру моніторингу
- [/node/state/:instance](http://localhost:8080/node/state/:instance) - метод `GET` для отримання інформації про стан та працездатність окремого вузла за ідентифікатором `instance`
- [/node/deploy/:instance](http://localhost:8080/node/deploy/:instance) - метод `POST` для направлення запиту на завантаження сервісу в контейнер за ідентифікатором вузла `instance` (розгортання сервісу) та повернення інформації про результат завантаження
- [/ms/start/:id](http://localhost:8080/ms/start/:id) - метод `POST` для направлення запиту на запуск сервісу за ідентифікатором `id` та повернення інформації про запуск
- [/ms/config/:id](http://localhost:8080/ms/config/:id) - метод `POST` для направлення запиту на конфігурацію сервісу за ідентифікатором `id` та повернення інформації про конфігурацію
- [/ms/metrics/:instance](http://localhost:8080/ms/metrics/:id) - метод `GET` для отримання метрик сервісу за ідентифікатором `id`
- [/ms/terminate/:id](http://localhost:8080/ms/terminate/:id) - метод `POST` для направлення запиту на запинку сервісу за ідентифікатором `id` та повернення інформації про зупинку
- [/node/undeploy/:instance](http://localhost:8080/node/undeploy/:instance) - метод `POST` для направлення запиту на вивантаження сервісу з контейнера за ідентифікатором вузла `instance` (згортання сервісу) та повернення інформації про результат вивантаження
