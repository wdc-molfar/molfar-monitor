---
title: 'MOLFAR-MONITOR. RESTfull-сервіс для моніторингу стану мікросервісів'
language_tabs:
  - http: HTTP
  - javascript: JavaScript
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<h1 id="molfar-node-restfull-">MOLFAR-MONITOR. RESTfull-сервіс для моніторингу стану мікросервісів v1.0.1</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Надає можливості моніторингу стану мікросервісів з використанням RESTfull

Base URLs:

* <a href="http://localhost:8080">http://localhost:8080</a>

Email: <a href="mailto:boldak.andrey@gmail.com">molfar-monitor</a> Web: <a href="http://localhost:3001/">molfar-monitor</a> 
License: <a href="http://localhost:8080/license.html">MIT License</a>

<h1 id="molfar-node-restfull---">Загальна інформація</h1>

## get__

> Code samples

```javascript
var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "http://localhost:8080/");
xhr.setRequestHeader("accept", "text/html");

xhr.send(data);
```

`GET /`

*Отримати загальний опис сервісу*

Повертає сторінку загального опису

> Example responses

> 200 Response

<h3 id="get__-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Успішна відповідь|string|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="molfar-node-restfull---">Ноди</h1>

## post__node_register

> Code samples

```javascript
var data = JSON.stringify({
  "instance": "string",
  "uri": "string",
  "token": "string"
});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "http://localhost:8080/node/register");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("accept", "application/json");

xhr.send(data);
```

`POST /node/register`

*Реєстрація ноди*

Повертає результат реєстрації ноди

> Body parameter

```json
{
  "instance": "string",
  "uri": "string",
  "token": "string"
}
```

<h3 id="post__node_register-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[req_instance_data](#schemareq_instance_data)|false|none|

> Example responses

> 200 Response

```json
{
  "message": "Success"
}
```

<h3 id="post__node_register-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Успішна відповідь|[response_message](#schemaresponse_message)|

<aside class="success">
This operation does not require authentication
</aside>

## post__node_unregister

> Code samples

```javascript
var data = JSON.stringify({
  "instance": "string",
  "uri": "string",
  "token": "string"
});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "http://localhost:8080/node/unregister");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("accept", "application/json");

xhr.send(data);
```

`POST /node/unregister`

*Скасувати реєстрацію ноди*

Повертає результат скасування реєстрації ноди

> Body parameter

```json
{
  "instance": "string",
  "uri": "string",
  "token": "string"
}
```

<h3 id="post__node_unregister-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[req_instance_data](#schemareq_instance_data)|false|none|

> Example responses

> 200 Response

```json
{
  "message": "Success"
}
```

<h3 id="post__node_unregister-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Успішна відповідь|[response_message](#schemaresponse_message)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="molfar-node-restfull---">Інформація щодо сервісу</h1>

## get__state

> Code samples

```javascript
var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "http://localhost:8080/state");
xhr.setRequestHeader("accept", "application/json");

xhr.send(data);
```

`GET /state`

*Отримати стан сервісу*

Повертає інформацію, щодо стану та працездатності сервісу

> Example responses

> 200 Response

```json
{
  "type": "@molfar/molfar-node",
  "uri": "http://localhost",
  "instance": "b8c821c8-8a82-4ae2-8b6b-780df554e70d",
  "startedAt": "2022-06-28T07:46:19.870Z",
  "microservices": []
}
```

<h3 id="get__state-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Успішна відповідь|[res_state_type](#schemares_state_type)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="molfar-node-restfull---">Інформація щодо ноди</h1>

## get__node_state_{id}

> Code samples

```javascript
var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "http://localhost:8080/node/state/");
xhr.setRequestHeader("accept", "application/json");

xhr.send(data);
```

`GET /node/state/{id}`

*Отримати стан ноди*

Повертає інформацію, щодо стану та працездатності ноди

> Example responses

> 200 Response

```json
{
  "type": "@molfar/molfar-node",
  "uri": "http://localhost",
  "instance": "b8c821c8-8a82-4ae2-8b6b-780df554e70d",
  "startedAt": "2022-06-28T07:46:19.870Z",
  "microservices": []
}
```

<h3 id="get__node_state_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Успішна відповідь|[res_state_type](#schemares_state_type)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="molfar-node-restfull---">Завантаження сервісів</h1>

## post__node_deploy_{id}

> Code samples

```javascript
var data = JSON.stringify({
  "repo": "string"
});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "http://localhost:8080/node/deploy/b8c821c8-8a82-4ae2-8b6b-780df554e70d");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("accept", "application/json");

xhr.send(data);
```

`POST /node/deploy/{id}`

*Завантажити сервіс в контейнер*

Повертає результат завантаження сервісу в контейнер

> Body parameter

```json
{
  "repo": "string"
}
```

