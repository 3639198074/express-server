const express = require('express');
const router = express.Router();
const fs = require('fs').promises
const createReadStream = require('fs').createReadStream
const filePath = 'E:\\作业指导书';

/**
 * 获取作业指导书文件列表
 */
router.post('/files', async function (req, res) {
  const { url } = req.body
  const params = filePath + "//" + url
  const fsFile = await fs.readdir(params, "utf-8")
  if (fsFile.length > 0) {
    const data = fsFile.map((item, index) => {
      return { id: index + 1, fileName: item, url: params + "//" + item }
    })
    return res.json({
      code: 200,
      data: data,
      message: "成功"
    })
  }
  return res.json({
    code: 500,
    data: [],
    message: "请添加作业指导书"
  })
})

/**
 * 检查文件是否存在
 */

router.post('/inspect', function (req, res) {
  const { url } = req.body
  fs.stat(url).then(() => {
    res.json({
      code: 200,
      data: true,
      message: "成功"
    })
  }).catch(() => {
    res.json({
      code: 500,
      data: false,
      message: "文件不存在,请选择正确的文件路径"
    })
  })
})

/**
 * 读取文件流
 */
router.post('/pdffilestream', function (req, res) {
  const { url } = req.body
  const fileStream = createReadStream(url);
  res.setHeader('Content-Type', 'application/pdf');
  fileStream.pipe(res);
})

module.exports = router;
