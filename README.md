# Generic Note Sdk

NodeJs通用云笔记数据访问SDK


## 数据结构

### note

| Field       |    Type  |
| :--------   | --------:|
| uid         |   string |
| title       |   string |
| author      |   string |
| sourceURL   |   string |
| length      |      int |
| createdTime | Timestamp|
| updatedTime | Timestamp|
| content     |   string |



### notebook

| Field       |    Type  |
| :--------   | --------:|
| uid         |   string |
| name        |   string |
| createdTime | Timestamp|
| updatedTime | Timestamp|



### user

| Field       |    Type  |
| :--------   | --------:|
| userName    |   string |
| createdTime | Timestamp|
| updatedTime | Timestamp|



## 安装

```javascript
$ npm install generic-note
```

## 使用

```javascript
var OAClient = GenericNote.OAuthClient(consumerKey, consumerSecret, 'evernote');
var genNote = GenericNote(accessToken, 'evernote');
```

## API

### OAClient.getRequestToken(callbackUrl, callback(error, obj))

  获取oauthToken，oauthTokenSecret
  
  
  
### OAClient.getAuthorizeUrl(oauthToken)

  返回authorize url
  

### OAClient.getAccessToken(oauthToken, oauthTokenSecret, oauthVerifier,callback(error, obj))
      
  获取oauthAccessToken

### genNote.getUser(callback(err, user))

  获取当前user信息。


### genNote.getNote(uid [,opts], callback(err, note))

  根据uid获取一篇笔记内容。
  其中opts为可选参数，可传的值有：

  * opts.withContent
  * opts.withResourcesData
  * opts.withResourcesRecognition
  * opts.withResourcesAlternateData


### genNote.listNoteUidsFromBook(bookUid, offset, maxSize, callback(err, noteUidsList))

  根据bookUid获取其下所有note uid列表。offset为起始偏移量，maxSize为返回最大数量。


### genNote.listAllBooks(callback(err, booklist))

  获取所有notebook列表。


### genNote.findNoteCounts(bookUid, callback(err, counts))

  根据bookUid获取当前book下note总数。


### genNote.listNotesMetadataFromBook(bookUid, offset, maxSize, callback(err, notelist))

  根据bookUid获取其下note的metadata列表信息。offset为起始偏移量，maxSize为返回最大数量。
