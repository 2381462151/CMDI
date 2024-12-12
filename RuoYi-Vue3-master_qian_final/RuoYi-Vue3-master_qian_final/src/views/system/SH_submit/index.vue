<template>
   <div class="app-container home">
   
    <!-- <el-button type="primary" @click="submitForm">提交</el-button> -->
    <!-- <el-button
        type="primary"
        :disabled="!canSubmit"
        @click="submitForm"
      >{{ submitButtonText }}</el-button> -->
    <!-- <el-button type="primary" @click="saveDraft">保存草稿</el-button> -->
     <!-- <el-row v-if="buttonsVisible">
      <el-col :span="8">
        <el-button type="primary" :disabled="!initialFlowState" @click="openSubmitDialog">提交</el-button>
      </el-col>
      <el-col :span="8">
        <el-button type="success" v-if="!initialFlowState" @click="openApproveDialog">同意</el-button>
      </el-col>
      <el-col :span="8">
        <el-button
          v-if="showSaveDraftButton"
          type="primary"
          @click="saveDraft"
        >保存草稿</el-button>
      </el-col>
      <el-col :span="8" v-if="!showSaveDraftButton">
        <el-button
          type="primary"
          @click="openRejectDialog"
        >驳回</el-button>
      </el-col>
    </el-row> -->
    <el-form ref="formRef" :model="submit_form_message" :rules="rules" label-width="100px "     >
      <!-- v-if="isEditable||baocun_true||initialFlowState" -->
    <el-row>
      <el-form-item label="选择分类：" prop="cascaderValue" v-if="isEditable"    style="width: 100%">
        <el-cascader
          v-model="submit_form_message.cascaderValue"
          :options="categoryOptions"
          clearable
          :disabled="!isEditable" 
          @change="onCascaderChange"
          style="width: 100%"
        />
      </el-form-item>
    </el-row>
    
    <el-row>
      <el-form-item label="注意事项：" prop="applicationInstructions"     style="width: 100%">
        <el-input v-model="submit_form_message.applicationInstructions" type="textarea" disabled    :autosize="{ minRows: 0, maxRows: 10 }" style="width: 100%"/>
      </el-form-item>
    </el-row>
    </el-form>
  <!-- <el-row :style="{ 'margin-bottom': '10px' }"  style="display: flex;" v-if="buttonsVisible">
    <el-button type="primary" v-if="initialFlowState" size="small" @click="submit_form">提交</el-button>
    <el-button type="success" v-if="!initialFlowState" size="small" @click="agreeAction">{{ approvalAttributes.flag ? '归档' : '同意' }}</el-button>
     <el-button
      v-if="initialFlowState"
        type="primary"
        @click="saveDraft"
        size="small"
     >保存草稿</el-button>
      <el-button
        v-if="!initialFlowState"
        type="primary"
        @click="reject"
        size="small"
      >驳回</el-button>
      <div style=" display: flex;   float: right;  " >
        <el-button type="primary" size="small" @click="addRow"  style="  margin-bottom: 10px; display: flex;   float: right;">新增</el-button>
      </div>

    </el-row> -->

 <el-row :style="{ 'margin-bottom': '10px' }" style="display: flex;" v-if="isEditable ">
  <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
    <div>
      <el-button type="primary" v-if="initialFlowState" size="small" @click="submit_form">提交</el-button>
      <el-button type="success" v-if="!initialFlowState" size="small" @click="agreeAction">{{ approvalAttributes.flag ? '归档' : '同意' }}</el-button>
      <el-button v-if="initialFlowState" type="primary" size="small" @click="saveDraft">保存草稿</el-button>
      <el-button v-if="!initialFlowState&&!approvalAttributes.flag" type="primary" size="small" @click="reject">驳回</el-button>
    </div>
    <div>
      <el-button type="primary" size="small" @click="addRow">新增</el-button>
    </div>
  </div>
