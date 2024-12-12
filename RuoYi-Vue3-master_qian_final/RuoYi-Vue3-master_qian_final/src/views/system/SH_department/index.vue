<template>
   <div class="app-container">
      <el-form :model="DepartmentTotalqueryParams" ref="DepartmentTotalqueryRef" v-show="DepartmentTotalshowSearch" :inline="true" label-width="68px">
         <el-form-item label="年份" prop="completionYear">
            <el-input
               v-model="DepartmentTotalqueryParams.completionYear"
               placeholder="请输入年份"
               clearable
               style="width: 240px"
               @keyup.enter="handleDepartmentTotalQuery"
            />
         </el-form-item>
         <el-form-item>
            <el-button type="primary" icon="Search" @click="handleDepartmentTotalQuery">搜索</el-button>
            <el-button icon="Refresh" @click="resetDepartmentTotalQuery">重置</el-button>
         </el-form-item>
      </el-form>
      <el-row :gutter="10" class="mb8">
         <el-col :span="1.5">
            <el-button
               type="warning"
               plain
               icon="Download"
               @click="handleExport"
               v-hasPermi="['system:role:export']"
            >导出</el-button>
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
         <!-- <right-toolbar v-model:showSearch="DepartmentTotalshowSearch" @queryTable="getDepartmentAllList"></right-toolbar> -->
      </el-row>
 
      <!-- 表格数据 -->
      <el-table  max-height="300px" style="width: 100%" v-loading="DepartTotalmentLoading" :data="DepartmentTotalDataList" @selection-change="handleTotalSelectionChange">
         <el-table-column type="selection"  align="center" />
         <el-table-column label="部门名称" prop="departmentName"   align="center"/>
           <!-- 部门每年排名(总分) -->
         <el-table-column label="年份" prop="completionYear" :show-overflow-tooltip="true"   align="center" />

         <el-table-column label="部门年度排名(年度总分)"   align="center">
           <template #default="scope">
             {{ scope.row.departmentAnnualRanking }} ({{ scope.row.DepartmentAnnualTotalScore }})
           </template>
         </el-table-column>
         <!-- 部门排名(总分) -->
         <el-table-column label="部门总排名(总分)"   align="center">
           <template #default="scope">
             {{ scope.row.departmentTotalRanking }} ({{ scope.row.DepartmentTotalScore }})
           </template>
         </el-table-column>
         <!-- <el-table-column label="员工姓名" prop="employeeName" width="120"/>
         <el-table-column label="项目名称" prop="projectName" width="120" :show-overflow-tooltip="true"/>
         <el-table-column label="成员名称" prop="memberName" :show-overflow-tooltip="true" width="150" />
         <el-table-column label="提交年份" prop="completionYear" :show-overflow-tooltip="true" width="150" />
         <el-table-column label="项目分数" prop="personalScore" width="100" />
         <el-table-column label="个人总分" prop="totalPersonalScore" width="100" /> -->
         <!-- <el-table-column label="个人部门排名/个人公司排名" prop="personDepartmentRanking/personCompanyRanking" width="100" />
         <el-table-column label="部门排名(总分)" prop="departmentRanking(totalPersonalScore)" width="100" />      -->
         <!-- 个人部门排名/个人公司排名 -->
         <!-- <el-table-column label="个人部门排名/个人公司排名" width="100">
           <template #default="scope">
             {{ scope.row.personDepartmentRanking }}/{{ scope.row.personCompanyRanking }}
           </template>
         </el-table-column> -->
         
      </el-table>
      <pagination
         v-show="DepartmentALLtotal > 0"
         :total="DepartmentALLtotal"
         v-model:page="DepartmentTotalqueryParams.pageNum"
         v-model:limit="DepartmentTotalqueryParams.pageSize"
         @pagination="getDepartmentAllList"
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
        <el-table-column type="selection"  align="center" />
        <el-table-column label="部门名称" prop="departmentName"   align="center"/>
        <!-- 部门排名(总分) -->
        <!-- <el-table-column label="部门排名(总分)" width="100">
          <template #default="scope">
            {{ scope.row.departmentRanking }} ({{ scope.row.totalPersonalScore }})
          </template>
        </el-table-column> -->
        <el-table-column label="员工姓名" prop="employeeName"  align="center"/>
        <el-table-column label="项目名称" prop="projectName"  align="center" :show-overflow-tooltip="true"/>
        <el-table-column label="成员名称" prop="memberName" :show-overflow-tooltip="true"   align="center" />
        <el-table-column label="年份" prop="completionYear" :show-overflow-tooltip="true"   align="center"/>
        <el-table-column label="项目分数" prop="personalScore"   align="center"/>
        <!-- <el-table-column label="个人总分" prop="totalPersonalScore" width="100" /> -->
        <!-- <el-table-column label="个人部门排名/个人公司排名" prop="personDepartmentRanking/personCompanyRanking" width="100" />
        <el-table-column label="部门排名(总分)" prop="departmentRanking(totalPersonalScore)" width="100" />      -->
        <!-- 个人部门排名/个人公司排名 -->
        <!-- <el-table-column label="个人部门排名/个人公司排名" width="100">
          <template #default="scope">
            {{ scope.row.personDepartmentRanking }}/{{ scope.row.personCompanyRanking }}
          </template>
        </el-table-column> -->
        
     </el-table>
     <pagination
        v-show="EmployeeDetailtotal > 0"
        :total="EmployeeDetailtotal"
        v-model:page="EmployeeDetailqueryParams.pageNum"
        v-model:limit="EmployeeDetailqueryParams.pageSize"
        @pagination="getEmployeeDetailList"
     />
   </div>



  
