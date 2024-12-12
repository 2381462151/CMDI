
<template>
  <div class="app-container">
    <!-- <el-form :model="EmployeeTotalqueryParams" ref="EmployeeTotalqueryRef" v-show="EmployeeTotalshowSearch" :inline="true" label-width="68px">
      <el-form-item label="年份" prop="completionYear">
        <el-input
          v-model="EmployeeTotalqueryParams.completionYear"
          placeholder="请输入年份"
          clearable
          style="width: 240px"
          @keyup.enter="handleEmployeeTotalQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleEmployeeTotalQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetEmployeeTotalQuery">重置</el-button>
      </el-form-item>
    </el-form> -->
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExportCurrent"
          v-hasPermi="['system:role:export']"
        >Current数据导出</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExportTotal"
          v-hasPermi="['system:role:export']"
        >Total数据导出</el-button>
      </el-col>
      <!-- <right-toolbar v-model:showSearch="EmployeeTotalshowSearch" @queryTable="getEmployeeAllList"></right-toolbar> -->
    </el-row>
    <el-row> 
             <!-- DepartmentTotalqueryParams -->
            <el-form :model="EmployeeTotalqueryParams" ref="queryRef" v-show="EmployeeTotalshowSearch" :inline="true" label-width="90px">
            <el-form-item label="部门名称：" prop="departmentName">
                  <el-input
                     v-model="EmployeeTotalqueryParams.departmentName"
                     placeholder="请输入部门名称"
                     clearable
                     style="width: 200px"
                     @keyup.enter="handleEmployeeTotalQuery"
                  />
               </el-form-item>
               <el-form-item label="员工名称：" prop="employeeName">
                  <el-input
                     v-model="EmployeeTotalqueryParams.employeeName"
                     placeholder="请输入员工名称"
                     clearable
                     style="width: 200px"
                     @keyup.enter="handleEmployeeTotalQuery"
                  />
               </el-form-item>
               <!-- <el-form-item label="项目名称" prop="projectName">
                  <el-input
                     v-model="queryParams.projectName"
                     placeholder="请输入项目名称"
                     clearable
                     style="width: 200px"
                     @keyup.enter="handleQuery"
                  />
               </el-form-item> -->
               <!-- <el-form-item label="成员名称" prop="memberName">
                  <el-input
                     v-model="queryParams.memberName"
                     placeholder="请输入成员名称"
                     clearable
                     style="width: 200px"
                     @keyup.enter="handleQuery"
                  />
               </el-form-item> -->
               <el-form-item label="年份：" prop="completionYear">
                  <el-input
                     v-model="EmployeeTotalqueryParams.completionYear"
                     placeholder="请输入年份"
                     clearable
                     style="width: 200px"
                     @keyup.enter="handleEmployeeTotalQuery"
                  />
               </el-form-item>
               <el-form-item>
                  <el-button type="primary" icon="Search" @click="handleEmployeeTotalQuery">搜索</el-button>
                  <el-button icon="Refresh" @click="resetEmployeeTotalQuery">重置</el-button>
               </el-form-item>
            </el-form>
     
         <!-- <el-col :span="1.5">
            <el-button
               type="warning"
               plain
               icon="Download"
               @click="handleExport"
               v-hasPermi="['system:role:export']"
            >导出</el-button>
         </el-col> -->
         <!-- <right-toolbar v-model:showSearch="showTotalEmployeeSearch" @queryTable="getTotalEmployeeList"></right-toolbar> -->
      </el-row>
 

    <!-- 表格数据 -->
    <el-table   max-height="300px" style="width: 100%" v-loading="EmployeeTotalLoading" :data="EmployeeTotalDataList" @selection-change="handleEmployeeTotalSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="部门名称" prop="departmentName"  align="center"/>
      <el-table-column label="员工姓名" prop="employeeName"  align="center"/>
      <el-table-column label="年度" prop="completionYear" :show-overflow-tooltip="true"  align="center" />
      <el-table-column label="年度总分" prop="AnnualtotalPersonalScore" :show-overflow-tooltip="true"  align="center"/>
      <el-table-column label="部门年度排名/公司年度排名" align="center">
        <template #default="scope">
          {{ scope.row.departmentAnnualRanking }}/{{ scope.row.companyAnnualRanking }}
        </template>
      </el-table-column>
      <el-table-column label="个人总分" prop="totalPersonalScore" :show-overflow-tooltip="true"  align="center"/>
      <el-table-column label="部门总排名/公司总排名"  align="center">
        <template #default="scope">
          {{ scope.row.departmentTotalRanking }}/{{ scope.row.companyTotalRanking}}
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="employeeALLtotal > 0"
      :total="employeeALLtotal"
      v-model:page="EmployeeTotalqueryParams.pageNum"
      v-model:limit="EmployeeTotalqueryParams.pageSize"
      @pagination="getTotalEmployeeList"
    />
    <el-divider border-style="dashed" /> 
    <el-form :model="EmployeeDetailqueryParams" ref="EmployeeDetailqueryRef" v-show="EmployeeDetailshowSearch" :inline="true" label-width="68px">
        <el-form-item label="部门名称" prop="departmentName">
            <el-input
               v-model="EmployeeDetailqueryParams.departmentName"
               placeholder="请输入部门名称"
               clearable
               style="width: 240px"
               @keyup.enter="handleEmployeeDetailQuery"
            />
         </el-form-item>
        <el-form-item label="员工名称" prop="employeeName">
            <el-input
               v-model="EmployeeDetailqueryParams.employeeName"
               placeholder="请输入员工名称"
               clearable
               style="width: 240px"
               @keyup.enter="handleEmployeeDetailQuery"
            />
         </el-form-item>
         <el-form-item label="项目名称" prop="projectName">
           <el-input
              v-model="EmployeeDetailqueryParams.projectName"
              placeholder="请输入项目名称"
              clearable
              style="width: 240px"
              @keyup.enter="handleEmployeeDetailQuery"
           />
        </el-form-item>
         <el-form-item label="成员名称" prop="memberName">
            <el-input
               v-model="EmployeeDetailqueryParams.memberName"
               placeholder="请输入成员名称"
               clearable
               style="width: 240px"
               @keyup.enter="handleEmployeeDetailQuery"
            />
         </el-form-item>
         <el-form-item label="年份" prop="completionYear">
            <el-input
               v-model="EmployeeDetailqueryParams.completionYear"
               placeholder="请输入年份"
               clearable
               style="width: 240px"
               @keyup.enter="handleEmployeeDetailQuery"
            />
         </el-form-item>
         <el-form-item>
            <el-button type="primary" icon="Search" @click="handleEmployeeDetailQuery">搜索</el-button>
            <el-button icon="Refresh" @click="resetEmployeeDetailQuery">重置</el-button>
         </el-form-item>
      </el-form>
      <el-row :gutter="10" class="mb8">
        
         <!-- <el-col :span="1.5">
            <el-button
               type="warning"
               plain
               icon="Download"
               @click="handleExport"
               v-hasPermi="['system:role:export']"
            >导出</el-button>
         </el-col> -->
         <!-- <right-toolbar v-model:showSearch="showEmployeeDetailSearch" @queryTable="getEmployeeDetailList"></right-toolbar> -->
      </el-row>

      <!-- 表格数据 -->
      <el-table  max-height="300px" style="width: 100%" v-loading="EmployeeDetailloading" :data="EmployeeDetailDataList" @selection-change="handleEmployeeDetailSelectionChange">
        <el-table-column type="selection"   align="center" />
        <el-table-column label="部门名称" prop="departmentName" align="center"/>
        <el-table-column label="员工姓名" prop="employeeName"  align="center"/>
        <el-table-column label="项目名称" prop="projectName"  :show-overflow-tooltip="true" align="center"/>
        <el-table-column label="成员名称" prop="memberName" :show-overflow-tooltip="true" align="center"/>
        <el-table-column label="年份" prop="completionYear" :show-overflow-tooltip="true"  align="center"/>
        <el-table-column label="项目分数" prop="personalScore"   align="center"/>
         <!-- <el-table-column label="部门排名/公司排名" width="100">
          <template #default="scope">
            {{ scope.row.departmentRanking }}/{{ scope.row.CompanyRanking }}
          </template>
        </el-table-column> -->
         <!-- <el-table-column label="项目名称" prop="projectName" width="120" :show-overflow-tooltip="true"/>
         <el-table-column label="成员名称" prop="memberName" :show-overflow-tooltip="true" width="150" />
         <el-table-column label="提交年份" prop="completionYear" :show-overflow-tooltip="true" width="150" />
         <el-table-column label="项目分数" prop="personalScore" width="100" /> -->
         <!-- <el-table-column label="个人总分" prop="totalPersonalScore" width="100" /> -->
         <!-- <el-table-column label="部门排名/公司排名" prop="departmentRanking/CompanyRanking" width="100" />       -->
      </el-table>
      <!-- <pagination> 标签：
      <pagination> 是一个自定义组件，通常用于实现分页功能。
      v-show="total > 0"：
      v-show 是 Vue.js 的一个指令，用于控制元素的显示。当 total > 0 时，该分页组件才会显示。
      total 通常代表数据总数，当总数大于零时，表示有数据需要分页显示。
      :total="total"：
      :total 是传递给 pagination 组件的一个属性，它告诉分页组件当前数据的总数。
      total 的值来自父组件的 total 数据属性，它应该是从后端获取的数据总数。
      v-model:page="queryParams.pageNum"：
      v-model:page 使用 Vue.js 的 v-model 指令来双向绑定分页组件的当前页码。
      queryParams.pageNum 是父组件中的一个数据属性，用于保存当前页码。
      当用户在分页组件中选择新的页码时，queryParams.pageNum 的值会被更新，触发重新加载数据。
      v-model:limit="queryParams.pageSize"：
      v-model:limit 同样使用 v-model 指令来双向绑定分页组件的每页显示数量。
      queryParams.pageSize 是父组件中的一个数据属性，用于保存每页显示的记录数。
      当用户更改每页显示的数量时，queryParams.pageSize 的值会被更新，同样触发重新加载数据。
      **@pagination="getList"****：
      @pagination 是一个事件监听器，用于监听分页组件发出的 pagination 事件。
      当分页组件的页码或每页数量发生变化时，会触发这个事件。
      getList 是父组件中的一个方法，当事件触发时会执行这个方法来重新获取数据。
      getList 方法通常会根据当前的 queryParams.pageNum 和 queryParams.pageSize 从后端请求数据。 -->
      <pagination
         v-show="EmployeeDetailtotal > 0"
         :total="EmployeeDetailtotal"
         v-model:page="EmployeeDetailqueryParams.pageNum"
         v-model:limit="EmployeeDetailqueryParams.pageSize"
         @pagination="getEmployeeDetailList"
      />
  </div>

