<template>
  <div style="background: #00afff">
    <span class="large-text">董程阳</span>
    <span class="small-text">欢迎回来</span>
    <br>
    <span class="account-text">账号将于</span> <span style="color: yellow">2024-09-28 00:00:00</span> <span class="daoqi-text">到期</span>
    <span class="account-text">密码将于</span> <span style="color: yellow">2024-09-24 09:16:14</span> <span class="daoqi-text">到期</span>
    <span class="account-text">最后一次登录时间:</span> <span style="color: yellow">2024-06-25 15:02:33</span>
    <br>
    <span class="dibu-text"></span>
  </div>

  <div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      accountExpirationDate: '2024-09-28',
      passwordResetTime: '2024-09-04 09:16:41',
      lastLoginTime: '2024-06-25 15:04:48',
      numberOfPendingTasks: 0,
      numberOfPendingApprovals: 0,
      fromAccountAuthorizationReminder: 0,
      accountPasswordValidityReminder: 0,
    };
  },
};
</script>

<style scoped>
.large-text {
  font-size: 24px; /* 调整为你需要的大小 */
  margin-left: 40px; /* 调整为你需要的间距，增加距离 */
  padding-top: 25px; /* 增加上方的空间，调整为你需要的值 */
  padding-bottom: 10px; /* 增加下方的空间 */
  display: inline-block; /* 确保padding-top有效 */
  color: white; /* 设置字体颜色为白色 */
}
.small-text {
  font-size: 18px; /* 调整为你需要的大小 */
  margin-left: 20px; /* 调整为你需要的间距 */
  color: white; /* 设置字体颜色为白色 */
  padding-bottom: 10px; /* 增加下方的空间 */
}

.account-text {
  font-size: 15px; /* 调整为你需要的大小 */
  margin-left: 40px; /* 调整为你需要的间距 */
  color: white; /* 设置字体颜色为白色 */
}
.daoqi-text {
  font-size: 15px; /* 调整为你需要的大小 */
  color: white; /* 设置字体颜色为白色 */
}

.dibu-text {
  padding-top: 10px; /* 增加上方的空间，调整为你需要的值 */
  font-size: 3px; /* 调整为你需要的大小 */
  margin-left: 20px; /* 调整为你需要的间距 */
}
</style>
