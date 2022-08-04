---
title: 'MOLFAR-NODE. Мікросервісний контейнер, керований RESTfull сервісом v1.0.1'
language_tabs:
  - http: HTTP
  - javascript: JavaScript
toc_footers: []
includes: []
search: true
highlight_theme: darkula
---

# MOLFAR-NODE. Мікросервісний контейнер, керований RESTfull сервісом v1.0.1

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Надає можливості управління та запуску сервісів з використанням RESTfull

Base URLs:

* <a href="http://localhost:8080">http://localhost:8080</a>



Email: <a href="mailto:boldak.andrey@gmail.com">molfar-node</a> Web: <a href="http://localhost:3001/">molfar-node</a> 
License: <a href="http://localhost:8080/license.html">MIT License</a>

# Загальна інформація

## GET /

> Code samples

```http
GET http://localhost:8080/ HTTP/1.1
Host: localhost:8080

Accept: text/html

```

```javascript
var headers = {
  'Accept':'text/html'

};

$.ajax({
  url: 'http://localhost:8080/',
  method: 'get',

  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

*Отримати загальний опис сервісу*

Повертає сторінку загального опису

> Example responses

### Responses

Status|Meaning|Description|Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Успішна відповідь|string

<aside class="success">
This operation does not require authentication
</aside>

# Ноди

## POST /node/register

> Code samples

```http
POST http://localhost:8080/node/register HTTP/1.1
Host: localhost:8080
Content-Type: application/json
Accept: application/json

```

```javascript
var headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'

};