</template>

<script setup name="SHEmployee">
import { listTotalEmployee,listCurrentEmployee} from "@/api/system/SHEmployee";
const DepartmentTotalshowSearch = ref(true);
const EmployeeTotalshowSearch = ref(true);
const EmployeeDetailshowSearch = ref(true);
const { proxy } = getCurrentInstance();

const EmployeeTotalDataList = ref([]);
const EmployeeTotalLoading = ref(true);

const employeeALLtotal = ref(0);

// const dateRange = ref([]);
const CurrentUserName = ref('');
const Department = ref('');


const EmployeeTotaldata = reactive({
  form: {},
  EmployeeTotalqueryParams: {
    pageNum: 1,
    pageSize: 10,
    // employeeName: undefined,
    // projectName: undefined,
    // memberName: undefined,
    completionYear: undefined,
    // departmentName:  undefined,
    Ids:[],
    AllIds:[],
  },
  rules: {
    roleName: [{ required: true, message: "角色名称不能为空", trigger: "blur" }],
    roleKey: [{ required: true, message: "权限字符不能为空", trigger: "blur" }],
    roleSort: [{ required: true, message: "角色顺序不能为空", trigger: "blur" }]
  },
});

const { EmployeeTotalqueryParams } = toRefs(EmployeeTotaldata);

