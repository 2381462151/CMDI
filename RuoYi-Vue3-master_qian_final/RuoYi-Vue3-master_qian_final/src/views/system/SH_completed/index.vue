<template>
   <div class="app-container">
      <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch">
         <el-form-item label="任务标题" prop="taskTitle">
            <el-input
               v-model="queryParams.taskTitle"
               placeholder="请输入任务标题"
               clearable
               style="width: 200px"
               @keyup.enter="handleQuery"
            />
         </el-form-item>
         <el-form-item label="发起人姓名" prop="initiatorName">
            <el-input
              v-model="queryParams.initiatorName"
              placeholder="请输入发起人姓名"
              clearable
              style="width: 200px"
              @keyup.enter="handleQuery"
            />
          </el-form-item>
         <el-form-item label="申请时间" style="width: 308px">
            <el-date-picker
               v-model="queryParams.dateRange"
               value-format="YYYY-MM-DD"
               type="daterange"
               range-separator="-"
               start-placeholder="开始日期"
               end-placeholder="结束日期"
            ></el-date-picker>
         </el-form-item>
         <el-form-item label="状态" prop="status">
          <el-input
            v-model="queryParams.status"
            placeholder="请输入状态"
            clearable
            style="width: 200px"
            @keyup.enter="handleQuery"
          />
        </el-form-item>
         <el-form-item>
            <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
            <el-button icon="Refresh" @click="resetQuery">重置</el-button>
            <!-- <el-tooltip effect="light" content="仅支持已提交但未经审批的流程撤回。" placement="top">
              <el-button icon="Refresh" @click="revoke">撤回</el-button>
            </el-tooltip> -->
         </el-form-item>
      </el-form>


      <el-table v-loading="loading" :data="TaskList" @selection-change="handleSelectionChange"  @row-click="handleRowClick">
         <!-- <el-table-column type="selection" width="55" align="center" /> -->
         <el-table-column label="任务标题" align="center" prop="taskTitle"  />
         <el-table-column label="发起人" align="center" prop="initiatorName" />
         <el-table-column label="状态" align="center" prop="status"/>
         <el-table-column label="当前处理人" align="center" prop="previousSubmitter" />
         <el-table-column label="流程办结日期" align="center" prop="processCompletionDate" sortable :formatter="formatProcessCompletionDate">
        </el-table-column>
      </el-table>

      <pagination
         v-show="total > 0"
         :total="total"
         v-model:page="queryParams.pageNum"
         v-model:limit="queryParams.pageSize"
         @pagination="getList"
      />

   </div>
</template>

<script setup name="SH_Completed">
import { listTask } from "@/api/system/SHCompleted";
function formatProcessCompletionDate(row, column, cellValue, index) {
 // 将时间戳转换为 Date 对象
 const date_format = new Date(cellValue);

// 格式化日期
const year = date_format.getFullYear();
const month = String(date_format.getMonth() + 1).padStart(2, '0');
const day = String(date_format.getDate()).padStart(2, '0');
const hours = String(date_format.getHours()).padStart(2, '0');
const minutes = String(date_format.getMinutes()).padStart(2, '0');
const seconds = String(date_format.getSeconds()).padStart(2, '0');

return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
const { proxy } = getCurrentInstance();
// const { sys_notice_status, sys_notice_type } = proxy.useDict("sys_notice_status", "sys_notice_type");
const router = useRouter();
const TaskList = ref([]);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
// const title = ref("");
// const dateRange = ref([]);

const data = reactive({
//   form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    taskTitle: undefined,
    createBy: undefined,
    status: undefined,
  },
//   rules: {
//     noticeTitle: [{ required: true, message: "公告标题不能为空", trigger: "blur" }],
//     noticeType: [{ required: true, message: "公告类型不能为空", trigger: "change" }]
//   },
});
const { queryParams } = toRefs(data);

