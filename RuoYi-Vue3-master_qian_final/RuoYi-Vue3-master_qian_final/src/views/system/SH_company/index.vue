<template>
   <div class="app-container">
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
      </el-row>
      <el-form :model="DepartmentTotalqueryParams" ref="DepartmentTotalqueryRef" v-show="DepartmentTotalshowSearch" :inline="true" label-width="90px">
         <el-row  style="width: 100%">
         <el-form-item label="部门名称：" prop="departmentName">
             <el-input
                v-model="DepartmentTotalqueryParams.departmentName"
                placeholder="请输入部门名称"
                clearable
                style="width: 200px"
                @keyup.enter="handleDepartmentTotalQuery"
             />
          </el-form-item>
         <el-form-item label="提交年份：" prop="completionYear">
            <el-input
               v-model="DepartmentTotalqueryParams.completionYear"
               placeholder="请输入提交年份"
               clearable
               style="width: 200px"
               @keyup.enter="handleDepartmentTotalQuery"
            />
         </el-form-item>
         <el-form-item>
            <el-button type="primary" icon="Search" @click="handleDepartmentTotalQuery">搜索</el-button>
            <el-button icon="Refresh" @click="resetDepartmentTotalQuery">重置</el-button>
         </el-form-item>
         <!-- <right-toolbar v-model:showSearch="DepartmentTotalshowSearch" @queryTable="getDepartmentAllList"></right-toolbar> -->
      </el-row>
      </el-form>
         <!-- 表格数据 -->
      <el-table style="width: 100%" max-height="300px" class="custom-table" v-loading="DepartTotalmentLoading" :data="DepartmentTotalDataList" @selection-change="handleTotalSelectionChange">
         <el-table-column type="selection" align="center" />
         <el-table-column label="部门名称" prop="departmentName"  align="center"/>
           <!-- 部门每年排名(总分) -->
         <el-table-column label="年份" prop="completionYear" :show-overflow-tooltip="true"  align="center"/>

         <el-table-column label="部门年度排名(年度总分)"  align="center">
           <template #default="scope">
             {{ scope.row.departmentAnnualRanking }} ({{ scope.row.DepartmentAnnualTotalScore }})
           </template>
         </el-table-column>
         <!-- 部门排名(总分) -->
         <el-table-column label="部门总排名(总分)"  align="center">
           <template #default="scope">
             {{ scope.row.departmentTotalRanking }} ({{ scope.row.DepartmentTotalScore }})
           </template>
         </el-table-column>
         <!-- <el-table-column label="员工姓名" prop="employeeName" width="200"/>
         <el-table-column label="项目名称" prop="projectName" width="200" :show-overflow-tooltip="true"/>
         <el-table-column label="成员名称" prop="memberName" :show-overflow-tooltip="true" width="200" />
         <el-table-column label="提交年份" prop="completionYear" :show-overflow-tooltip="true" width="200" />
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
      <el-row> 
             <!-- DepartmentTotalqueryParams -->
            <el-form :model="EmployeeTotalqueryParams" ref="queryRef" v-show="employeeTotalshowSearch" :inline="true" label-width="90px">
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
      <el-table max-height="300px" style="width: 100%" v-loading="EmployeeTotalLoading" :data="EmployeeTotalDataList" @selection-change="handleEmployeeTotalSelectionChange">
         <el-table-column type="selection"  align="center" />
         <el-table-column label="部门名称" prop="departmentName"  align="center"/>
         <el-table-column label="员工姓名" prop="employeeName"  align="center"/>
         <!-- <el-table-column label="项目名称" prop="projectName" width="200" :show-overflow-tooltip="true"/> -->
         <!-- <el-table-column label="成员名称" prop="memberName" :show-overflow-tooltip="true" width="200" /> -->
         <el-table-column label="年度" prop="completionYear" :show-overflow-tooltip="true"  align="center" />
         <el-table-column label="年度总分" prop="AnnualtotalPersonalScore" :show-overflow-tooltip="true"  align="center"/>
         <el-table-column label="年度部门排名/年度公司排名"  align="center">
            <template #default="scope">
            {{ scope.row.departmentEmployeeAnnualRanking }}/{{ scope.row.companyEmployeeAnnualRanking }}
            </template>
        </el-table-column>
        <el-table-column label="个人总分" prop="totalPersonalScore" :show-overflow-tooltip="true"  align="center" />
          <!-- 总排名(总分) -->
          <el-table-column label="部门总排名/公司总排名"  align="center">
           <template #default="scope">
            {{ scope.row.departmentTotalRanking }}/{{ scope.row.companyTotalRanking }}
           </template>
         </el-table-column>
      </el-table>
         <!-- 年度排名(年度总分) -->
         <!-- <el-table-column label="年度部门排名/年度公司排名" width="100">
            <template #default="scope">
            {{ scope.row.departmentEmployeeAnnualRanking }}/{{ scope.row.companyEmployeeAnnualRanking }} ({{ scope.row.AnnualtotalPersonalScore }})
            </template>
        </el-table-column> -->
       <!-- <el-table-column label="员工姓名" prop="employeeName" width="200"/>
         <el-table-column label="项目名称" prop="projectName" width="200" :show-overflow-tooltip="true"/>
         <el-table-column label="成员名称" prop="memberName" :show-overflow-tooltip="true" width="200" />
         <el-table-column label="提交年份" prop="completionYear" :show-overflow-tooltip="true" width="200" /> -->
         <!-- <el-table-column label="项目分数" prop="personalScore" width="100" /> -->
         <!-- <el-table-column label="个人总分" prop="totalPersonalScore" width="100" /> -->
         <!-- <el-table-column label="个人部门排名/个人公司排名" prop="personDepartmentRanking/personCompanyRanking" width="100" />
         <el-table-column label="部门排名(总分)" prop="departmentRanking(totalPersonalScore)" width="100" />      -->

         <!-- <el-table-column label="部门排名/公司排名" width="100">
            <template #default="scope">
            {{ scope.row.departmentAnnualRanking }}/{{ scope.row.DepartmentAnnualTotalScore }}
            </template>
        </el-table-column> -->
         <!-- 个人部门排名/个人公司排名 -->
         <!-- <el-table-column label="个人部门排名/个人公司排名" width="100">
           <template #default="scope">
             {{ scope.row.personDepartmentRanking }}/{{ scope.row.personCompanyRanking }}
           </template>
         </el-table-column> -->
      <pagination
         v-show="EmployeeALLtotal > 0"
         :total="EmployeeALLtotal"
         v-model:page="EmployeeTotalqueryParams.pageNum"
         v-model:limit="EmployeeTotalqueryParams.pageSize"
         @pagination="getTotalEmployeeList"
      />
      <el-divider border-style="dashed" /> 
      <el-row> 
            <el-form :model="EmployeeDetailqueryParams" ref="employeeDetailqueryRef" v-show="employeeDetailshowSearch" :inline="true" label-width="90px">
            <el-form-item label="部门名称：" prop="departmentName">
                  <el-input
                     v-model="EmployeeDetailqueryParams.departmentName"
                     placeholder="请输入部门名称"
                     clearable
                     style="width: 200px"
                     @keyup.enter="handleEmployeeDetailQuery"
                  />
               </el-form-item>
               <el-form-item label="员工名称：" prop="employeeName">
                  <el-input
                     v-model="EmployeeDetailqueryParams.employeeName"
                     placeholder="请输入员工名称"
                     clearable
                     style="width: 200px"
                     @keyup.enter="handleEmployeeDetailQuery"
                  />
               </el-form-item>
               <el-form-item label="项目名称：" prop="projectName">
                  <el-input
                     v-model="EmployeeDetailqueryParams.projectName"
                     placeholder="请输入项目名称"
                     clearable
                     style="width: 200px"
                     @keyup.enter="handleEmployeeDetailQuery"
                  />
               </el-form-item>
               <el-form-item label="成员名称：" prop="memberName">
                  <el-input
                     v-model="EmployeeDetailqueryParams.memberName"
                     placeholder="请输入成员名称"
                     clearable
                     style="width: 200px"
                     @keyup.enter="handleEmployeeDetailQuery"
                  />
               </el-form-item>
               <el-form-item label="年份：" prop="completionYear">
                  <el-input
                     v-model="EmployeeDetailqueryParams.completionYear"
                     placeholder="请输入年份"
                     clearable
                     style="width: 200px"
                     @keyup.enter="handleEmployeeDetailQuery"
                  />
               </el-form-item>
               <el-form-item>
                  <el-button type="primary" icon="Search" @click="handleEmployeeDetailQuery">搜索</el-button>
                  <el-button icon="Refresh" @click="resetEmployeeDetailQuery">重置</el-button>
               </el-form-item>
            </el-form>
     
        
         <!-- <right-toolbar v-model:showSearch="showEmployeeDetailSearch" @queryTable="getEmployeeDetailList"></right-toolbar> -->
      </el-row>
 
      <!-- 表格数据 -->
      <el-table  max-height="300px" style="width: 100%" v-loading="EmployeeDetailloading" :data="EmployeeDetailDataList" @selection-change="handleEmployeeDetailSelectionChange">
         <el-table-column type="selection" align="center" />
         <el-table-column label="部门名称" prop="departmentName"  align="center"/>
         <!-- 部门排名(总分) -->
         <!-- <el-table-column label="部门排名(总分)" width="100">
           <template #default="scope">
             {{ scope.row.departmentRanking }} ({{ scope.row.totalPersonalScore }})
           </template>
         </el-table-column> -->
         <el-table-column label="员工姓名" prop="employeeName"  align="center"/>
         <el-table-column label="项目名称" prop="projectName"  align="center" :show-overflow-tooltip="true"/>
         <el-table-column label="成员名称" prop="memberName" :show-overflow-tooltip="true" align="center" />
         <el-table-column label="年份" prop="completionYear" :show-overflow-tooltip="true"  align="center" />
         <el-table-column label="项目分数" prop="personalScore"  align="center" />
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
   <!-- 