/** 查询角色列表 */
// function getTotalEmployeeList() {
//   EmployeeTotalLoading.value = true;
//   // listPerson(proxy.addDateRange(queryParams.value, dateRange.value)).then(response => {
//     listTotalEmployee(EmployeeTotalqueryParams.value).then(response => {
//     CurrentUserName.value  =response.CurrentUserName
//     Department.value  =response.Department
//     EmployeeTotalDataList.value = response.rows;
//     employeeALLtotal.value = response.total;
//     EmployeeTotalLoading.value = false;
//   });
// }
/** 查询角色列表 */
function getTotalEmployeeList() {
  EmployeeTotalLoading.value = true;
  // listPerson(proxy.addDateRange(queryParams.value, dateRange.value)).then(response => {
//     listTotalEmployee(EmployeeTotalqueryParams.value).then(response => {
//     CurrentUserName.value  =response.CurrentUserName
//     Department.value  =response.Department
//     EmployeeTotalDataList.value = response.rows;
//     employeeALLtotal.value = response.total;
//     EmployeeTotalLoading.value = false;
//   });
   EmployeeTotalDataList.value = [
   
  {
    "departmentName": "技术部",
    "employeeName": "张三",
    "completionYear": "2019",
    "AnnualtotalPersonalScore": 92,
    "departmentEmployeeAnnualRanking": "1",
    "companyEmployeeAnnualRanking": "5",
    "totalPersonalScore": 350,
    "departmentTotalRanking": "2",
    "companyTotalRanking": "10"
  },
  {
    "departmentName": "技术部",
    "employeeName": "张三",
    "completionYear": "2020",
    "AnnualtotalPersonalScore": 96,
    "departmentEmployeeAnnualRanking": "1",
    "companyEmployeeAnnualRanking": "5",
    "totalPersonalScore": 367,
    "departmentTotalRanking": "2",
    "companyTotalRanking": "10"
  },
  {
    "departmentName": "技术部",
    "employeeName": "张三",
    "completionYear": "2021",
    "AnnualtotalPersonalScore": 101,
    "departmentEmployeeAnnualRanking": "1",
    "companyEmployeeAnnualRanking": "5",
    "totalPersonalScore": 386,
    "departmentTotalRanking": "2",
    "companyTotalRanking": "10"
  },
  {
    "departmentName": "技术部",
    "employeeName": "张三",
    "completionYear": "2022",
    "AnnualtotalPersonalScore": 106,
    "departmentEmployeeAnnualRanking": "1",
    "companyEmployeeAnnualRanking": "5",
    "totalPersonalScore": 407,
    "departmentTotalRanking": "2",
    "companyTotalRanking": "10"
  },
  {
    "departmentName": "技术部",
    "employeeName": "张三",
    "completionYear": "2023",
    "AnnualtotalPersonalScore": 111,
    "departmentEmployeeAnnualRanking": "1",
    "companyEmployeeAnnualRanking": "5",
    "totalPersonalScore": 428,
    "departmentTotalRanking": "2",
    "companyTotalRanking": "10"
  },
  {
    "departmentName": "技术部",
    "employeeName": "张三",
    "completionYear": "2024",
    "AnnualtotalPersonalScore": 116,
    "departmentEmployeeAnnualRanking": "1",
    "companyEmployeeAnnualRanking": "5",
    "totalPersonalScore": 452,
    "departmentTotalRanking": "2",
    "companyTotalRanking": "10"
  }

  // {
  //   "departmentName": "技术部",
  //   "employeeName": "张三",
  //   "completionYear": "2023",
  //   "AnnualtotalPersonalScore": 92,
  //   "departmentEmployeeAnnualRanking": "1",
  //   "companyEmployeeAnnualRanking": "5",
  //   "totalPersonalScore": 350,
  //   "departmentTotalRanking": "2",
  //   "companyTotalRanking": "10"
  // },
  // {
  //   "departmentName": "市场部",
  //   "employeeName": "李四",
  //   "completionYear": "2023",
  //   "AnnualtotalPersonalScore": 85,
  //   "departmentEmployeeAnnualRanking": "2",
  //   "companyEmployeeAnnualRanking": "8",
  //   "totalPersonalScore": 320,
  //   "departmentTotalRanking": "3",
  //   "companyTotalRanking": "15"
  // },
  // {
  //   "departmentName": "人事部",
  //   "employeeName": "王五",
  //   "completionYear": "2023",
  //   "AnnualtotalPersonalScore": 78,
  //   "departmentEmployeeAnnualRanking": "3",
  //   "companyEmployeeAnnualRanking": "12",
  //   "totalPersonalScore": 290,
  //   "departmentTotalRanking": "4",
  //   "companyTotalRanking": "20"
  // },
  // {
  //   "departmentName": "财务部",
  //   "employeeName": "赵六",
  //   "completionYear": "2023",
  //   "AnnualtotalPersonalScore": 88,
  //   "departmentEmployeeAnnualRanking": "4",
  //   "companyEmployeeAnnualRanking": "7",
  //   "totalPersonalScore": 310,
  //   "departmentTotalRanking": "5",
  //   "companyTotalRanking": "18"
  // },
  // {
  //   "departmentName": "研发部",
  //   "employeeName": "孙七",
  //   "completionYear": "2023",
  //   "AnnualtotalPersonalScore": 95,
  //   "departmentEmployeeAnnualRanking": "5",
  //   "companyEmployeeAnnualRanking": "2",
  //   "totalPersonalScore": 400,
  //   "departmentTotalRanking": "1",
  //   "companyTotalRanking": "1"
  // }
];
   CurrentUserName.value = "张三";
   Department.value = "技术部";
   employeeALLtotal.value = 150;
   EmployeeTotalLoading.value = false;
}
getTotalEmployeeList();
/** 搜索按钮操作 */
function handleEmployeeTotalQuery() {
  EmployeeTotalqueryParams.value.pageNum = 1;
  getTotalEmployeeList();
}