</el-row>
    <!-- <el-tooltip placement="top"  :content="tooltipContent" :visible.sync="tooltipVisible">
              <template #content>
                <span>{{ tooltipContent }}</span>
              </template>
                <el-input
                  v-model="row.projectNameInput"
                  @mouseover="tooltipVisible = true"
                  @mouseout="tooltipVisible = false"
                  @focus="tooltipVisible = true"
                  @blur="tooltipVisible = false"
                ></el-input>
            </el-tooltip> -->
    <!-- <div  > -->
    <!-- <el-button type="primary" size="small" @click="addRow" style="display: flex;  margin-bottom: 10px;">新增</el-button> -->
  <!-- </div> -->
    <!-- <el-input
      v-if="showApprovalInput"
      v-model="approvalOpinion"
      placeholder="请输入审批意见"
      class="approval-input"
    ></el-input> -->
   
    
      <!-- <el-table
        :data="tableData"
        style="width: 100%"
        @row-click="handleRowClick"
        v-loading="tableData_flag"
      > -->
      <el-table
        :data="tableData"
        max-height="300px" 
        style="width: 100%"
        @row-click="handleRowClick"
      >
        <el-table-column prop="majorCategory" label="大类" align="center" >
          <template #default="{ row }">
            {{ row.majorCategory }}
          </template>
        </el-table-column>
        <el-table-column prop="minorCategory" label="小类" align="center">
          <template #default="{ row }">
            {{ row.minorCategory }}
          </template>
        </el-table-column>
        <el-table-column prop="detailCategory" label="细分类" align="center"> 
          <template #default="{ row }">
            {{ row.detailCategory }}
          </template>
        </el-table-column>
        <el-table-column prop="subDetailCategory" label="细分子类" align="center">
          <template #default="{ row }">
            {{ row.subDetailCategory }}
          </template>
        </el-table-column>
        <el-table-column prop="stage" label="阶段" align="center">
          <template #default="{ row }">
            {{ row.stage }}
          </template>
        </el-table-column>
        <el-table-column prop="totalprojectNameInputScore" label="总分" align="center">
          <template #default="{ row }">
            {{ row.totalScore }}
          </template>
         </el-table-column>
        <el-table-column prop="isTimeSensitive" label="是否时效性" width="90" align="center">
          <template #default="{ row }">
            <!-- {{ row.isTimeSensitive === '0' ? '是' : '否' }} -->
            {{ row.isTimeSensitive === '0' ? '否':  '是' }}
          </template>
        </el-table-column>
        <el-table-column prop="timeLimit" label="时效时间"  width="100" v-if="!showCompletionTime" align="center">
          <template #default="{ row }">
            {{ row.timeLimit }}
          </template>
        </el-table-column>
        <el-table-column prop="projectNameInput" label="项目名称" align="center" width="200"> 
          <template #default="{ row }">
            <el-input :disabled="!isEditable" v-model="row.projectNameInput"  @blur="checkProjectNameUnique(row)"></el-input>      
            </template>
        </el-table-column>
        <el-table-column prop="completionTime" label="完成时间" width="250" v-if="!showCompletionTime" align="center">
          <template #default="{ row }">
            <el-date-picker
              v-model="row.completionTime"
              type="date"
              placeholder="选择日期"
              @change="validateCompletionTime(row)" 
              :disabled="!isEditable"
            />
          </template>
        </el-table-column>
        <el-table-column prop="memberName" label="成员姓名"  width="100" align="center">
          <template #default="{ row }">
            <el-cascader
              v-model="row.memberName"
              :options="departmentTreeOptions"
              clearable
              :disabled="!isEditable"
            />
          </template>
        </el-table-column>
        <el-table-column prop="ratio" label="比例" align="center"> 
          <template #default="{ row }">
              <el-input
                v-model="row.ratioInput"
                @blur="validateAndFormatRatio(row)"
                @keyup.enter="validateAndFormatRatio(row)"
                :disabled="!isEditable"
              />
            </template>
       </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="{ row }">
            <el-button size="small" type="danger" @click="removeRow(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      

      <!-- <el-table
        :data="editableTableData"
        style="width: 100%; margin-top: 20px;"
        @row-click="handleEditableRowClick"
      >
        <el-table-column prop="stageName" label="阶段名称">
          <template #default="{ row }">
            <el-input v-model="row.stageName" placeholder="请输入阶段名称" />
          </template>
        </el-table-column>
        <el-table-column prop="stagePoints" label="阶段分值">
          <template #default="{ row }">
            <el-input v-model="row.stagePoints" placeholder="请输入阶段分值" />
          </template>
        </el-table-column>
        <el-table-column prop="applicationInstructions" label="Application Instructions">
          <template #default="{ row }">
            <el-input v-model="row.applicationInstructions" type="textarea" />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button size="small" type="danger" @click="removeEditableRow(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table> -->
      <div style="margin-top: 10px;">
        <el-upload
          ref="upload"
          class="upload-demo"
          :auto-upload="false"
          :on-change="handleChange"
          :on-preview="handleDownload"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :on-exceed="handleExceed"
          :file-list="submit_fileList"
          :disabled="!isEditable" 
        >
          <el-button :disabled="!isEditable"  size="small" type="primary">选择审核文件<el-icon class="el-icon--right"><Upload /></el-icon></el-button>
        </el-upload>
      </div>
      <!-- <el-upload
        class="upload-demo"
        action="/upload/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :on-exceed="handleExceed"
        :file-list="submit_fileList"
      >
        <el-button size="small" type="primary">点击上传附件<el-icon class="el-icon--right"><Upload /></el-icon></el-button>
        <span>仅允许导入xls、xlsx格式文件。</span>
      </el-upload> -->

      <!-- <el-cascader
        v-model="approvalPerson"
        :options="approvalOptions"
        clearable
        placeholder="选择审批人员"
      /> -->
      <el-scrollbar height="100px">
            <div v-for="(item) in NoTreeData.items" :key="item.id" class="scrollbar-demo-item">
              <!-- <el-checkbox v-model="item.selected" @change="deleteItem(item.id)">删除</el-checkbox> -->
              <span>{{ item.text }}</span>
              <!-- <el-button type="text" @click="deleteItem(item.id)">X</el-button> -->
            </div>
          </el-scrollbar>
      <!-- <el-scrollbar height="100px">
        <div v-for="(item) in NoTreeData.item" :key="item.id" class="scrollbar-demo-item">
          <span>{{ item.text }}</span>
        </div>
      </el-scrollbar>
     -->
      <el-dialog :title="submitDialogTitle" v-model="submitDialogOpen" width="400px"  @close="submitDialogOpen = false, cancelSubmit()" :close-on-click-modal="false"append-to-body>
        <el-form :model="submitForm" :rules="submitRules" ref="submitFormRef">
          <el-form-item prop="approvalPerson">
            <el-cascader
              v-model="submitForm.approvalPerson"
              :options="approvalAttributes.approvalOptions"
              clearable
              placeholder="选择审批人员"
              style="width: 100%"
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="submitForm.opinion"
              placeholder="提交意见（可选）"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button type="primary" @click="confirmSubmit">确 定</el-button>
            <el-button @click="cancelSubmit">取 消</el-button>
          </div>
        </template>
      </el-dialog>

      <el-dialog :title="approveDialogTitle" v-model="approveDialogOpen" width="400px"  @close="approveDialogOpen = false, cancelApprove()" :close-on-click-modal="false" append-to-body>
        <el-form :model="approveForm" :rules="approveRules" ref="approveFormRef">
          <el-form-item prop="approvalPerson" v-if="!approvalAttributes.flag">
            <el-cascader
              v-model="approveForm.approvalPerson"
              :options="approvalAttributes.approvalOptions"
              clearable
              placeholder="选择审批人员"
              style="width: 100%"
            />
          </el-form-item>
          <el-form-item v-if="!approvalAttributes.flag">
            <el-input
              v-model="approveForm.opinion"
              placeholder="提交意见（可选）"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button type="primary" @click="confirmApprove">{{ approvalAttributes.flag ? '归档' : '确 定' }}</el-button>
            <el-button @click="cancelApprove">取 消</el-button>
          </div>
        </template>
      </el-dialog>

      <el-dialog :title="rejectDialogTitle" v-model="rejectDialogOpen" width="400px"  @close="rejectDialogOpen = false, cancelReject()" :close-on-click-modal="false"  append-to-body>
        <el-form :model="rejectForm" :rules="rejectRules" ref="rejectFormRef">
          <el-form-item prop="approvalPerson">
            <el-cascader
              v-model="rejectForm.approvalPerson"
              :options="approvalAttributes.approvalOptions"
              clearable
              placeholder="选择退回人员"
              style="width: 100%"
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="rejectForm.opinion"
              placeholder="提交意见（可选）"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button type="primary" @click="confirmReject">确 定</el-button>
            <el-button @click="cancelReject">取 消</el-button>
          </div>
        </template>
      </el-dialog>
   </div>





</template>

<script setup name="Submit">
import { ref, reactive, watch } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
// getCategorySubmissionInfo，submitToBackend
import { getapplicationInstructionsByMenuId,getPersonDepartmentName,fetchSH_submitTableData,submitToBackend,approveToBackend,
  rejectToBackend,listMenu,  fetchSubmit_formOptions,fetchApprovalOptions,fetchrejectOptions,getSubmissionInfo} from "@/api/system/sh_submit";
import JSZip from 'jszip';
// import tar from 'js-tar';
// import tar from 'tar';

import { nanoid } from 'nanoid'; // 引入 nanoid 库用于生成随机字符串
// const form = reactive({
//   cascaderValue: [],
//   applicationInstructions: ''

// });
const { proxy } = getCurrentInstance();
const submit_fileList = ref([]);
submit_fileList.value = [
    {
      "name": "系统通知1.xlsx",
      "url": "isRemote-monitor/job/export/DDD1"
    },
    {
      "name": "系统通知2.xlsx",
      "url": "isRemote-monitor/job/export/DDD2"
    },
    {
      "name": "系统文档1.docx",
      "url": "isRemote-monitor/job/export/DDD3"
    },
    {
      "name": "系统文档2.docx",
      "url": "isRemote-monitor/job/export/DDD4"
    },
    {
      "name": "系统文档3.docx",
      "url": "isRemote-monitor/job/export/DDD5"
    },
    ];
