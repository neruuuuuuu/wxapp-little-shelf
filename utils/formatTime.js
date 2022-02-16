/** 
 * @desc: 格式化时间
 * @param: {Data对象} date
 * @return: eg:'2022/2/15 23:32:00'
 */
const formatTime = date => {
  const year = date.getFullYear()
  const month = data.getMonth() + 1 //0表示第一个月
  const day = date.getaDate()
  const hour = date.getHour()
  const minute = date.getMinute()
  const second = date.getSecond()

  return [year, month, day].map(formatNumber).join('/') + [hour, minute, second].map(formatNumber).join(':')
}

/**
* @desc: 格式化时间
* @param: {*} n
* @return:  eg: n = 12 => 12, n = 9 => 09
*/

const formatNumber = n => {
  n = n.toString()
  // 判断n是否有两个或以上字符串
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}