/** 重置按钮操作 */
function resetEmployeeTotalQuery() {
  // dateRange.value = [];
  proxy.resetForm("EmployeeTotalqueryRef");
  handleEmployeeTotalQuery();
}
function handleExportTotal() {
  const params = {
    ...flattenParams('EmployeeTotalqueryParams', EmployeeTotalqueryParams.value),
    ...flattenParams('EmployeeDetailqueryParams', EmployeeDetailqueryParams.value),
  };

  proxy.download("system/SHEmployee/totalExport", params, 
    `${departmentName}${currentUserName}_All_${new Date().getTime()}.xlsx`);
}

function handleExportCurrent() {
  const params = {
    ...flattenParams('EmployeeTotalqueryParams', EmployeeTotalqueryParams.value),
    ...flattenParams('EmployeeDetailqueryParams', EmployeeDetailqueryParams.value),
  };

  proxy.download("system/SHEmployee/Currentexport", params, 
    `${departmentName}${currentUserName}_Current_${new Date().getTime()}.xlsx`);
}

// 辅助函数，用于添加前缀并展开参数
function flattenParams(prefix, queryParams) {
  return Object.keys(queryParams).reduce((acc, key) => {
    acc[`${prefix}_${key}`] = queryParams[key];
    return acc;
  }, {});
}

