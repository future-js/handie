/**
 * 受 Umi 3.x 的限制，必须多出来这么一个文件用来对 HTTP API 进行 mock
 *
 * @link https://v3.umijs.org/docs/mock
 */
module.exports = { ...require('../../mock') };
