 <!-- <el-row :gutter="20">
      <el-col :sm="24" :lg="24">
        <blockquote class="text-warning" style="font-size: 14px"> 
        </blockquote>
        <hr />
      </el-col>
    </el-row> -->
      <!-- <div style="background: #00afff">
        <span class="large-text">董程阳</span>
        <span class="small-text">欢迎回来</span>
        <br>    <span class="account-text">账号密码将于</span> <span style="color: yellow">2024-09-24 09:16:14</span> <span class="daoqi-text">到期</span>
        <span class="account-text">最后一次登录时间:</span> <span >2024-06-25 15:02:33</span>
        <br>
        <span class="account-text">所属机构:</span> <span>2024-06-25 15:02:33</span>
      </div> -->
<template>
  <div class="app-container home">
     <!-- 将这部分代码放在最上面的最右边 -->
     <div class="top-right-links text-row">
      <a
        v-for="(item, index) in NoTreeData.links"
        :key="item.key"
        class="link-item"
        @click="handleLinkClick(item)"
      >
        {{ item.key }}
      </a>
    </div>
    <div style="background: #00afff"  class="content-container">
      <span class="large-text">{{ NoTreeData.userName }}</span>
      <span class="small-text">欢迎回来</span>
      <br>
      <span class="account-text">账号密码将于</span> 
      <span :style="{ color: 'yellow' }">{{ NoTreeData.passwordExpiry }}</span> 
      <span class="daoqi-text">到期</span>
      <span class="account-text">最后一次登录时间:</span> 
      <span :style="{ color: 'yellow' }">{{ NoTreeData.lastLogin }}</span>
      <!-- <br> -->
      <span class="account-text">所属部门:</span> 
      <span :style="{ color: 'yellow' }">{{ NoTreeData.affiliation }}</span>
    </div>
    <!-- <template> -->
       <!-- <template> -->
          <el-scrollbar height="100px">
            <div v-for="(item) in NoTreeData.items" :key="item.id" class="scrollbar-demo-item">
              <!-- <el-checkbox v-model="item.selected" @change="deleteItem(item.id)">删除</el-checkbox> -->
              <span>{{ item.text }}</span>
              <!-- <el-button type="text" @click="deleteItem(item.id)">X</el-button> -->
            </div>
          </el-scrollbar>

          <!-- 添加全局删除按钮 -->
          <!-- <el-button @click="deleteSelectedItems" style="margin-top: 16px;">删除选中的项</el-button> -->

          <!-- 输入框及添加按钮 -->
          <!-- <el-input v-model="newItemText" placeholder="输入新项" style="margin-top: 16px;">
            <template #append>
              <el-button @click="addItem">添加</el-button>
            </template>
          </el-input> -->
        <!-- </template> -->
    <!-- </template> -->
    <!-- <el-divider class="custom-divider" /> -->
    <!-- <div class="text-row">
      <a
        v-for="(item, index) in NoTreeData.links"
        :key="item.key"
        class="link-item"
        @click="handleLinkClick(item)"
      >
        {{ item.key }}
      </a>
    </div> -->
  </div>
</template>

<script setup name="Index">
import { listMenu, updateConfig,updatesingleEditMenu } from "@/api/system/sh_index";
const version = ref('3.8.8')

// const NoTreeData= reactive({
//   userName: '',
//   passwordExpiry: '',
//   lastLogin: '',
//   affiliation: '', // 实际应用中应替换为正确的机构名称
//   links: [],
// items: [],
// });

// 使用 reactive 创建一个响应式的对象
const NoTreeData = reactive({
  userName: 'XXX',
  passwordExpiry: '2024-09-24 09:16:14',
  lastLogin: '2024-06-25 15:02:33',
  affiliation: '某机构名称', // 实际应用中应替换为正确的机构名称
  // links: [
  //   { key: '文件1', value: 'file1' },
  //   { key: '文件2', value: 'file2' },
  //   { key: '文件3', value: 'file3' }
  // ],
  links: [
  { key: '项目报表.xlsx', value: 'financial-report.xlsx' },
  { key: '项目计划.xlsx', value: 'project-plan.pdf' },
  { key: '会议记录.xlsx', value: 'meeting-minutes.docx' }
],
  items: [
//  { text: '项目1', id: '169384770034545678-0' },
//  { text: '项目2', id: '169384770034545678-1' },
//  { text: '项目3', id: '169384770034545678-2' },
//  { text: '项目4', id: '169384770034545678-3' },
//  { text: '项目5', id: '169384770034545678-4' },
//  { text: '项目6', id: '169384770034545678-5' },
//  { text: '项目7', id: '169384770034545678-6' },
//  { text: '项目8', id: '169384770034545678-7' },
//  { text: '项目9', id: '169384770034545678-8' }
{
  text: '系统通知：检测到您的账户存在登录异常，如非本人操作，请立即修改密码。',
  id: '169384770034545678-3',
  selected: false
},
{
  text: '系统通知：您有新的文件上传至系统，请及时查看。',
  id: '169384770034545678-4',
  selected: false
},
{
  text: '系统通知：系统将于今晚进行维护，届时服务可能会短暂中断。',
  id: '169384770034545678-5',
  selected: false
},
{
  text: '系统通知：您在2024-06-25的最后一次登录已被记录。',
  id: '169384770034545678-1',
  selected: false
}
]


});

const handleLinkClick = (value) => {
  // console.log('Clicked link with value:', value);
  // 在这里处理点击事件，例如跳转到另一个页面或执行其他操作
  /** 导出按钮操作 */

  proxy.download("monitor/job/export", {
    value,
  }, `${value.value}.docx`);
};



// function getList() {
//   // loading.value = true;
//   listMenu().then(response => {
//     NoTreeData.value=response.data
//     // NoTreeData.value=a_data

//     // menuList.value = proxy.handleTree(response.data, "menuId");
//     // loading.value = false;
//   });
// }
// getList()
function goTarget(url) {
  window.open(url, '__blank')
}
</script>

<style scoped lang="scss">
.app-container {
  position: relative; /* 确保父容器是相对定位 */
}
.top-right-links {
  position: absolute;
  right: 10px;
  top: 10px;
}

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
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }
  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}
.content-container {
  background-color: #00afff;
  padding: 10px;
  position: relative;
  margin-bottom: 20px; /* 控制与下方文字的距离 */
  margin-top: 20px;
}

.large-text {
  font-size: 24px;
}

.small-text {
  font-size: 14px;
}

.account-text {
  font-size: 16px;
}

.daoqi-text {
  font-size: 16px;
}

.text-row {
  display: flex;
 // justify-content: center;
  //align-items: center;
  //height: 40px; /* 高度可以根据需要调整 */
 // margin-bottom: 20px; /* 控制与分割线的距离 */
 color: red; /* 设置文本颜色为红色 */
}

.custom-divider {
  border-top: 1px dashed #ccc;
}

.link-item {
  margin-right: 10px; /* 控制链接之间的间距 */
  text-decoration: none; /* 移除默认下划线 */
  color: inherit; /* 继承父元素的颜色 */
}
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  // margin: 10px;
  margin-bottom: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>