/** 导出按钮操作 */
// function handleExportTotal() {
//   proxy.download("system/SHEmployee/totalExport", {
//     ...EmployeeTotalqueryParams.value,
//   }, `${departmentName}${currentUserName}_All_${new Date().getTime()}.xlsx`);
// }
// /** 导出按钮操作 */
// function handleExportCurrent() {
//   proxy.download("system/SHEmployee/Currentexport", {
//     ...EmployeeTotalqueryParams.value,
//   }, `${departmentName}${currentUserName}_Current_${new Date().getTime()}.xlsx`);
// }
/** 多选框选中数据 */
function handleEmployeeTotalSelectionChange(selection) {
  EmployeeTotalqueryParams.value.AllIds = selection.map(item => item.roleId);
  EmployeeTotalqueryParams.value.single = selection.length != 1;
  EmployeeTotalqueryParams.value.multiple = !selection.length;
}








// const { proxy } = getCurrentInstance();

const EmployeeDetailDataList = ref([]);
const EmployeeDetailloading = ref(true);

const EmployeeDetailtotal = ref(0);

// const dateRange = ref([]);




const  EmployeeDetaildata = reactive({
  // form: {},
  EmployeeDetailqueryParams: {
    pageNum: 1,
    pageSize: 10,
    employeeName: undefined,
    projectName: undefined,
    memberName: undefined,
    completionYear: undefined,
    departmentName:  undefined,
    ids:[],
  },
  // rules: {
  //   roleName: [{ required: true, message: "角色名称不能为空", trigger: "blur" }],
  //   roleKey: [{ required: true, message: "权限字符不能为空", trigger: "blur" }],
  //   roleSort: [{ required: true, message: "角色顺序不能为空", trigger: "blur" }]
  // },
});