$.ajax({
  url: 'http://localhost:8080/node/register',
  method: 'post',

  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

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
### Parameters

Parameter|In|Type|Required|Description
---|---|---|---|---|
body|body|[req_instance_data](#schemareq_instance_data)|false|No description
» instance|body|string|true|Ідентифікатор
» uri|body|string|false|URL для запиту
» token|body|string|true|Токен для запиту


> Example responses

```json
{
  "message": "string"
}
```
### Responses

Status|Meaning|Description|Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Успішна відповідь|[response_message](#schemaresponse_message)

<aside class="success">
This operation does not require authentication
</aside>

## POST /node/unregister

> Code samples

```http
POST http://localhost:8080/node/unregister HTTP/1.1
Host: localhost:8080
Content-Type: application/json
Accept: application/json

```

```javascript
var headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'

};

$.ajax({
  url: 'http://localhost:8080/node/unregister',
  method: 'post',

  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

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
### Parameters

Parameter|In|Type|Required|Description
---|---|---|---|---|
body|body|[req_instance_data](#schemareq_instance_data)|false|No description
» instance|body|string|true|Ідентифікатор
» uri|body|string|false|URL для запиту
» token|body|string|true|Токен для запиту


> Example responses

```json
{
  "message": "string"
}
```
### Responses

Status|Meaning|Description|Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Успішна відповідь|[response_message](#schemaresponse_message)

<aside class="success">
This operation does not require authentication
</aside>

# Інформація щодо сервісу

## GET /state

> Code samples

```http
GET http://localhost:8080/state HTTP/1.1
Host: localhost:8080

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'http://localhost:8080/state',
  method: 'get',

  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

*Отримати стан сервісу*

Повертає інформацію, щодо стану та працездатності сервісу

> Example responses

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
### Responses

Status|Meaning|Description|Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Успішна відповідь|[res_state_type](#schemares_state_type)

<aside class="success">
This operation does not require authentication
</aside>

# Інформація щодо ноди

## GET /node/state/{id}

> Code samples

```http
GET http://localhost:8080/node/state/{id} HTTP/1.1
Host: localhost:8080

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'http://localhost:8080/node/state/{id}',
  method: 'get',

  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

*Отримати стан ноди*

Повертає інформацію, щодо стану та працездатності ноди

> Example responses

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
### Responses

Status|Meaning|Description|Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Успішна відповідь|[res_state_type](#schemares_state_type)

<aside class="success">
This operation does not require authentication
</aside>

# Завантаження сервісів

## POST /deploy/{id}

> Code samples

```http
POST http://localhost:8080/deploy/{id} HTTP/1.1
Host: localhost:8080
Content-Type: application/json
Accept: application/json

```

```javascript
var headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'

};

$.ajax({
  url: 'http://localhost:8080/deploy/{id}',
  method: 'post',

  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

*Завантажити сервіс в контейнер*

Повертає результат завантаження сервісу в контейнер

> Body parameter

```json
{
  "repo": "string"
}
```
### Parameters

Parameter|In|Type|Required|Description
---|---|---|---|---|
id|path|string|true|Ідентифікатор
body|body|[req_repo_type](#schemareq_repo_type)|false|No description
» repo|body|string|true|Шлях до репозиторію


> Example responses

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
```json
{
  "message": "string"
}
```
### Responses

Status|Meaning|Description|Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Відповідь сервісу|[res_state_type](#schemares_state_type)
400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Відповідь сервісу у разі помилки|[response_error_type](#schemaresponse_error_type)

<aside class="success">
This operation does not require authentication
</aside>

## POST /deploy

> Code samples

```http
POST http://localhost:8080/deploy HTTP/1.1
Host: localhost:8080
Content-Type: application/json
Accept: application/json

```

```javascript
var headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'

};

$.ajax({
  url: 'http://localhost:8080/deploy',
  method: 'post',

  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

*Завантажити сервіс в контейнер*

Повертає результат завантаження сервісу в контейнер

> Body parameter

```json
{
  "id": "string",
  "repo": "string"
}
```
### Parameters

Parameter|In|Type|Required|Description
---|---|---|---|---|
body|body|[req_repo_id_type](#schemareq_repo_id_type)|false|No description
» id|body|string|true|Ідентифікатор
» repo|body|string|true|Шлях до репозиторію


> Example responses

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
```json
{
  "message": "string"
}
```
### Responses

Status|Meaning|Description|Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Відповідь сервісу|[res_state_type](#schemares_state_type)
400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Відповідь сервісу у разі помилки|[response_error_type](#schemaresponse_error_type)

<aside class="success">
This operation does not require authentication
</aside>

# Запуск сервісів

## POST /start/{id}

> Code samples

```http
POST http://localhost:8080/start/{id} HTTP/1.1
Host: localhost:8080
Content-Type: application/json
Accept: application/json

```

```javascript
var headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'

};

$.ajax({
  url: 'http://localhost:8080/start/{id}',
  method: 'post',

  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

*Запуск сервісу в контейнері*

Повертає результат запуску сервісу в контейнері

> Body parameter

```json
{
  "service": "string"
}
```
### Parameters

Parameter|In|Type|Required|Description
---|---|---|---|---|
id|path|string|true|Ідентифікатор
body|body|[req_service_type](#schemareq_service_type)|false|No description
» service|body|string|true|Конфігурація


> Example responses

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
```json
{
  "message": "string"
}
```
### Responses

Status|Meaning|Description|Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Відповідь сервісу|[res_state_type](#schemares_state_type)
400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Відповідь сервісу у разі помилки|[response_error_type](#schemaresponse_error_type)

<aside class="success">
This operation does not require authentication
</aside>

## POST /start

> Code samples

```http
POST http://localhost:8080/start HTTP/1.1
Host: localhost:8080
Content-Type: application/json
Accept: application/json

```

```javascript
var headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'

};

$.ajax({
  url: 'http://localhost:8080/start',
  method: 'post',

  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

*Запуск сервісу в контейнері*

Повертає результат запуску сервісу в контейнері

> Body parameter

```json
{
  "id": "string",
  "service": "string"
}
```
### Parameters

Parameter|In|Type|Required|Description
---|---|---|---|---|
body|body|[req_service_id_type](#schemareq_service_id_type)|false|No description
» id|body|string|true|Ідентифікатор
» service|body|string|true|Конфігурація


> Example responses

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
```json
{
  "message": "string"
}
```
### Responses

Status|Meaning|Description|Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Відповідь сервісу|[res_state_type](#schemares_state_type)
400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Відповідь сервісу у разі помилки|[response_error_type](#schemaresponse_error_type)

<aside class="success">
This operation does not require authentication
</aside>

# Вивантаження сервісів

## POST /undeploy/{id}

> Code samples

```http
POST http://localhost:8080/undeploy/{id} HTTP/1.1
Host: localhost:8080

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'http://localhost:8080/undeploy/{id}',
  method: 'post',

  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

*Вивантажити сервіс з контейнера*

Повертає результат вивантаження сервісу з контейнера

### Parameters

Parameter|In|Type|Required|Description
---|---|---|---|---|
id|path|string|true|Ідентифікатор


> Example responses

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
```json
{
  "message": "string"
}
```
### Responses

Status|Meaning|Description|Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Відповідь сервісу|[res_state_type](#schemares_state_type)
400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Відповідь сервісу у разі помилки|[response_error_type](#schemaresponse_error_type)

<aside class="success">
This operation does not require authentication
</aside>

## POST /undeploy

> Code samples

```http
POST http://localhost:8080/undeploy HTTP/1.1
Host: localhost:8080
Content-Type: application/json
Accept: application/json

```

```javascript
var headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'

};

$.ajax({
  url: 'http://localhost:8080/undeploy',
  method: 'post',

  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

*Вивантажити сервіс з контейнера*

Повертає результат вивантаження сервісу з контейнера

> Body parameter

```json
{
  "id": "string"
}
```
### Parameters

Parameter|In|Type|Required|Description
---|---|---|---|---|
body|body|[id_data_type](#schemaid_data_type)|false|No description
» id|body|string|true|Ідентифікатор


> Example responses

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
```json
{
  "message": "string"
}
```
### Responses

Status|Meaning|Description|Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Відповідь сервісу|[res_state_type](#schemares_state_type)
400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Відповідь сервісу у разі помилки|[response_error_type](#schemaresponse_error_type)

<aside class="success">
This operation does not require authentication
</aside>

# Виключення сервісів

## POST /terminate/{id}

> Code samples

```http
POST http://localhost:8080/terminate/{id} HTTP/1.1
Host: localhost:8080

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'http://localhost:8080/terminate/{id}',
  method: 'post',

  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

*Завершити сервіс в контейнері*

Повертає результат завершення сервісу в контейнері

### Parameters

Parameter|In|Type|Required|Description
---|---|---|---|---|
id|path|string|true|Ідентифікатор


> Example responses

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
```json
{
  "message": "string"
}
```
### Responses

Status|Meaning|Description|Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Відповідь сервісу|[res_state_type](#schemares_state_type)
400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Відповідь сервісу у разі помилки|[response_error_type](#schemaresponse_error_type)

<aside class="success">
This operation does not require authentication
</aside>

## POST /terminate

> Code samples

```http
POST http://localhost:8080/terminate HTTP/1.1
Host: localhost:8080
Content-Type: application/json
Accept: application/json

```

```javascript
var headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'

};

$.ajax({
  url: 'http://localhost:8080/terminate',
  method: 'post',

  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

*Завершити сервіс в контейнері*

Повертає результат завершення сервісу в контейнері

> Body parameter

```json
{
  "id": "string"
}
```
### Parameters

Parameter|In|Type|Required|Description
---|---|---|---|---|
body|body|[id_data_type](#schemaid_data_type)|false|No description
» id|body|string|true|Ідентифікатор


> Example responses

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
```json
{
  "message": "string"
}
```
### Responses

Status|Meaning|Description|Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Відповідь сервісу|[res_state_type](#schemares_state_type)
400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Відповідь сервісу у разі помилки|[response_error_type](#schemaresponse_error_type)

<aside class="success">
This operation does not require authentication
</aside>

# Налаштування сервісів

## POST /config/{id}

> Code samples

```http
POST http://localhost:8080/config/{id} HTTP/1.1
Host: localhost:8080
Content-Type: application/json
Accept: application/json

```

```javascript
var headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'

};

$.ajax({
  url: 'http://localhost:8080/config/{id}',
  method: 'post',

  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

*Налаштування сервісу в контейнері*

Повертає результат налаштування сервісу в контейнері

> Body parameter

```json
{
  "service": "string"
}
```
### Parameters

Parameter|In|Type|Required|Description
---|---|---|---|---|
id|path|string|true|Ідентифікатор
body|body|[req_service_type](#schemareq_service_type)|false|No description
» service|body|string|true|Конфігурація


> Example responses

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
```json
{
  "message": "string"
}
```
### Responses

Status|Meaning|Description|Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Відповідь сервісу|[res_state_type](#schemares_state_type)
400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Відповідь сервісу у разі помилки|[response_error_type](#schemaresponse_error_type)

<aside class="success">
This operation does not require authentication
</aside>

## POST /config

> Code samples

```http
POST http://localhost:8080/config HTTP/1.1
Host: localhost:8080
Content-Type: application/json
Accept: application/json

```

```javascript
var headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'

};

$.ajax({
  url: 'http://localhost:8080/config',
  method: 'post',

  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

*Налаштування сервісу в контейнері*

Повертає результат налаштування сервісу в контейнері

> Body parameter

```json
{
  "id": "string",
  "service": "string"
}
```
### Parameters

Parameter|In|Type|Required|Description
---|---|---|---|---|
body|body|[req_service_id_type](#schemareq_service_id_type)|false|No description
» id|body|string|true|Ідентифікатор
» service|body|string|true|Конфігурація


> Example responses

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
```json
{
  "message": "string"
}
```
### Responses

Status|Meaning|Description|Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Відповідь сервісу|[res_state_type](#schemares_state_type)
400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Відповідь сервісу у разі помилки|[response_error_type](#schemaresponse_error_type)

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

## id_data_type

<a name="schemaid_data_type"></a>

```json
{
  "id": "string"
} 
```

### Properties

Name|Type|Required|Description
---|---|---|---|
id|string|true|Ідентифікатор



## res_state_type

<a name="schemares_state_type"></a>

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

### Properties

Name|Type|Required|Description
---|---|---|---|
type|string|false|Назва сервісу
uri|string|false|URL для доступу
instance|string|false|Ідентифікатор контейнера
startedAt|string|false|Дата і час запуску контейнера
microservices|[string]|false|No description



## req_instance_data

<a name="schemareq_instance_data"></a>

```json
{
  "instance": "string",
  "uri": "string",
  "token": "string"
} 
```

### Properties

Name|Type|Required|Description
---|---|---|---|
instance|string|true|Ідентифікатор
uri|string|false|URL для запиту
token|string|true|Токен для запиту



## req_repo_id_type

<a name="schemareq_repo_id_type"></a>

```json
{
  "id": "string",
  "repo": "string"
} 
```

### Properties

Name|Type|Required|Description
---|---|---|---|
id|string|true|Ідентифікатор
repo|string|true|Шлях до репозиторію



## req_service_id_type

<a name="schemareq_service_id_type"></a>

```json
{
  "id": "string",
  "service": "string"
} 
```

### Properties

Name|Type|Required|Description
---|---|---|---|
id|string|true|Ідентифікатор
service|string|true|Конфігурація



## req_service_type

<a name="schemareq_service_type"></a>

```json
{
  "service": "string"
} 
```

### Properties

Name|Type|Required|Description
---|---|---|---|
service|string|true|Конфігурація



## req_repo_type

<a name="schemareq_repo_type"></a>

```json
{
  "repo": "string"
} 
```

### Properties

Name|Type|Required|Description
---|---|---|---|
repo|string|true|Шлях до репозиторію



## response_error_type

<a name="schemaresponse_error_type"></a>

```json
{
  "message": "string"
} 
```

### Properties

Name|Type|Required|Description
---|---|---|---|
message|string|true|Повідомлення про помилку



## response_message

<a name="schemaresponse_message"></a>

```json
{
  "message": "string"
} 
```

### Properties

Name|Type|Required|Description
---|---|---|---|
message|string|true|Повідомлення





