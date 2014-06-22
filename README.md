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

```
$ npm install generic-note
```

## API

### getUser(callback(err, user))

  获取当前user信息。


### getNote(uid [,opts], callback(err, note))

  根据uid获取一篇笔记内容。
  其中opts为可选参数，可传的值有：

  * opts.withContent
  * opts.withResourcesData
  * opts.withResourcesRecognition
  * opts.withResourcesAlternateData


### listNoteUidsFromBook(bookUid, offset, maxSize, callback(err, noteUidsList))

  根据bookUid获取其下所有note uid列表。offset为起始偏移量，maxSize为返回最大数量。


### listAllBooks(callback(err, booklist))

  获取所有notebook列表。


### findNoteCounts(bookUid, callback(err, counts))

  根据bookUid获取当前book下note总数。


### listNotesMetadataFromBook(bookUid, offset, maxSize, callback(err, notelist))

  根据bookUid获取其下note的metadata列表信息。offset为起始偏移量，maxSize为返回最大数量。