const submit_form_message = reactive({
  cascaderValue: [],
  applicationInstructions: '为我院外部工作相关单位培训，参加人数10人以上（含10人），在培训结束一个月内提供照片、签到或会议纪要或其他依据，1000分/次。'

});
const tableData = ref([]);
// 初始化数据
// const tableData = ref([
//   { id: 1, ratioInput: '0.5' },
//   { id: 2, ratioInput: '0.8' },
//   { id: 3, ratioInput: '1.2%' }, // 这一行将触发错误消息
//   // 更多数据...
// ]);
// 定义一个响应式数组来存储项目
const approvalOpinion= ref('');
const canSubmit = ref(true); // 控制提交按钮是否可用
const showSaveDraftButton = ref(true); // 控制保存草稿按钮是否显示
const items = ref([]);
const initialFlowState = ref(false);
const route = useRoute();
const externalId = computed({
  get() {
    // 如果 route.params.id 存在且非空，则返回其值，否则返回空字符串
    return route.params?.param?.id || '';
  }
});
   // 计算属性 tooltipContent
const tooltipContent = computed({
  get() {
      const trimmedInput = row.value.projectNameInput.trim();
      return `${trimmedInput}${'                                  '}` ;
      }
    });

// 模拟的5个表格数据



const mockTableData = [
  {
    majorCategory: '技术提升',
    minorCategory: '技术培训',
    isSingleScore: '是',
    detailCategory: '内部培训',
    subDetailCategory: '分支机构间',
    totalScore: 100,
    stage: '最终阶段',
    isTimeSensitive: '1',
    timeLimit: '一个月',
    projectNameInput: '课题1',
    completionTime: '2024-12-25',
    memberName: '张三',
    ratio: '30%'
  },
  {
    majorCategory: '技术提升',
    minorCategory: '技术培训',
    isSingleScore: '是',
    detailCategory: '内部培训',
    subDetailCategory: '分支机构间',
    totalScore: 100,
    stage: '最终阶段',
    isTimeSensitive: '1',
    timeLimit: '一个月',
    projectNameInput: '',
    completionTime: '2024-12-25',
    memberName: '李四',
    ratio: '20%'
  },
  {
    majorCategory: '技术提升',
    minorCategory: '技术培训',
    isSingleScore: '是',
    detailCategory: '内部培训',
    subDetailCategory: '分支机构间',
    totalScore: 100,
    stage: '最终阶段',
    isTimeSensitive: '1',
    timeLimit: '一个月',
    projectNameInput: '',
    completionTime: '2024-12-25',
    memberName: '王五',
    ratio: '25%'
  },
  {
    majorCategory: '技术提升',
    minorCategory: '技术培训',
    isSingleScore: '是',
    detailCategory: '内部培训',
    subDetailCategory: '分支机构间',
    totalScore: 100,
    stage: '最终阶段',
    isTimeSensitive: '1',
    timeLimit: '一个月',
    projectNameInput: '',
    completionTime: '2024-12-25',
    memberName: '赵六',
    ratio: '15%'
  },
  {
    majorCategory: '技术提升',
    minorCategory: '技术培训',
    isSingleScore: '是',
    detailCategory: '内部培训',
    subDetailCategory: '分支机构间',
    totalScore: 100,
    stage: '最终阶段',
    isTimeSensitive: '1',
    timeLimit: '一个月',
    projectNameInput: '',
    completionTime: '2024-12-25',
    memberName: '孙七',
    ratio: '10%'
  },
];


tableData.value = mockTableData
// 根据路由参数获取数据
// onMounted(
//     tableData.value = mockTableData
//     // shouldShowTable.value = true;
//  );
onMounted(() => {
      tableData.value = mockTableData;
      // if (route.params && route.params.params) {
      //   const params = JSON.parse(decodeURIComponent(route.params.params));
      //   // console.log('params:',params);
      //       if (params.isNotEditable) {
      //         setTableData();
      //       }           
      // }
      if (route.params) {
       
              if(route.params.params){
                const dataStr = route.params.params;
                if(dataStr!=':params'){
                // console.log(decodeURIComponent(dataStr));
                const decodedData = JSON.parse(decodeURIComponent(dataStr));
                // 检查是否有 title 属性
                if (decodedData.isNotEditable) {
                  console.log(decodedData.isNotEditable);
                  setTableData();
                }
              }}
              
              
       
              // const dataStr = route.params.data;
              // console.log('dataStr:',route.params);
              // const decodedData = JSON.parse(decodeURIComponent(dataStr));
              // // 检查是否有 title 属性
              // if (decodedData.isNotEditable) {
               
              // }
            }
   });
// 根据路由参数获取数据
// onMounted(async () => {
//   const param = route.params?.param;
//   if (!param) {
//     // ElMessage.warning('No parameter provided.');
//     return;
//   }

//   const data = await fetchSH_submitTableData(param);
//   if (data) {
//   if (data.showApprovalInput !== undefined) {
//       showApprovalInput.value = data.showApprovalInput;
//     }
//   if (data && data.exists === false) {
//     // ElMessage.info('No data found for the given parameter.');
//     // shouldShowTable.value = false;
//     // fillItems(); // 如果没有数据则填充items
//   } else if (data && data.exists === true) {
//     tableData.value = data.tableData || [];
//     // shouldShowTable.value = true;
//   }
// }
// });
const baocun_true = computed({
  get() {
    if (route.params && route.params.param && route.params.param.baocun_true !== undefined && route.params.param.baocun_true === true) {
      return true;
    }
    return false;
  }
});
// 定义响应式对象，初始为空
//const NoTreeData = reactive({
  //items: []
//});


const NoTreeData = reactive({
  items: [
    { text: '某某某审核通过 (时间：2023年09月19日 12时30分00秒，意见：无)', id: '169384770034545678-0' },
    { text: '某某审核驳回 (时间：2023年09月19日 12时30分00秒，意见：该内容不符合要求)', id: '169384770034545678-1' },
    { text: '某某某审核通过 (时间：2023年09月19日 12时30分00秒，意见：无)', id: '169384770034545678-2' },
    { text: '某某审核驳回 (时间：2023年09月19日 12时30分00秒，意见：该内容不符合要求)', id: '169384770034545678-3' },
    { text: '某某某审核通过 (时间：2023年09月19日 12时30分00秒，意见：无)', id: '169384770034545678-4' },
    { text: '某某审核驳回 (时间：2023年09月19日 12时30分00秒，意见：该内容不符合要求)', id: '169384770034545678-5' },
    { text: '某某某审核通过 (时间：2023年09月19日 12时30分00秒，意见：无)', id: '169384770034545678-6' },
    { text: '某某审核驳回 (时间：2023年09月19日 12时30分00秒，意见：该内容不符合要求)', id: '169384770034545678-7' },
    { text: '某某某审核通过 (时间：2023年09月19日 12时30分00秒，意见：无)', id: '169384770034545678-8' },
    { text: '某某审核驳回 (时间：2023年09月19日 12时30分00秒，意见：该内容不符合要求)', id: '169384770034545678-9' },
    { text: '某某某审核通过 (时间：2023年09月19日 12时30分00秒，意见：无)', id: '169384770034545678-10' },
    { text: '某某审核驳回 (时间：2023年09月19日 12时30分00秒，意见：该内容不符合要求)', id: '169384770034545678-11' },
    { text: '某某某审核通过 (时间：2023年09月19日 12时30分00秒，意见：无)', id: '169384770034545678-12' },
    { text: '某某审核驳回 (时间：2023年09月19日 12时30分00秒，意见：该内容不符合要求)', id: '169384770034545678-13' },
    { text: '某某某审核通过 (时间：2023年09月19日 12时30分00秒，意见：无)', id: '169384770034545678-14' },
    { text: '某某审核驳回 (时间：2023年09月19日 12时30分00秒，意见：该内容不符合要求)', id: '169384770034545678-15' }
  ]
});




   // 定义 initialFlowState