<template>
  <div class="app-container">
     <el-form :model="queryParams" ref="queryRef" v-show="showSearch" :inline="true" label-width="68px">
      <el-form-item label="部门名称" prop="departmentName">
            <el-input
               v-model="queryParams.departmentName"
               placeholder="请输入部门名称"
               clearable
               style="width: 200px"
               @keyup.enter="handleQuery"
            />
         </el-form-item>
        <el-form-item label="员工名称" prop="employeeName">
            <el-input
               v-model="queryParams.employeeName"
               placeholder="请输入员工名称"
               clearable
               style="width: 200px"
               @keyup.enter="handleQuery"
            />
         </el-form-item>
         <el-form-item label="项目名称" prop="projectName">
           <el-input
              v-model="queryParams.projectName"
              placeholder="请输入项目名称"
              clearable
              style="width: 200px"
              @keyup.enter="handleQuery"
           />
        </el-form-item>
        <el-form-item label="成员名称" prop="memberName">
           <el-input
              v-model="queryParams.memberName"
              placeholder="请输入成员名称"
              clearable
              style="width: 200px"
              @keyup.enter="handleQuery"
           />
        </el-form-item>
        <el-form-item label="提交年份" prop="completionYear">
           <el-input
              v-model="queryParams.completionYear"
              placeholder="请输入提交年份"
              clearable
              style="width: 200px"
              @keyup.enter="handleQuery"
           />
        </el-form-item>
        <el-form-item>
           <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
           <el-button icon="Refresh" @click="resetQuery">重置</el-button>
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
        <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
     </el-row> -->

     <!-- 表格数据 -->
     <!-- <el-table v-loading="loading" :data="CompanyDataList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="部门名称" prop="departmentName" width="200"/> -->
         <!-- 部门排名(总分) -->
         <!-- <el-table-column label="部门排名(总分)" width="100">
          <template #default="scope">
            {{ scope.row.departmentRanking }} ({{ scope.row.totalPersonalScore }})
          </template>
        </el-table-column>
        <el-table-column label="员工姓名" prop="employeeName"  width="200" />
        <el-table-column label="项目名称" prop="projectName" width="200" :show-overflow-tooltip="true"/>
        <el-table-column label="成员名称" prop="memberName" :show-overflow-tooltip="true" width="200" />
        <el-table-column label="提交年份" prop="completionYear" :show-overflow-tooltip="true" width="110" />
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
       
     <!-- </el-table>
     <pagination
        v-show="total > 0"
        :total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="getList"
     /> -->
  <!-- </div>
