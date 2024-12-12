<template>
   <div class="app-container">
    
      <el-row :gutter="20">
         <!--部门数据-->
         <!-- <el-col :span="4" :xs="24">
            <div class="head-container">
               <el-input
                  v-model="deptName"
                  placeholder="请输入部门名称"
                  clearable
                  prefix-icon="Search"
                  style="margin-bottom: 20px"
               />
            </div>
            <div class="head-container">
               <el-tree
                  :data="deptOptions"
                  :props="{ label: 'label', children: 'children' }"
                  :expand-on-click-node="false"
                  :filter-node-method="filterNode"
                  ref="deptTreeRef"
                  node-key="id"
                  highlight-current
                  default-expand-all
                  @node-click="handleNodeClick"
               />
            </div>
         </el-col> -->
         
         <el-col :span="5" :xs="24" class="el-col-container">
          
              <div class="dept_all">
                  <div class="head-container">
                    <el-input
                      v-model="deptName"
                      placeholder="请输入部门名称"
                      clearable
                      size="small"
                      prefix-icon="el-icon-search"
                      style="margin-bottom: 20px"
                    />
                  </div>
                  <el-row :gutter="3" class="mb8 bumen">
                  
                  <el-col :span="1.5">
                    <!-- <el-button
                      type="primary"
                      plain
                      round
                      circle 
                      @click="handleAddDept"
                      v-hasPermi="['system:user:add']"
                    >新增部门</el-button> -->
                    <el-button
                      type="primary"
                      size="small"
                      key="button.text"
                      plain
                      @click="handleAddDept"
                    
                      v-hasPermi="['system:user:add']"
                    >新增部门</el-button>
                  </el-col>
                  <el-col :span="1.5">
                    <!-- <el-button
                      type="success"
                      @click="handleUpDept"
                      plain
                      round
                      circle 
                      v-hasPermi="['system:user:edit']"
                    >修改部门</el-button> -->

                    <el-button
                      type="success"
                      @click="handleUpDept"
                      size="small"
                      plain
                      key="button.text"
                      
                      v-hasPermi="['system:user:edit']"
                    >修改部门</el-button>
                  </el-col>
                  
                  <el-col :span="1.5">
                    <!-- <el-button
                      type="danger"
                      @click="handleDeleteDept"
                      plain
                      round
                      circle 
                      v-hasPermi="['system:user:remove']"
                    >删除部门</el-button> -->

                    <el-button
                      type="danger"
                      @click="handleDeleteDept"
                      key="button.text"
                      size="small"
                    plain

                      v-hasPermi="['system:user:remove']"
                    >删除部门</el-button>
                  </el-col>
     </el-row>
                <div class="head-container el-tree">
                  <el-tree
                    :data="deptOptions"
                    :props="defaultProps"
                    :expand-on-click-node="false"
                    :filter-node-method="filterNode"
                    ref="tree"
                    node-key="id"
                    default-expand-all
                    highlight-current
                    @node-click="handleNodeClick"
                  />
                </div>
             </div>
            
            </el-col>
            
            
         <!--用户数据-->
         <!-- <el-col :span="20" :xs="24">
            <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
               <el-form-item label="用户名称" prop="userName">
                  <el-input
                     v-model="queryParams.userName"
                     placeholder="请输入用户名称"
                     clearable
                     style="width: 240px"
                     @keyup.enter="handleQuery"
                  />
               </el-form-item>
               <el-form-item label="手机号码" prop="phonenumber">
                  <el-input
                     v-model="queryParams.phonenumber"
                     placeholder="请输入手机号码"
                     clearable
                     style="width: 240px"
                     @keyup.enter="handleQuery"
                  />
               </el-form-item>
               <el-form-item label="状态" prop="status">
                  <el-select
                     v-model="queryParams.status"
                     placeholder="用户状态"
                     clearable
                     style="width: 240px"
                  >
                     <el-option
                        v-for="dict in sys_normal_disable"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                     />
                  </el-select>
               </el-form-item>
               <el-form-item label="创建时间" style="width: 308px;">
                  <el-date-picker
                     v-model="dateRange"
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
               </el-form-item>
            </el-form>

            <el-row :gutter="10" class="mb8">
               <el-col :span="1.5">
                  <el-button
                     type="primary"
                     plain
                     icon="Plus"
                     @click="handleAdd"
                     v-hasPermi="['system:user:add']"
                  >新增</el-button>
               </el-col>
               <el-col :span="1.5">
                  <el-button
                     type="success"
                     plain
                     icon="Edit"
                     :disabled="single"
                     @click="handleUpdate"
                     v-hasPermi="['system:user:edit']"
                  >修改</el-button>
               </el-col>
               <el-col :span="1.5">
                  <el-button
                     type="danger"
                     plain
                     icon="Delete"
                     :disabled="multiple"
                     @click="handleDelete"
                     v-hasPermi="['system:user:remove']"
                  >删除</el-button>
               </el-col>
               <el-col :span="1.5">
                  <el-button
                     type="info"
                     plain
                     icon="Upload"
                     @click="handleImport"
                     v-hasPermi="['system:user:import']"
                  >导入</el-button>
               </el-col>
               <el-col :span="1.5">
                  <el-button
                     type="warning"
                     plain
                     icon="Download"
                     @click="handleExport"
                     v-hasPermi="['system:user:export']"
                  >导出</el-button>
               </el-col>
               <right-toolbar v-model:showSearch="showSearch" @queryTable="getList" :columns="columns"></right-toolbar>
            </el-row> -->
            <!--用户数据-->
      <el-col :span="19" :xs="24">
        <div class="head-waicontainer">
         
          <div class="head-waineicontainer">
       
                <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
                  <el-form-item label="员工工号：" prop="userId">
                    <el-input
                      v-model="queryParams.userId"
                      placeholder="请输入"
                      clearable
                      style="width: 240px"
                      @keyup.enter.native="handleQuery"
                    />
                  </el-form-item>
                  <el-form-item label="员工姓名：" prop="userName">
                    <el-input
                      v-model="queryParams.userName"
                      placeholder="请输入"
                      clearable
                      style="width: 240px"
                      @keyup.enter.native="handleQuery"
                    />
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" icon="Search" @click="handleQuery">查询</el-button>
                    <el-button icon="Refresh"  @click="resetQuery">重置</el-button>
                  </el-form-item>
                </el-form>
         </div>
          <div class="nei-waicontainer">
                  <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                      <el-button
                        type="primary"
                        plain
                        icon="Plus"
                        @click="handleAdd"
                        v-hasPermi="['system:user:add']"
                      >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                      <el-button
                        type="success"
                        plain
                        icon="Edit"
                      
                        :disabled="single"
                        @click="handleUpdate"
                        v-hasPermi="['system:user:edit']"
                      >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                      <el-button
                        type="warning"
                        plain
                        icon="position"
                        @click="handleMove"
                        :disabled="multiple"
                        v-hasPermi="['system:user:import']"
                      >移动</el-button>
                    </el-col>
                    <el-col :span="1.5">
                      <el-button
                        type="danger"
                        plain
                        icon="delete"
                        :disabled="multiple"
                        @click="handleDelete"
                        v-hasPermi="['system:user:remove']"
                      >删除</el-button>
                    </el-col>
                    <el-col :span="1.5">
                      <el-button
                        type="info"
                        plain
                        icon="upload"
                        @click="handleImport"
                        v-hasPermi="['system:user:import']"
                      >导入</el-button>
                    </el-col>
                    <right-toolbar :showSearch.sync="showSearch" @queryTable="getList" :columns="columns"></right-toolbar>
                  </el-row>

            <el-table  max-height="300px"  v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
               <!-- 自己加的 -->
               <!-- <el-table-column type="selection" width="50" align="center" />
               <el-table-column label="用户编号" align="center" key="userId" prop="userId" v-if="columns[0].visible" />
               <el-table-column label="用户名称" align="center" key="userName" prop="userName" v-if="columns[1].visible" :show-overflow-tooltip="true" />
               <el-table-column label="用户昵称" align="center" key="nickName" prop="nickName" v-if="columns[2].visible" :show-overflow-tooltip="true" />
               <el-table-column label="部门" align="center" key="deptName" prop="dept.deptName" v-if="columns[3].visible" :show-overflow-tooltip="true" />
               <el-table-column label="手机号码" align="center" key="phonenumber" prop="phonenumber" v-if="columns[4].visible" width="120" />
               <el-table-column label="状态" align="center" key="status" v-if="columns[5].visible">
                  <template #default="scope">
                     <el-switch
                        v-model="scope.row.status"
                        active-value="0"
                        inactive-value="1"
                        @change="handleStatusChange(scope.row)"
                     ></el-switch>
                  </template>
               </el-table-column>
               <el-table-column label="创建时间" align="center" prop="createTime" v-if="columns[6].visible" width="160">
                  <template #default="scope">
                     <span>{{ parseTime(scope.row.createTime) }}</span>
                  </template>
               </el-table-column> -->
               <!-- 自己加的 -->
               <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="工号" align="center" key="userId" prop="userId" v-if="columns[2].visible" :show-overflow-tooltip="true" />
                    <el-table-column label="姓名" align="center" key="userName" prop="userName" v-if="columns[1].visible" :show-overflow-tooltip="true" />
                    <el-table-column label="角色" align="center" key="nickName" prop="nickName" v-if="columns[0].visible" />
                    <el-table-column label="邮箱" align="center" key="email" prop="email" v-if="columns[4].visible" width="120" />
                    <el-table-column label="部门" align="center" key="deptName" prop="dept.deptName" v-if="columns[3].visible" :show-overflow-tooltip="true" />
                    <el-table-column label="初始创建时间" align="center" prop="createTime" v-if="columns[6].visible" width="160">
                      <template  #default="scope">
                        <span>{{ parseTime(scope.row.createTime) }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="最终修改时间" align="center" prop="updateTime" v-if="columns[6].visible" width="160">
                      <template  #default="scope">
                        <span>{{ parseTime(scope.row.updateTime) }}</span>
                      </template>
                    </el-table-column>
               <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
                  <template #default="scope">
                     <el-tooltip content="修改" placement="top" >
                        <el-button link type="primary"  :disabled="Sigsingle" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['system:user:edit']"></el-button>
                     </el-tooltip>
                     <el-tooltip content="删除" placement="top" >
                        <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['system:user:remove']"></el-button>
                     </el-tooltip>
                     <el-tooltip content="修改部门" placement="top" >
                      <!-- 自己改得 -->
                      <el-button link type="primary" icon="CircleCheck" @click="handleMove(scope.row)" v-hasPermi="['system:user:edit']"></el-button>
                        <!-- <el-button link type="primary" icon="CircleCheck" @click="handleAuthRole(scope.row)" v-hasPermi="['system:user:edit']"></el-button> -->
                     </el-tooltip>
                     <el-tooltip content="重置密码" placement="top" >
                         <el-button link type="primary" icon="Key" @click="handleResetPwd(scope.row)" v-hasPermi="['system:user:resetPwd']"></el-button>
                     </el-tooltip>
                     
                  </template>
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
        </div>
         </el-col>
      </el-row>

      <!-- 添加或修改用户配置对话框 -->
      <el-dialog :title="title" v-model="open" width="600px" append-to-body  @close="cancel">
         <el-form :model="form" :rules="rules" ref="userRef" label-width="80px">
            <el-row>
               <el-col :span="12">
                  <!-- <el-form-item label="用户昵称" prop="nickName"> -->
                    <!-- 自己加的 -->
                    <el-form-item v-if="form.userId == undefined" label="用户名称" prop="userName">
                    <el-input v-model="form.nickName" placeholder="请输入用户昵称" maxlength="30" />
                  </el-form-item>
               </el-col>
               <el-col :span="12">
                  <el-form-item label="归属部门" prop="deptId">
                     <!-- <el-tree-select
                        v-model="form.deptId"
                        :data="deptOptions"
                        :props="{ value: 'id', label: 'label', children: 'children' }"
                        value-key="id"
                        placeholder="请选择归属部门"
                        check-strictly
                     /> -->
                     <!-- 自己改得 -->
                     <el-tree-select
                        v-model="form.deptId"
                        :data="YiDongDeptOptions"
                        :props="{ value: 'id', label: 'label', children: 'children' }"
                        value-key="id"
                        placeholder="请选择归属部门"
                        check-strictly
                     />
                  </el-form-item>
               </el-col>
            </el-row>
            <el-row>
               <!-- <el-col :span="12">
                  <el-form-item label="手机号码" prop="phonenumber">
                     <el-input v-model="form.phonenumber" placeholder="请输入手机号码" maxlength="11" />
                  </el-form-item>
               </el-col>
               <el-col :span="12">
                  <el-form-item label="邮箱" prop="email">
                     <el-input v-model="form.email" placeholder="请输入邮箱" maxlength="50" />
                  </el-form-item>
               </el-col> -->
                    <el-col :span="12">
                      <el-form-item label="用户性别">
                        <el-select v-model="form.sex" placeholder="请选择">
                            <el-option
                              v-for="dict in sys_user_sex.filter(item => item.label !== '未知')"
                              :key="dict.value"
                              :label="dict.label"
                              :value="dict.value"
                            ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                <el-col :span="12">
                  <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email" placeholder="请输入邮箱" maxlength="50" />
                  </el-form-item>
                </el-col>
            </el-row>
            <!-- <el-row>
               <el-col :span="12">
                  <el-form-item v-if="form.userId == undefined" label="用户名称" prop="userName">
                     <el-input v-model="form.userName" placeholder="请输入用户名称" maxlength="30" />
                  </el-form-item>
               </el-col>
               <el-col :span="12">
                  <el-form-item v-if="form.userId == undefined" label="用户密码" prop="password">
                     <el-input v-model="form.password" placeholder="请输入用户密码" type="password" maxlength="20" show-password />
                  </el-form-item>
               </el-col>
            </el-row> -->
            <!-- <el-row> -->
               <!-- <el-col :span="12">
                  <el-form-item label="用户性别">
                     <el-select v-model="form.sex" placeholder="请选择">
                        <el-option
                           v-for="dict in sys_user_sex"
                           :key="dict.value"
                           :label="dict.label"
                           :value="dict.value"
                        ></el-option>
                     </el-select>
                  </el-form-item>
               </el-col> -->
               <!-- <el-col :span="12">
                  <el-form-item label="状态">
                     <el-radio-group v-model="form.status">
                        <el-radio
                           v-for="dict in sys_normal_disable"
                           :key="dict.value"
                           :value="dict.value"
                        >{{ dict.label }}</el-radio>
                     </el-radio-group>
                  </el-form-item>
               </el-col> -->
            <!-- </el-row> -->
            <el-row>
               <el-col :span="12">
                  <el-form-item label="岗位">
                     <el-select v-model="form.postIds" multiple placeholder="请选择">
                        <el-option
                           v-for="item in postOptions"
                           :key="item.postId"
                           :label="item.postName"
                           :value="item.postId"
                           :disabled="item.status == 1"
                        ></el-option>
                     </el-select>
                  </el-form-item>
               </el-col>
               <el-col :span="12">
                  <el-form-item label="角色">
                     <el-select v-model="form.roleIds" multiple placeholder="请选择">
                        <el-option
                           v-for="item in roleOptions"
                           :key="item.roleId"
                           :label="item.roleName"
                           :value="item.roleId"
                           :disabled="item.status == 1"
                        ></el-option>
                     </el-select>
                  </el-form-item>
               </el-col>
            </el-row>
            <!-- <el-row>
               <el-col :span="24">
                  <el-form-item label="备注">
                     <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
                  </el-form-item>
               </el-col>
            </el-row> -->
         </el-form>
         <template #footer>
            <div class="dialog-footer">
               <el-button type="primary" @click="submitForm">确 定</el-button>
               <el-button @click="cancel">取 消</el-button>
            </div>
         </template>
      </el-dialog>

      <!-- 用户导入对话框 -->
      <el-dialog :title="upload.title" v-model="upload.open" width="400px" append-to-body @close="upload.open = false">
         <el-upload
            ref="uploadRef"
            :limit="1"
            accept=".xlsx, .xls"
            :headers="upload.headers"
            :action="upload.url + '?updateSupport=' + upload.updateSupport"
            :disabled="upload.isUploading"
            :on-progress="handleFileUploadProgress"
            :on-success="handleFileSuccess"
            :auto-upload="false"
            drag
         >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <template #tip>
               <div class="el-upload__tip text-center">
                  <div class="el-upload__tip">
                     <el-checkbox v-model="upload.updateSupport" />是否更新已经存在的用户数据
                  </div>
                  <span>仅允许导入xls、xlsx格式文件。</span>
                  <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;" @click="importTemplate">下载模板</el-link>
               </div>
            </template>
         </el-upload>
         <template #footer>
            <div class="dialog-footer">
               <el-button type="primary" @click="submitFileForm">确 定</el-button>
               <el-button @click="upload.open = false">取 消</el-button>
            </div>
         </template>
      </el-dialog>
       <!-- 移动部门对话框 -->
       <!-- 自己改得 -->
    <el-dialog :title="title" v-model="moveOpen" width="550px" height="250px" class="moveDept"  @close="moveOpen = false, cancel()" append-to-body>
      <el-form ref="form" :model="form"  label-width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="归属部门" prop="deptId">
              <el-tree-select
                        v-model="form.deptId"
                        :data="YiDongDeptOptions"
                        :props="{ value: 'id', label: 'label', children: 'children' }"
                        value-key="id"
                        placeholder="请选择归属部门"
                        check-strictly
                     />
              <!-- <treeselect v-model="form.deptId" :options="YiDongDeptOptions" :show-count="true" placeholder="请选择归属部门" /> -->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      
        <template #footer>
            <div class="dialog-footer">
               <el-button type="primary" @click="submitMoveForm">确 定</el-button>
               <!-- <el-button @click="moveOpen = false">取 消</el-button> -->
               <el-button @click="moveOpen = false, cancel()">取 消</el-button>
            </div>
         </template>
   
    </el-dialog>

      <!-- 新增部门对话框 -->
       <!-- 自己改得 -->
      <el-dialog :title="title" v-model="AddDept" width="550px" height="250px" class="AddDept" @close="AddDept = false, cancel()" append-to-body>
        <el-form ref="AddDeptformref" :model="form"  label-width="80px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="部门名称" prop="deptId">
              <el-input
                      v-model="deptName"
                      placeholder="请输入部门名称"
                      clearable
                  
                      style="margin-bottom: 0px "
                    />
                  </el-form-item>
            </el-col>
          </el-row>
        </el-form>
    
          <template #footer>
              <div class="dialog-footer">
                  <el-button type="primary" @click="submitAddDeptform">确 定</el-button>
                  <!-- <el-button @click="moveOpen = false">取 消</el-button> -->
                  <el-button @click="AddDept = false, cancel()">取 消</el-button>
              </div>
            </template>
  </el-dialog>


      <!-- 修改部门对话框 -->
          <!-- 自己改得 -->
          <el-dialog :title="title" v-model="UpDept" width="550px" height="250px" class="UpDept"  @close="UpDept = false, cancel()" append-to-body>
            <el-form ref="UpDeptformref" :model="form"  label-width="80px">
              <el-row>
              <el-col :span="24">
                <el-form-item label="原来部门" prop="deptId">
                  <el-tree-select
                            v-model="form.deptId"
                            :data="YiDongDeptOptions"
                            :props="{ value: 'id', label: 'label', children: 'children' }"
                            value-key="id"
                            placeholder="请选择需要修改部门"
                            check-strictly
                        />
                </el-form-item>
              </el-col>
            </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="部门名称" prop="deptId">
                    <el-input
                          v-model="deptName"
                          placeholder="请输入新的部门名称"
                          clearable
                          
                          style="margin-bottom: 0px "
                        />
                </el-form-item>
                  
                </el-col>
              </el-row>
            </el-form>
        
              <template #footer>
                  <div class="dialog-footer">
                      <el-button type="primary" @click="submitUpDeptform">确 定</el-button>
                      <el-button @click="UpDept = false, cancel()">取 消</el-button>
                  </div>
                </template>
      </el-dialog>


      
      <!-- 删除部门对话框 -->
          <!-- 自己改得 -->
          <el-dialog :title="title" v-model="DeleteDept" width="550px" height="250px" class="UpDept"  @close="DeleteDept = false, cancel()" append-to-body>
            <el-form ref="DeleteDeptformref" :model="form"  label-width="80px">
              <el-row>
              <el-col :span="24">
                <el-form-item label="部门名称" prop="deptId">
                  <el-tree-select
                            v-model="form.deptId"
                            :data="YiDongDeptOptions"
                            :props="{ value: 'id', label: 'label', children: 'children' }"
                            value-key="id"
                            placeholder="请选择删除的部门"
                            check-strictly
                        />
                </el-form-item>
              </el-col>
            </el-row>
            </el-form>
        
              <template #footer>
                  <div class="dialog-footer">
                      <el-button type="primary" @click="submitDeleteDeptform">确 定</el-button>
                      <el-button @click="DeleteDept = false, cancel()">取 消</el-button>
                  </div>
                </template>
      </el-dialog>
   </div>
</template>

<script setup name="User">
import { getToken } from "@/utils/auth";
import { changeUserStatus, listUser, ResetPwd, delUser, getUser, updateUser, addUser, deptTreeSelect,AddDeptform,UpDeptform } from "@/api/system/user";

const router = useRouter();
const { proxy } = getCurrentInstance();
const { sys_normal_disable, sys_user_sex } = proxy.useDict("sys_normal_disable", "sys_user_sex");
// const sys_user_sex = sys_user_sex1.value.filter(item => item.value !== '未知');
// const sys_user_sex = sys_user_sex1.filter(item => item.label !== '未知')

// console.log(sys_user_sex);
const Sigsingle= ref(false);
const Sigmultiple= ref(false);
const Sigchongzhi= ref(false);
const userList = ref([]);
const open = ref(false);
const AddDept= ref(false);
const UpDept= ref(false);
const DeleteDept= ref(false);

// 是否显示移动弹出层
const moveOpen= ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");
const dateRange = ref([]);
const deptName = ref("");
const deptOptions = ref(undefined);
const YiDongDeptOptions= ref(undefined);
const zhongdeptOptions= ref(undefined);
const initPassword = ref(undefined);
const postOptions = ref([]);
const roleOptions = ref([]);
/*** 用户导入参数 */
const upload = reactive({
  // 是否显示弹出层（用户导入）
  open: false,
  // 弹出层标题（用户导入）
  title: "",
  // 是否禁用上传
  isUploading: false,
  // 是否更新已经存在的用户数据
  updateSupport: 0,
  // 设置上传的请求头部
  headers: { Authorization: "Bearer " + getToken() },
  // 上传的地址
  url: import.meta.env.VITE_APP_BASE_API + "/system/user/importData"
});
// 列显隐信息
const columns = ref([
  { key: 0, label: `用户编号`, visible: true },
  { key: 1, label: `用户名称`, visible: true },
  { key: 2, label: `用户昵称`, visible: true },
  { key: 3, label: `部门`, visible: true },
  { key: 4, label: `手机号码`, visible: true },
  { key: 5, label: `状态`, visible: true },
  { key: 6, label: `创建时间`, visible: true }
]);

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    userName: undefined,
    phonenumber: undefined,
    status: undefined,
    deptId: undefined
  },
  rules: {
    userName: [{ required: true, message: "用户名称不能为空", trigger: "blur" }, { min: 2, max: 20, message: "用户名称长度必须介于 2 和 20 之间", trigger: "blur" }],
    nickName: [{ required: true, message: "用户昵称不能为空", trigger: "blur" }],
    password: [{ required: true, message: "用户密码不能为空", trigger: "blur" }, { min: 5, max: 20, message: "用户密码长度必须介于 5 和 20 之间", trigger: "blur" }, { pattern: /^[^<>"'|\\]+$/, message: "不能包含非法字符：< > \" ' \\\ |", trigger: "blur" }],
    email: [{ type: "email", message: "请输入正确的邮箱地址", trigger: ["blur", "change"] }],
    phonenumber: [{ pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: "请输入正确的手机号码", trigger: "blur" }]
  }
});
// toRefs 函数:
// toRefs 接受一个响应式对象作为参数，并返回一个对象，其中每个属性都被转换为 ref。
const { queryParams, form, rules } = toRefs(data);