initialFlowState.value = computed(() => externalId.value == '');

function getList() {
  // loading.value = true;
  // 假设 response.data 是从后端获取的数据
  // const response = {
  //   data: {
  //     items: [
  //       { "text": "某某某审核通过", "id": "169384770034545678-0" },
  //       { "text": "某某审核驳回", "id": "169384770034545678-1" },
  //       // ... 其他数据
  //     ]
  //   }
  // };

  // // 更新 NoTreeData 的 items 属性
  // NoTreeData.items = response.data.items;
    // NoTreeData.value=response.data
   
}
getList()
// function getList(externalId) {
//   // loading.value = true;
//   listMenu(externalId).then(response => {
//     NoTreeData.value=response.data
//     // NoTreeData.value=a_data

//     // menuList.value = proxy.handleTree(response.data, "menuId");
//     // loading.value = false;
//   });
// }
// getList(externalId)
// const externalId = computed(() => route.params.id);
const showApprovalInput = ref(false); // 控制审批意见输入框是否显示
const formRef = ref(null);

// 同意对话框的状态
const approveDialogOpen = ref(false);
const approveDialogTitle = '同意审批';
// 驳回对话框的状态
const rejectDialogOpen = ref(false);
// 定义 externalId

// 提交对话框的状态
const submitDialogOpen = ref(false);
const submitDialogTitle = '提交审批';
const submitForm = reactive({
  approvalPerson: [],
  opinion: ''
});

const validateCompletionTime = (row) => {
  if (!row.completionTime) return; // 如果没有选择日期，直接返回

  const currentTime = new Date(); // 当前时间
  const selectedTime = new Date(row.completionTime); // 选择的时间
  const timeLimit = row.timeLimit;

  let limitDate;
  switch (timeLimit) {
    case '一个月':
      limitDate = new Date(currentTime);
      limitDate.setMonth(limitDate.getMonth() - 1);
      break;
    case '两个月':
      limitDate = new Date(currentTime);
      limitDate.setMonth(limitDate.getMonth() - 2);
      break;
    case '三个月':
      limitDate = new Date(currentTime);
      limitDate.setMonth(limitDate.getMonth() - 3);
      break;
    default:
      console.warn('未知的时间限制');
      return;
  }

  if (selectedTime <= limitDate) {
    // 超过时间限制
    ElMessage.error('超出时效，请重新选择日期！');
    row.completionTime = null; // 清除日期
  }
};


function submit_form() {
  let isValid = true;
  submitDialogOpen.value = true;
  if (!submit_form_message.cascaderValue || submit_form_message.cascaderValue.length !== 5) {
    ElMessage.error('请选择完整的分类');
    isValid = false;
  }

  tableData.value.forEach((row) => {
    if (!row.memberName || !row.ratio) {
      ElMessage.error('请填写所有必填项');
      isValid = false;
    }
  });

  if (isValid) {
    fetchSubmit_formOptions(route.params?.param?.id || '',a)
    .then((response) => {
      // approvalOptions.value = response;
      // approvalAttributes = response;
      approvalAttributes.value.approvalOptions = ref(response.approvalOptions);
      
      approveDialogOpen.value = true;
    })
    .catch((error) => {
      ElMessage.error('后端接口连接失败，请稍后再试');
    });
    // ElMessage.success('提交成功');
    // submitDialogOpen.value=true;
  }
}
// function agreeAction() {

//     // ElMessage.success('提交成功');
//     approveDialogOpen.value=true;
  
// }
// function reject() {

// // ElMessage.success('提交成功');
// rejectDialogOpen.value=true;

// }

function agreeAction() {
  fetchApprovalOptions(route.params?.param?.id || '',a)
    .then((response) => {
      // approvalOptions.value = response;
      // approvalAttributes = response;
      approvalAttributes.value.approvalOptions = ref(response.approvalOptions);

      approveDialogOpen.value = true;
    })
    .catch((error) => {
      ElMessage.error('后端接口连接失败，请稍后再试');
    });
}

function reject() {
  fetchrejectOptions(route.params?.param?.id || '',a)
    .then((response) => {
      // approvalOptions.value = response;
      // approvalAttributes = response;
      approvalAttributes.value.approvalOptions = ref(response.approvalOptions);
      rejectDialogOpen.value = true;
    })
    .catch((error) => {
      ElMessage.error('后端接口连接失败，请稍后再试');
    });
}
const projectNameInput=ref('');
// 响应式变量定义
const totalScore = ref(0);
const isTimely = ref(false);
const timeLimit = ref('');
const completionTime = ref('');
const memberName = ref('');
const ratio = ref('');
function onCascaderChange(value) {
  // if (value.length === 5) {
  //   // lastElement = value[value.length - 1];
  //   // form.applicationInstructions = getapplicationInstructionsByMenuId(lastElement);
  //   form.applicationInstructions = `根据选择的分类：${value.join(' - ')}`;
  //   showCompletionTime.value = true;
  //   addRow();
  // }

  // 如果选择了五个层级
  if (value.length === 5) {
      // 调用接口方法
  findItemByMenuId(lastSelectedMenuId, submissionInfo.value)
    .then((foundItem) => {
      // 接口调用成功，处理foundItem
      if (foundItem) {
        submit_form_message.applicationInstructions = foundItem.applicationInstructions;
        showCompletionTime.value = foundItem.isTimeSensitive === "0";
        totalScore.value = foundItem.totalScore;
        isTimely.value = foundItem.isTimely; // 注意这里逻辑取反，因为假设 "1" 表示及时
        timeLimit.value = foundItem.timeLimit;
        completionTime.value = foundItem.completionTime;
        memberName.value = foundItem.memberName;
        ratio.value = foundItem.ratio;
        
        // 执行addRow()
        addRow();
      }
    })
    .catch((error) => {
      // 接口调用失败，显示错误消息并重置变量
      ElMessage.error('后端接口连接异常，请稍后再试');
      submit_form_message.applicationInstructions = '';
      showCompletionTime.value = false;
      totalScore.value = 0;
      isTimely.value = false;
      timeLimit.value = '';
      completionTime.value = '';
      memberName.value = '';
      ratio.value = '';
    });
}else{
      submit_form_message.applicationInstructions = '';
      showCompletionTime.value = false;
      totalScore.value = 0;
      isTimely.value = false;
      timeLimit.value = '';
      completionTime.value = '';
      memberName.value = '';
      ratio.value = '';
}
//   
}

// 取消提交
const cancelSubmit = () => {
  submitDialogOpen.value = false;
  clearAfterSubmit('submitFormRef', submit_fileList.value);
 
};

