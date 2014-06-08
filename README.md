# Generic Note Sdk

NodeJs通用云笔记数据访问SDK


## 数据结构

### note

<table>
  <tr>
    <th>Field</th>
    <th>Type</th>
  </tr>
  <tr>
    <td>uid</td>
    <td>string</td>
  </tr>
  <tr>
    <td>title</td>
    <td>string</td>
  </tr>
  <tr>
    <td>author</td>
    <td>string</td>
  </tr>
  <tr>
    <td>sourceURL</td>
    <td>string</td>
  </tr>
  <tr>
    <td>length</td>
    <td>int</td>
  </tr>
  <tr>
    <td>createdTime</td>
    <td>Timestamp</td>
  </tr>
  <tr>
    <td>updatedTime</td>
    <td>Timestamp</td>
  </tr>
  <tr>
    <td>content</td>
    <td>string</td>
  </tr>
</table>

### notebook

<table>
  <tr>
    <th>Field</th>
    <th>Type</th>
  </tr>
  <tr>
    <td>uid</td>
    <td>string</td>
  </tr>
  <tr>
    <td>name</td>
    <td>string</td>
  </tr>
  <tr>
    <td>createdTime</td>
    <td>Timestamp</td>
  </tr>
  <tr>
    <td>updatedTime</td>
    <td>Timestamp</td>
  </tr>
</table>

### user

<table>
  <tr>
    <th>Field</th>
    <th>Type</th>
  </tr>
  <tr>
    <td>userName</td>
    <td>string</td>
  </tr>
  <tr>
    <td>createdTime</td>
    <td>Timestamp</td>
  </tr>
  <tr>
    <td>updatedTime</td>
    <td>Timestamp</td>
  </tr>
</table>

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


### listNoteUidsFromBook(bookUid, callback(err, noteUidsList))

  根据bookUid获取其下所有note uid列表。


### listAllNotebooks(callback(err, booklist))

  获取所有notebook列表。