<h3 id="post__node_deploy_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|Ідентифікатор|
|body|body|[req_repo_type](#schemareq_repo_type)|false|none|

> Example responses

> 200 Response

```json
{
  "type": "@molfar/molfar-node",
  "uri": "http://localhost",
  "instance": "b8c821c8-8a82-4ae2-8b6b-780df554e70d",
  "startedAt": "2022-06-28T07:46:19.870Z",
  "microservices": []
}
```

> 400 Response

```json
{
  "message": "string"
}
```

<h3 id="post__node_deploy_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Відповідь сервісу|[res_state_type](#schemares_state_type)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Відповідь сервісу у разі помилки|[response_error_type](#schemaresponse_error_type)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="molfar-node-restfull---">Запуск сервісів</h1>

## post__ms_start_{id}

> Code samples

```javascript
var data = JSON.stringify({
  "instance": "string",
  "service": "string"
});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "http://localhost:8080/ms/start/b8c821c8-8a82-4ae2-8b6b-780df554e70d");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("accept", "application/json");

xhr.send(data);
```

`POST /ms/start/{id}`

*Запуск сервісу в контейнері*

Повертає результат запуску сервісу в контейнері

> Body parameter

```json
{
  "instance": "string",
  "service": "string"
}
```

<h3 id="post__ms_start_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|Ідентифікатор|
|body|body|[req_service_id_type](#schemareq_service_id_type)|false|none|

> Example responses

> 200 Response

```json
{
  "type": "@molfar/molfar-node",
  "uri": "http://localhost",
  "instance": "b8c821c8-8a82-4ae2-8b6b-780df554e70d",
  "startedAt": "2022-06-28T07:46:19.870Z",
  "microservices": []
}
```

> 400 Response

```json
{
  "message": "string"
}
```

<h3 id="post__ms_start_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Відповідь сервісу|[res_state_type](#schemares_state_type)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Відповідь сервісу у разі помилки|[response_error_type](#schemaresponse_error_type)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="molfar-node-restfull---">Вивантаження сервісів</h1>

## post__node_undeploy_{id}

> Code samples

```javascript
var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "http://localhost:8080/node/undeploy/b8c821c8-8a82-4ae2-8b6b-780df554e70d");
xhr.setRequestHeader("accept", "application/json");

xhr.send(data);
```

`POST /node/undeploy/{id}`

*Вивантажити сервіс з контейнера*

Повертає результат вивантаження сервісу з контейнера

<h3 id="post__node_undeploy_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|Ідентифікатор|

> Example responses

> 200 Response

```json
{
  "type": "@molfar/molfar-node",
  "uri": "http://localhost",
  "instance": "b8c821c8-8a82-4ae2-8b6b-780df554e70d",
  "startedAt": "2022-06-28T07:46:19.870Z",
  "microservices": []
}
```

> 400 Response

```json
{
  "message": "string"
}
```

<h3 id="post__node_undeploy_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Відповідь сервісу|[res_state_type](#schemares_state_type)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Відповідь сервісу у разі помилки|[response_error_type](#schemaresponse_error_type)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="molfar-node-restfull---">Виключення сервісів</h1>

## post__ms_terminate_{id}

> Code samples

```javascript
var data = JSON.stringify({
  "instance": "string",
  "service": "string"
});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "http://localhost:8080/ms/terminate/b8c821c8-8a82-4ae2-8b6b-780df554e70d");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("accept", "application/json");

xhr.send(data);
```

`POST /ms/terminate/{id}`

*Завершити сервіс в контейнері*

Повертає результат завершення сервісу в контейнері

> Body parameter

```json
{
  "instance": "string",
  "service": "string"
}
```

<h3 id="post__ms_terminate_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|Ідентифікатор|
|body|body|[req_service_id_type](#schemareq_service_id_type)|false|none|

> Example responses

> 200 Response

```json
{
  "type": "@molfar/molfar-node",
  "uri": "http://localhost",
  "instance": "b8c821c8-8a82-4ae2-8b6b-780df554e70d",
  "startedAt": "2022-06-28T07:46:19.870Z",
  "microservices": []
}
```

> 400 Response

```json
{
  "message": "string"
}
```

<h3 id="post__ms_terminate_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Відповідь сервісу|[res_state_type](#schemares_state_type)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Відповідь сервісу у разі помилки|[response_error_type](#schemaresponse_error_type)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="molfar-node-restfull---">Налаштування сервісів</h1>

## post__ms_config_{id}

> Code samples

```javascript
var data = JSON.stringify({
  "instance": "string",
  "service": "string"
});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "http://localhost:8080/ms/config/b8c821c8-8a82-4ae2-8b6b-780df554e70d");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("accept", "application/json");

xhr.send(data);
```

`POST /ms/config/{id}`

*Налаштування сервісу в контейнері*

Повертає результат налаштування сервісу в контейнері

> Body parameter

```json
{
  "instance": "string",
  "service": "string"
}
```

<h3 id="post__ms_config_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|Ідентифікатор|
|body|body|[req_service_id_type](#schemareq_service_id_type)|false|none|

> Example responses

> 200 Response

```json
{
  "type": "@molfar/molfar-node",
  "uri": "http://localhost",
  "instance": "b8c821c8-8a82-4ae2-8b6b-780df554e70d",
  "startedAt": "2022-06-28T07:46:19.870Z",
  "microservices": []
}
```

> 400 Response

```json
{
  "message": "string"
}
```

<h3 id="post__ms_config_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Відповідь сервісу|[res_state_type](#schemares_state_type)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Відповідь сервісу у разі помилки|[response_error_type](#schemaresponse_error_type)|

<aside class="success">
This operation does not require authentication
</aside>

## post__ms_metrics_{id}

> Code samples

```javascript
var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "http://localhost:8080/ms/metrics/");
xhr.setRequestHeader("accept", "application/json");

xhr.send(data);
```

`POST /ms/metrics/{id}`

*Метрики контейнера*

Повертає метрики контейнері

> Example responses

> 200 Response

```json
{
  "loggedAt": "2022-08-04T08:20:58.793Z",
  "instance": "32d4ecbc-a676-4dbb-ac44-83dcfb6b786f",
  "metrics": []
}
```

> 400 Response

```json
{
  "message": "string"
}
```

<h3 id="post__ms_metrics_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Відповідь сервісу|[res_metrics_type](#schemares_metrics_type)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Відповідь сервісу у разі помилки|[response_error_type](#schemaresponse_error_type)|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocSid_data_type">id_data_type</h2>

<a id="schemaid_data_type"></a>

```json
{
  "id": "string"
}

```

*Ідентифікатор*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|Ідентифікатор|

<h2 id="tocSres_metrics_type">res_metrics_type</h2>

<a id="schemares_metrics_type"></a>

```json
{
  "loggedAt": "string",
  "instance": "string",
  "metrics": []
}

```

*Тип даних метрики*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|loggedAt|string|true|none|Час початку логів|
|instance|string|true|none|Ідентифікатор контейнера|
|metrics|array|true|none|Дані метрики|

<h2 id="tocSres_state_type">res_state_type</h2>

<a id="schemares_state_type"></a>

```json
{
  "type": "string",
  "uri": "string",
  "instance": "string",
  "startedAt": "string",
  "microservices": [
    "string"
  ]
}

```

*Тип даних про стан контейнера*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|false|none|Назва сервісу|
|uri|string|false|none|URL для доступу|
|instance|string|false|none|Ідентифікатор контейнера|
|startedAt|string|false|none|Дата і час запуску контейнера|
|microservices|[string]|false|none|Ідентифікатори запущених мікросервісів|

<h2 id="tocSreq_instance_data">req_instance_data</h2>

<a id="schemareq_instance_data"></a>

```json
{
  "instance": "string",
  "uri": "string",
  "token": "string"
}

```

*Тип даних для обміну.*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|instance|string|true|none|Ідентифікатор|
|uri|string|false|none|URL для запиту|
|token|string|true|none|Токен для запиту|

<h2 id="tocSreq_repo_id_type">req_repo_id_type</h2>

<a id="schemareq_repo_id_type"></a>

```json
{
  "id": "string",
  "repo": "string"
}

```

*Тип даних для обміну з сервісом.*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|Ідентифікатор|
|repo|string|true|none|Шлях до репозиторію|

<h2 id="tocSreq_service_id_type">req_service_id_type</h2>

<a id="schemareq_service_id_type"></a>

```json
{
  "instance": "string",
  "service": "string"
}

```

*Тип даних для обміну з сервісом.*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|instance|string|true|none|Ідентифікатор|
|service|string|true|none|Конфігурація|

<h2 id="tocSreq_service_type">req_service_type</h2>

<a id="schemareq_service_type"></a>

```json
{
  "service": "string"
}

```

*Тип даних для обміну з сервісом.*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|service|string|true|none|Конфігурація|

<h2 id="tocSreq_repo_type">req_repo_type</h2>

<a id="schemareq_repo_type"></a>

```json
{
  "repo": "string"
}

```

*Тип даних для обміну з сервісом.*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|repo|string|true|none|Шлях до репозиторію|

<h2 id="tocSresponse_error_type">response_error_type</h2>

<a id="schemaresponse_error_type"></a>

```json
{
  "message": "string"
}

```

*Помилкова відповідь*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|message|string|true|none|Повідомлення про помилку|

<h2 id="tocSresponse_message">response_message</h2>

<a id="schemaresponse_message"></a>

```json
{
  "message": "string"
}

```

*Відповідь*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|message|string|true|none|Повідомлення|