/** 通过条件过滤节点  */
const filterNode = (value, data) => {
  if (!value) return true;
  return data.label.indexOf(value) !== -1;
};

/** 根据名称筛选部门树 */
watch(deptName, val => {
  proxy.$refs["deptTreeRef"].filter(val);
});

/** 查询部门下拉树结构 */
// function getDeptTree() {
//   deptTreeSelect().then(response => {
//     deptOptions.value = response.data;
//   });
// };
  /** 查询部门下拉树结构 */
//自己加的
// function handleMove() {
//       deptMove().then(response => {
//       reset();
//       moveOpen.value = true;
//       title.value = "修改部门";
//       // form.value.password = "";
//       });
//     };
function handleMove() {
      reset();
      moveOpen.value = true;
      title.value = "修改部门";
      // form.value.password = "";
    };
function getDeptTree() {
      deptTreeSelect().then(response => {
        // 嵌套的 JSON 数据结构
      const nestedData =[ {
        "id": 100,
        "label": "中国移动通信集团设计院有限公司",
        "children": [
          {
            "id": 101,
            "label": "中国移动通信集团设计院有限公司上海分公司",
            "children": [
              {
                "id": 107,
                "label": "院级领导",
              },
              {
                "id": 102,
                "label": "部门一",
              },
              {
                "id": 103,
                "label": "部门二",
              },
              {
                "id": 106,
                "label": "部门三",
              },
              {
                
                "id": 140,
                "label": "院级审核员",
              },
              {
                "id": 145,
                "label": "系统管理员",
              }
            ]
          }
        ]
      }];
      deptOptions.value =nestedData;
      // 创建一个递归函数用于处理每一层的 children
      function filterChildren(data) {
        return data.map(item => {
          // 如果当前项有 children 属性，则递归调用 filterChildren
          if (item.children) {
            item.children = filterChildren(item.children);
          }
          // 移除 id 为 140 或 145 的对象
          if (item.id === 140 || item.id === 145) {
            return null; // 返回 null 表示删除该项
          }
          return item; // 否则返回原对象
        }).filter(Boolean); // 过滤掉 null 值
      }
      zhongdeptOptions.value = JSON.parse(JSON.stringify(deptOptions.value));
      // 调用 filterChildren 函数处理 this.deptOptions
      YiDongDeptOptions.value = filterChildren(zhongdeptOptions.value);
      const flattenAndFilter = (data) => {
        let result = [];

        data.forEach(item => {
          if (item.id !== 100 && item.id !== 101) {
            delete item.children; // 删除children属性
            result.push(item); // 将符合条件的元素添加到结果数组中
          }

          if (Array.isArray(item.children)) {
            result = result.concat(flattenAndFilter(item.children));
          }
        });

        return result;
      };
        YiDongDeptOptions.value = flattenAndFilter(YiDongDeptOptions.value);
        // this.deptOptions = response.data;
        // console.log('部门树数据:', this.YiDongDeptOptions); // 在这里打印数据
      });
    };