// const { queryParams, form, rules } = toRefs(data);
// 模拟的20个任务数据
const mockTaskList = [
  { taskTitle: '任务1', initiatorName: '张三', status: '进行中', previousSubmitter: '李四', processCompletionDate: '2024-02-01' },
  { taskTitle: '任务2', initiatorName: '王五', status: '已完成', previousSubmitter: '赵六', processCompletionDate: '2024-02-02' },
  { taskTitle: '任务3', initiatorName: '孙七', status: '待审核', previousSubmitter: '周八', processCompletionDate: '2024-02-03' },
  { taskTitle: '任务4', initiatorName: '吴九', status: '进行中', previousSubmitter: '郑十', processCompletionDate: '2024-02-04' },
  { taskTitle: '任务5', initiatorName: '钱十一', status: '已完成', previousSubmitter: '孙十二', processCompletionDate: '2024-02-05' },
  { taskTitle: '任务6', initiatorName: '李十三', status: '待审核', previousSubmitter: '周十四', processCompletionDate: '2024-02-06' },
  { taskTitle: '任务7', initiatorName: '吴十五', status: '进行中', previousSubmitter: '郑十六', processCompletionDate: '2024-02-07' },
  { taskTitle: '任务8', initiatorName: '王十七', status: '已完成', previousSubmitter: '冯十八', processCompletionDate: '2024-02-08' },
  { taskTitle: '任务9', initiatorName: '陈十九', status: '待审核', previousSubmitter: '褚二十', processCompletionDate: '2024-02-09' },
  { taskTitle: '任务10', initiatorName: '蒋二十一', status: '进行中', previousSubmitter: '沈二十二', processCompletionDate: '2024-02-10' },
  { taskTitle: '任务11', initiatorName: '韩二十三', status: '已完成', previousSubmitter: '杨二十四', processCompletionDate: '2024-02-11' },
  { taskTitle: '任务12', initiatorName: '朱二十五', status: '待审核', previousSubmitter: '秦二十六', processCompletionDate: '2024-02-12' },
  { taskTitle: '任务13', initiatorName: '尤二十七', status: '进行中', previousSubmitter: '许二十八', processCompletionDate: '2024-02-13' },
  { taskTitle: '任务14', initiatorName: '何二十九', status: '已完成', previousSubmitter: '吕三十', processCompletionDate: '2024-02-14' },
  { taskTitle: '任务15', initiatorName: '张三十一', status: '待审核', previousSubmitter: '孔三十二', processCompletionDate: '2024-02-15' },
  { taskTitle: '任务16', initiatorName: '曹三十三', status: '进行中', previousSubmitter: '严三十四', processCompletionDate: '2024-02-16' },
  { taskTitle: '任务17', initiatorName: '华三十五', status: '已完成', previousSubmitter: '金三十六', processCompletionDate: '2024-02-17' },
  { taskTitle: '任务18', initiatorName: '魏三十七', status: '待审核', previousSubmitter: '陶三十八', processCompletionDate: '2024-02-18' },
  { taskTitle: '任务19', initiatorName: '姜三十九', status: '进行中', previousSubmitter: '戚四十', processCompletionDate: '2024-02-19' },
  { taskTitle: '任务20', initiatorName: '谢四十一', status: '已完成', previousSubmitter: '邹四十二', processCompletionDate: '2024-02-20' }
];

function getList() {
  loading.value = true;
 // 设置总数
total.value = mockTaskList.length;
// 手动赋值
TaskList.value = mockTaskList;
loading.value = false;
}
/** 查询公告列表 */
// function getList() {
//   loading.value = true;
//   listTask(queryParams.value).then(response => {
//     TaskList.value = response.rows;
//     total.value = response.total;
//     loading.value = false;
//   });
// }

// function revoke ()  {
//   if (ids.value.length === 0) {
//     ElMessage.warning('请至少选择一条记录！');
//     return;
//   }

//   loading.value = true;
//   revokeTask(queryParams.value)
//     .then(response => {
//       loading.value = false;
//       if (response.data.success) {
//         ElMessage.success('成功撤回');
//       } else {
//         ElMessage.error('仅支持已提交但未经审批的流程撤回。');
//       }
//     })
//     .catch(error => {
//       loading.value = false;
//       ElMessage.error('撤回失败，请稍后重试。');
//     });
// };


/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
function formatApplyDate(row, column, cellValue, index) {
   // 将时间戳转换为 Date 对象
   const date_format = new Date(cellValue);

// 格式化日期
const year = date_format.getFullYear();
const month = String(date_format.getMonth() + 1).padStart(2, '0');
const day = String(date_format.getDate()).padStart(2, '0');
const hours = String(date_format.getHours()).padStart(2, '0');
const minutes = String(date_format.getMinutes()).padStart(2, '0');
const seconds = String(date_format.getSeconds()).padStart(2, '0');

return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
}

/** 多选框选中数据 */
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.ApplicationId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

function handleRowClick (row, column, event)  {
  // // 假设 row 中包含了 path 和 id 信息
  // const path = row.path; // 从 row 中获取 path
  // const id = row.id; // 从 row 中获取 id

  // // 使用 Vue Router 进行路由跳转，并将 id 作为参数传递
  // router.push({ path: path, query: { param: id } });
// 使用 router.push 方法跳转
// router.push({ path: '/SH_submit/ShenHe_submit'}); 
// router.push({
//   path: `/SH_submit/ShenHe_submit/${encodeURIComponent(JSON.stringify({ isNotEditable: true }))}`
// });
router.push({
  name: 'ShenHe_submit',
  params: {
    params: encodeURIComponent(JSON.stringify({ isNotEditable: true }))
  }
});
}
getList();
</script>