</template>

<script setup name="SHDepartment">
import {listTotalDepartment,listTotalEmployee,listCurrentEmployee } from "@/api/system/SHDepartment";

// import { listTotalEmployee,listCurrentEmployee} from "@/api/system/SHEmployee";
const { proxy } = getCurrentInstance();
// DepartmentTotalDataList
const DepartmentTotalDataList = ref([]);

const DepartTotalmentLoading = ref(true);

const DepartmentALLtotal = ref(0);

// const dateRange = ref([]);
const CurrentUserName = ref('');
const Department = ref('');


const DepartmentTotaldata = reactive({
  form: {},
  DepartmentTotalqueryParams: {
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

const { DepartmentTotalqueryParams } = toRefs(DepartmentTotaldata);

// /** 查询角色列表 */
// function getTotalDepartmentList() {
//    DepartTotalmentLoading.value = true;
//   // listPerson(proxy.addDateRange(queryParams.value, dateRange.value)).then(response => {
//     listTotalDepartment(DepartmentTotalqueryParams.value).then(response => {
//     CurrentUserName.value  =response.CurrentUserName
//     Department.value  =response.Department
//     DepartmentTotalDataList.value = response.rows;
//     DepartmentALLtotal.value = response.total;
//     DepartTotalmentLoading.value = false;
//   });
// }
/** 查询角色列表 */
function getTotalDepartmentList() {
   DepartTotalmentLoading.value = true;
  // listPerson(proxy.addDateRange(queryParams.value, dateRange.value)).then(response => {
//     listTotalDepartment(DepartmentTotalqueryParams.value).then(response => {
//     CurrentUserName.value  =response.CurrentUserName
//     Department.value  =response.Department
//     DepartmentTotalDataList.value = response.rows;
//     DepartmentALLtotal.value = response.total;
//     DepartTotalmentLoading.value = false;
//   });
    CurrentUserName.value = "张三";
    Department.value = "技术部";
    DepartmentALLtotal.value = 150;
    
    DepartmentTotalDataList.value = [
  // {
  //   "departmentName": "技术部",
  //   "completionYear": "2023",
  //   "departmentAnnualRanking": "1",
  //   "DepartmentAnnualTotalScore": "3",
  //   "departmentTotalRanking": "2",
  //   "DepartmentTotalScore": 480
  // },
  // {
  //   "departmentName": "市场部",
  //   "completionYear": "2023",
  //   "departmentAnnualRanking": "2",
  //   "DepartmentAnnualTotalScore": "1",
  //   "departmentTotalRanking": "1",
  //   "DepartmentTotalScore": 530
  // },
  // {
  //   "departmentName": "人事部",
  //   "completionYear": "2023",
  //   "departmentAnnualRanking": "3",
  //   "DepartmentAnnualTotalScore": "2",
  //   "departmentTotalRanking": "3",
  //   "DepartmentTotalScore": 450
  // },
  // {
  //   "departmentName": "财务部",
  //   "completionYear": "2023",
  //   "departmentAnnualRanking": "4",
  //   "DepartmentAnnualTotalScore": "4",
  //   "departmentTotalRanking": "4",
  //   "DepartmentTotalScore": 410
  // },
  // {
  //   "departmentName": "研发部",
  //   "completionYear": "2023",
  //   "departmentAnnualRanking": "5",
  //   "DepartmentAnnualTotalScore": "5",
  //   "departmentTotalRanking": "5",
  //   "DepartmentTotalScore": 390
  // }
  {
    "departmentName": "技术部",
    "completionYear": "2020",
    "departmentAnnualRanking": "1",
    "DepartmentAnnualTotalScore": "450",
    "departmentTotalRanking": "1",
    "DepartmentTotalScore": "500"
  },
  {
    "departmentName": "技术部",
    "completionYear": "2021",
    "departmentAnnualRanking": "1",
    "DepartmentAnnualTotalScore": "460",
    "departmentTotalRanking": "2",
    "DepartmentTotalScore": "520"
  },
  {
    "departmentName": "技术部",
    "completionYear": "2022",
    "departmentAnnualRanking": "2",
    "DepartmentAnnualTotalScore": "470",
    "departmentTotalRanking": "1",
    "DepartmentTotalScore": "540"
  },
  {
    "departmentName": "技术部",
    "completionYear": "2023",
    "departmentAnnualRanking": "3",
    "DepartmentAnnualTotalScore": "480",
    "departmentTotalRanking": "3",
    "DepartmentTotalScore": "460"
  },
  {
    "departmentName": "技术部",
    "completionYear": "2024",
    "departmentAnnualRanking": "4",
    "DepartmentAnnualTotalScore": "400",
    "departmentTotalRanking": "4",
    "DepartmentTotalScore": "420"
  }
];
  DepartTotalmentLoading.value = false;

}
getTotalDepartmentList();
/** 搜索按钮操作 */
function handleDepartmentTotalQuery() {
  DepartmentTotalqueryParams.value.pageNum = 1;
  getTotalDepartmentList();
}

/** 重置按钮操作 */
function resetDepartmentTotalQuery() {
  // dateRange.value = [];
  proxy.resetForm("EmployeeTotalqueryRef");
  handleEmployeeTotalQuery();
}
// function handleExportTotal() {
//   const params = {
//     ...flattenParams('EmployeeTotalqueryParams', EmployeeTotalqueryParams.value),
//     ...flattenParams('EmployeeDetailqueryParams', EmployeeDetailqueryParams.value),
//   };

//   proxy.download("system/SHDepartment/totalExport", params, 
//     `${departmentName}${currentUserName}_All_${new Date().getTime()}.xlsx`);
// }

// function handleExportCurrent() {
//   const params = {
//     ...flattenParams('EmployeeTotalqueryParams', EmployeeTotalqueryParams.value),
//     ...flattenParams('EmployeeDetailqueryParams', EmployeeDetailqueryParams.value),
//   };

//   proxy.download("system/SHDepartment/Currentexport", params, 
//     `${departmentName}${currentUserName}_Current_${new Date().getTime()}.xlsx`);
// }

// 辅助函数，用于添加前缀并展开参数
function flattenParams(prefix, queryParams) {
  return Object.keys(queryParams).reduce((acc, key) => {
    acc[`${prefix}_${key}`] = queryParams[key];
    return acc;
  }, {});
}
// // 辅助函数，用于添加前缀并展开参数
// function flattenParams(prefix, queryParams) {
//   return Object.keys(queryParams).reduce((acc, key) => {
//     acc[`${prefix}_${key}`] = queryParams[key];
//     return acc;
//   }, {});
// }
// // 辅助函数，用于添加前缀并展开参数
// function flattenParams(prefix, queryParams) {
//   return Object.keys(queryParams).reduce((acc, key) => {
//     acc[`${prefix}_${key}`] = queryParams[key];
//     return acc;
//   }, {});
// }

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
function handleTotalSelectionChange(selection) {
  DepartmentTotalqueryParams.value.AllIds = selection.map(item => item.roleId);
  DepartmentTotalqueryParams.value.single = selection.length != 1;
  DepartmentTotalqueryParams.value.multiple = !selection.length;
}





// const { proxy } = getCurrentInstance();

const EmployeeTotalDataList = ref([]);
const EmployeeTotalLoading = ref(true);

const EmployeeALLtotal = ref(0);

// const dateRange = ref([]);
// const CurrentUserName = ref('');
// const Department = ref('');


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
//     EmployeeALLtotal.value = response.total;
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
//     EmployeeALLtotal.value = response.total;
//     EmployeeTotalLoading.value = false;
//   });
   EmployeeTotalDataList.value = [
  {
    "departmentName": "技术部",
    "employeeName": "张三",
    "completionYear": "2023",
    "AnnualtotalPersonalScore": 92,
    "departmentEmployeeAnnualRanking": "1",
    "companyEmployeeAnnualRanking": "5",
    "totalPersonalScore": 350,
    "departmentTotalRanking": "2",
    "companyTotalRanking": "10"
  },
  {
    "departmentName": "技术部",
    "employeeName": "李四",
    "completionYear": "2023",
    "AnnualtotalPersonalScore": 85,
    "departmentEmployeeAnnualRanking": "2",
    "companyEmployeeAnnualRanking": "8",
    "totalPersonalScore": 320,
    "departmentTotalRanking": "3",
    "companyTotalRanking": "15"
  },
  {
    "departmentName": "技术部",
    "employeeName": "王五",
    "completionYear": "2023",
    "AnnualtotalPersonalScore": 78,
    "departmentEmployeeAnnualRanking": "3",
    "companyEmployeeAnnualRanking": "12",
    "totalPersonalScore": 290,
    "departmentTotalRanking": "4",
    "companyTotalRanking": "20"
  },
  {
    "departmentName": "技术部",
    "employeeName": "赵六",
    "completionYear": "2023",
    "AnnualtotalPersonalScore": 88,
    "departmentEmployeeAnnualRanking": "4",
    "companyEmployeeAnnualRanking": "7",
    "totalPersonalScore": 310,
    "departmentTotalRanking": "5",
    "companyTotalRanking": "18"
  },
  {
    "departmentName": "技术部",
    "employeeName": "孙七",
    "completionYear": "2023",
    "AnnualtotalPersonalScore": 95,
    "departmentEmployeeAnnualRanking": "5",
    "companyEmployeeAnnualRanking": "2",
    "totalPersonalScore": 400,
    "departmentTotalRanking": "1",
    "companyTotalRanking": "1"
  }
];
   CurrentUserName.value = "张三";
   Department.value = "技术部";
   EmployeeALLtotal.value = 150;
   EmployeeTotalLoading.value = false;
}
getTotalEmployeeList();
/** 搜索按钮操作 */
function handleEmployeeTotalQuery() {
  queryParams.value.pageNum = 1;
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
    ...flattenParams('DepartmentTotalqueryParams', DepartmentTotalqueryParams.value),
  };

  proxy.download("system/SHEmployee/totalExport", params, 
    `${departmentName}_All_${new Date().getTime()}.xlsx`);
}

function handleExportCurrent() {
  const params = {
    ...flattenParams('EmployeeTotalqueryParams', EmployeeTotalqueryParams.value),
    ...flattenParams('EmployeeDetailqueryParams', EmployeeDetailqueryParams.value),
    ...flattenParams('DepartmentTotalqueryParams', DepartmentTotalqueryParams.value),
  };

  proxy.download("system/SHEmployee/Currentexport", params, 
    `${departmentName}_Current_${new Date().getTime()}.xlsx`);
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
            "departmentName": "技术部",
            "employeeName": "李四",
            "projectName": "项目B",
            "memberName": "成员2",
            "completionYear": "2022",
            "personalScore": 90
         },
         {
            "departmentName": "技术部",
            "employeeName": "王五",
            "projectName": "项目C",
            "memberName": "成员3",
            "completionYear": "2024",
            "personalScore": 78
         },
         {
            "departmentName": "技术部",
            "employeeName": "赵六",
            "projectName": "项目D",
            "memberName": "成员4",
            "completionYear": "2021",
            "personalScore": 88
         },
         {
            "departmentName": "技术部",
            "employeeName": "孙七",
            "projectName": "项目E",
            "memberName": "成员5",
            "completionYear": "2023",
            "personalScore": 92
         }
         ];
         EmployeeDetailloading.value = false;
}
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
::v-deep .custom-table {
  width: 100% !important;
}
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