/** 查询用户列表 */
// function getList() {
//   loading.value = true;
//   listUser(proxy.addDateRange(queryParams.value, dateRange.value)).then(res => {
//     loading.value = false;
//     userList.value = res.rows;
//     total.value = res.total;
//   });
// };
//自己加的
function getList() {
   loading.value = true;

  // 假设这是你要填充的预定义数据
  const predefinedData = [
    {
      dept: {
        deptName: '部门一',
        deptId: 102
      },
      userName: '某某某',
      nickName: '所级领导(所长)/部门审核员',
      email: 'xxx@cmdi.chinamobile.com',
      updateTime: null,
      yuanjiId: null,
      createTime:  "2024-04-29 23:33:07",
      userId: 2
    },
    {
      dept: {
        deptName: '部门二',
        deptId: 103
      },
      userName: '某某某',
      nickName: '***部门普通成员/系统管理员',
      yuanjiId: null,
      yuanjiGuanId: 145,
      email: 'xxx@cmdi.chinamobile.com',
      updateTime: null,
      createTime:  "2024-04-29 23:33:07",
      userId: 3
    },
    {
      dept: {
        deptName: '部门三',
        deptId: 106
      },
      nickName: '***部门***/院级审核员/系统管理员',
      userName: '某某某',
      yuanjiShengId: 140,
      yuanjiGuanId: 145,
      email: 'xxx@cmdi.chinamobile.com',
      updateTime: null,
      createTime:  "2024-04-29 23:33:07",
      userId: 4
    },
    {
      dept: {
        deptName: '院级领导',
        deptId: 107
      },
      nickName: '院级领导(院长)',
      userName: '某某某',
      yuanjiId: null,
      email: 'xxx@cmdi.chinamobile.com',
      updateTime: null,
      createTime:  "2024-04-29 23:33:07",
      userId: 1
    }
    
  ];

 
    if (queryParams.value.deptId === 140||queryParams.value.deptId === 145) {
      // 如果 deptId 为 null，使用所有预定义数据
      // this.userList = predefinedData.filter(item => item.dept.deptId === 101);
      single.value=true;
      multiple.value=true;
      Sigsingle.value=true;
      Sigmultiple.value=true;
      Sigchongzhi.value=true;
    }
   userList.value = predefinedData.filter(item => item.dept.deptId === queryParams.value.deptId);
    if (queryParams.value.deptId === 100||queryParams.value.deptId === 101||queryParams.value.deptId === 107||queryParams.value.deptId === undefined) {
      // 如果 deptId 为 null，使用所有预定义数据
      userList.value = predefinedData.filter(item => item.dept.deptId === 107);
    }
   
    if (queryParams.value.deptId === undefined) {
      // 如果 deptId 为 null，使用所有预定义数据
      userList.value = predefinedData.filter(item => item.dept.deptId === 101||item.dept.deptId === 100||item.dept.deptId === 107);
    }
    if (queryParams.value.deptId === 145) {
      // 如果 deptId 为 null，使用所有预定义数据
    userList.value = predefinedData.filter(item => item.yuanjiGuanId=== 145);
   }
   if (queryParams.value.deptId === 140) {
      // 如果 deptId 为 null，使用所有预定义数据
    userList.value = predefinedData.filter(item => item.yuanjiShengId=== 140);
   }
    // this.userList = predefinedData.filter(item => item.dept.yuanjiId=== 145);
    // 设置总记录数，这里假设为 userList 数组的长度
    total.value = userList.value.length;
    // console.log('人员信息:', this.userList); // 在这里打印数据
    // 关闭加载状态
    loading.value = false;
};
/** 节点单击事件 */
function handleNodeClick(data) {
  queryParams.value.deptId = data.id;
  handleQuery();
};

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
};