</template> -->
   </div>
     
 

   
</template>




<script setup name="SHCompany">
import {listTotalDepartment,listTotalEmployee,listCurrentEmployee } from "@/api/system/SHCompany";

// import { listTotalEmployee,listCurrentEmployee} from "@/api/system/SHEmployee";
const { proxy } = getCurrentInstance();
// DepartmentTotalDataList
const DepartmentTotalDataList = ref([]);

const DepartTotalmentLoading = ref(true);

const DepartmentALLtotal = ref(0);

// const dateRange = ref([]);
const CurrentUserName = ref('');
const Department = ref('');
 // 创建三个独立的响应式引用
const DepartmentTotalshowSearch = ref(true);
const employeeTotalshowSearch = ref(true);
const employeeDetailshowSearch = ref(true);

const DepartmentTotaldata = reactive({
  form: {},
  DepartmentTotalqueryParams: {
    pageNum: 1,
    pageSize: 10,
    // employeeName: undefined,
    // projectName: undefined,
    // memberName: undefined,
    completionYear: undefined,
    departmentName:  undefined,
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

// EmployeeDetailDataList.value = [
//   {
//     "departmentName": "技术部",
//     "employeeName": "张三",
//     "projectName": "项目A",
//     "memberName": "成员1",
//     "completionYear": "2023",
//     "personalScore": 85
//   },
//   {
//     "departmentName": "市场部",
//     "employeeName": "李四",
//     "projectName": "项目B",
//     "memberName": "成员2",
//     "completionYear": "2022",
//     "personalScore": 90
//   },
//   {
//     "departmentName": "人事部",
//     "employeeName": "王五",
//     "projectName": "项目C",
//     "memberName": "成员3",
//     "completionYear": "2024",
//     "personalScore": 78
//   },
//   {
//     "departmentName": "财务部",
//     "employeeName": "赵六",
//     "projectName": "项目D",
//     "memberName": "成员4",
//     "completionYear": "2021",
//     "personalScore": 88
//   },
//   {
//     "departmentName": "研发部",
//     "employeeName": "孙七",
//     "projectName": "项目E",
//     "memberName": "成员5",
//     "completionYear": "2023",
//     "personalScore": 92
//   }
// ];
// CurrentUserName.value = "张三";
// Department.value = "技术部";
// DepartmentALLtotal.value = 200;
// DepartTotalmentLoading.value = false;
/** 查询角色列表 */
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
    DepartmentALLtotal.value = 200;
    
    DepartmentTotalDataList.value = [
    {
    "departmentName": "技术部",
    "completionYear": "2019",
    "departmentAnnualRanking": "1",
    "DepartmentAnnualTotalScore": 360,
    "departmentTotalRanking": "1",
    "DepartmentTotalScore": 450
  },
  {
    "departmentName": "技术部",
    "completionYear": "2020",
    "departmentAnnualRanking": "1",
    "DepartmentAnnualTotalScore": 390,
    "departmentTotalRanking": "1",
    "DepartmentTotalScore": 470
  },
  {
    "departmentName": "技术部",
    "completionYear": "2021",
    "departmentAnnualRanking": "1",
    "DepartmentAnnualTotalScore": 420,
    "departmentTotalRanking": "1",
    "DepartmentTotalScore": 490
  },
  {
    "departmentName": "技术部",
    "completionYear": "2022",
    "departmentAnnualRanking": "1",
    "DepartmentAnnualTotalScore": 450,
    "departmentTotalRanking": "1",
    "DepartmentTotalScore": 510
  },
  {
    "departmentName": "技术部",
    "completionYear": "2023",
    "departmentAnnualRanking": "1",
    "DepartmentAnnualTotalScore": 480,
    "departmentTotalRanking": "1",
    "DepartmentTotalScore": 530
  },
  {
    "departmentName": "市场部",
    "completionYear": "2019",
    "departmentAnnualRanking": "2",
    "DepartmentAnnualTotalScore": 310,
    "departmentTotalRanking": "2",
    "DepartmentTotalScore": 400
  },
  {
    "departmentName": "市场部",
    "completionYear": "2020",
    "departmentAnnualRanking": "2",
    "DepartmentAnnualTotalScore": 340,
    "departmentTotalRanking": "2",
    "DepartmentTotalScore": 420
  },
  {
    "departmentName": "市场部",
    "completionYear": "2021",
    "departmentAnnualRanking": "2",
    "DepartmentAnnualTotalScore": 370,
    "departmentTotalRanking": "2",
    "DepartmentTotalScore": 440
  },
  {
    "departmentName": "市场部",
    "completionYear": "2022",
    "departmentAnnualRanking": "2",
    "DepartmentAnnualTotalScore": 400,
    "departmentTotalRanking": "2",
    "DepartmentTotalScore": 460
  },
  {
    "departmentName": "市场部",
    "completionYear": "2023",
    "departmentAnnualRanking": "2",
    "DepartmentAnnualTotalScore": 430,
    "departmentTotalRanking": "2",
    "DepartmentTotalScore": 480
  },
  {
    "departmentName": "人事部",
    "completionYear": "2019",
    "departmentAnnualRanking": "3",
    "DepartmentAnnualTotalScore": 260,
    "departmentTotalRanking": "3",
    "DepartmentTotalScore": 350
  },
  {
    "departmentName": "人事部",
    "completionYear": "2020",
    "departmentAnnualRanking": "3",
    "DepartmentAnnualTotalScore": 290,
    "departmentTotalRanking": "3",
    "DepartmentTotalScore": 370
  },
  {
    "departmentName": "人事部",
    "completionYear": "2021",
    "departmentAnnualRanking": "3",
    "DepartmentAnnualTotalScore": 320,
    "departmentTotalRanking": "3",
    "DepartmentTotalScore": 390
  },
  {
    "departmentName": "人事部",
    "completionYear": "2022",
    "departmentAnnualRanking": "3",
    "DepartmentAnnualTotalScore": 350,
    "departmentTotalRanking": "3",
    "DepartmentTotalScore": 410
  },
  {
    "departmentName": "人事部",
    "completionYear": "2023",
    "departmentAnnualRanking": "3",
    "DepartmentAnnualTotalScore": 380,
    "departmentTotalRanking": "3",
    "DepartmentTotalScore": 430
  },
  {
    "departmentName": "财务部",
    "completionYear": "2019",
    "departmentAnnualRanking": "4",
    "DepartmentAnnualTotalScore": 210,
    "departmentTotalRanking": "4",
    "DepartmentTotalScore": 300
  },
  {
    "departmentName": "财务部",
    "completionYear": "2020",
    "departmentAnnualRanking": "4",
    "DepartmentAnnualTotalScore": 240,
    "departmentTotalRanking": "4",
    "DepartmentTotalScore": 320
  },
  {
    "departmentName": "财务部",
    "completionYear": "2021",
    "departmentAnnualRanking": "4",
    "DepartmentAnnualTotalScore": 270,
    "departmentTotalRanking": "4",
    "DepartmentTotalScore": 340
  },
  {
    "departmentName": "财务部",
    "completionYear": "2022",
    "departmentAnnualRanking": "4",
    "DepartmentAnnualTotalScore": 300,
    "departmentTotalRanking": "4",
    "DepartmentTotalScore": 360
  },
  {
    "departmentName": "财务部",
    "completionYear": "2023",
    "departmentAnnualRanking": "4",
    "DepartmentAnnualTotalScore": 330,
    "departmentTotalRanking": "4",
    "DepartmentTotalScore": 380
  },
  {
    "departmentName": "研发部",
    "completionYear": "2019",
    "departmentAnnualRanking": "5",
    "DepartmentAnnualTotalScore": 160,
    "departmentTotalRanking": "5",
    "DepartmentTotalScore": 250
  },
  {
    "departmentName": "研发部",
    "completionYear": "2020",
    "departmentAnnualRanking": "5",
    "DepartmentAnnualTotalScore": 190,
    "departmentTotalRanking": "5",
    "DepartmentTotalScore": 270
  },
  {
    "departmentName": "研发部",
    "completionYear": "2021",
    "departmentAnnualRanking": "5",
    "DepartmentAnnualTotalScore": 220,
    "departmentTotalRanking": "5",
    "DepartmentTotalScore": 290
  },
  {
    "departmentName": "研发部",
    "completionYear": "2022",
    "departmentAnnualRanking": "5",
    "DepartmentAnnualTotalScore": 250,
    "departmentTotalRanking": "5",
    "DepartmentTotalScore": 310
  },
  {
    "departmentName": "研发部",
    "completionYear": "2023",
    "departmentAnnualRanking": "5",
    "DepartmentAnnualTotalScore": 280,
    "departmentTotalRanking": "5",
    "DepartmentTotalScore": 330
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
   // departmentName: undefined,
    // employeeName: undefined,
    // projectName: undefined,
    // memberName: undefined,
    completionYear: undefined,
    departmentName:  undefined,
    Ids:[],
    AllIds:[]
  },
  rules: {
    roleName: [{ required: true, message: "角色名称不能为空", trigger: "blur" }],
    roleKey: [{ required: true, message: "权限字符不能为空", trigger: "blur" }],
    roleSort: [{ required: true, message: "角色顺序不能为空", trigger: "blur" }]
  },
});

const { EmployeeTotalqueryParams } = toRefs(EmployeeTotaldata);
// EmployeeTotalDataList.value = [
//   {
//     "departmentName": "技术部",
//     "employeeName": "张三",
//     "completionYear": "2023",
//     "AnnualtotalPersonalScore": 92,
//     "departmentEmployeeAnnualRanking": "1",
//     "companyEmployeeAnnualRanking": "5",
//     "totalPersonalScore": 350,
//     "departmentTotalRanking": "2",
//     "companyTotalRanking": "10"
//   },
//   {
//     "departmentName": "市场部",
//     "employeeName": "李四",
//     "completionYear": "2023",
//     "AnnualtotalPersonalScore": 85,
//     "departmentEmployeeAnnualRanking": "2",
//     "companyEmployeeAnnualRanking": "8",
//     "totalPersonalScore": 320,
//     "departmentTotalRanking": "3",
//     "companyTotalRanking": "15"
//   },
//   {
//     "departmentName": "人事部",
//     "employeeName": "王五",
//     "completionYear": "2023",
//     "AnnualtotalPersonalScore": 78,
//     "departmentEmployeeAnnualRanking": "3",
//     "companyEmployeeAnnualRanking": "12",
//     "totalPersonalScore": 290,
//     "departmentTotalRanking": "4",
//     "companyTotalRanking": "20"
//   },
//   {
//     "departmentName": "财务部",
//     "employeeName": "赵六",
//     "completionYear": "2023",
//     "AnnualtotalPersonalScore": 88,
//     "departmentEmployeeAnnualRanking": "4",
//     "companyEmployeeAnnualRanking": "7",
//     "totalPersonalScore": 310,
//     "departmentTotalRanking": "5",
//     "companyTotalRanking": "18"
//   },
//   {
//     "departmentName": "研发部",
//     "employeeName": "孙七",
//     "completionYear": "2023",
//     "AnnualtotalPersonalScore": 95,
//     "departmentEmployeeAnnualRanking": "5",
//     "companyEmployeeAnnualRanking": "2",
//     "totalPersonalScore": 400,
//     "departmentTotalRanking": "1",
//     "companyTotalRanking": "1"
//   }
// ];
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
    "departmentName": "市场部",
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
    "departmentName": "人事部",
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
    "departmentName": "财务部",
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
    "departmentName": "研发部",
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
   EmployeeALLtotal.value = 200;
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

// 辅助函数，用于添加前缀并展开参数




// 辅助函数，用于添加前缀并展开参数
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
    ids:[]
  }
});