// 取消同意
const cancelApprove = () => {
  clearAfterApprove();
  approveDialogOpen.value = false;
};

// 取消驳回
const cancelReject = () => {
  clearAfterReject();
  rejectDialogOpen.value = false;
};

const approveForm = reactive({
  approvalPerson: [],
  opinion: ''
});


const rejectDialogTitle = '驳回审批';
const rejectForm = reactive({
  approvalPerson: [],
  opinion: ''
});

// 表单验证规则
const submitRules = {
  approvalPerson: [{ required: true, message: '请选择审批人员', trigger: 'blur' }]
};

const approveRules = {
  approvalPerson: [{ required: true, message: '请选择审批人员', trigger: 'blur' }]
};

const rejectRules = {
  approvalPerson: [{ required: true, message: '请选择退回人员', trigger: 'blur' }]
};

// 打开提交对话框
const openSubmitDialog = () => {
  submitDialogOpen.value = true;
};

// 打开同意对话框
const openApproveDialog = () => {
  approveDialogOpen.value = true;
};

// 打开驳回对话框
const openRejectDialog = () => {
  rejectDialogOpen.value = true;
};
// 控制按钮是否可见
const buttonsVisible = ref(true);
// 隐藏所有按钮
const hideButtons = () => {
      buttonsVisible.value = false;
    };
    

const confirmSubmit = () => {
  const formRef = 'submitFormRef';
  validateAndSubmit(formRef, 'submitDialogTitle', '已经提交', 'submit');
};

const confirmApprove = () => {
  const formRef = 'approveFormRef';
  validateAndSubmit(formRef, 'approveDialogTitle', '已同意该审批', 'approve');
};

const confirmReject = () => {
  const formRef = 'rejectFormRef';
  validateAndSubmit(formRef, 'rejectDialogTitle', '已经驳回', 'reject');
};

const validateAndSubmit = (formRef, title, successMessage, action) => {
  const form = ref(null);
  const dialogOpen = ref(false);
  const dialogTitle = ref('');
  const formValues = ref({});

  switch (formRef) {
    case 'submitFormRef':
      form.value = submitForm;
      dialogOpen.value = submitDialogOpen;
      dialogTitle.value = submitDialogTitle;
      formValues.value = submitForm.value;
      break;
    case 'approveFormRef':
      form.value = approveForm;
      dialogOpen.value = approveDialogOpen;
      dialogTitle.value = approveDialogTitle;
      formValues.value = approveForm.value;
      break;
    case 'rejectFormRef':
      form.value = rejectForm;
      dialogOpen.value = rejectDialogOpen;
      dialogTitle.value = rejectDialogTitle;
      formValues.value = rejectForm.value;
      break;
  }
  switch (action) {
  case 'submit':
    previousRoute = '/a';
    nextRoute = '/b';
    break;
  case 'approve':
    previousRoute = '/b';
    nextRoute = '/c';
    break;
  case 'reject':
    previousRoute = '/c';
    nextRoute = '/d';
    break;
}
  const rules = formRef === 'submitFormRef' ? submitRules :
                formRef === 'approveFormRef' ? approveRules :
                rejectRules;

  form.value.$refs[formRef].validate((valid) => {
    if (valid) {
      // 根据不同操作发送不同的请求
      switch (action) {
        case 'submit':
          // 添加表单数据
          formData.append('formValues', JSON.stringify(formValues.value));

            // 添加表格数据
          formData.append('tableData', JSON.stringify(tableData.value));

            // 添加文件数据
          if (submit_fileList.value && submit_fileList.value.length > 0) {
              submit_fileList.value.forEach(file => {
                // 假设file.raw为文件原始数据或file为文件对象本身
                formData.append('files', file.raw, file.name);
              });
            }
            
          submitToBackend(formData)
          // submitToBackend(formValues.value, tableData.value, submit_fileList.value)
          .then(() => {
              ElMessage.success(successMessage);
              clearAfterSubmit(formRef, tableData.value, submit_fileList.value);
              dialogOpen.value = false;
              const lastRoute = localStorage.getItem('lastRoute') || '/';
              if (lastRoute === previousRoute) {
                // 如果上一个路由与预期的前一个路由相同，就不改变路由
                router.push(lastRoute);
              } else {
                // 否则，跳转到下一个路由
                router.push(nextRoute);
              }
            })
            .catch(error => {
              ElMessage.error('提交失败，请重试');
            });
          break;
        case 'approve':
          // approveToBackend(formValues.value, externalId.value);
          approveToBackend(formValues.value, externalId.value)
          .then(() => {
            ElMessage.success(successMessage);
            clearAfterApprove(formRef, externalId.value);
            dialogOpen.value = false;
            const lastRoute = localStorage.getItem('lastRoute') || '/';
              if (lastRoute === previousRoute) {
                // 如果上一个路由与预期的前一个路由相同，就不改变路由
                router.push(lastRoute);
              } else {
                // 否则，跳转到下一个路由
                router.push(nextRoute);
              }
          })
          .catch(error => {
            ElMessage.error('提交失败，请重试');
          });
          break;
        case 'reject':
          // rejectToBackend(formValues.value, externalId.value);
          rejectToBackend(formValues.value, externalId.value)
          .then(() => {
            ElMessage.success(successMessage);
            clearAfterReject(formRef, externalId.value);
            dialogOpen.value = false;
            const lastRoute = localStorage.getItem('lastRoute') || '/';
              if (lastRoute === previousRoute) {
                // 如果上一个路由与预期的前一个路由相同，就不改变路由
                router.push(lastRoute);
              } else {
                // 否则，跳转到下一个路由
                router.push(nextRoute);
              }
          })
          .catch(error => {
            ElMessage.error('提交失败，请重试');
          });
          break;
      }
    } else {
      ElMessage.error('请检查填写的信息');
    }
  });
};
const resetAddForm = () => {
  proxy.resetForm("singleEditRef");

};
// function submitFiles ()  {
//   uploadHintLoading.value = true;

//   // 比较文件列表找出被删除和被添加的文件
//   const removedFiles = [];
//   const addedFiles = [];

//   originalFileList.value.forEach(originalFile => {
//     if (!HintfileList.value.some(currentFile => currentFile.url === originalFile.url)) {
//       removedFiles.push(originalFile);
//     }
//   });

//   HintfileList.value.forEach(currentFile => {
//     if (!originalFileList.value.some(originalFile => originalFile.url === currentFile.url)) {
//       addedFiles.push(currentFile);
//     }
//   });

//   // 准备上传的数据
//   const formData = new FormData();
//   addedFiles.forEach(file => {
//     formData.append('addedFiles', file.raw, file.name);
//   });
//   removedFiles.forEach(file => {
//     formData.append('removedUrls', file.url);
//   });
//   HintfileUpload(formData).then(response => {
//     // NoTreeData.value=response.data
//       getHintFile();
//   }).catch (error => {ElMessage.error('文件上传失败: ' + error.message); uploadHintLoading.value = false;}

// )
// }

// 清理提交后的状态
const clearAfterSubmit = (formRef, submit_fileList) => {
  proxy.resetForm(formRef);
  // submit_fileList.value = [];
  // submitForm.value = {};
  clearFormProperties(submitForm, ['approvalPerson', 'opinion']);
};