const { EmployeeDetailqueryParams} = toRefs(EmployeeDetaildata);
function getEmployeeDetailList() {
  EmployeeDetailloading.value = true;
  // listPerson(proxy.addDateRange(queryParams.value, dateRange.value)).then(response => {
//     listCurrentEmployee(EmployeeDetailqueryParams.value).then(response => {
//     CurrentUserName.value  =response.CurrentUserName
//     Department.value  =response.Department
//     EmployeeDetailDataList.value = response.rows;
//     EmployeeDetailtotal.value = response.total;
//     EmployeeDetailloading.value = false;
//   });


    CurrentUserName.value = "张三";
    Department.value = "技术部";
    EmployeeDetailtotal.value = 150;
   //  CurrentUserName.value  =response.CurrentUserName
   //  Department.value  =response.Department
   //  EmployeeDetailDataList.value = response.rows;
   //  EmployeeDetailtotal.value = response.total;
   
    EmployeeDetailDataList.value = [
         {
            "departmentName": "技术部",
            "employeeName": "张三",
            "projectName": "项目A",
            "memberName": "成员1",
            "completionYear": "2023",
            "personalScore": 85
         },
         {
            "departmentName": "市场部",
            "employeeName": "李四",
            "projectName": "项目B",
            "memberName": "成员2",
            "completionYear": "2022",
            "personalScore": 90
         },
         {
            "departmentName": "人事部",
            "employeeName": "王五",
            "projectName": "项目C",
            "memberName": "成员3",
            "completionYear": "2024",
            "personalScore": 78
         },
         {
            "departmentName": "财务部",
            "employeeName": "赵六",
            "projectName": "项目D",
            "memberName": "成员4",
            "completionYear": "2021",
            "personalScore": 88
         },
         {
            "departmentName": "研发部",
            "employeeName": "孙七",
            "projectName": "项目E",
            "memberName": "成员5",
            "completionYear": "2023",
            "personalScore": 92
         }
         ];
         EmployeeDetailloading.value = false;
}

/** 查询角色列表 */
// function getEmployeeDetailList() {
//   EmployeeDetailloading.value = true;
//   // listPerson(proxy.addDateRange(queryParams.value, dateRange.value)).then(response => {
//     listCurrentEmployee(EmployeeDetailqueryParams.value).then(response => {
//     CurrentUserName.value  =response.CurrentUserName
//     Department.value  =response.Department
//     EmployeeDetailDataList.value = response.rows;
//     EmployeeDetailtotal.value = response.total;
//     EmployeeDetailloading.value = false;
//   });
// }
getEmployeeDetailList();
/** 搜索按钮操作 */
function handleEmployeeDetailQuery() {
  EmployeeDetailqueryParams.value.pageNum = 1;
  getEmployeeDetailList();
}

/** 重置按钮操作 */
function resetEmployeeDetailQuery() {
  // dateRange.value = [];
  proxy.resetForm("EmployeeDetailqueryRef");
  handleEmployeeDetailQuery();
}


/** 导出按钮操作 */
// function handleExport() {
//   proxy.download("system/role/export", {
//     ...EmployeeDetailqueryParams.value,
//   }, `role_${new Date().getTime()}.xlsx`);
// }

/** 多选框选中数据 */
function handleEmployeeDetailSelectionChange(selection) {
  EmployeeDetailqueryParams.value.ids = selection.map(item => item.roleId);
  EmployeeDetailqueryParams.value.single = selection.length != 1;
  EmployeeDetailqueryParams.value.multiple = !selection.length;
}


</script>
<style scoped lang="scss">

::v-deep .el-table__header {
  width: 100% !important;
}

::v-deep .el-table__body, .el-table__footer, .el-table__header {
    /* CONTAIN-INTRINSIC-BLOCK-SIZE: AUTO 100PX; */
    width: 100% !important;

}
.pagination-container {
   margin-top: 5px; 
    margin-bottom: 30px;
}
.app-container {
  position: relative; /* 确保父容器是相对定位 */
}
</style>