const { EmployeeDetailqueryParams} = toRefs(EmployeeDetaildata);
// EmployeeDetailDataList.value = [
//       {
//          "departmentName": "技术部",
//          "employeeName": "张三",
//          "projectName": "项目A",
//          "memberName": "成员1",
//          "completionYear": "2023",
//          "personalScore": 85
//       },
//       {
//          "departmentName": "市场部",
//          "employeeName": "李四",
//          "projectName": "项目B",
//          "memberName": "成员2",
//          "completionYear": "2022",
//          "personalScore": 90
//       },
//       {
//          "departmentName": "人事部",
//          "employeeName": "王五",
//          "projectName": "项目C",
//          "memberName": "成员3",
//          "completionYear": "2024",
//          "personalScore": 78
//       },
//       {
//          "departmentName": "财务部",
//          "employeeName": "赵六",
//          "projectName": "项目D",
//          "memberName": "成员4",
//          "completionYear": "2021",
//          "personalScore": 88
//       },
//       {
//          "departmentName": "研发部",
//          "employeeName": "孙七",
//          "projectName": "项目E",
//          "memberName": "成员5",
//          "completionYear": "2023",
//          "personalScore": 92
//       }
//       ];
/** 查询角色列表 */
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
    EmployeeDetailtotal.value = 200;
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