// 清理同意后的状态
const clearAfterApprove = (formRef) => {
  proxy.resetForm(formRef);
  // approveForm.value = {};
  clearFormProperties(approveForm, ['approvalPerson', 'opinion']);
};

// 清理驳回后的状态
const clearAfterReject = (formRef) => {
  proxy.resetForm(formRef);
  // rejectForm.value = {};
  clearFormProperties(rejectForm, ['approvalPerson', 'opinion']);
};


// 清除表单中的指定属性
const clearFormProperties = (form, properties) => {
  properties.forEach(property => {
    if (Array.isArray(form[property])) {
      form[property] = [];
    } else {
      form[property] = '';
    }
  });
};






const rules = reactive({
  cascaderValue: [{ required: true, message: '请选择分类', trigger: 'blur' }]
});
const toggleButtons = (value) => {
      // 直接设置按钮显示状态
      initialFlowState.value = value;
    };
// 监听 canSubmit 的变化并更新 submitButtonText
// watch(canSubmit, (newValue) => {
//   submitButtonText.value = newValue ? '提交' : '通过';
//   // submitButtonType.value = newValue ? 'primary' : 'success'; // 示例类型
// },
// { immediate: true } // 立即执行
// );

// 驳回
// 
// 保存草稿的方法
const saveDraft = () => {
  // 创建一个变量来保存草稿数据，其中包含每行的id以及整个tableData
  // 获取当前时间戳
  const timestamp = Date.now();
  // 生成一个随机字符串
  const randomPart = nanoid(5); // 生成长度为5的随机字符串
  // 组合时间戳和随机字符串生成ID
  const id = `${timestamp}-${randomPart}`;
  const draftData = {
    ids: id,
    data: tableData.value
  };

  // 保存草稿的逻辑
  console.log('保存草稿', draftData);
  // 将数据保存到本地存储
  localStorage.setItem('draftTableData', JSON.stringify(draftData));
};


// const categoryOptions = ref([
//   { value: '1', label: '大类A', children: [
//     { value: '1.1', label: '小类A1', children: [
//       { value: '1.1.1', label: '细分类A11', children: [
//         { value: '1.1.1.1', label: '细分子类A111', children: [
//           { value: '1.1.1.1.1', label: '阶段A1111' }
//         ]}
//       ]}
//     ]}
//   ]}
// ]);
// const yuan_options =getSubmissionInfo();
function checkProjectNameUnique (row)  {
  // console.log('checkProjectNameUnique', row.projectNameInput);

  const projectName = row.projectNameInput;
// 如果 projectName 是空字符串，则不执行后续逻辑
  if (projectName === '') {
    return;
  }

  // 过滤掉当前行，并检查其他行是否有 `projectNameInput` 属性
  const otherRows = tableData.value.filter(r => r !== row && r.hasOwnProperty('projectNameInput')&& r.projectNameInput!=='');
  let isNOtUnique = false
  console.log('otherRows', otherRows);
  if (otherRows.length > 0) {
    isNOtUnique = !otherRows.some(r => r.projectNameInput === projectName);
  
  
  }
  
  if (isNOtUnique) {
    // 找到第一个与当前项目名称相同的项目名称
    const existingProjectName = otherRows.find(r => r.projectNameInput !== projectName).projectNameInput;
    ElMessage.error(`项目名称必须唯一, 已存在的项目名称为：${existingProjectName}`);
    row.projectNameInput = ''; // 清除不唯一的输入
}
};
function buildTreeOptions(data, idKey) {
  return data.map(item => {
    let label = "";
    if (item.isMajorCategory) {
      label = item.majorCategory;
    } else if (item.isMinorCategory) {
      label = item.minorCategory;
    } else if (item.isSubCategory) {
      label = item.subCategory;
    } else if (item.isSubSubCategory) {
      label = item.subSubCategory;
    } else if (item.isStage) {
      label = item.stageName;
    }

    return {
      value: item[idKey],
      label: label,
      children: buildTreeOptions(item.children, idKey)
    };
  });
}


function convertToDepartmentTree(personnelData) {
  const tree = {};
  // 遍历人员数据
  personnelData.forEach(person => {
    // 获取部门名称
    const deptName = person.deptname;
    // 创建或更新部门节点
    if (!tree[deptName]) {
      tree[deptName] = {
        value: deptName, // 使用部门名称作为 value
        label: deptName, // 使用部门名称作为 label
        children: []
      };
    }
    // 添加个人角色信息到部门的子节点列表
    tree[deptName].children.push({
      value: person.roleid,
      label: person.rolename,
    });
  });
  // 将树对象转换为数组
  return Object.values(tree);
}
// const personnelData=getPersonDepartmentName()
// // 调用 convertToDepartmentTree 方法
// const departmentTreeOptions = convertToDepartmentTree(personnelData);
// 假设 flag 是外部定义的响应式变量

// 初始执行
// const chusi_flag = ref(false);
// const submissionInfo =reactive ({}); 
// function getlist() {
//   getSubmissionInfo()
//     .then((response) => {
//       // 假设接口返回的数据结构是 { data: ... }
//       if (response.data) {
//         submissionInfo = response.data;
//         chusi_flag.value = true; // 设置flag为true
//       } else {
//         // 如果没有data属性，可以根据实际情况处理，这里只是示例
//         ElMessage.error('返回的数据不包含预期的data属性');
//         chusi_flag.value = false; // 根据实际情况可能需要设置flag为false
//       }
//     })
//     .catch((error) => {
//       // 接口调用失败，显示错误消息
//       ElMessage.error('后端接口连接失败，请稍后再试');
//       chusi_flag.value = false; // 接口失败，设置flag为false
//     });
// }
// getlist()
// // 获取数据
// const submissionInfo = getSubmissionInfo();
// submissionInfotree.value = proxy.handleTree(submissionInfo, "menuId");
// // 构建选项
// const options = buildTreeOptions(submissionInfotree, "menuId");
const memberOptions = ref([
  { value: '1', label: '张三' },
  { value: '2', label: '李四' },
  { value: '3', label: '王五' }
]);
const approvalAttributes = reactive({
  flag: computed(() => route.params?.param?.flag || false),
  approvalOptions: ref([
    { value: '1', label: '赵六' },
    { value: '2', label: '孙七' },
    { value: '3', label: '周八' }
  ])
});
const approvalOptions = ref([
  { value: '1', label: '赵六' },
  { value: '2', label: '孙七' },
  { value: '3', label: '周八' }
]);


const editableTableData = ref([]);

