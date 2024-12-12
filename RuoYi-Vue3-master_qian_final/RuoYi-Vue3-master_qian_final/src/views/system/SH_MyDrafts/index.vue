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
         <el-form-item label="保存日期" style="width: 308px">
            <el-date-picker
               v-model="queryParams.dateRange"
               value-format="YYYY-MM-DD"
               type="daterange"
               range-separator="-"
               start-placeholder="开始日期"
               end-placeholder="结束日期"
            ></el-date-picker>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
            <el-button icon="Refresh" @click="resetQuery">重置</el-button>
            <el-button icon="Delete" @click="resetQuery">删除</el-button>
            <!-- <el-tooltip effect="light" content="仅支持已提交但未经审批的流程撤回。" placement="top">
              <el-button icon="Refresh" @click="revoke">撤回</el-button>
            </el-tooltip> -->
         </el-form-item>
      </el-form>


      <el-table  max-height="300px" style="width: 100%" v-loading="loading" :data="TaskList" @selection-change="handleSelectionChange"  @row-click="handleRowClick">
         <el-table-column type="selection" width="55" align="center" />
         <el-table-column label="任务标题" align="center" prop="taskTitle"  />
          <el-table-column label="保存日期" align="center" prop="receivedDate" sortable :formatter="formatReceivedDate">
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

<script setup name="SH_ToDoList">
import { listTask } from "@/api/system/SHMyDrafts";
function formatReceivedDate(row, column, cellValue, index) {
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
    dateRange: undefined,
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
  { taskTitle: '任务1', receivedDate: '2024-01-01' },
  { taskTitle: '任务2', receivedDate: '2024-01-02' },
  { taskTitle: '任务3', receivedDate: '2024-01-03' },
  { taskTitle: '任务4', receivedDate: '2024-01-04' },
  { taskTitle: '任务5', receivedDate: '2024-01-05' },
  { taskTitle: '任务6', receivedDate: '2024-01-06' },
  { taskTitle: '任务7', receivedDate: '2024-01-07' },
  { taskTitle: '任务8', receivedDate: '2024-01-08' },
  { taskTitle: '任务9', receivedDate: '2024-01-09' },
  { taskTitle: '任务10', receivedDate: '2024-01-10' },
  { taskTitle: '任务11', receivedDate: '2024-01-11' },
  { taskTitle: '任务12', receivedDate: '2024-01-12' },
  { taskTitle: '任务13', receivedDate: '2024-01-13' },
  { taskTitle: '任务14', receivedDate: '2024-01-14' },
  { taskTitle: '任务15', receivedDate: '2024-01-15' },
  { taskTitle: '任务16', receivedDate: '2024-01-16' },
  { taskTitle: '任务17', receivedDate: '2024-01-17' },
  { taskTitle: '任务18', receivedDate: '2024-01-18' },
  { taskTitle: '任务19', receivedDate: '2024-01-19' },
  { taskTitle: '任务20', receivedDate: '2024-01-20' }
];
/** 查询公告列表 */
function getList() {
  // 设置总数
  loading.value = true;
total.value = mockTaskList.length;
// 手动赋值
TaskList.value = mockTaskList;
loading.value = false;
}

// /** 查询公告列表 */
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
//   // 假设 row 中包含了 path 和 id 信息
//   const path = row.path; // 从 row 中获取 path
//   const id = row.id; // 从 row 中获取 id

//   // 使用 Vue Router 进行路由跳转，并将 id 作为参数传递
//   router.push({ path: path, query: { param: id } });

router.push({ path: '/SH_submit/ShenHe_submit'}); 
};

getList();
</script>