/** 重置按钮操作 */
function resetQuery() {
  dateRange.value = [];
  proxy.resetForm("queryRef");
  queryParams.value.deptId = undefined;
  proxy.$refs.deptTreeRef.setCurrentKey(null);
  handleQuery();
};

/** 删除按钮操作 */
// function handleDelete(row) {
//   const userIds = row.userId || ids.value;
//   proxy.$modal.confirm('是否确认删除用户编号为"' + userIds + '"的数据项？').then(function () {
//     return delUser(userIds);
//   }).then(() => {
//     getList();
//     proxy.$modal.msgSuccess("删除成功");
//   }).catch(() => {});
// };
/** 删除按钮操作 */
// 自己改得
function handleDelete(row) {
      const userIds = row.userId || ids.value;

  // 检查ids是否是一个数组
      if (Array.isArray(userIds)) {
        let message;
        if (userIds.length === 1) {
          // 获取第一个id并尝试查找其对应的用户名，如果没有则使用'id'
          // const userName = findUserNameById(userIds[0]) || 'id';
          // const userName = row.userName || this.ids[0].userName;
          message = `确认删除该员工的信息？`;
        } else {
          message = '确认删除这些员工信息？';
        }

        proxy.$modal.confirm(message).then(async () => {
          await delUser(userIds);
          getList();
          proxy.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      } else {
        proxy.$modal.confirm(`确认删除这些员工的信息？`).then(async () => {
          await delUser(userIds);
          getList();
          proxy.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      }
    };
/** 导出按钮操作 */
function handleExport() {
  proxy.download("system/user/export", {
    ...queryParams.value,
  },`user_${new Date().getTime()}.xlsx`);
};

/** 用户状态修改  */
function handleStatusChange(row) {
  let text = row.status === "0" ? "启用" : "停用";
  proxy.$modal.confirm('确认要"' + text + '""' + row.userName + '"用户吗?').then(function () {
    return changeUserStatus(row.userId, row.status);
  }).then(() => {
    proxy.$modal.msgSuccess(text + "成功");
  }).catch(function () {
    row.status = row.status === "0" ? "1" : "0";
  });
};

/** 更多操作 */
function handleCommand(command, row) {
  switch (command) {
    case "handleResetPwd":
      handleResetPwd(row);
      break;
    case "handleAuthRole":
      handleAuthRole(row);
      break;
    default:
      break;
  }
};

/** 跳转角色分配 */
function handleAuthRole(row) {
  const userId = row.userId;
  router.push("/system/user-auth/role/" + userId);
};

/** 重置密码按钮操作 */
    function handleResetPwd(row) {
      proxy.$modal.confirm('是否重置' + row.userName + '的密码？').then(function() {
      return ResetPwd(row.userId);
      }).then(() => {
        getList();
        proxy.$modal.msgSuccess('重置"' + row.userName + '"密码成功');
      }).catch(() => {});
    };
// function handleResetPwd(row) {
//   proxy.$prompt('请输入"' + row.userName + '"的新密码', "提示", {
//     confirmButtonText: "确定",
//     cancelButtonText: "取消",
//     closeOnClickModal: false,
//     inputPattern: /^.{5,20}$/,
//     inputErrorMessage: "用户密码长度必须介于 5 和 20 之间",
//     inputValidator: (value) => {
//       if (/<|>|"|'|\||\\/.test(value)) {
//         return "不能包含非法字符：< > \" ' \\\ |"
//       }
//     },
//   }).then(({ value }) => {
//     resetUserPwd(row.userId, value).then(response => {
//       proxy.$modal.msgSuccess("修改成功，新密码是：" + value);
//     });
//   }).catch(() => {});
// };

/** 选择条数  */
// function handleSelectionChange(selection) {
//   ids.value = selection.map(item => item.userId);
//   single.value = selection.length != 1;
//   multiple.value = !selection.length;
// };
   // 多选框选中数据
//自己加的
function  handleSelectionChange(selection) {
   // console.log('this.selection:' ,selection);
   if (queryParams.value.deptId === 140||queryParams.value.deptId === 145) {
   // 如果 deptId 为 null，使用所有预定义数据
   // this.userList = predefinedData.filter(item => item.dept.deptId === 101);
   single.value=true;
   multiple.value=true;
   Sigsingle.value=true;
   Sigmultiple.value=true;
   Sigchongzhi.value=true;
   }else{ids.value = selection.map(item => item.userId);
   // console.log(this.ids);
   single.value = selection.length != 1;
   multiple.value = !selection.length;
   }
};
/** 导入按钮操作 */
function handleImport() {
  upload.title = "用户导入";
  upload.open = true;
};

/** 下载模板操作 */
function importTemplate() {
  proxy.download("system/user/importTemplate", {
  }, `user_template_${new Date().getTime()}.xlsx`);
};

/**文件上传中处理 */
const handleFileUploadProgress = (event, file, fileList) => {
  upload.isUploading = true;
};

/** 文件上传成功处理 */
const handleFileSuccess = (response, file, fileList) => {
  upload.open = false;
  upload.isUploading = false;
  proxy.$refs["uploadRef"].handleRemove(file);
  proxy.$alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + response.msg + "</div>", "导入结果", { dangerouslyUseHTMLString: true });
  getList();
};

/** 提交上传文件 */
function submitFileForm() {
  proxy.$refs["uploadRef"].submit();
};

/** 重置操作表单 */
function reset() {
  form.value = {
    userId: undefined,
    deptId: undefined,
    userName: undefined,
    nickName: undefined,
    password: undefined,
    phonenumber: undefined,
    email: undefined,
    sex: undefined,
    status: "0",
    remark: undefined,
    postIds: [],
    roleIds: []
  };
  proxy.resetForm("userRef");
};

/** 取消按钮 */
function cancel() {
  open.value = false;
  reset();
  //自己加的
  moveOpen.value= false;
};

/** 新增按钮操作 */
// function handleAdd() {
//   reset();
//   getUser().then(response => {
//     postOptions.value = response.posts;
//     roleOptions.value = response.roles;
//     open.value = true;
//     title.value = "添加用户";
//     form.value.password = initPassword.value;
//   });
// };
function handleAdd() {
      reset();
      getUser().then(response => {
        postOptions.value = response.posts;
        // 假设 this.postOptions 已经被定义为一个数组
        // 移除数组中的最后一个元素
        postOptions.value.pop();
        console.log('postOptions:' ,postOptions.value)
        // 遍历数组，修改每个元素的 postName 属性
        for (let i = 0; i < postOptions.value.length; i++) {
          switch (i) {
            case 0:
              postOptions.value[i].postName = '院级领导(院长)';
              break;
            case 1:
              postOptions.value[i].postName = '所级领导(所长)';
              break;
            case 2:
              postOptions.value[i].postName = '普通员工';
              break;
            default:
              // 如果有更多元素，你可以在这里添加更多的 case
              break;
          }
        }
        // 创建第一个新对象，基于第一个现有对象
        const newPostOption1 = { ...postOptions[0] };
        newPostOption1.postId = 4;
        newPostOption1.postSort = 4;
        newPostOption1.postName = "院级领导(副院长)";

        // 在第一个对象后插入新对象
        postOptions.value.splice(1, 0, newPostOption1);

        // 创建第二个新对象，基于第二个现有对象
        const newPostOption2 = { ...postOptions[1] };
        newPostOption2.postId = 5;
        newPostOption2.postSort = 5;
        newPostOption2.postName = "所级领导(副所长)";

        // 在第二个对象后插入新对象
        postOptions.value.splice(2 + 1, 0, newPostOption2); // 注意索引偏移，因为我们已经插入了一个对象

        roleOptions.value = response.roles;

      // 使用Object.assign进行浅复制，如果需要深复制可以使用JSON.parse(JSON.stringify())
        let copiedRole1 = Object.assign({}, response.roles[0]);
        let copiedRole2 = Object.assign({}, response.roles[0]);

        // 添加复制的元素到roleOptions数组
        roleOptions.value.push(copiedRole1);
        roleOptions.value.push(copiedRole2);

        // 修改roleName和roleId属性
        roleOptions.value[0].roleName = '部门审核员';
        roleOptions.value[0].roleId = 1;
        roleOptions.value[1].roleName = '院级审核员';
        roleOptions.value[1].roleId = 2;
        roleOptions.value[2].roleName = '系统管理员';
        roleOptions.value[2].roleId = 3;
        // console.log('postOptions:', response.posts); // 在这里打印数据
        // console.log('roleOptions:', response.roles); // 在这里打印数据
        open.value = true;
        title.value = "添加用户";
        // form.value.password = this.initPassword;
      });
    };
/** 修改按钮操作 */
// 自己改得
function handleUpdate(row) {
      this.reset();
      const userId = row.userId || this.ids;
      getUser(userId).then(response => {
        form.value = response.data;
        this.postOptions = response.posts;
        // this.roleOptions = response.roles;
        this.postOptions.pop();

        // 遍历数组，修改每个元素的 postName 属性
        for (let i = 0; i < this.postOptions.length; i++) {
          switch (i) {
            case 0:
              this.postOptions[i].postName = '院级领导';
              break;
            case 1:
              this.postOptions[i].postName = '所级领导';
              break;
            case 2:
              this.postOptions[i].postName = '普通员工';
              break;
            default:
              // 如果有更多元素，你可以在这里添加更多的 case
              break;
          }
        }
        this.roleOptions = response.roles;
        // console.log('roleOptions111:', this.roleOptions); // 在这里打印数据
        this.roleOptions.pop();
      // 使用Object.assign进行浅复制，如果需要深复制可以使用JSON.parse(JSON.stringify())
        let copiedRole1 = Object.assign({}, response.roles[0]);
        let copiedRole2 = Object.assign({}, response.roles[0]);

        // 添加复制的元素到roleOptions数组
        this.roleOptions.push(copiedRole1);
        this.roleOptions.push(copiedRole2);

        // 修改roleName和roleId属性
        this.roleOptions[0].roleName = '部门审核员';
        this.roleOptions[0].roleId = 1;
        this.roleOptions[1].roleName = '院级审核员';
        this.roleOptions[1].roleId = 2;
        this.roleOptions[2].roleName = '系统管理员';
        this.roleOptions[2].roleId = 3;
        // console.log('roleIds:', response.roleIds); // 在这里打印数据

        this.$set(this.form, "postIds", response.postIds);
        this.$set(this.form, "roleIds", response.roleIds);
        this.open = true;
        this.title = "修改用户";
        // this.form.password = "";
      });
    };
// function handleUpdate(row) {
//   reset();
//   const userId = row.userId || ids.value;
//   getUser(userId).then(response => {
//     form.value = response.data;
//     postOptions.value = response.posts;
//     roleOptions.value = response.roles;
//     form.value.postIds = response.postIds;
//     form.value.roleIds = response.roleIds;
//     open.value = true;
//     title.value = "修改用户";
//     form.password = "";
//   });
// };
function handleAddDept() {
  AddDept.value = true;
  title.value = "添加部门";
}
function handleUpDept() {
  UpDept.value = true;
  title.value = "修改部门";
}

function handleDeleteDept() {
  DeleteDept.value = true;
  title.value = "删除部门";
}
/** 提交按钮 */
function submitForm() {
  proxy.$refs["userRef"].validate(valid => {
    if (valid) {
      if (form.value.userId != undefined) {
        updateUser(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addUser(form.value).then(response => {
          proxy.$modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        });
      }
    }
  });
};
function submitAddDeptform() {
  proxy.$refs["AddDeptformref"].validate(valid => {
    if (valid) {
      
        AddDeptform(form.value).then(response => {
          if(response.data.AddDeptId!=1){ 
          proxy.$modal.msgSuccess("新增部门成功");
          AddDept.value = false;
          getList();
          reset();
        }else{
          proxy.$modal.msgError("此部门已存在");
        }

        });
      
    }
  });
};
function submitUpDeptform() {
  proxy.$refs["UpDeptformref"].validate(valid => {
    if (valid) {
   
        UpDeptform(form.value,deptName).then(response => {
          if(response.data.UpDeptId!=1){ 
          proxy.$modal.msgSuccess("修改部门成功");
          UpDept.value = false;
          getList();
          reset();
        }else{
          proxy.$modal.msgError("修改部门失败");
        }

        });
      
    }
  });
};
// submitDeleteDeptform
function submitDeleteDeptform() {
  proxy.$refs["DeleteDeptformref"].validate(valid => {
    if (valid) {
   
      DeleteDeptform(form.value).then(response => {
        if(response.data.DeleteDeptId!=1){ 
          proxy.$modal.msgSuccess("删除部门成功");
          UpDept.value = false;
          getList();
          reset();
        }else{
          proxy.$modal.msgError("该部门不存在");
        }
         
        });
      
    }
  });
};
getDeptTree();
getList();
</script>


<style scoped>
.bumen{
  /* margin-left: 19px!important; */
  /* margin-top: 10px!important; */
  background-color: #fff;
  /* width: 10px; */
}

.el-button--small {
    --el-button-size: 30px;
    border-radius: calc(var(--el-border-radius-base) - 1px);
    font-size: 12px;
    height: var(--el-button-size);
    padding: 5px 11px;
    font-weight: 400;
}

::v-deep .el-input--small .el-input__inner {
    height: 32px;
    line-height: 32px;
}
::v-deep .el-form .el-form-item__label {
    font-weight: 360;
}
.el-col-container .el-input{
  margin-bottom: 5px!important;
}
.dept_all
.head-container.el-tree{
  height: 500px; 
  /* min-height: 100vh; */
  color: #333333;
  overflow: auto;
}
.el-tree-node__label {
    /* font-size: 20px; */
    font: 14px;
 
    font-size: 16px;
    line-height: 18px;
    font-family: PingFang SC, Microsoft Yahei, Helvetica Neue, Arial;
 
}
::v-deep .el-tree-node {
    white-space: nowrap;
    width: 340px;
    outline: none;
}
::v-deep .el-col-container {
  padding-left: 0px!important;
    padding-right: 0px!important;
}
/* ::v-deep .el-tree-node__expand-icon {
    cursor: pointer;
    color: #333333;
} */
/* ::v-deep .expanded.el-tree-node__expand-icon.el-icon-caret-right{
    color: #333333;
} */
/* 在 Vue 单文件组件的 <style scoped> 中使用 */
::v-deep .el-tree .el-tree-node__expand-icon:not(.is-leaf) {
  color: #333333;
}
::v-deep .el-tree-node__expand-icon {
    cursor: pointer;
    /* color: #333333; */
}
.el-tree-node__content > .el-tree-node__expand-icon {
    padding: 0px;
}
::v-deep .el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #333333;
    /* line-height: 40px; */
    line-height: 32px;
    /* padding: 0 12px 0 0; */
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
/* ::v-deep label {
    font-weight: 360;
} */
.el-form .el-form-item__label {
    font-weight: 360;
}
::v-deep .el-form-item--small .el-form-item__label {
    width: 90px!important;;
}
.nei-waicontainer {
    padding: 20px;
    margin: 0px auto 0;
    background-color: #fff;
    padding: 0px;
}

.head-waineicontainer {
    padding: 0px;
    background-color: #fff;
}
.head-waicontainer {
    /* background: #f0f2f5; */
}
/* ::v-deep section.app-main {
    background-color: #f0f2f5;
} */


/* section.app-main {
    background-color: #f0f2f5;
} */
.moveDept .el-dialog__body {
    padding-bottom: 10px;
}
.moveDept .el-dialog__footer {
    padding-top: 0px;
}

/* .el-row.mb8.bumen {
  display: flex;        
  justify-content: center; 
   align-items: center;
} */
/* .el-row.mb8.bumen {
  display: flex;
  justify-content: space-between; 
  align-items: center;
} */
.el-row.mb8.bumen {
  display: flex;
  justify-content: flex-start; /* 浮动到最左侧 */
  align-items: center;
}

.el-row.mb8.bumen > :not(:last-child) {
  margin-right: 5px; /* 每个元素之间增加10px的间距 */
}

</style>


<style >
.el-message-box__content {
    padding: 0px 13px !important; 
    padding-left: 95px !important; 
    color: #606266;
    /* font-size: 14px; */
}
.el-message-box__content {
    /* padding: 10px 15px !important; */
    color: #606266;
    font-size: 15px !important;
    align-content: center;
}
.el-message-box__status + .el-message-box__message {
    padding-left: 30px;
    padding-right: 12px;
}
.el-message-box__status.el-icon-warning {
    color: #e90707;
}

</style>
<style >
.el-message-box__content {
    padding: 0px 13px !important; 
    padding-left: 95px !important; 
    color: #606266;
    /* font-size: 14px; */
}
.el-message-box__content {
    /* padding: 10px 15px !important; */
    color: #606266;
    font-size: 15px !important;
    align-content: center;
}
.el-message-box__status + .el-message-box__message {
    padding-left: 30px;
    padding-right: 12px;
}
.el-message-box__status.el-icon-warning {
    color: #e90707;
}
/* 全局覆盖 */
.el-button--primary {
  outline: none;
}

/* 如果需要在特定情况下移除 focus 时的轮廓 */
.el-button--primary:focus {
  outline: none;
}

/* 如果需要在特定情况下移除 active 状态下的轮廓 */
.el-button--primary:active {
  outline: none;
}
</style>