const showCompletionTime = ref(false);
const approvalPerson = ref([]);
const categoryOptions = ref([
  { value: '1', label: '大类A', children: [
    { value: '1.1', label: '小类A1', children: [
      { value: '1.1.1', label: '细分类A11', children: [
        { value: '1.1.1.1', label: '细分子类A111', children: [
          { value: '1.1.1.1.1', label: '阶段A1111' }
        ]}
      ]}
    ]}
  ]}
]);
// const yuan_options=ref([]);
//  yuan_options =getSubmissionInfo();
// 调用 buildTreeOptions 方法
// const categoryOptions = buildTreeOptions(yuan_options, menuId);
// 添加响应式的新行数据
// const totalScore = ref(0);
// const isTimely = ref(false);
// const timeLimit = ref('');
// const completionTime = ref('');
// const memberName = ref('');
// const ratio = ref('');
function createNewRow() {
  return reactive({
    majorCategory: yuan_options.value[submit_form_message.cascaderValue[0]].label,
    minorCategory: yuan_options.value[submit_form_message.cascaderValue[1]].label,
    detailCategory: yuan_options.value[submit_form_message.cascaderValue[2]].label,
    subDetailCategory: yuan_options.value[submit_form_message.cascaderValue[3]].label,
    stage: yuan_options.value[submit_form_message.cascaderValue[4]].label,
    totalScore: totalScore.value,  // 使用外部响应式变量的值
    projectNameInput:projectNameInput.value,
    isTimely: isTimely.value,      // 使用外部响应式变量的值
    timeLimit: timeLimit.value,    // 使用外部响应式变量的值
    completionTime: completionTime.value,  // 使用外部响应式变量的值
    memberName: memberName.value,  // 使用外部响应式变量的值
    ratio: ratio.value             // 使用外部响应式变量的
  });
}


// 查找具有指定 menuId 的项
// function findItemByMenuId(menuId, items) {
//   for (let i = 0; i < items.length; i++) {
//     const item = items[i];
//     if (item.menuId === menuId) {
//       return item;
//     }
//     if (item.children && item.children.length > 0) {
//       const found = findItemByMenuId(menuId, item.children);
//       if (found) {
//         return found;
//       }
//     }
//   }
//   return null;
// }

function findItemByMenuId(menuId, items) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.menuId === menuId) {
        resolve(item);
        return;
      }
      if (item.children && item.children.length > 0) {
        const found = findItemByMenuId(menuId, item.children);
        if (found) {
          resolve(found);
          return;
        }
      }
    }
    reject(new Error(`Item with menuId ${menuId} not found`));
  });
}


// 验证和格式化比例值
function validateAndFormatRatio(row) {
  const input = row.ratioInput.trim();
  const ratio = parseRatio(input);
  if (isNaN(ratio)) {
    ElMessage.error('请输入有效的数字或百分比');
    row.ratioInput = ''; // 清空输入
    return;
  }
  if (ratio <= 0) {
    ElMessage.error('比例值不能小于或等于0%');
    row.ratioInput = ''; // 清空输入
    return;
  }
  if (ratio > 100) {
    ElMessage.error('比例值不能大于100%');
    row.ratioInput = ''; // 设置最大值
  }
  validateTotalRatio(row, ratio);
 // 判断 row.ratioInput 是否为空，如果不为空，则更新为百分比形式
 if (row.ratioInput) {
    row.ratioInput = `${ratio}%`;
  }
}
// 首先，函数接受一个参数 input，这是需要解析的输入值。
// 使用 input.trim() 去除输入值两端的空白字符。
// 然后，函数使用正则表达式 /^\d+(\.\d+)?%$/ 来检查处理后的输入值是否符合百分比的格式。这个正则表达式的含义是：
// ^ 表示匹配字符串的开始。
// \d+ 表示匹配一个或多个数字。
// (\.\d+)? 表示匹配一个小数点后跟一个或多个数字，这个部分是可选的。
// % 表示匹配百分号。
// $ 表示匹配字符串的结束。
// 如果输入值符合百分比格式，函数会将百分号 % 替换为空字符串，然后使用 parseFloat 将剩余的字符串转换为浮点数。这个浮点数就是百分比的数值部分。
// 如果输入值不符合百分比格式，函数会检查它是否符合普通数字的格式，使用正则表达式 /^\d+(\.\d+)?$/ 来检查。这个正则表达式与上面的类似，但不包括 %。
// 如果输入值符合普通数字格式，函数会将这个数字乘以 100，将其转换为对应的百分比格式。
// 如果输入值既不符合百分比格式也不符合普通数字格式，函数将返回 NaN（不是一个数字），表示解析失败。
// 解析比例值

function parseRatio(input) {
  // 检查输入是否为空、null或undefined
  if (input === null || input === undefined || input === '') {
    return 0;
  }

  const trimmedInput = input.trim();

  if (/^\d+(\.\d+)?%$/.test(trimmedInput)) {
    const numberPart = trimmedInput.replace('%', '');
    const ratio = parseFloat(numberPart);
    return ratio;
  } else if (/^\d+(\.\d+)?$/.test(trimmedInput)) {
    const ratio = parseFloat(input);
    return ratio * 100;
  } else if (/^\.\d+$/.test(trimmedInput)) {
    // 处理形如 .2 的情况
    const ratio = parseFloat(trimmedInput);
    return ratio * 100;
  } else {
    return NaN;
  }
}



// 验证所有比例值之和
function validateTotalRatio(row, ratio) {
    const totalRatio = tableData.value.reduce((total, r) => total + parseRatio(r.ratioInput), 0);
  if (totalRatio > 100) {
    ElMessage.error('所有比例值之和不能大于100%');
    // 清除当前行的输入
    row.ratioInput = '';
  }
}
// 上传变量以及js代码
// upload = ref(null);
// submit_fileList = ref([]);

function handleChange (files, submit_fileList) {
  submit_fileList.value = submit_fileList;
  extractAllFilenames(submit_fileList.value);
};

function handleRemove  (file, submit_fileList) {
  console.log(file, submit_fileList);
};

function handleDownload  (file)  {
 const link = document.createElement('a');
  link.href = URL.createObjectURL(file.raw);
  link.download = file.name; // 设置下载文件的名称
  link.click();
};

function handleExceed  (files, submit_fileList)  {
  ElMessage.warning(`最多只能上传 ${files.length} 个文件`);
};

function beforeRemove (file, submit_fileList) {
  return ElMessageBox.confirm(`确定移除 ${file.name}?`);
};
//文件上传，提取文件名
function extractAllFilenames (submit_fileList) {
  // let allFilenames = [];

  // for (const file of submit_fileList.value) {
  //   if (file.name.endsWith('.zip')) {
  //     try {
  //       JSZip.loadAsync(file.raw).then((zip) => {
  //         const filenames = Object.keys(zip.files);
  //         extractNestedFilenamesFromZip(zip, filenames).then((nestedFilenames) => {
  //           allFilenames = allFilenames.concat(nestedFilenames);
  //         });
  //       }).catch((error) => {
  //         console.error(`Error processing ZIP file ${file.name}:`, error);
  //       });
  //     } catch (error) {
  //       console.error(`Error processing ZIP file ${file.name}:`, error);
  //     }
  //   } else if (file.name.endsWith('.tar')) {
  //     try {
  //       const tarStream = tar.Parse(new Uint8Array(file.raw.arrayBuffer()));
  //       const tarFilenames = [];
  //       tarStream.on('entry', (header, stream, callback) => {
  //         if (header.type === 'file') {
  //           tarFilenames.push(header.path);
  //         }
  //         stream.resume(callback); // auto-resume the stream
  //       });
  //       tarStream.on('finish', () => {
  //         extractNestedFilenamesFromTar(tarFilenames).then((nestedFilenames) => {
  //           allFilenames = allFilenames.concat(nestedFilenames);
  //         });
  //       });
  //       tarStream.on('error', (error) => {
  //         console.error(`Error processing TAR file ${file.name}:`, error);
  //      });
  //     } catch (error) {
  //       console.error(`Error processing TAR file ${file.name}:`, error);
  //     }
  //   } else {
  //     allFilenames.push(file.name);
  //   }
  // }

  // console.log('All Filenames:', allFilenames);
};

