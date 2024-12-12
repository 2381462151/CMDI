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
         <el-form-item label="状态" prop="status">
            <el-input
               v-model="queryParams.status"
               placeholder="请输入状态"
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
         <el-form-item>
            <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
            <el-button icon="Refresh" @click="resetQuery">重置</el-button>
            <el-tooltip effect="light" content="仅支持已提交但未经审批的流程撤回。" placement="top">
              <el-button icon="Delete" @click="revoke">撤回</el-button>
            </el-tooltip>
         </el-form-item>
      </el-form>


      <el-table max-height="300px" style="width: 100%"  v-loading="loading" :data="TaskList" @selection-change="handleSelectionChange"  @row-click="handleRowClick">
         <el-table-column type="selection" width="55" align="center" />
         <el-table-column label="任务标题" align="center" prop="taskTitle" />
         <el-table-column label="状态" align="center" prop="status"/>
         <el-table-column label="当前处理人" align="center" prop="currentHandler" />
         <el-table-column label="申请日期" align="center" prop="applyDate" sortable :formatter="formatApplyDate">
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

<script setup name="SH_MyApplication">
import { listTask, revokeTask } from "@/api/system/SHMyApplication";

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

// 模拟的20个任务数据
const mockTaskList = [
  { taskTitle: '任务1', status: '进行中', currentHandler: '张三', applyDate: '2024-01-01' },
  { taskTitle: '任务2', status: '已完成', currentHandler: '李四', applyDate: '2024-01-02' },
  { taskTitle: '任务3', status: '待审核', currentHandler: '王五', applyDate: '2024-01-03' },
  { taskTitle: '任务4', status: '进行中', currentHandler: '赵六', applyDate: '2024-01-04' },
  { taskTitle: '任务5', status: '已完成', currentHandler: '孙七', applyDate: '2024-01-05' },
  { taskTitle: '任务6', status: '待审核', currentHandler: '周八', applyDate: '2024-01-06' },
  { taskTitle: '任务7', status: '进行中', currentHandler: '吴九', applyDate: '2024-01-07' },
  { taskTitle: '任务8', status: '已完成', currentHandler: '郑十', applyDate: '2024-01-08' },
  { taskTitle: '任务9', status: '待审核', currentHandler: '钱十一', applyDate: '2024-01-09' },
  { taskTitle: '任务10', status: '进行中', currentHandler: '孙十二', applyDate: '2024-01-10' },
  { taskTitle: '任务11', status: '已完成', currentHandler: '李十三', applyDate: '2024-01-11' },
  { taskTitle: '任务12', status: '待审核', currentHandler: '周十四', applyDate: '2024-01-12' },
  { taskTitle: '任务13', status: '进行中', currentHandler: '吴十五', applyDate: '2024-01-13' },
  { taskTitle: '任务14', status: '已完成', currentHandler: '郑十六', applyDate: '2024-01-14' },
  { taskTitle: '任务15', status: '待审核', currentHandler: '王十七', applyDate: '2024-01-15' },
  { taskTitle: '任务16', status: '进行中', currentHandler: '冯十八', applyDate: '2024-01-16' },
  { taskTitle: '任务17', status: '已完成', currentHandler: '陈十九', applyDate: '2024-01-17' },
  { taskTitle: '任务18', status: '待审核', currentHandler: '褚二十', applyDate: '2024-01-18' },
  { taskTitle: '任务19', status: '进行中', currentHandler: '蒋二十一', applyDate: '2024-01-19' },
  { taskTitle: '任务20', status: '已完成', currentHandler: '沈二十二', applyDate: '2024-01-20' }
];

// const { queryParams, form, rules } = toRefs(data);
/** 查询公告列表 */
function getList() {
  // 设置总数
  loading.value = true;
total.value = mockTaskList.length;
// 手动赋值
TaskList.value = mockTaskList;
loading.value = false;
}
getList();
// /** 查询公告列表 */
// function getList() {
//   loading.value = true;
//   listTask(queryParams.value).then(response => {
//     TaskList.value = response.rows;
//     total.value = response.total;
//     loading.value = false;
//   });
// }

function revoke ()  {
  if (ids.value.length === 0) {
    ElMessage.warning('请至少选择一条记录！');
    return;
  }

  loading.value = true;
  revokeTask(queryParams.value)
    .then(response => {
      loading.value = false;
      if (response.data.success) {
        ElMessage.success('成功撤回');
      } else {
        ElMessage.error('仅支持已提交但未经审批的流程撤回。');
      }
    })
    .catch(error => {
      loading.value = false;
      ElMessage.error('撤回失败，请稍后重试。');
    });
};


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
  console.log(row.taskTitle);
  // // 假设 row 中包含了 path 和 id 信息
  // const path = row.path; // 从 row 中获取 path
  // const id = row.id; // 从 row 中获取 id

  // // 使用 Vue Router 进行路由跳转，并将 id 作为参数传递
  // router.push({ path: path, query: { param: id } });
//   router.push({
//   path: `/SH_submit/ShenHe_submit/${encodeURIComponent(JSON.stringify({ isNotEditable: true }))}`
// });
const data = {
  isNotEditable: true , // 包含对象的数据
  title: row.taskTitle // 包含字符串的数据
};
// 对整个数据对象进行编码
  // params: {
  //   params: encodeURIComponent(JSON.stringify({ isNotEditable: true })),
  //   // title: row.title
  //   title: row.title
  // }
const encodedData = encodeURIComponent(JSON.stringify(data));
router.push({
  name: 'ShenHe_submit',

  params: {
    params: encodedData // 将整个数据对象作为一个参数传递
  }
});
  // router.push({ path: '/SH_submit/ShenHe_submit'}); 
};


</script>
