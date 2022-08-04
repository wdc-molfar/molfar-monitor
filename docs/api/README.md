# @molfar/molfar-monitor. Специфікація модуля

## Functions

<dl>
<dt><a href="#sendResponse">sendResponse(req, res)</a> ⇒ <code>Promise</code></dt>
<dd></dd>
<dt><a href="#sendInstanceResponse">sendInstanceResponse(req, res)</a> ⇒ <code>Promise</code></dt>
<dd></dd>
<dt><a href="#registerWebservice">registerWebservice(req, res)</a> ⇒ <code>Promise</code></dt>
<dd></dd>
<dt><a href="#unregisterWebservice">unregisterWebservice(req, res)</a> ⇒ <code>Promise</code></dt>
<dd></dd>
<dt><a href="#deployMicroserviceHandler">deployMicroserviceHandler(req, res)</a> ⇒ <code>Promise</code></dt>
<dd></dd>
<dt><a href="#startMicroserviceHandler">startMicroserviceHandler(req, res)</a> ⇒ <code>Promise</code></dt>
<dd></dd>
<dt><a href="#terminateMicroserviceHandler">terminateMicroserviceHandler(req, res)</a> ⇒ <code>Promise</code></dt>
<dd></dd>
<dt><a href="#undeployMicroserviceHandler">undeployMicroserviceHandler(req, res)</a> ⇒ <code>Promise</code></dt>
<dd></dd>
<dt><a href="#setMicroserviceConfigHandler">setMicroserviceConfigHandler(req, res)</a> ⇒ <code>Promise</code></dt>
<dd></dd>
<dt><a href="#getMsMetrics">getMsMetrics(req, res)</a> ⇒ <code>Promise</code></dt>
<dd><p>Повертає метрики стану мікросервісу</p>
</dd>
<dt><a href="#sendProxyRequest">sendProxyRequest(instance, path, method, data)</a> ⇒ <code>Promise</code></dt>
<dd></dd>
<dt><a href="#handlerAxiosRequest">handlerAxiosRequest(uri, method, data)</a> ⇒ <code>Promise</code></dt>
<dd></dd>
<dt><a href="#sendAxiosRequest">sendAxiosRequest(uri, method, data)</a> ⇒ <code>Promise</code></dt>
<dd></dd>
<dt><a href="#holdWebservice">holdWebservice(instance, uri, data)</a> ⇒ <code>Promise</code></dt>
<dd></dd>
<dt><a href="#unholdWebservice">unholdWebservice(instance)</a> ⇒ <code>Promise</code></dt>
<dd></dd>
</dl>

<a name="sendResponse"></a>

## sendResponse(req, res) ⇒ <code>Promise</code>
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Object</code> |  |
| req.output | <code>String</code> | Формат відповіді від сервісу |
| res | <code>Object</code> |  |

<a name="sendInstanceResponse"></a>

## sendInstanceResponse(req, res) ⇒ <code>Promise</code>
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Object</code> |  |
| req.output | <code>String</code> | Формат відповіді від сервісу |
| req.instance | <code>String</code> | Ідентифікатор ноди |
| res | <code>Object</code> |  |

<a name="registerWebservice"></a>

## registerWebservice(req, res) ⇒ <code>Promise</code>
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Object</code> |  |
| req.uri | <code>String</code> | uri сервісу |
| req.token | <code>String</code> | token для аутентифікації |
| req.instance | <code>String</code> | Ідентифікатор ноди |
| res | <code>Object</code> |  |

<a name="unregisterWebservice"></a>

## unregisterWebservice(req, res) ⇒ <code>Promise</code>
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Object</code> |  |
| req.token | <code>String</code> | token для аутентифікації |
| req.instance | <code>String</code> | Ідентифікатор ноди |
| res | <code>Object</code> |  |

<a name="deployMicroserviceHandler"></a>

## deployMicroserviceHandler(req, res) ⇒ <code>Promise</code>
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Object</code> |  |
| req.id | <code>String</code> | Ідентифікатор сервісу, для завантаження |
| req.instance | <code>String</code> | Ідентифікатор ноди |
| req.repo | <code>String</code> |  |
| res | <code>Object</code> |  |

<a name="startMicroserviceHandler"></a>

## startMicroserviceHandler(req, res) ⇒ <code>Promise</code>
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Object</code> |  |
| req.id | <code>String</code> | Ідентифікатор сервісу, для запуску |
| req.instance | <code>String</code> | Ідентифікатор ноди |
| req.service | <code>String</code> | Конфігурація для сервісу |
| res | <code>Object</code> |  |

<a name="terminateMicroserviceHandler"></a>

## terminateMicroserviceHandler(req, res) ⇒ <code>Promise</code>
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Object</code> |  |
| req.id | <code>String</code> | Ідентифікатор сервісу, для зупинки |
| req.instance | <code>String</code> | Ідентифікатор ноди |
| res | <code>Object</code> |  |

<a name="undeployMicroserviceHandler"></a>

## undeployMicroserviceHandler(req, res) ⇒ <code>Promise</code>
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Object</code> |  |
| req.id | <code>String</code> | Ідентифікатор сервісу, для вивантаження |
| res | <code>Object</code> |  |

<a name="setMicroserviceConfigHandler"></a>

## setMicroserviceConfigHandler(req, res) ⇒ <code>Promise</code>
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Object</code> |  |
| req.id | <code>String</code> | Ідентифікатор сервісу, для налашування |
| req.instance | <code>String</code> | Ідентифікатор ноди |
| req.service | <code>String</code> | Конфігурація для сервісу |
| res | <code>Object</code> |  |

<a name="getMsMetrics"></a>

## getMsMetrics(req, res) ⇒ <code>Promise</code>
Повертає метрики стану мікросервісу

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Object</code> |  |
| req.id | <code>String</code> | Ідентифікатор мікросервісу, для налашування |
| res | <code>Object</code> |  |

<a name="sendProxyRequest"></a>

## sendProxyRequest(instance, path, method, data) ⇒ <code>Promise</code>
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| instance | <code>String</code> | Ідентифікатор ноди |
| path | <code>String</code> | URL шлях для запиту |
| method | <code>String</code> | Тип запиту POST, GET та інші |
| data | <code>Object</code> | Дані, що надсилаються |

<a name="handlerAxiosRequest"></a>

## handlerAxiosRequest(uri, method, data) ⇒ <code>Promise</code>
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| uri | <code>String</code> | URL  для запиту |
| method | <code>String</code> | Тип запиту POST, GET та інші |
| data | <code>Object</code> | Дані, що надсилаються |

<a name="sendAxiosRequest"></a>

## sendAxiosRequest(uri, method, data) ⇒ <code>Promise</code>
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| uri | <code>String</code> | URL  для запиту |
| method | <code>String</code> | Тип запиту POST, GET та інші |
| data | <code>Object</code> | Дані, що надсилаються |

<a name="holdWebservice"></a>

## holdWebservice(instance, uri, data) ⇒ <code>Promise</code>
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| instance | <code>String</code> | Ідентифікатор ноди |
| uri | <code>String</code> | URL  для запиту |
| data | <code>Object</code> | Дані, що надсилаються |

<a name="unholdWebservice"></a>

## unholdWebservice(instance) ⇒ <code>Promise</code>
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| instance | <code>String</code> | Ідентифікатор ноди |