function extractNestedFilenamesFromZip (zip, filenames) {
  let nestedFilenames = [];

  for (const filename of filenames) {
    if (filename.endsWith('.zip') || filename.endsWith('.tar')) {
      try {
       zip.file(filename).async('uint8array').then((nestedZipData) => {
         const nestedZipInstance = new JSZip(nestedZipData);
          const nestedFilenamesFromZip = Object.keys(nestedZipInstance.files);
          extractNestedFilenamesFromZip(nestedZipInstance, nestedFilenamesFromZip).then((nestedFilenamesFromZipResult) => {
            nestedFilenames = nestedFilenames.concat(nestedFilenamesFromZipResult);
         });
        }).catch((error) => {
          console.error(`Error processing nested ZIP file ${filename}:`, error);
        });
     } catch (error) {
       console.error(`Error processing nested ZIP file ${filename}:`, error);
      }
    } else {
      nestedFilenames.push(filename);
    }
  }

  return Promise.resolve(nestedFilenames);
};

function extractNestedFilenamesFromTar  (filenames)  {
  let nestedFilenames = [];

  for (const filename of filenames) {
    if (filename.endsWith('.zip') || filename.endsWith('.tar')) {
      try {
        const nestedTarStream = tar.Parse(new Uint8Array(file.raw.arrayBuffer())); // 注意这里需要从 submit_fileList 中获取文件
        nestedTarStream.on('entry', (header, stream, callback) => {
          if (header.type === 'file' && header.path === filename) {
            stream.pipe(tar.Parse()).on('entry', (nestedHeader, nestedStream, nestedCallback) => {
              if (nestedHeader.type === 'file') {
                nestedFilenames.push(nestedHeader.path);
              }
              nestedStream.resume(nestedCallback); // auto-resume the stream
            }).on('finish', () => {
              // Finish processing nested TAR file
            }).on('error', (error) => {
              console.error(`Error processing nested TAR file ${filename}:`, error);
            });
          }
          stream.resume(callback); // auto-resume the stream
        });
        nestedTarStream.on('finish', () => {
          // Finish processing TAR file
        }).on('error', (error) => {
          console.error(`Error processing nested TAR file ${filename}:`, error);
        });
      } catch (error) {
       console.error(`Error processing nested TAR file ${filename}:`, error);
      }
    } else {
      nestedFilenames.push(filename);
    }
  }

  return Promise.resolve(nestedFilenames);
};



function handleRowClick(row) {
  if (tableData.value.length > 0) {
    let foundValidProjectNames = [];

    // 遍历 tableData 数组
    for (const item of tableData.value) {
      // 检查 projectNameInput 是否存在且有有效值
      if (item.projectNameInput) {
        foundValidProjectNames.push(item.projectNameInput);
      }
    }

    // 检查 foundValidProjectNames 中是否有多个不同的值
    const uniqueNames = new Set(foundValidProjectNames);
    if (uniqueNames.size === 1) {
      // 如果只有一个有效的项目名称，并且值相同
      row.projectNameInput = [...uniqueNames][0]; // 获取唯一的项目名称值
    } else if (uniqueNames.size > 1) {
      // 如果有多个不同的项目名称
      // ElMessage({
      //   message: '项目名称应该唯一',
      //   type: 'danger', // 将警告类型改为危险
      // });
    }
  }
}


// totalScore: 0,
//     isTimely: false,
//     timeLimit: '',
//     completionTime: '',
//     memberName: '',
//     ratio: ''
function addRow() {
  if (!submit_form_message.cascaderValue || submit_form_message.cascaderValue.length !== 5) {
    ElMessage.error('请先选择完整的分类');
    return;
  }

  const newRow = createNewRow();

  tableData.value.push(newRow);
}
function checkRowIntegrity (rowData) {
  if (!rowData.memberName || !rowData.ratioInput) {
    ElMessage.error('成员姓名或比例不能为空，请检查后重试');
    return false;
  }
  return true;
};

function removeRow(row) {
  tableData.value.splice(tableData.value.indexOf(row), 1);
}
const isEditable = ref(true);
function setTableData() {
    isEditable.value = false; // 设置isEditable为false
    tableData.value.forEach((row) => {
      // 假设你想要设置的属性有 projectNameInput, completionTime, memberName, ratioInput
      row.projectNameInput = '默认项目名称'; // 这里设置为你想要默认的值
      row.completionTime = new Date(); // 或者你想要的默认日期
      row.memberName = '默认成员'; // 假设memberName是一个数组，这里设置为默认成员名字
      row.ratioInput = '10%'; // 这里设置为你想要默认的比例值
    });
  }
function handlePreview(file) {
  console.log(file);
}

// function handleRemove(file, submit_fileList) {
//   console.log(file, submit_fileList);
// }

// function handleExceed(files, submit_fileList) {
//   ElMessage.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + submit_fileList.length} 个文件`);
// }

// function beforeRemove(file, submit_fileList) {
//   return ElMessageBox.confirm(`确定移除 ${file.name}？`);
// }

function handleEditableRowClick(row) {
  if (editableTableData.value.length > 0) {
    const rowData = editableTableData.value[0];
    Object.assign(row, rowData);
  }
}

function removeEditableRow(row) {
  editableTableData.value.splice(editableTableData.value.indexOf(row), 1);
}
</script>


<!-- <style scoped>
/* 自定义滚动条样式 */
.custom-scrollbar .el-scrollbar__wrap {
  overflow-x: hidden; /* 隐藏水平滚动条 */
}

.custom-scrollbar .el-scrollbar__bar.is-vertical {
  width: 8px; /* 垂直滚动条宽度 */
  background-color: rgba(0, 0, 0, 0.1); /* 滚动条背景颜色 */
}

.custom-scrollbar .el-scrollbar__bar.is-vertical .el-scrollbar__thumb {
  background-color: rgba(0, 0, 0, 0.5); /* 滚动条拇指颜色 */
  border-radius: 4px; /* 圆角 */
}

.custom-scrollbar .el-scrollbar__bar.is-horizontal {
  height: 8px; /* 水平滚动条高度 */
  background-color: rgba(0, 0, 0, 0.1); /* 滚动条背景颜色 */
}

.custom-scrollbar .el-scrollbar__bar.is-horizontal .el-scrollbar__thumb {
  background-color: rgba(0, 0, 0, 0.5); /* 滚动条拇指颜色 */
  border-radius: 4px; /* 圆角 */
} -->
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
/* 列表项样式 */
/* .scrollbar-demo-item {
  padding: 10px;
  margin-bottom: 5px;
  background-color: #f9f9f9;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  font-size: 16px;
  color: #333;
  transition: background-color 0.3s ease;
}

.scrollbar-demo-item:hover {
  background-color: #eaeaea;
  cursor: pointer;
} */
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  /* // margin: 10px; */
  margin-bottom: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>
