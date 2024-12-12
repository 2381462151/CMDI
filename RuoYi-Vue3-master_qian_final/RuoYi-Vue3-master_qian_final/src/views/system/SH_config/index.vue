<template>
   <div class="app-container">
      <!-- 202408161517检查完毕 -->
      <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch">
         <el-form-item label="类别名称/阶段名称" prop="menuName">
            <el-input
               v-model="queryParams.menuName"
               placeholder="请输入类别名称/阶段名称"
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

      <el-row :gutter="10" class="mb8 ">
         <el-col :span="1.5">
            <el-button
               type="primary"
               plain
               icon="Plus"
               @click="handleAdd"
               v-hasPermi="['system:menu:add']"
            >新增</el-button>
         </el-col>
         <el-col :span="1.5" >
            <el-button 
               type="info"
               plain
               icon="Sort"
               @click="toggleExpandAll"
            >展开/折叠</el-button>
         </el-col>
            <el-col :span="1.5">
                      <el-button
                        type="info"
                        plain
                        icon="upload"
                        @click="handleConfigImport"
                        v-hasPermi="['system:user:import']"
                      >导入</el-button>
            </el-col>
          <el-col :span="1.5">
            <el-button
               type="warning"
               plain
               icon="Download"
               @click="handleExport"
               v-hasPermi="['monitor:job:export']"
            >导出</el-button>
         </el-col>
         <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"   class="toolbar-spacing"></right-toolbar>
      </el-row>
      <el-table
         v-if="refreshTable"
         v-loading="loading"
         :data="menuList"
         row-key="menuId"
         max-height="300px" 
         style="width: 100%"
         :default-expand-all="isExpandAll"
         :tree-props="{ children: 'children', hasChildren:  'undefined'  }"
      >
         <el-table-column prop="majorCategory" label="大类" :show-overflow-tooltip="true" width="160" align="center"></el-table-column>
         <el-table-column prop="minorCategory" label="小类" :show-overflow-tooltip="true" width="160" align="center"></el-table-column>
         <el-table-column prop="subCategory" label="细分类" :show-overflow-tooltip="true" width="160" align="center"></el-table-column>
         <el-table-column prop="subSubCategory" label="细分子类" :show-overflow-tooltip="true" width="160" align="center"></el-table-column>
         <el-table-column prop="isSingleScore" label="是否单一得分" :show-overflow-tooltip="true" width="110" align="center"></el-table-column>
         <el-table-column prop="stageName" label="阶段名称" :show-overflow-tooltip="true" width="120" align="center"></el-table-column>
         <el-table-column :formatter="formatStagePointsFormatter" prop="stagePoints" label="阶段分值" :show-overflow-tooltip="true" width="120" align="center"></el-table-column>
         <el-table-column prop="applicationInstructions" label="申报说明" :show-overflow-tooltip="true" width="200" align="center"></el-table-column>
         
         <el-table-column label="时效性" align="center" :show-overflow-tooltip="true" width="100">
            <template #default="scope">
              <span>
                {{ scope.row.isTimeSensitive === '0' ? '需时效性' :
                      scope.row.isTimeSensitive === '1' ? '非时效性' : '-' }}
              </span>
            </template>
          </el-table-column>
         <el-table-column prop="timeLimit" label="时效时间" :show-overflow-tooltip="true" width="200" align="center"></el-table-column>

         <el-table-column label="创建时间" align="center" width="160" prop="createTime">
            <template #default="scope">
               <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
         </el-table-column>
         <el-table-column label="操作" align="center" width="210" class-name="small-padding fixed-width">
            <template #default="scope">
               <el-button link type="primary" icon="Edit" @click="handleUpdate_config(scope.row)" v-hasPermi="['system:menu:edit']">修改</el-button>
               <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)"  v-hasPermi="['system:menu:remove']">删除</el-button>
            </template>
         </el-table-column>
      </el-table>

      <el-divider border-style="dashed" /> 
      <!-- <el-divider style="background-color: red; color: red;"/>  -->
        <div  style="margin-top: 20px ">
          
          <el-upload
            class="upload-demo"
            :auto-upload="false"
            :on-change="handleChange"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :on-exceed="handleExceed"
            :file-list="HintfileList"
            v-loading="uploadHintLoading"
            style=" width: 100%"
          >
            <el-button size="small" type="primary" style=" width: 100%!important;">
              选择文件
            </el-button>
            <template #tip>
              <div class="el-upload__tip">
              该提交框是用来更新提示文件,只能上传 Excel、Word、PDF 文件
              </div>
             </template>
          </el-upload>
          <!-- <el-button @click="fetchFileList">刷新文件列表</el-button> -->
          <el-button @click="submitFiles"  style=" width: 100%;margin-bottom: 20px;">提交更改</el-button>
        </div>
      <!-- <el-divider style="background-color: red; color: red;"/>  -->
      <el-divider border-style="dashed" /> 
      <div>
          <el-scrollbar height="100px" v-loading="Hintsloading" >
            <div v-for="(item) in HintData.items" :key="item.id" class="scrollbar-demo-item">
              <el-checkbox v-model="item.selected" />
              <span>{{ item.text }}</span>
             
            </div>
          </el-scrollbar>
          <!-- 输入框及添加按钮 -->
          <el-input v-model="newItemText" placeholder="输入新项"  style="margin-top: 16px; width: 100%; margin-right: 20px;"/>
          <!-- <el-input v-model="newItemText" placeholder="输入新项"  style="margin-top: 16px; width: 815px; margin-right: 20px;"/> -->
          <!-- 添加全局删除按钮 -->
           
          <!-- <el-button @click="deleteSelectedHints" style="margin-top: 16px; width: 250px;">删除选中的项</el-button>
          <el-button @click="addHintData" style="margin-top: 16px; width: 250px;">添加</el-button>        -->
          <el-row type="flex" justify="space-between" align="middle" style="margin-top: 10px;" :gutter="20">
            <el-col :span="12">
              <el-button @click="deleteSelectedHints" style="width: 100%;">删除选中的项</el-button>
            </el-col>
            <el-col :span="12">
              <el-button @click="addHintData" style="width: 100%;">添加</el-button>
            </el-col>
          </el-row>
       </div>
          <el-dialog :title="title" v-model="all_add_open" width="680px" append-to-body @close="all_add_open = false, resetAddForm()" :close-on-click-modal="false">
            <el-form ref="AddMenuRef" :model="update_form" label-width="100px"> 
                    <el-form-item prop="majorCategoryMode" label="大类:" label-width="60px">                    
                      <el-radio-group v-model="update_form.majorCategoryMode" style="width: 100%;">                
                        <el-col :span="1">
                          <el-tooltip effect="dark" placement="top" content="从以往的大类中选择">
                            <el-radio value="select" @change="toggleMajorCategoryMode('select')">                        
                            </el-radio>
                          </el-tooltip>
                        </el-col>
                        <el-col :span="23">
                            <el-select v-model="update_form.majorCategory_select" @change="handleMajorCategoryChange" placeholder="请选择以往的大类"  :disabled="update_form.majorCategoryMode !== 'select'" >
                              <el-option
                                v-for="dict in topLevelCategories"
                                :key="dict.menuId"
                                :label="dict.majorCategory"
                                :value="dict.menuId"
                                
                              ></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="1">
                          <el-tooltip effect="dark" placement="top" content="手动输入">
                            <el-radio value="input" @change="toggleMajorCategoryMode('input')">
                            </el-radio>
                          </el-tooltip>
                        </el-col>
                        <el-col :span="23" >
                          <el-form-item prop="majorCategory_input">
                            <el-input v-model="update_form.majorCategory_input" placeholder="请输入大类名称" :disabled="update_form.majorCategoryMode !== 'input'"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-radio-group>
                    </el-form-item>
                 <el-form-item prop="minorCategoryMode" label="小类:" label-width="60px">
                    <el-row style="width: 100%;">
                      <el-radio-group v-model="update_form.minorCategoryMode" style="width: 100%;">
                        <el-col :span="1">
                          <el-tooltip effect="dark" placement="top" content="从以往的小类中选择">
                            <el-radio value="select" :disabled="update_form.majorCategoryMode === 'input'" @change="toggleMinorCategoryMode('select')">
                            </el-radio>
                          </el-tooltip>
                        </el-col>
                        <el-col :span="23">
                          <el-select v-model="update_form.minorCategory_select" @change="handleMinorCategoryChange" placeholder="请选择以往的小类" :disabled="update_form.minorCategoryMode !== 'select'" >
                            <el-option
                              v-for="dict in secondLevelCategories"
                              :key="dict.menuId"
                              :label="dict.minorCategory"
                              :value="dict.menuId"
                            ></el-option>
                          </el-select>
                        </el-col>
                        <el-col :span="1">
                          <el-tooltip effect="dark" placement="top" content="手动输入">
                            <el-radio value="input" @change="toggleMinorCategoryMode('input')">
                            </el-radio>
                          </el-tooltip>
                        </el-col>
                        <el-col :span="23">
                          <el-input v-model="update_form.minorCategory_input" :disabled="update_form.minorCategoryMode !== 'input'" placeholder="请输入小类名称" />
                        </el-col>
                      </el-radio-group>
                    </el-row>
                  </el-form-item>
                    <el-form-item label="细分类:" label-width="60px">
                      <el-radio-group v-model="update_form.detailCategoryMode" style="width: 100%;">
                          <el-col :span="1">
                            <el-tooltip effect="dark" placement="top" content="从以往的细分类中选择">
                              <el-radio value="select" :disabled="update_form.majorCategoryMode === 'input' || update_form.minorCategoryMode === 'input'"  @change="toggleDetailCategoryMode('select')"> 
                              </el-radio>
                            </el-tooltip>
                          </el-col>
                          <el-col :span="8">
                            <el-select v-model="update_form.detailCategory_select" placeholder="请选择" :disabled="update_form.detailCategoryMode !== 'select' || update_form.majorCategoryMode === 'input' || update_form.minorCategoryMode === 'input'" @change="resetSubSubCategory">
                              <el-option
                                v-for="dict in thirdLevelCategories"
                                :key="dict.menuId"
                                :label="dict.subCategory"
                                :value="dict.menuId"
                              ></el-option>
                            </el-select>
                          </el-col>
                          <el-col :span="1" :offset="1">
                            <el-tooltip effect="dark" placement="top" content="手动输入">
                              <el-radio value="input"  @change="toggleDetailCategoryMode('input')">
                              </el-radio>
                            </el-tooltip>
                          </el-col>
                          <el-col :span="8">
                            <el-input v-model="update_form.detailCategory_input" :disabled="update_form.detailCategoryMode !== 'input'" placeholder="请输入细分类" />
                          </el-col>
                          <el-col :span="1" :offset="1">
                            <el-tooltip effect="dark" placement="top" content="点击这个代表无细分类">
                            <!-- <el-radio value="none"  @change="toggleDetailCategoryNone"> -->
                              <el-radio value="none"  @change="toggleDetailCategoryMode('none')">
                              无细分类
                            </el-radio>
                          </el-tooltip>
                          </el-col>
                      
                      </el-radio-group>
                    </el-form-item> 
                <el-row>
                  <el-button
                  type="primary"
                  plain
                  icon="Plus"
                  @click="addSubSubCategoryBasedOnMode"
                  v-hasPermi="['system:menu:add']"
                  :disabled="!canAddSubSubCategory"
                  >新增细分子类</el-button>
                </el-row>  
            <div v-if="showSubSubCategories" v-for="(subSubCategory, menuId) in update_form.subSubCategories_yuan" :key="subSubCategory.menuId" class="sub-sub-category"  >
              <el-divider border-style="dashed" />
                  <el-row style="width: 100%;">
                      <el-col :span="12">
                        <el-form-item label="细分子类:" label-width="76px">
                            <!-- <el-row style="width: 100%;">  -->
                                    <el-col :span="24">
                                      <!-- <el-input v-model="subSubCategory.subSubCategory_input" :disabled="subSubCategory.subSubCategoryMode === 'none'|| update_form.detailCategoryMode === 'none'" placeholder="请输入细分子类名称"/> -->
                                      <el-input v-model="subSubCategory.subSubCategory_input" :disabled="true" placeholder="请输入细分子类名称"/>
                                    </el-col>        
                            <!-- </el-row> -->
                          </el-form-item>
                      </el-col>
                      <!-- <el-col :span="8"> -->
                    <!-- <el-divider dashed v-if="!subSubCategory.isSingleScore"></el-divider> -->
                    <el-col :offset="6":span="5" v-if="!subSubCategory.isSingleScore">
                        <el-button
                        type="primary"
                        plain
                        icon="Plus"
                        @click="toggleSingleScore_yuan(subSubCategory)"
                        v-hasPermi="['system:menu:add']"
                        >添加阶段</el-button>
                    </el-col> 
                  </el-row> 
               <div  v-for="subSubCategorystage in subSubCategory.children" :key="subSubCategorystage.menuId" class="sub-sub-category" >
                <el-divider dashed></el-divider>
                <el-row>
                      <el-col :span="12">
                            <el-form-item label="阶段名称:">
                              <el-input
                                v-model="subSubCategorystage.stageName"
                                placeholder="请输入阶段名称"
                                :disabled="Yuanbunenggai(subSubCategorystage.menuId)"
                              ></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="阶段分值:">
                              <el-input
                                v-model="subSubCategorystage.stagePoints"
                                placeholder="请输入阶段分值"
                                :disabled="Yuanbunenggai(subSubCategorystage.menuId)"
                              ></el-input>
                            </el-form-item>
                           </el-col>
                     </el-row>
                  <el-row>   
                    <el-col :span="12">
                      <el-form-item label="申请说明:">
                        <el-input
                          v-model="subSubCategorystage.applicationInstructions"
                          placeholder="请输入申请说明"
                          :disabled="Yuanbunenggai(subSubCategorystage.menuId)"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="是否需要时效性:" label-width="120px">
                        <el-select v-model="subSubCategorystage.isTimeSensitive" placeholder="请选择"  :disabled="Yuanbunenggai(subSubCategorystage.menuId)">
                          <el-option
                            v-for="(option, index) in timeSensitiveOptions"
                            :key="option.label"
                            :label="option.label"
                            :value="option.value"
                           
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row> 
                    <el-col :span="12" >
                      <el-form-item label="时效时间:">
                        <el-select v-model="subSubCategorystage.timeLimit" placeholder="请选择"  :disabled="Yuanbunenggai(subSubCategorystage.menuId)">
                          <el-option
                            v-for="(option, index) in timeLimitOptions"
                            :key="option.label"
                            :label="option.label"
                            :value="option.value"
                           
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <!-- v-if="!Yuanbunenggai(subSubCategorystage.menuId)|| subSubCategory.children.length > 1"  -->
                  <el-col :span="12"  v-if="!Yuanbunenggai(subSubCategorystage.menuId)" style="display: flex; ">
                     <el-button
                    
                        type="danger"
                        size="small"
                        @click="removeStage_yuan(subSubCategorystage.menuId,subSubCategory.menuId)"   
                        style="margin-left: auto;"
                     >删除阶段</el-button>
                  </el-col>  
                </el-row>   
            </div>
          </div>
            <div  v-for="subSubCategory  in update_form.subSubCategories_add" :key="subSubCategory.menuId" class="sub-sub-category" >
              <el-divider border-style="dashed" />
               <!-- <el-row > -->
                <el-form-item label="细分子类:" label-width="76px">
                  <el-row style="width: 100%;"> 
                    <el-radio-group v-model="subSubCategory.subSubCategoryMode" style="width: 100%;">
                      <!-- update_form.detailCategory_select -->
                          <el-col :span="1" >
                            <el-tooltip effect="dark" placement="top" content="手动输入">
                              <el-radio value="input"  @change="togglesubSubCategoryMode(subSubCategory.menuId,update_form.detailCategoryMode,'input')" :disabled="update_form.detailCategoryMode === 'none'">
                              </el-radio>
                            </el-tooltip>
                          </el-col>
                          <el-col :span="8">
                            <el-input v-model="subSubCategory.subSubCategory_input" :disabled="subSubCategory.subSubCategoryMode === 'none'|| update_form.detailCategoryMode === 'none'" placeholder="请输入细分子类名称"/>
                          </el-col>
                          <el-col :span="1" :offset="2">
                                <el-tooltip effect="dark" placement="top" content="无细分子类">
                                      <el-radio value="none"      @change="togglesubSubCategoryMode(subSubCategory.menuId,update_form.detailCategoryMode,'none')"> 
                                        无细分子类
                                      </el-radio>
                                </el-tooltip>
                           </el-col>
                       
                     
                      <el-col :span="7" :offset="5">
                          <el-button   type="danger"
                          @click="removeSubSubCategory(subSubCategory.menuId)">删除细分子类</el-button>
                      </el-col>
                    </el-radio-group>
                  </el-row>
                </el-form-item>
               <!-- </el-row> -->
               <el-divider dashed></el-divider>
               <el-row>
                  <el-button
                  type="primary"
                  plain
                  icon="Plus"
                  @click="toggleSingleScore_add(subSubCategory)"
                  v-hasPermi="['system:menu:add']"
                  style="margin-bottom: 20px;"
                  >添加阶段</el-button>
               </el-row>  
                  <template  v-for="subSubCategorystage in subSubCategory.children" :key="subSubCategorystage.menuId" class="sub-sub-category"  >
                    <el-row>
                      <el-col :span="12">
                          <el-form-item label="阶段名称:">
                            <el-input
                              v-model="subSubCategorystage.stageName"
                              placeholder="请输入阶段名称"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="阶段分值:">
                            <el-input
                              v-model="subSubCategorystage.stagePoints"
                              placeholder="请输入阶段分值"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                          <el-form-item label="申请说明:">
                            <el-input
                              v-model="subSubCategorystage.applicationInstructions"
                              placeholder="请输入申请说明"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="是否需要时效性:" label-width="120px">
                            <el-select v-model="subSubCategorystage.isTimeSensitive" placeholder="请选择">
                              <el-option
                                v-for="(option, index) in timeSensitiveOptions"
                                :key="index"
                                :label="option.label"
                                :value="option.value"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      
                          <el-col ::span="12">
                            <el-form-item label="时效时间:">
                              <el-select
                                v-model="subSubCategorystage.timeLimit"
                                :disabled="subSubCategorystage.isTimeSensitive !== '0'"
                                placeholder="请选择"
                              >
                                <el-option
                                  v-for="(option, index) in timeLimitOptions"
                                  :key="index"
                                  :label="option.label"
                                  :value="option.value"
                                ></el-option>
                              </el-select>
                            </el-form-item>
                        </el-col>
                    
                      <el-col :span="4" >
                        <el-button
                        v-if="subSubCategory.children.length > 1"
                        type="danger"
                        size="small"
                        @click="removeStage_add(subSubCategorystage.menuId)"
                          >删除阶段</el-button>
                      </el-col>
                  </template>
            </div>            
         </el-form>
                  <template #footer>
                     <div class="dialog-footer">
                     <el-button type="primary" @click="add_submitForm">确 定</el-button>
                     <el-button @click="all_add_open = false, resetAddForm()">取 消</el-button>
                     </div>
                  </template>
      </el-dialog>
     <!--  #2024082616时修改-->
    <el-dialog :close-on-click-modal="false" :title="title" v-model="singleEditOpen" width="680px" append-to-body @close="singleEditOpen = false, resetSingleEditForm()">
      <el-form ref="singleEditRef" :model="singleEdit_form" :rules="singleEditrules" label-width="100px">
        <!-- 根据类别显示不同的输入框 -->
        <template v-if="singleEdit_form.isMajorCategory">
          <el-row>
            <el-col :span="10">
              <el-form-item label="大类:">
                <el-input v-model="singleEdit_form.majorCategory" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item :prop="singleEdit_form.isMajorCategory ? 'majorCategory_input' : ''" label="大类修改为:">
                <el-input v-model="singleEdit_form.majorCategory_input" placeholder="请输入大类名称" />
              </el-form-item>
            </el-col>
          </el-row>
        </template>

        <template v-if="singleEdit_form.isMinorCategory">
          <el-row>
            <el-col :span="10">
              <el-form-item label="小类:">
                <el-input v-model="singleEdit_form.minorCategory" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item :prop="singleEdit_form.isMinorCategory ? 'minorCategory_input' : ''" label="小类名称修改为:">
                <el-input v-model="singleEdit_form.minorCategory_input" placeholder="请输入小类名称" />
              </el-form-item>
            </el-col>
          </el-row>
        </template>

        <template v-if="singleEdit_form.isSubCategory">
          <el-row>
            <el-col :span="10">
              <el-form-item label="细分类:">
                <el-input v-model="singleEdit_form.subCategory" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item :prop="singleEdit_form.isSubCategory ? 'subCategory_input' : ''" label="细分类名称修改为:">
                <el-input v-model="singleEdit_form.subCategory_input" placeholder="请输入细分类名称" />
              </el-form-item>
            </el-col>
          </el-row>
        </template>

        <template v-if="singleEdit_form.isSubSubCategory">
          <el-row>
            <el-col :span="10">
              <el-form-item label="细分子类:">
                <el-input v-model="singleEdit_form.subSubCategory" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item :prop="singleEdit_form.isSubSubCategory ? 'subSubCategory_input' : ''" label="细分子类名称修改为:">
                <el-input v-model="singleEdit_form.subSubCategory_input" placeholder="请输入细分子类名称" />
              </el-form-item>
            </el-col>
          </el-row>
        </template>

        <template v-if="singleEdit_form.isStage">
          <el-row>
            <el-col :span="5">
              <el-form-item label="阶段名称:">
                <el-input v-model="singleEdit_form.stageName" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="分值:">
                <el-input v-model="singleEdit_form.stagePoints" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="申请说明:">
                <el-input v-model="singleEdit_form.applicationInstructions" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="是否需要时效性:">
                <el-input v-model="singleEdit_form.isTimeSensitive" disabled :placeholder="singleEdit_form.isTimeSensitive === '0' ? '需时效性' : '非时效性'" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="时效时间:">
                <el-input v-model="singleEdit_form.timeLimit" disabled  />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">
              <el-form-item :prop="singleEdit_form.isStage ? 'stageName_input' : ''" label="阶段名称修改为:">
                <el-input v-model="singleEdit_form.stageName_input" placeholder="请输入阶段名称" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item :prop="singleEdit_form.isStage ? 'stagePoints_input' : ''" label="阶段分值修改为:">
                <el-input v-model="singleEdit_form.stagePoints_input" placeholder="请输入阶段分值" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item :prop="singleEdit_form.isStage ? 'applicationInstructions_input' : ''" label="申请说明:">
                <el-input v-model="singleEdit_form.applicationInstructions_input" placeholder="请输入申请说明" />
              </el-form-item>
             </el-col>
            <el-col :span="5">
              <el-form-item :prop="singleEdit_form.isStage ? 'isTimeSensitive_select' : ''" label="是否需要时效性:">
                <el-select v-model="singleEdit_form.isTimeSensitive_select" placeholder="请选择">
                  <el-option
                    v-for="(option, index) in timeSensitiveOptions"
                    :key="option.label"
                    :label="option.label"
                    :value="option.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item :prop="singleEdit_form.isStage && singleEdit_form.isTimeSensitive_select === '0' ? 'timeLimit_select' : ''" label="时效时间:">
                <el-select
                  v-model="singleEdit_form.timeLimit_select"
                  :disabled="singleEdit_form.isTimeSensitive_select !== '0'"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(option, index) in timeLimitOptions"
                    :key="option.label"
                    :label="option.label"
                    :value="option.value"
                  ></el-option>
                </el-select>
              </el-form-item>
          </el-col>
          </el-row>
        </template>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="singleEdit_submitForm">确 定</el-button>
          <el-button @click="singleEditOpen = false, resetSingleEditForm()">取 消</el-button>
        </div>
      </template>
    </el-dialog>

     <el-dialog :close-on-click-modal="false" :title="deleteTitle" v-model="deleteOpen" width="400px" append-to-body  @close="deleteOpen = false">
        <p>{{ deleteMessage }}</p>
        <template #footer>
          <div class="dialog-footer">
            <el-button type="primary" @click="confirmDelete">确 定</el-button>
            <el-button @click="deleteOpen = false,resetSingleEditForm()">取 消</el-button>
          </div>
        </template>
    </el-dialog>
     <el-dialog :close-on-click-modal="false" :title="upload.title" v-model="upload.open" width="400px" append-to-body @close="upload.open = false">
         <el-upload
            ref="uploadRef"
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
                     <el-checkbox v-model="upload.updateSupport" />是否更新配置信息
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
   </div>
</template>

<script setup name="Menu">
import { listMenu, updateConfig,updatesingleEditMenu,delConfig,deleteHints,addHint,HintfileUpload,listHints,listHintFile} from "@/api/system/sh_config";
import { getToken } from "@/utils/auth";
import SvgIcon from "@/components/SvgIcon";
import IconSelect from "@/components/IconSelect";
import { v4 as uuidv4 } from 'uuid'; // 导入 uuid 库
import { ref } from 'vue';
import { saveAs } from 'file-saver'
const uploadHintLoading= ref(true);
const Hintsloading = ref(true);
const Hintfileurl= import.meta.env.VITE_APP_BASE_API + "/system/sh_config/HintfileImportData"


const HintfileList = ref([]);
const originalFileList= ref([]);
// 新增提示项的输入值
const newItemText = ref('');
const loading = ref(true);
/** 查询菜单列表 */
const a_data = ref([
  {
    menuId: 1,
    parentId: null,
    majorCategory: "大类A",
    minorCategory: "",
    subCategory: "",
    subSubCategory: "",
    isSingleScore: true,
    stageName: "",
    stagePoints: null,
    materialName: "",
    materialRequirements: "",
    applicationInstructions: "",
    status: "active",
    createTime: "2024-08-27T14:43:00Z",
    isTimeSensitive:"",// 新增属性：是否具有时效性
    timeLimit:"",
    detailCategoryMode:"none",
    
    subSubCategoryMode:"",
    subSubCategory_input:"",
    children: [
      {
        menuId: 2,
        parentId: 1,
        majorCategory: "大类A",
        minorCategory: "小类A1",
        subCategory: "",
        subSubCategory: "",
        isSingleScore: true,
        stageName: "",
        stagePoints: null,
        materialName: "",
        materialRequirements: "",
        applicationInstructions: "",
        status: "active",
        createTime: "2024-08-27T14:43:00Z",
        isTimeSensitive:"",// 新增属性：是否具有时效性
        timeLimit:"",
        detailCategoryMode:"none",
 
        subSubCategoryMode:"",
        subSubCategory_input:"",
        children: [
          {
            menuId: 3,
            parentId: 2,
            majorCategory: "大类A",
            minorCategory: "小类A1",
            subCategory: "细分类A11",
            subSubCategory:  "",
            isSingleScore: false,
            stageName:  "",
            stagePoints: null,
            materialName: "",
            materialRequirements: "",
            applicationInstructions: "",
            status: "active",
            createTime: "2024-08-27T14:43:00Z",
            isTimeSensitive:"",// 新增属性：是否具有时效性
            timeLimit:"",
            detailCategoryMode:"",
            subSubCategoryMode:"",
            subSubCategory_input:"",
            children: [
              {
                menuId: 4,
                parentId: 3,
                majorCategory: "大类A",
                minorCategory: "小类A1",
                subCategory: "细分类A11",
                subSubCategory: "细分子类A111",
                isSingleScore: false,
                stageName:  "",
                stagePoints: null,
                materialName:  "",
                materialRequirements:  "",
                applicationInstructions:  "",
                status: "active",
                createTime: "2024-08-27T14:43:00Z",
                isTimeSensitive:"",// 新增属性：是否具有时效性
                timeLimit:"",
                detailCategoryMode:"",

                subSubCategoryMode:"",
                subSubCategory_input:"细分子类A111",
                children: 
                [
                        {
                          menuId: 8,
                          parentId: 4,
                          majorCategory: "大类A",
                          minorCategory: "小类A1",
                          subCategory: "细分类A11",
                          subSubCategory: "细分子类A111",
                          isSingleScore: false,
                          stageName: "初始阶段",
                          stagePoints: 10,
                          materialName: "初始阶段证明材料",
                          materialRequirements: "初始阶段的要求",
                          applicationInstructions: "初始阶段的申请说明",
                          status: "active",
                          createTime: "2024-08-27T14:43:00Z",
                          // children: []
                          isTimeSensitive:"0",// 新增属性：是否具有时效性
                          timeLimit:"一个月",
                          subSubCategoryMode:"",
                        subSubCategory_input:"细分子类A111",
                        detailCategoryMode:"",

                        },
                        {
                          menuId: 9,
                          parentId: 4,
                          majorCategory: "大类A",
                          minorCategory: "小类A1",
                          subCategory: "细分类A11",
                          subSubCategory: "细分子类A111",
                          isSingleScore: false,
                          stageName: "最终阶段",
                          stagePoints: 20,
                          materialName: "最终阶段证明材料",
                          materialRequirements: "最终阶段的要求",
                          applicationInstructions: "最终阶段的申请说明",
                          status: "active",
                          createTime: "2024-08-27T14:43:00Z",
                          // children: []
                          isTimeSensitive:"0",// 新增属性：是否具有时效性
                          timeLimit:"两个月",
                          subSubCategoryMode:"",
                          subSubCategory_input:"细分子类A111",
                          detailCategoryMode:"",

                        }
                ]
              },
              {
                menuId: 5,
                parentId: 3,
                majorCategory: "大类A",
                minorCategory: "小类A1",
                subCategory: "细分类A11",
                subSubCategory: "细分子类A112",
                isSingleScore: false,
                stageName:  "",
                stagePoints:  null,
                materialName:  "",
                materialRequirements:  "",
                applicationInstructions:  "",
                status: "active",
                createTime: "2024-08-27T14:43:00Z",
                isTimeSensitive:"",// 新增属性：是否具有时效性
                timeLimit:"",
                subSubCategoryMode:"",
                subSubCategory_input:"细分子类A112",
                detailCategoryMode:"",

                children: [
                  {
                    menuId: 10,
                    parentId: 5,
                    majorCategory: "大类A",
                    minorCategory: "小类A1",
                    subCategory: "细分类A11",
                    subSubCategory: "细分子类A112",
                    isSingleScore: false,
                    stageName: "最终阶段",
                    stagePoints: 20,
                    materialName: "最终阶段证明材料",
                    materialRequirements: "最终阶段的要求",
                    applicationInstructions: "最终阶段的申请说明",
                    status: "active",
                    createTime: "2024-08-27T14:43:00Z",
                    // children: []
                    isTimeSensitive:"1",// 新增属性：是否具有时效性
                    timeLimit:"",
                    subSubCategoryMode:"",
                    subSubCategory_input:"细分子类A112",
                    detailCategoryMode:"",

                  }
                ]
              }
            ]
          },
          {
            menuId: 6,
            parentId: 2,
            majorCategory: "大类A",
            minorCategory: "小类A1",
            subCategory: "细分类A12",
            subSubCategory:  "",
            isSingleScore: true,
            stageName:  "",
            stagePoints:  null,
            materialName:  "",
            materialRequirements:  "",
            applicationInstructions:  "",
            status: "active",
            createTime: "2024-08-27T14:43:00Z",
            isTimeSensitive:"",// 新增属性：是否具有时效性
            timeLimit:"",
            subSubCategoryMode:"",
            subSubCategory_input:"",
            detailCategoryMode:"",

            children: [
              {
                menuId: 7,
                parentId: 6,
                majorCategory: "大类A",
                minorCategory: "小类A1",
                subCategory: "细分类A12",
                subSubCategory: "细分子类A121",
                isSingleScore: true,
                stageName: "最终阶段",
                stagePoints: 30,
                materialName: "最终阶段证明材料",
                materialRequirements: "最终阶段的要求",
                applicationInstructions: "最终阶段的申请说明",
                status: "active",
                createTime: "2024-08-27T14:43:00Z",
                // children: []
                isTimeSensitive:"0",// 新增属性：是否具有时效性
                timeLimit:"三个月",
                subSubCategoryMode:"",
                subSubCategory_input:"细分子类A121",
                detailCategoryMode:"",

              }
            ]
          }
        ]
      },
      {
        menuId: 10,
        parentId: 1,
        majorCategory: "大类A",
        minorCategory: "小类A2",
        subCategory:  "",
        subSubCategory:  "",
        isSingleScore: true,
        stageName:  "",
        stagePoints: null,
        materialName:  "",
        materialRequirements:  "",
        applicationInstructions:  "",
        status: "active",
        createTime: "2024-08-27T14:43:00Z",
        isTimeSensitive:"",// 新增属性：是否具有时效性
        timeLimit:"",
        subSubCategoryMode:"",
        subSubCategory_input:"",
        detailCategoryMode:"none",

        children: [
          {
            menuId: 11,
            parentId: 10,
            majorCategory: "大类A",
            minorCategory: "小类A2",
            subCategory: "细分类A21",
            subSubCategory:  "",
            isSingleScore: true,
            stageName:  "",
            stagePoints: null,
            materialName:  "",
            materialRequirements:  "",
            applicationInstructions:  "",
            status: "active",
            createTime: "2024-08-27T14:43:00Z",
            isTimeSensitive:"",// 新增属性：是否具有时效性
            timeLimit:"",
            subSubCategoryMode:"",
            subSubCategory_input:"",
            detailCategoryMode:"",

            children: [
              {
                menuId: 12,
                parentId: 11,
                majorCategory: "大类A",
                minorCategory: "小类A2",
                subCategory: "细分类A21",
                subSubCategory: "细分子类A211",
                isSingleScore: true,
                stageName:  "",
                stagePoints: null,
                materialName:  "",
                materialRequirements:  "",
                applicationInstructions:  "",
                status: "active",
                createTime: "2024-08-27T14:43:00Z",
                isTimeSensitive:"",// 新增属性：是否具有时效性
                timeLimit:"",
                subSubCategoryMode:"",
                subSubCategory_input:"细分子类A211",
                detailCategoryMode:"",

                children: [
                  {
                    menuId: 13,
                    parentId: 12,
                    majorCategory: "大类A",
                    minorCategory: "小类A2",
                    subCategory: "细分类A21",
                    subSubCategory: "细分子类A211",
                    isSingleScore: true,
                    stageName: "最终阶段",
                    stagePoints: 40,
                    materialName: "最终阶段证明材料",
                    materialRequirements: "最终阶段的要求",
                    applicationInstructions: "最终阶段的申请说明",
                    status: "active",
                    createTime: "2024-08-27T14:43:00Z",
                    // children: []
                    isTimeSensitive:"1",// 新增属性：是否具有时效性
                    timeLimit:"",
                    subSubCategoryMode:"",
                    subSubCategory_input:"细分子类A211",
                    detailCategoryMode:"",

                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    menuId: 14,
    parentId: null,
    majorCategory: "大类B",
    minorCategory:  "",
    subCategory:  "",
    subSubCategory:  "",
    isSingleScore: false,
    stageName:  "",
    stagePoints: null,
    materialName:  "",
    materialRequirements:  "",
    applicationInstructions:  "",
    status: "active",
    createTime: "2024-08-27T14:43:00Z",
    isTimeSensitive:"",// 新增属性：是否具有时效性
    timeLimit:"",
    subSubCategoryMode:"",
    subSubCategory_input:"",
    detailCategoryMode:"",

    children: [
      {
        menuId: 15,
        parentId: 14,
        majorCategory: "大类B",
        minorCategory: "小类B1",
        subCategory:  "",
        subSubCategory:  "",
        isSingleScore: false,
        stageName:  "",
        stagePoints: null,
        materialName:  "",
        materialRequirements:  "",
        applicationInstructions:  "",
        status: "active",
        createTime: "2024-08-27T14:43:00Z",
        isTimeSensitive:"",// 新增属性：是否具有时效性
        timeLimit:"",
        subSubCategoryMode:"",
        subSubCategory_input:"",
        detailCategoryMode:"",

        children: [
          {
            menuId: 16,
            parentId: 15,
            majorCategory: "大类B",
            minorCategory: "小类B1",
            subCategory: "细分类B11",
            subSubCategory:  "",
            isSingleScore: false,
            stageName:  "",
            stagePoints: null,
            materialName:  "",
            materialRequirements:  "",
            applicationInstructions:  "",
            status: "active",
            createTime: "2024-08-27T14:43:00Z",
            isTimeSensitive:"",// 新增属性：是否具有时效性
            timeLimit:"",
            subSubCategoryMode:"",
            subSubCategory_input:"",
            detailCategoryMode:"",

            children: [
              {
                menuId: 17,
                parentId: 16,
                majorCategory: "大类B",
                minorCategory: "小类B1",
                subCategory: "细分类B11",
                subSubCategory: "细分子类B111",
                isSingleScore: false,
                stageName: "",
                stagePoints: null,
                materialName:  "",
                materialRequirements:  "",
                applicationInstructions:  "",
                status: "active",
                createTime: "2024-08-27T14:43:00Z",
                isTimeSensitive:"",// 新增属性：是否具有时效性
                timeLimit:"",
                subSubCategoryMode:"",
                subSubCategory_input:"细分子类B111",
                detailCategoryMode:"",

                children: [
                  {
                    menuId: 18,
                    parentId: 17,
                    majorCategory: "大类B",
                    minorCategory: "小类B1",
                    subCategory: "细分类B11",
                    subSubCategory: "细分子类B111",
                    isSingleScore: false,
                    stageName: "初始阶段",
                    stagePoints: 50,
                    materialName: "初始阶段证明材料",
                    materialRequirements: "初始阶段的要求",
                    applicationInstructions: "初始阶段的申请说明",
                    status: "active",
                    createTime: "2024-08-27T14:43:00Z",
                    // children: []
                    isTimeSensitive:"1",// 新增属性：是否具有时效性
                    timeLimit:"",
                    subSubCategoryMode:"",
                   subSubCategory_input:"细分子类B111",
                   detailCategoryMode:"",

                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]);
// const a_data=ref([])
// a_data.value =addLevelFlags(a_data.value);
// console.log(a_data.value);
const updatedData = addLevelFlags(a_data.value);
// console.log(updatedData);
a_data.value = updatedData;
// console.log(a_data.value);
function updateData (a_data) {
  // 遍历数据结构
 
  a_data.forEach(item => {
    // 将 null 替换为 "" 除了 stagePoints
    Object.keys(item).forEach(key => {
      // if (key !== 'stagePoints' && item[key] === null) {
      //   item[key] = '';
      // }
      if ( item[key] === null) {
        item[key] = '';
      }
    });
    Object.keys(item).forEach(key => {
      if (item[key] === '') {
        item[key] = '-';
      }
    });
    // 添加 isTimeSensitive 属性，只有阶段有
    if (item.stageName) {
      item.isTimeSensitive = '0'; // 默认设置为 '0'，如果有特定条件可以设置为 '1'
    }

    // 如果有子级，递归调用更新函数
    if (item.children && item.children.length > 0) {
      // item.hasChildren = true;
      updateData(item.children);
    }else {
     // 如果没有子级，添加 hasChildren 属性并设置为 false
      item.children=undefined;
      // item.hasChildren = false;
    }
  });
  // console.log(a_data);
};
// 调用函数更新数据
updateData(a_data.value);
// HintData.value = [
//  {
//   "name": "系统通知1.xlsx",
//   "url": "isRemote-monitor/job/export/DDD1"
// },
// {
//   "name": "系统通知2.xlsx",
//   "url": "isRemote-monitor/job/export/DDD2"
// },
// {
//   "name": "系统文档1.docx",
//   "url": "isRemote-monitor/job/export/DDD3"
// },
// {
//   "name": "系统文档2.docx",
//   "url": "isRemote-monitor/job/export/DDD4"
// },
// {
//   "name": "系统文档3.docx",
//   "url": "isRemote-monitor/job/export/DDD5"
// },
// ];
// 删除指定提示项的方法
// function deleteHintItem (id)  {
//   HintData.value.items = HintData.value.items.filter(item => item.id !== id);
// };
// 删除所有选中的提示项的方法



function deleteSelectedHints() {
  HintData.items = HintData.items.filter(item => !item.selected);
  // // 先筛选出所有选中的项
  // const selectedItems = HintData.value.items.filter(item => item.selected);
  // // 然后提取这些项的 id
  // const idsToDelete = selectedItems.map(item => item.id);
  
  // deleteHints(idsToDelete).then(response => {
  //   getlistHints()
   
  // });
  // 使用提取的 id 数组来过滤掉这些项
  // HintData.value.items = HintData.value.items.filter(item => !idsToDelete.includes(item.id));
}
// const HintData = ref({
//   items: [
//     // { id: 1, text: '提示 1', selected: false },
//     // { id: 2, text: '提示 2', selected: false },
//     // 可以添加更多提示项目
//      {
//         text: '系统通知：检测到您的账户存在登录异常，如非本人操作，请立即修改密码。',
//         id: '169384770034545678-3',
//         selected: false
//       },
//       {
//         text: '系统通知：您有新的文件上传至系统，请及时查看。',
//         id: '169384770034545678-4',
//         selected: false
//       },
//       {
//         text: '系统通知：系统将于今晚进行维护，届时服务可能会短暂中断。',
//         id: '169384770034545678-5',
//         selected: false
//       },
//       {
//         text: '系统通知：您在2024-06-25的最后一次登录已被记录。',
//         id: '169384770034545678-1',
//         selected: false
//       }
//   ],
// });
const HintData= reactive({
  items:[],


});
function getlistHints(){
  Hintsloading.value = true;
  HintData.items = 
   [
    // { id: 1, text: '提示 1', selected: false },
    // { id: 2, text: '提示 2', selected: false },
    // 可以添加更多提示项目
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

//   HintData.value = reactive({
//   items: [
//     // { id: 1, text: '提示 1', selected: false },
//     // { id: 2, text: '提示 2', selected: false },
//     // 可以添加更多提示项目
//      {
//         text: '系统通知：检测到您的账户存在登录异常，如非本人操作，请立即修改密码。',
//         id: '169384770034545678-3',
//         selected: false
//       },
//       {
//         text: '系统通知：您有新的文件上传至系统，请及时查看。',
//         id: '169384770034545678-4',
//         selected: false
//       },
//       {
//         text: '系统通知：系统将于今晚进行维护，届时服务可能会短暂中断。',
//         id: '169384770034545678-5',
//         selected: false
//       },
//       {
//         text: '系统通知：您在2024-06-25的最后一次登录已被记录。',
//         id: '169384770034545678-1',
//         selected: false
//       }
//   ],
// });


  Hintsloading.value = false;

  // listHints().then(response => {
  
  //     HintfileList=response.Hintfile
   
  //     Hintsloading.value = false;
  // });
};
getlistHints()


// 添加新提示项的方法
function addHintData  ()  {
  if (newItemText.value.trim()) {
    HintData.items.push({ id: Date.now(), text: newItemText.value.trim(), selected: false });
    // newItemText.value = ''; // 清空输入框
    // console.log(HintData.items)
  
  
  //   addHint(HintData.value).then(response => {
  //   getlistHints()
   
  // });
 
  //   getlistHints()
  
  }
};
//table的字段
/** 搜索按钮操作 */



const title = ref('');
const menuList = ref([]);
const deleteOpen = ref(false);
const deleteTitle = ref('');
const NoTreeData=ref([]);
const all_add_open = ref(false);
const singleEditOpen = ref(false);

// function submitFiles  () {
//       submitHintFile(HintfileList.value).then(response => {
//       // NoTreeData.value=response.data
//         // HintfileList=response.Hintfile
//         getHintFile()
//       });
//     };

// 文件列表
//  HintfileList.value = [
//  {
//   "name": "系统通知1.xlsx",
//   "url": "isRemote-monitor/job/export/DDD1"
// },
// {
//   "name": "系统通知2.xlsx",
//   "url": "isRemote-monitor/job/export/DDD2"
// },
// {
//   "name": "系统文档1.docx",
//   "url": "isRemote-monitor/job/export/DDD3"
// },
// {
//   "name": "系统文档2.docx",
//   "url": "isRemote-monitor/job/export/DDD4"
// },
// {
//   "name": "系统文档3.docx",
//   "url": "isRemote-monitor/job/export/DDD5"
// },
// ];

function getHintFile() {
  uploadHintLoading.value = true;
  // listHintFile().then(response => {
  //   // NoTreeData.value=response.data
  //     HintfileList.value =response.Hintfile
  //     originalFileList.value =response.Hintfile
  //     // HintData.value=response.HintData
  //     uploadHintLoading.value = false;

  // });

    // NoTreeData.value=response.data
      // 文件列表
    HintfileList.value = [
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
      originalFileList.value =HintfileList.Hintfile
      // HintData.value=response.HintData
      uploadHintLoading.value = false;

 
}
getHintFile()
function handleRemove  (file, fileList)  {
  // 更新 fileList 为不包含被移除文件的新数组
  HintfileList.value = fileList.filter(item => item.name !== file.name);

  // console.log('文件已从列表中移除', file, fileList);
};
// function submitFiles()  {
//   proxy.$refs["uploadRef"].submit();
    
//       getHintFile()
// };

function submitFiles ()  {
  uploadHintLoading.value = true;

  // 比较文件列表找出被删除和被添加的文件
  const removedFiles = [];
  const addedFiles = [];

  originalFileList.value.forEach(originalFile => {
    if (!HintfileList.value.some(currentFile => currentFile.url === originalFile.url)) {
      removedFiles.push(originalFile);
    }
  });

  HintfileList.value.forEach(currentFile => {
    if (!originalFileList.value.some(originalFile => originalFile.url === currentFile.url)) {
      addedFiles.push(currentFile);
    }
  });

  // 准备上传的数据
  const formData = new FormData();
  addedFiles.forEach(file => {
    formData.append('addedFiles', file.raw, file.name);
  });
  removedFiles.forEach(file => {
    formData.append('removedUrls', file.url);
  });
  HintfileUpload(formData).then(response => {
    // NoTreeData.value=response.data
      getHintFile();
  }).catch (error => {ElMessage.error('文件上传失败: ' + error.message); uploadHintLoading.value = false;}

)
}
function handleChange (file, fileList)  {
  HintfileList.value = fileList;
      //   changeHintfile(fileList.value).then(response => {
      
      // });
};
function handlePreview(file) {
  const url = file.url; // 获取文件下载链接
  const name = file.name; // 获取文件下载链接
  // 检查url是否以'isRemote-'开头
  if (url.startsWith('isRemote-')) {
    const parts = url.substring(8).split('/');
    const parameter = parts.pop(); // 获取最后一个斜杠后面的参数
    const baseUrl = parts.join('/'); // 重新组合基本URL
    // 如果是，则调用downloadHintFile方法
    // downloadHintFile(url.substring(8),name,parameter); // 假设isRemote-后面紧跟着实际的URL
    downloadHintFile(baseUrl,name,parameter); // 假设isRemote-后面紧跟着实际的URL
  } else {
    // 如果不是，则执行现有的代码
    if (url) {
      // 显示提示信息
     ElMessage.error('文件尚未上传');

      // 创建一个隐藏的a标签来模拟下载
     downloadFile(url, name);
      // window.location.href = url; // 通过修改 location 实现下载

    } 
  }
}
function downloadFile (url, name) {
  // 创建一个隐藏的a标签来模拟下载
  const link = document.createElement('a');
  link.href = url;
  link.download = name; // 设置下载文件名
  document.body.appendChild(link); // 将a标签插入到页面中
  link.click(); // 触发点击事件
  document.body.removeChild(link); // 移除a标签
};
function downloadHintFile(url,name,parameter) {
  // 这里应该是下载文件的逻辑
  // 例如，可以调用API获取文件，然后触发下载
  
  // console.log('Downloading file from:', url);
  // 这里可以添加实际的下载代码
  download(url, name,parameter);
}

function download(url, filename, config) {
  downloadLoadingInstance = ElLoading.service({ text: "正在下载数据，请稍候", background: "rgba(0, 0, 0, 0.7)", })
  return service.post(url, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    responseType: 'blob',
    ...config
  }).then(async (data) => {
    const isBlob = blobValidate(data);
    if (isBlob) {
      const blob = new Blob([data])
      saveAs(blob, filename)
    } else {
      const resText = await data.text();
      const rspObj = JSON.parse(resText);
      const errMsg = errorCode[rspObj.code] || rspObj.msg || errorCode['default']
      ElMessage.error(errMsg);
    }
    downloadLoadingInstance.close();
  }).catch((r) => {
    console.error(r)
    ElMessage.error('下载文件出现错误，请联系管理员！')
    downloadLoadingInstance.close();
  })
}
// function handlePreview (file)  {
//   const url = file.url; // 获取文件下载链接
//   if (url) {
//     window.location.href = url; // 通过修改 location 实现下载
//   } else {
//     ElMessage.error('文件尚未上传或服务器未返回文件链接');
//   }
// };
function getList() {
  loading.value = true;
  // listMenu(queryParams.value).then(response => {
  //   // NoTreeData.value=response.data
  //     // HintfileList=response.Hintfile
  //     // HintData.value=response.HintData
  //   NoTreeData.value=a_data
   
  //   menuList.value = proxy.handleTree(response.data, "menuId");
  //   loading.value = false;
  // });
  // console.log(a_data.value);
    // NoTreeData.value=response.data
      // HintfileList=response.Hintfile
      // HintData.value=response.HintData
    NoTreeData.value=a_data.value
    menuList.value = NoTreeData.value;
    console.log(menuList.value);
    // menuList.value = proxy.handleTree(NoTreeData.value, "menuId");
    // console.log(menuList.value);
    loading.value = false;
 
}
function handleQuery() {
  getList();
}
// resetFields 方法仅重置表单字段的验证状态，而不清除输入值。
// resetForm 方法不仅重置表单字段的验证状态，还会清空所有输入字段的值。
/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
}
const data = reactive({
  form: {
   majorCategory: '',
   minorCategory: '',
   isSingleScore: null, // 初始值设为null
  },
  queryParams: {
    menuName: undefined,
    // status: undefined
  },
  // rules: {
  //   menuName: [{ required: true, message: "菜单名称不能为空", trigger: "blur" }],
  //   // orderNum: [{ required: true, message: "菜单顺序不能为空", trigger: "blur" }],
  //   // path: [{ required: true, message: "路由地址不能为空", trigger: "blur" }]
  // },
});
const { queryParams, form, rules } = toRefs(data);
/** 最外层新增按钮操作 */
//这是最外层的总类
const update_form = reactive({
      // majorCategoryMode: 'input',
      majorCategoryMode: '',
      majorCategory_select: '', // 选择的大类
      majorCategory_input: '',
      // 其他表单字段...
      // minorCategoryMode : 'input', // 默认为手动输入
      minorCategoryMode : '',
      minorCategory_input: '',
      minorCategory_select : '',

      // detailCategoryMode : 'input', 
      detailCategoryMode : '', 
      detailCategory_input: '',
      detailCategory_select : '',

     // 直接使用 reactive 创建响应式的数组
     subSubCategories_yuan: reactive([]),
     subSubCategories_add : reactive([]),
    });
const topLevelCategories = ref([]);
function handleMajorCategoryChange(majorCategory_select) {
  secondLevelCategories.value = extractSecondLevelCategories(topLevelCategories.value, majorCategory_select);
  resetMinorAndDetailCategories();
};
function handleMinorCategoryChange(minorCategory_select) {
  thirdLevelCategories.value = extractThirdLevelCategories(secondLevelCategories.value, minorCategory_select);
  resetDetailCategory();
};
// 处理方法
const toggleMajorCategoryMode = (mode) => {
  if (mode === 'select') {
   update_form.majorCategoryMode = 'select';
   update_form.majorCategory_input = '';
   update_form.majorCategory_select = '';
   topLevelCategories.value = extractTopLevelCategories(JSON.parse(JSON.stringify(NoTreeData.value))); // 使用深拷贝
  // topLevelCategories.value = extractTopLevelCategories(NoTreeData.value);
 
  }
  if (mode === 'input') {
   update_form.majorCategoryMode = 'input';
   update_form.majorCategory_input = '';
   update_form.majorCategory_select = '';
   topLevelCategories.value ='';
  }
//   updateIsSingleScore();
};
const extractTopLevelCategories = (menuList) => {
  // console.log(menuList);
      const topLevelCategories = [];
      menuList.forEach((item) => {
        // console.log(item.value);
        if (!item.parentId || item.parentId === null || item.parentId === ''|| item.parentId === '-') {
          // 如果当前项没有parentId，或者parentId为空或null，那么它是最外层的元素
          // topLevelCategories.push(item.majorCategory);
          topLevelCategories.push(item);
          // topLevelCategories.value.push(item.majorCategory);
        } 
      });
      // console.log(topLevelCategories);
      return topLevelCategories; // 返回过滤出来的大类元素名
    };

// 这些是小类的字段方法
// const minorCategoryMode = ref('input'); // 默认为手动输入=
// const minorCategory_input = ref('');
// const minorCategory_select = ref('');
const secondLevelCategories = ref([]);
const toggleMinorCategoryMode = (mode) => {

  if (mode === 'select') {
   update_form.minorCategoryMode = 'select';
   update_form.minorCategory_input = '';
   update_form.minorCategory_select = '';
    if (update_form.majorCategoryMode === 'select' && update_form.majorCategory_select !== '') {
          secondLevelCategories.value = extractSecondLevelCategories(topLevelCategories.value, update_form.majorCategory_select);
        }
  }
  if (mode === 'input') {
   update_form.minorCategoryMode = 'input';
   update_form.minorCategory_input = '';
   update_form.minorCategory_select = '';
   secondLevelCategories.value = [];
  }
//   else {
//     form.value.isSingleScore = null; // 否则设为未选择状态
//   }
//   updateIsSingleScore();
};

const extractSecondLevelCategories = (topLevelCategories, majorCategoryId) => {
      const secondLevelCategories = [];
      
      const majorCategory = topLevelCategories.find(item => item.menuId === majorCategoryId);
   
      if (majorCategory && majorCategory.children) {
        majorCategory.children.forEach((item) => {
          // secondLevelCategories.value.push(item.minorCategory);
          // secondLevelCategories.value.push(item);
          secondLevelCategories.push(item);
        });
        return secondLevelCategories;
      }
      return [];
    };
   
// // 这些是细分类的字段方法
// const detailCategoryMode = ref('input'); 
// const detailCategory_input = ref('');
// const detailCategory_select = ref('');

const thirdLevelCategories = ref([]);
 // 切换细分类模式
 // 这个就是为了让细分子类跟着细分类走，就是无细分子类
 
// 当选择了细分类时，控制无细分子类选项的状态

const toggleDetailCategoryMode = (mode) => { // 改名为 toggleDetailCategoryMode
      
      if (mode === 'select') {
        update_form.detailCategoryMode = 'select';
        update_form.detailCategory_input = '';
        update_form.detailCategory_select = '';
        if (update_form.majorCategoryMode === 'select' && update_form.minorCategoryMode=== 'select') {
          thirdLevelCategories.value = extractThirdLevelCategories(secondLevelCategories.value, update_form.minorCategory_select);
        }
      }
      if (mode === 'input') {
         update_form.detailCategoryMode = 'input';
         update_form.detailCategory_input= '';
         update_form.detailCategory_select = '';
         thirdLevelCategories.value =[];
      }
      if (mode === 'none') {
         update_form.detailCategoryMode = 'none';
         thirdLevelCategories.value =[];
      }
    };

const extractThirdLevelCategories = (secondLevelCategories, minorCategoryId) => { // 改名为 extractThirdLevelCategories
const thirdLevelCategories = [];
const minorCategory = secondLevelCategories.find(item => item.menuId === minorCategoryId);
if (minorCategory && minorCategory.children) {
  minorCategory.children.forEach((item) => {
      if (item.subCategory && item.subCategory.trim() !== '') {
      // thirdLevelCategories.value.push(item.subCategory);
      thirdLevelCategories.push(item);
      }
   });
   return thirdLevelCategories;
}
return [];
};
// const toggleSubSubCategoryNone = (value) => {
//       subSubCategory.subSubCategory = value === 'none' ? 'none' : '';
//     };
const toggleDetailCategoryNone = () => {
   update_form.detailCategoryMode =  update_form.detailCategoryMode === 'none' ? 'none':'';
      // toggleSubSubCategoryNone( update_form.detailCategoryMode);
    };
// const subSubCategories_yuan = ref([]);
 // 新增一个响应式变量来保存加载的子子类别
 // 计算属性，用于判断是否满足条件
 const isReadyToLoadSubSubCategories = computed(() => {
      return (
        update_form.majorCategoryMode === 'select' &&
        update_form.minorCategoryMode === 'select' &&
        update_form.detailCategoryMode === 'select' &&
        update_form.majorCategory_select !== '' &&
        update_form.minorCategory_select !== '' &&
        update_form.detailCategory_select !== ''
      );
    });
// 这些是细分子类的字段方法

const subSubCategoriesLoaded = reactive([]);
 // 计算属性：判断stage是否原来就存在，现在新加的stage显示删除按钮
const Yuanbunenggai = computed({
      get: () => {
        return (stageMenuId) => {
          // 检查是否存在相同的 menuId
          return subSubCategoriesLoaded.value.some(subSubCategory => {
          // return update_form.subSubCategories_yuan.some(subSubCategory => {
            // 查找 subSubCategory 的 children 中是否存在相同的 menuId
            return subSubCategory.children.some(child => child.menuId === stageMenuId);
          });
        };
      },
    });
// 方法：加载子子类别
const loadSubSubCategories = () => {
      // 模拟异步加载数据
      if (thirdLevelCategories.value.length > 0) {
        // 遍历 thirdLevelCategories
        thirdLevelCategories.value.forEach(thirdLevelCategory => {
          // 检查 thirdLevelCategory 的 menuId 是否与 detailCategory_select 相等
          if (thirdLevelCategory.menuId === update_form.detailCategory_select) {
            // 获取该元素的 children 属性
            const children = thirdLevelCategory.children;
            // 遍历 children 属性下的元素
            children.forEach(item => {
              // 将每个元素转换为响应式的对象，并添加到 subSubCategories_yuan 中           
              const reactiveItem = reactive(item);
              // 深拷贝
              const clonedReactiveItem = JSON.parse(JSON.stringify(reactiveItem));
              // 推入数组
              subSubCategoriesLoaded.value.push(clonedReactiveItem);
              update_form.subSubCategories_yuan.push(reactiveItem);
            });
          }
        });
      }
    };
// 监听 isReadyToLoadSubSubCategories 的变化
watch(isReadyToLoadSubSubCategories, (newValue) => {
      if (newValue) {
        loadSubSubCategories();
      }
    });
// 生成基于时间戳的随机数
const generateRandomBasedOnTimestamp = () => {
  // 获取当前时间戳
  const timestamp = Date.now();

  // 添加额外的随机因子
  const randomFactor = Math.floor(Math.random() * 1000); // 生成0到999之间的随机数

  // 结合时间戳和随机因子生成随机数
  const randomNumber = timestamp + randomFactor;

  return randomNumber;
};
// function addSubSubCategory () {
//   console.log(1); // 打印数字 1
//   update_form.subSubCategories_add.push(
//       reactive({
//          subSubCategory: '',
//          menuId:generateRandomBasedOnTimestamp(),
//          isSingleScore: true,
//          subSubCategoryMode:'',
//          subSubCategory_input:'',
//         //  subSubCategoryMode:'',
//         //  subSubCategory_input:'',
//          children: [
//          reactive({
//             menuId: generateRandomBasedOnTimestamp(),
//             stageName: '',
//             stagePoints: null,
//             applicationInstructions:'',
//             isTimeSensitive:'',
//             timeLimit:'',
//          }),
//          ],
//       })
//    );
//    };
function addSubSubCategory() {
  console.log(1); // 打印数字 1
  // update_form.detailCategory_select
  let subSubCategoryMode_add = '';
  if (update_form.detailCategoryMode === 'none') {
    subSubCategoryMode_add = 'none';
  }
  // let subSubCategoryMode_add = '';
if (update_form.detailCategoryMode === 'none') {
  subSubCategoryMode_add = 'none';
} else if (update_form.detailCategoryMode === 'select') {
  // 递归函数来遍历 a_data 和它的 children
  function findItemById(data, menuId) {
    for (const item of data) {
      if (item.menuId === menuId) {
        return item;
      }
      if (item.children && item.children.length > 0) {
        const foundItem = findItemById(item.children, menuId);
        if (foundItem) {
          return foundItem;
        }
      }
    }
    return null;
  }

  // 调用递归函数来查找对应的 item
  const foundItem = findItemById(a_data.value, update_form.detailCategory_select);

  // 如果找到了对应的 detailCategoryMode 并且它是 'none'
  if (foundItem && foundItem.detailCategoryMode === 'none') {
    subSubCategoryMode_add = 'none';
  } 
}
  // console.log(subSubCategoryMode_add);
  update_form.subSubCategories_add.push(
    reactive({
      subSubCategory: '',
      menuId: generateRandomBasedOnTimestamp(),
      isSingleScore: true,
      subSubCategoryMode: subSubCategoryMode_add, // 设置 subSubCategoryMode 的值
      subSubCategory_input: '',
      children: [
        reactive({
          menuId: generateRandomBasedOnTimestamp(),
          stageName: '',
          stagePoints: null,
          applicationInstructions: '',
          isTimeSensitive: '',
          timeLimit: '',
        }),
      ],
    })
  );
}
const toggleSingleScore_yuan = (subSubCategory) => {
  if (subSubCategory.isSingleScore) {
    // 显示确认框
    ElMessageBox.confirm(`该细分子类设置为了单一得分，是否将其改为多选得分？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      // 用户确认更改
      addNewStage_yuan(subSubCategory);
    }).catch(() => {
      // 用户取消更改
      console.log('用户取消了更改');
    });
  } else {
    // 直接执行添加阶段方法
    addNewStage_yuan(subSubCategory);
  }
};

const addNewStage_yuan = (subSubCategory) => {
  const subSubCategoryFound = update_form.subSubCategories_yuan.find(item => item.menuId === subSubCategory.menuId);
  if (subSubCategoryFound) {
    subSubCategoryFound.isSingleScore = false;
    subSubCategoryFound.children.push(
      reactive({
        menuId: generateRandomBasedOnTimestamp(),
        stageName: '',
        stagePoints: null,
        applicationInstructions: '',
        isTimeSensitive: '',
        timeLimit: '',
      })
    );
  }
};
//    这里要改进下，判断其是否单一得分，如果单一得分要进行修改
// const addNewStage_yuan = (subSubCategory) => {
//   const subSubCategory = update_form.subSubCategories_yuan.find(item => item.menuId === subSubCategory.menuId);
//   if (subSubCategory) {
//     subSubCategory.children.push(
//       reactive({
//         menuId: generateRandomBasedOnTimestamp(),
//         stageName: '',
//         stagePoints: 0,
//         applicationInstructions:'',
//         isTimeSensitive:'',
//         timeLimit:'',
//       })
//     );
//   }
// };

// 动态选择调用哪个方法
const addSubSubCategoryBasedOnMode = () => {
      // if (detailCategoryMode.value === 'none') {
      //   addSubSubCategory_wuxianfenzilei();
      // } else {
        addSubSubCategory();
      // }
    };
// 定义时效时间的选项
const timeLimitOptions = ref([
  { label: '一个月', value: '一个月' },
  { label: '两个月', value: '两个月' },
  { label: '三个月', value: '三个月' },
]);
const timeSensitiveOptions = ref([
      { label: '非时效性', value: '1' },
      { label: '需时效性', value: '0' }
    ]);
// 这些是阶段的字段方法
// 删除阶段
const removeStage_yuan = (subSubCategorystageMenuId,subSubCategoryMenuId) => {
  // const subSubCategory = update_form.subSubCategories_yuan.find(item => item.some(stage => stage.menuId === subSubCategoryMenuId));
  const subSubCategory = update_form.subSubCategories_yuan.find(item => 
    item.menuId === subSubCategoryMenuId
);

  if (subSubCategory) {
    // 检查是否只剩下一个阶段
    if (subSubCategory.children&&subSubCategory.children.length > 1) {
      const index = subSubCategory.children.findIndex(stage => stage.menuId === subSubCategorystageMenuId);
      if (index !== -1) {
        subSubCategory.children.splice(index, 1);
      }
    } else {
      // 如果只剩下一个阶段，则不进行删除操作
      proxy.$modal.msgError("一个细分子类至少保留一个阶段,请直接删除该细分子类");
    }
  }
};
const removeSubSubCategory = (menuId) => {
   const index = update_form.subSubCategories_add.findIndex(item => item.menuId === menuId);
   if (index !== -1) {
    update_form.subSubCategories_add.splice(index, 1);
   }
};
// 假设 subSubCategory 是一个响应式的细分子类对象
const toggleSingleScore_add = (subSubCategory) => {
  if (subSubCategory.isSingleScore) {
    // 显示确认框
    ElMessageBox.confirm(`该细分子类设置为了单一得分，是否将其改为多选得分？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      // 用户确认更改
      //await addNewStage_add(subSubCategory.menuId);
      addNewStage_add(subSubCategory.menuId);}
    ).catch(error => {
        // 处理错误的逻辑
        console.error('请求失败:', error);
    });
  } else {
    // 直接执行添加阶段方法
    addNewStage_add(subSubCategory.menuId);
  }
};
const addNewStage_add = (menuId) => {
   const subSubCategory = update_form.subSubCategories_add.find(item => item.menuId === menuId);
   if (subSubCategory) {
       subSubCategory.value.isSingleScore = false;
      subSubCategory.value.children.push(
         reactive({
         menuId: generateRandomBasedOnTimestamp(),
         stageName: '最终阶段',
         stagePoints: null,
         applicationInstructions: '', // 新增属性
         isTimeSensitive: '1',       // 新增属性，默认为非时效性
         })
      );
   }
};
const removeStage_add = (menuId) => {
  const index = update_form.subSubCategories_add.children.findIndex(item => item.children.some(stage => stage.menuId === menuId));

  // if (subSubCategory) {
  //   // 检查是否只剩下一个阶段
  //   if (subSubCategory.children.length > 1) {
  //     const index = subSubCategory.children.findIndex(stage => stage.menuId === menuId);
      if (index !== -1) {
        update_form.subSubCategories_add.children.splice(index, 1);
      }
    // } else {
    //   // 如果只剩下一个阶段，则不进行删除操作
    //   proxy.$modal.msgError("一个细分子类至少保留一个阶段");
    // }
  // }
};
const validateAllInputs = () => {
      let hasEmpty = false; // 用于跟踪是否有空输入框

      // // 检查主分类
      // if (majorCategoryMode.value === 'input' && !majorCategory_input.value.trim()) {
      //   hasEmpty = true;
      // }

      // // 检查次分类
      // if (minorCategoryMode.value === 'input' && !minorCategory_input.value.trim()) {
      //   hasEmpty = true;
      // }
      // // 检查细分类
      // if (detailCategoryMode.value === 'input' && !detailCategory_input.value.trim()) {
      //         hasEmpty = true;
      // }
      // 检查主分类
        if (update_form.majorCategoryMode === 'input') {
        if (!update_form.majorCategory_input.trim()) {
            hasEmpty = true;
            return hasEmpty;
          } 
        } else if (update_form.majorCategoryMode === 'select') {
          if (!update_form.majorCategory_select.trim()) {
            hasEmpty = true;
            return hasEmpty;
        } 
        }

        // 检查次分类
        if (update_form.minorCategoryMode === 'input') {
          if (!update_form.minorCategory_input.trim()) {
            hasEmpty = true;
            return hasEmpty;
          } 
        } else if (update_form.minorCategoryMode === 'select') {
          if (!update_form.minorCategory_select.trim()) {
            hasEmpty = true;
            return hasEmpty;
          } 
        }

      // 检查细分类
      if (update_form.detailCategoryMode === 'input') {
          if (!update_form.detailCategory_input.trim()) {
            hasEmpty = true;
            return hasEmpty;
          } 
        } else if (update_form.detailCategoryMode === 'select') {
          if (!update_form.detailCategory_select.trim()) {
            hasEmpty = true;
            return hasEmpty;
          } 
        }else if (update_form.detailCategory_select.trim() !== 'input' && update_form.detailCategory_select.trim() !== 'select' && update_form.detailCategory_select.trim() !== 'none') {
            hasEmpty = true;
            return hasEmpty;
        }
      // 遍历原始子子分类
      update_form.subSubCategories_yuan.forEach(subSubCategory => {
        //因为细分子类没有select选项
        if (subSubCategory.subSubCategoryMode !== 'none' && !subSubCategory.subSubCategory_input.trim()) {
        hasEmpty = true;
        return hasEmpty; // 如果发现空输入框，且模式不是'none'，直接退出循环
    }
        subSubCategory.children.forEach(subSubCategorystage => {
            if (!subSubCategorystage.stageName.trim() || !subSubCategorystage.stagePoints.trim()|| !subSubCategorystage.applicationInstructions.trim() || subSubCategorystage.isTimeSensitive === '') {
              hasEmpty = true;
              return hasEmpty; // 如果发现空输入框，直接退出循环
            }
            // 如果 isTimeSensitive 为 "0"，则需要检查 timeLimit 是否为空字符串
            if (subSubCategorystage.isTimeSensitive === '0' && !subSubCategorystage.timeLimit.trim()) {
              hasEmpty = true;
              return hasEmpty;// 如果 timeLimit 为空字符串，直接退出循环
            }
          });
        // if (subSubCategory.subSubCategory !== 'none') { // 只检查非 "无细分子类" 的情况
        //   // 检查阶段
        //   subSubCategory.children.forEach(subSubCategorystage => {
        //     if (!subSubCategorystage.stageName.trim() || !subSubCategorystage.stagePoints.trim()|| !subSubCategorystage.applicationInstructions.trim() || subSubCategorystage.isTimeSensitive === '') {
        //       hasEmpty = true;
        //       return; // 如果发现空输入框，直接退出循环
        //     }
        //     // 如果 isTimeSensitive 为 "0"，则需要检查 timeLimit 是否为空字符串
        //     if (subSubCategorystage.isTimeSensitive === '0' && !subSubCategorystage.timeLimit.trim()) {
        //       hasEmpty = true;
        //       return;// 如果 timeLimit 为空字符串，直接退出循环
        //     }
        //   });
        // }
      });

      // 遍历新增的子子分类
      update_form.subSubCategories_add.value.forEach(subSubCategory => {
        if (subSubCategory.subSubCategoryMode !== 'none' && !subSubCategory.subSubCategory_input.trim()) {
        hasEmpty = true;
        return hasEmpty; // 如果发现空输入框，且模式不是'none'，直接退出循环
    }
        subSubCategory.children.forEach(subSubCategorystage => {
            if (!subSubCategorystage.stageName.trim() || !subSubCategorystage.stagePoints.trim()|| !subSubCategorystage.applicationInstructions.trim() || subSubCategorystage.isTimeSensitive === '') {
              hasEmpty = true;
              return hasEmpty; // 如果发现空输入框，直接退出循环
            }
            // 如果 isTimeSensitive 为 "0"，则需要检查 timeLimit 是否为空字符串
        if (subSubCategorystage.isTimeSensitive === '0' && !subSubCategorystage.timeLimit.trim()) {
              hasEmpty = true;
              return hasEmpty;// 如果 timeLimit 为空字符串，直接退出循环
            }
          });
        
        // if (subSubCategory.subSubCategory !== 'none') { // 只检查非 "无细分子类" 的情况
        //   // 检查阶段
        //   subSubCategory.children.forEach(subSubCategorystage => {
        //     if (!subSubCategorystage.stageName.trim() || !subSubCategorystage.stagePoints.trim()|| !subSubCategorystage.applicationInstructions.trim() || subSubCategorystage.isTimeSensitive === '') {
        //       hasEmpty = true;
        //       return; // 如果发现空输入框，直接退出循环
        //     }
        //   });
        // }
      });

      return hasEmpty;
    };

// 提交表单的方法
const add_submitForm = () => {
  const hasEmpty = validateAllInputs();

  if (hasEmpty) {
    proxy.$modal.msgError("有项未填或者未选");
    // useModal().msgError("有填空项未填");
  } else {
    updateConfig(update_form).then(() => {
      proxy.$modal.msgSuccess("修改成功");
      // useModal().msgSuccess("修改成功");
      all_add_open.value = false;
      // 假设 getList() 是一个获取列表数据的方法
      resetAddForm(); // 关闭模态框后重置表单resetAddForm
      getList();
    });
  }
};
// 处理大类的变化
const resetMinorAndDetailCategories = () => {
  update_form.minorCategory_select = ''; // 设置为空字符串表示未选择
  update_form.detailCategory_select = ''; // 设置为空字符串表示未选择

  // 清空细分子类数组
  update_form.subSubCategories_yuan.splice(0, update_form.subSubCategories_yuan.length);
  update_form.subSubCategories_add.splice(0, update_form.subSubCategories_add.length);
};

// 处理小类的变化
const resetDetailCategory = () => {
  update_form.detailCategory_select = ''; // 设置为空字符串表示未选择

  // 清空细分子类数组
  update_form.subSubCategories_yuan.splice(0, update_form.subSubCategories_yuan.length);
  update_form.subSubCategories_add.splice(0, update_form.subSubCategories_add.length);
};

// 处理细分类的变化
const resetSubSubCategory = () => {
  // 清空细分子类数组
  update_form.subSubCategories_yuan.splice(0, update_form.subSubCategories_yuan.length);
  update_form.subSubCategories_add.splice(0, update_form.subSubCategories_add.length);
};
// 重置表单
const resetAddForm = () => {
  // update_form.majorCategoryMode = 'input';
  console.log('resetAddForm');
  update_form.majorCategoryMode = '';
  update_form.majorCategory_select = '';
  update_form.majorCategory_input = '';
  // update_form.minorCategoryMode = 'input';
  update_form.minorCategoryMode = '';
  update_form.minorCategory_input = '';
  update_form.minorCategory_select = '';
  // update_form.detailCategoryMode = 'input';
  update_form.detailCategoryMode = '';
  update_form.detailCategory_input = '';
  update_form.detailCategory_select = '';
  // update_form.subSubCategories_yuan = reactive([]);
  // update_form.subSubCategories_add = reactive([]);
  // // isTopLevelParentHasChildren.value= false;  // 顶级父节点是否有子节点
  // // isSecondLevelParentHasChildren.value= false;  // 第二级父节点是否有子节点
  // // isThirdLevelParentHasChildren.value= false;  // 第三级父节点是否有子节点
  // thirdLevelCategories.value= reactive([]);
  // secondLevelCategories.value= reactive([]);
  // topLevelCategories.value= reactive([]);
  // subSubCategoriesLoaded.value= reactive([]);
  update_form.subSubCategories_yuan = [];
  update_form.subSubCategories_add = [];
  // isTopLevelParentHasChildren.value= false;  // 顶级父节点是否有子节点
  // isSecondLevelParentHasChildren.value= false;  // 第二级父节点是否有子节点
  // isThirdLevelParentHasChildren.value= false;  // 第三级父节点是否有子节点
  thirdLevelCategories.value= [];
  secondLevelCategories.value= [];
  topLevelCategories.value= [];
  subSubCategoriesLoaded.value= [];
  proxy.resetForm("AddMenuRef");
  console.log('update_form');
};
function handleAdd() {
  resetAddForm();
  getList();
  // if (row != null && row.menuId) {
  //   form.value.parentId = row.menuId;
  // } else {
  //   form.value.parentId = 0;
  // }
  // if (row.hasChildren) {
  //     const level = calculateRowLevel(row);
  //     switch (level) {
  //        case 0:
  //        isTopLevelParentHasChildren.value = true;
  //        break;
  //        case 1:
  //        isSecondLevelParentHasChildren.value = true;
  //        break;
  //        case 2:
  //        isThirdLevelParentHasChildren.value = true;
  //        break;
  //     }
  //  } else {
  //     isNoChildren.value = false;
  //  }
  resetAddForm();
  all_add_open.value = true;
  title.value = "新增菜单";
  
}






// const title = ref('修改菜单');
// 修改表单
const singleEdit_form = reactive({
      menuId: '',
      parentId: '',
      majorCategory: '',
      minorCategory: '',
      subCategory: '',
      subSubCategory: '',
      isSingleScore: false,
      stageName: '',
      stagePoints: null,
      materialName: '',
      materialRequirements: '',
      applicationInstructions: '',
      isTimeSensitive: '1', // 新增属性：是否具有时效性
      // isTimeSensitive:'',
      timeLimit:'',
      createTime: '',
      children: reactive([]), // 子节点数组
      hasChildren: false, // 是否有子节点
      isMajorCategory: false, // 是否是大类
      isMinorCategory: false, // 是否是小类
      isSubCategory: false, // 是否是细分类
      isSubSubCategory: false, // 是否是细分子类
      isStage: false, // 是否是阶段
      majorCategory_input: '',
      minorCategory_input: '',
      subCategory_input: '',
      subSubCategory_input: '',
      stageName_input: '',
      stagePoints_input: '',
      applicationInstructions_input:'',
      // isTimeSensitive: '1', // 新增属性：是否具有时效性
      isTimeSensitive_select:'',
      timeLimit_select:'',
    });
  const resetSingleEditForm = () => {
      // 重置表单的逻辑
      singleEdit_form.menuId = '';
      singleEdit_form.parentId = '';
      singleEdit_form.majorCategory = '';
      singleEdit_form.minorCategory = '';
      singleEdit_form.subCategory = '';
      singleEdit_form.subSubCategory = '';
      singleEdit_form.isSingleScore = false;
      singleEdit_form.stageName = '';
      singleEdit_form.stagePoints = null;
      singleEdit_form.materialName = '';
      singleEdit_form.materialRequirements = '';
      singleEdit_form.applicationInstructions = '';
      singleEdit_form.createTime = '';
      singleEdit_form.children = reactive([]); // 清空子节点数组
      singleEdit_form.hasChildren = false; // 设置是否有子节点为 false
      singleEdit_form.isMajorCategory = false; // 是否是大类
      singleEdit_form.isMinorCategory = false; // 是否是小类
      singleEdit_form.isSubCategory = false; // 是否是细分类
      singleEdit_form.isSubSubCategory = false; // 是否是细分子类
      singleEdit_form.isStage = false; // 是否是阶段
      singleEdit_form.majorCategory_input = '';
      singleEdit_form.minorCategory_input = '';
      singleEdit_form.subCategory_input = '';
      singleEdit_form.subSubCategory_input = '';
      singleEdit_form.stageName_input = '';
      singleEdit_form.stagePoints_input = '';
      singleEdit_form.isTimeSensitive= "1";// 新增属性：是否具有时效性
      singleEdit_form.isTimeSensitive_select='';
      singleEdit_form.timeLimit_select='';
      proxy.resetForm("singleEditRef");
    };
const singleEditrules = reactive({
      majorCategory_input: [
        { required: true, message: '请输入大类名称', trigger: 'blur' }
      ],
      minorCategory_input: [
        { required: true, message: '请输入小类名称', trigger: 'blur' }
      ],
      subCategory_input: [
        { required: true, message: '请输入细分类名称', trigger: 'blur' }
      ],
      subSubCategory_input: [
        { required: true, message: '请输入细分子类名称', trigger: 'blur' }
      ],
      stageName_input: [
        { required: true, message: '请输入阶段名称', trigger: 'blur' }
      ],
      stagePoints_input: [
        { required: true, message: '请输入阶段分值', trigger: 'blur' }
      ],
      applicationInstructions_input: [
       { required: true, message: '请输入申请说明', trigger: 'blur' }
      ],
      isTimeSensitive_select: [
        { required: true, message: '请选择是否需要时效性', trigger: 'change' }
      ],
      timeLimit_select: [
        { required: true, message: '请选择时效时间', trigger: 'change' }
      ]
    });
const copyRowToForm = (row) => {
      // 复制 row 的属性到 singleEdit_form
      for (let key in row) {
        if (singleEdit_form.hasOwnProperty(key)) {
          singleEdit_form[key] = row[key];
        }
      }
      
      // 根据 row 的属性来设置类别标志
      singleEdit_form.isMajorCategory = row.isMajorCategory || false;
      singleEdit_form.isMinorCategory = row.isMinorCategory || false;
      singleEdit_form.isSubCategory = row.isSubCategory || false;
      singleEdit_form.isSubSubCategory = row.isSubSubCategory || false;
      singleEdit_form.isStage = row.isStage || false;

      // 如果 row 中没有 children 属性，或者 children 是空数组，则设置 hasChildren 为 false
      singleEdit_form.hasChildren = Array.isArray(row.children) && row.children.length > 0;
    };

const setTitleAndOpenDialog = () => {
      // 设置标题
      title.value = '修改菜单';

      // 打开对话框
      singleEditOpen.value = true;
    };

const singleEdit_submitForm = () => {
  // 提交按钮
  proxy.$refs['singleEdit_ref'].validate(valid => {
    if (valid) {
      // if (singleEdit_form.menuId !== '') {
        updatesingleEditMenu(singleEdit_form).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          singleEditOpen.value = false;
          getList();
          resetSingleEditForm();
        // });
      // } else {
      //   addMenu(singleEdit_form).then(response => {
      //     proxy.$modal.msgSuccess("新增成功");
      //     singleEditOpen.value = false;
      //     getList();
        });
      // }
    }
  });
};
const handleUpdate_config = (row) => {
      resetSingleEditForm();
      copyRowToForm(row);
      setTitleAndOpenDialog();
    };


const deleteMessage = ref('');

const handleDelete = (row) => {
if (singleEdit_form.isMajorCategory) {
  deleteTitle.value = '删除主类';
  deleteMessage.value = `是否确认删除主类名称为"${row.majorCategory}"的数据项?`;
} else if (singleEdit_form.isMinorCategory) {
  deleteTitle.value = '删除小类';
  deleteMessage.value = `是否确认删除小类名称为"${row.minorCategory}"的数据项?`;
} else if (singleEdit_form.isSubCategory) {
  deleteTitle.value = '删除细分类';
  deleteMessage.value = `是否确认删除细分类名称为"${row.subCategory}"的数据项?`;
} else if (singleEdit_form.isSubSubCategory) {
  deleteTitle.value = '删除细分子类';
  deleteMessage.value = `是否确认删除细分子类名称为"${row.subSubCategory}"的数据项?`;
} else if (singleEdit_form.isStage) {
  deleteStage();
} else {
  // 默认情况
  deleteTitle.value = '删除数据';
  deleteMessage.value = `是否确认删除数据项?`;
}

deleteOpen.value = true;
};

const confirmDelete = () => {
      if (singleEdit_form.isMajorCategory) {
        deleteMajorCategory();
      } else if (singleEdit_form.isMinorCategory) {
        deleteMinorCategory();
      } else if (singleEdit_form.isSubCategory) {
        deleteSubCategory();
      } else if (singleEdit_form.isSubSubCategory) {
        deleteSubSubCategory();
      } else if (singleEdit_form.isStage) {
        deleteStage();
      }
      deleteOpen.value = false;
      resetSingleEditForm();
    };

const deleteMajorCategory = () => {
      delConfig(singleEdit_form.menuId).then(() => {
        deleteOpen.value = false;
        getList();
        proxy.$modal.msgSuccess("主类删除成功");
      });
    };

const deleteMinorCategory = () => {
      delConfig(singleEdit_form.menuId).then(() => {
        deleteOpen.value = false;
        getList();
        proxy.$modal.msgSuccess("小类删除成功");
      });
    };

const deleteSubCategory = () => {
      delConfig(singleEdit_form.menuId).then(() => {
        deleteOpen.value = false;
        getList();
        proxy.$modal.msgSuccess("细分类删除成功");
      });
    };

const deleteSubSubCategory = () => {
      delConfig(singleEdit_form.menuId).then(() => {
        deleteOpen.value = false;
        getList();
        proxy.$modal.msgSuccess("细分子类删除成功");
      });
    };
const deleteStage = () => {
      const parentID = singleEdit_form.parentId;
      const parentNode = NoTreeData.value.find(node => node.menuId === parentID);

      if (!parentNode) {
        // 如果找不到父节点，直接显示默认的删除确认信息
        deleteTitle.value = '删除阶段';
        deleteMessage.value = `是否确认删除阶段名称为"${singleEdit_form.stageName}"的数据项?`;
      } else {
        const otherStages = parentNode.children.filter(child => child.menuId !== singleEdit_form.menuId && child.isStage);

        if (otherStages.length === 0) {
          // 显示特殊确认消息
          deleteTitle.value = '删除阶段';
          deleteMessage.value = `该阶段数据是当前细分子类最后一条数据，是否确认删除？`;
        } else {
          // 直接删除
          delConfig(singleEdit_form.menuId).then(() => {
            deleteOpen.value = false;
            getList();
            proxy.$modal.msgSuccess("阶段删除成功");
          });
          // return;
        }
      }

     
  };
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
  url: import.meta.env.VITE_APP_BASE_API + "/system/config/importConfigData"
});
/** 导出按钮操作 */
function handleExport() {
  proxy.download("SH_config/export", {
    ...NoTreeData.value,
  }, `SH_config${new Date().getTime()}.xlsx`);
}
// 任务状态修改
// function handleRadioChange_subSubadd(menuId) {
//       this.subSubCategories_add.some(category => {
//         if (category.menuId === menuId) {
//           category.subSubCategory_input = ''; // 当radio状态改变时清空input值
//           return true; // 找到后停止循环
//         }
//         return false;
//       });
//     }
// function handleRadio_subSubyuanChange(menuId) {
//       subSubCategories_yuan.value.some(category => {
//         if (category.menuId === menuId) {
//           category.value.subSubCategory_input = ''; // 当radio状态改变时清空input值
//           return true; // 找到后停止循环
//         }
//         return false;
//       });
//     }

function handleisTimeSensitiveChange(row) {
  if (row.stageName || row.stagePoints) {
        // 如果 stageName 或 stagePoints 为空，则阻止更改并恢复原来的值
        row.isTimeSensitive = !row.isTimeSensitive;
        proxy.$modal.msgError("只有阶段数据才能设置" + "有效性");
       
      }else{
      let text = row.isTimeSensitive === "0" ? "要" : "不要";
        proxy.$modal.confirm('确认"' + text + '""' + '"有效吗?').then(function () {
          return changeJobisTimeSensitive(row.menuId, row.isTimeSensitive);
        }).then(() => {
          proxy.$modal.msgSuccess("添加有效性" + "成功");
        }).catch(function () {
          row.status = row.status === "0" ? "1" : "0";
        });
      }
}

/** 导入按钮操作 */
function handleConfigImport() {
  upload.title = "用户导入";
  upload.open = true;
};
// 删除表单
function formatStagePointsFormatter(row, column, cellValue, index) {
    return cellValue !== undefined && cellValue !== null ? cellValue : '';
  };
function submitFileForm() {
  proxy.$refs["uploadRef"].submit();
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









 // 验证所有细分子类和阶段输入框是否都已填写
//  const validateAllInputs = () => {
//   let hasEmpty = false; // 用于跟踪是否有空输入框

//   // 检查主分类
//   if (update_form.majorCategoryMode === 'input' && !update_form.majorCategory_input.trim()) {
//     hasEmpty = true;
//   }

//   // 检查次分类
//   if (update_form.minorCategoryMode === 'input' && !update_form.minorCategory_input.trim()) {
//     hasEmpty = true;
//   }

//   // 检查细分类
//   if (update_form.detailCategoryMode === 'input' && !update_form.detailCategory_input.trim()) {
//     hasEmpty = true;
//   }

//   // 遍历原始子子分类
//   update_form.subSubCategories_yuan.forEach(subSubCategory => {
//     if (subSubCategory.subSubCategory !== 'none') { // 只检查非 "无细分子类" 的情况
//       if (!subSubCategory.subSubCategory.trim()) { // 检查细分子类名称是否为空
//         hasEmpty = true;
//         return; // 如果发现空输入框，直接退出循环
//       }

//       // 遍历阶段
//       subSubCategory.children.forEach(subSubCategorystage => {
//         if (!subSubCategorystage.stageName.trim() || !subSubCategorystage.stagePoints.trim()) {
//           hasEmpty = true;
//           return; // 如果发现空输入框，直接退出循环
//         }
//       });
//     }
//   });

//   // 遍历新增的子子分类
//   update_form.subSubCategories_add.forEach(subSubCategory => {
//     if (subSubCategory.subSubCategory !== 'none') { // 只检查非 "无细分子类" 的情况
//       if (!subSubCategory.subSubCategory.trim()) { // 检查细分子类名称是否为空
//         hasEmpty = true;
//         return; // 如果发现空输入框，直接退出循环
//       }

//       // 遍历阶段
//       subSubCategory.children.forEach(subSubCategorystage => {
//         if (!subSubCategorystage.stageName.trim() || !subSubCategorystage.stagePoints.trim()) {
//           hasEmpty = true;
//           return; // 如果发现空输入框，直接退出循环
//         }
//       });
//     }
//   });

//   return hasEmpty;
// };








//修改按钮的字段

// 这些是大类的字段方法
// const majorCategoryMode = ref('input'); // 默认为手动输入
// const majorCategory_input = ref('');
// const majorCategory_select = ref('');

const isSingleScore = ref(null);
// 这些是细分类的字段方法
// 控制细分子类和阶段字段和方法


const showFullTable = ref(true);
//给出一个方法，只有当大类，子类，细分类都是选择框，并且都选择了数据的时候，这里对此做一个判断，只有都满足条件的情况下，然后会去


// const addSubSubCategory = () => {
//   update_form.subSubCategories_add.push(
//       reactive({
//          subSubCategory: '',
//          menuId:'',
//          isSingleScore: true,
//          children: [
//          reactive({
//             menuId: generateRandomBasedOnTimestamp(),
//             stageName: '最终阶段',
//             stagePoints: 0,
//          }),
//          ],
//       })
//    );
//    };






// // 添加新的子分类但是默认选中无细分子类
// const addSubSubCategory_wuxianfenzilei = () => {
//   update_form.subSubCategories_add.push(
//         reactive({
//           subSubCategory: 'none', // 设置为 'none' 表示默认选中无细分子类
//           menuId: generateRandomBasedOnTimestamp(), // 使用 uuid 作为 menuId
//           children: [
//             reactive({
//               menuId: generateRandomBasedOnTimestamp(),
//               stageName: '最终阶段',
//               stagePoints: null,
//               applicationInstructions:'',
//               isTimeSensitive:'',
//               timeLimit:'',
//             }),
//           ],
//         })
//       );
//     };












const  isTopLevelParentHasChildren= ref(false);
const  isSecondLevelParentHasChildren= ref(false);
const  isThirdLevelParentHasChildren= ref(false);
const  isNoChildren= ref(false);

const { proxy } = getCurrentInstance();
const { sys_show_hide, sys_normal_disable } = proxy.useDict("sys_show_hide", "sys_normal_disable");
const menuName = ref("");
const subMenuName = ref("");
const totalScore = ref("");


// const major_category_open = ref(false);
// const minor_category_open = ref(false);
// const sub_category_open = ref(false);
// const sub_subcategory_open = ref(false);


const formItems = ref([
  {
    id: 1,
    subMenuNameMode: 'input',
    subMenuName_select: '',
    subMenuName_input: '',
    totalScore: null,
    isMultipleScores: 'false',
    stages: [],
    showStages: false
  }
]);

const subMenuNameMode = ref({ value: 'input' });
const subMenuName_select = ref('');
const subMenuName_input = ref('');
// const totalScore = ref(null);
const isMultipleScores = ref('false');
const stages = ref([]);
const showStages = ref(false);

const showSearch = ref(true);
// const title = ref("");
// const showFullTable= ref(false);
const menuOptions = ref([]);
const isExpandAll = ref(false);
const refreshTable = ref(true);
const iconSelectRef = ref(null);
const yesNoOptions = ref([
      { value: '是', label: '是' },
      { value: '否', label: '否' }
    ]);
    




const updateIsSingleScore = () => {
  // 如果大类和小类都是从以往的选择中选取，则保留原来的值
  if (majorCategoryMode.value === 'select' && minorCategoryMode.value === 'select') {
    form.value.isSingleScore = isSingleScore.value; // 保留原来的值
  } else {
    form.value.isSingleScore = null; // 否则设为未选择状态
  }
};

function calculateRowLevel(row) {
      let level = 0;
      while (row && row.parent) {
        row = row.parent;
        level++;
      }
      return level;
    }


// const formItems = ref([]);// 存储所有表单项的数据
function handleSelect(value, option) {
      showFullTable.value = (value === "否");
      
      // option.selected = true;
    }
function addFormItem() {
    const newItem = {
      menuName: '', // 添加一个带有编号的字符串作为新表单项的数据
      subMenuName: '',
      totalScore: '',// 添加一个新的属性表示总分值，并设置初始值为空字符串
      id: generateRandomBasedOnTimestamp() // 使用 uuid 库生成一个 UUID
    };
    formItems.value.push(newItem);
  }
function removeFormItem(index) {
    formItems.value.splice(index, 1); // 删除指定索引的表单项
  }



// 定义转换方法
function addLevelFlags(data, level = 0) {
  // console.log(data);
  return data.map(item => {
    const flags = {
      isMajorCategory: false,
      isMinorCategory: false,
      isSubCategory: false,
      isSubSubCategory: false,
      isStage: false
    };

    // 根据层级设置标志
    switch (level) {
      case 0:
        flags.isMajorCategory = true;
        break;
      case 1:
        flags.isMinorCategory = true;
        break;
      case 2:
        flags.isSubCategory = true;
        break;
      case 3:
        flags.isSubSubCategory = true;
        break;
      case 4:
        flags.isStage = true;
        break;
      default:
        break;
    }

    // 递归处理子项
    if (item.children && item.children.length > 0) {
      item.children = addLevelFlags(item.children, level + 1);
    }

    return {
      ...item,
      ...flags
    };
  });
}
// 调用方法

/** 查询菜单下拉树结构 */
function getTreeselect() {
  menuOptions.value = [];
  listMenu().then(response => {
    const menu = { menuId: 0, menuName: "主类目", children: [] };
    
    menu.children = proxy.handleTree(response.data, "menuId");
    menuOptions.value.push(menu);
  });
}

/** 取消按钮 */
function cancel() {
  open.value = false;
  reset();
}

/** 表单重置 */
function reset() {
  form.value = {
    menuId: undefined,
    parentId: 0,
    menuName: undefined,
    icon: undefined,
    menuType: "M",
    orderNum: undefined,
    isFrame: "1",
    isCache: "0",
    visible: "0",
    status: "0"
  };
   isTopLevelParentHasChildren.value = false;
   isSecondLevelParentHasChildren.value = false;
   isThirdLevelParentHasChildren.value = false;
  proxy.resetForm("menuRef");
}

/** 展示下拉图标 */
function showSelectIcon() {
  iconSelectRef.value.reset();
}

/** 选择图标 */
function selected(name) {
  form.value.icon = name;
}





/** 修改单个按钮操作 */
// const singleEdit_form = reactive({
//   menuId: '',
//   parentId: '',
//   majorCategory: '',
//   minorCategory: '',
//   subCategory: '',
//   subSubCategory: '',
//   isSingleScore: false,
//   stageName: '',
//   stagePoints: '',
//   materialName: '',
//   materialRequirements: '',
//   applicationInstructions: '',
//   createTime: '',
//   children: reactive([]), // 子节点数组
//   hasChildren: false, // 是否有子节点
//   isMajorCategory: false, // 是否是大类
//   isMinorCategory: false, // 是否是小类
//   isSubCategory: false, // 是否是细分类
//   isStage: false, // 是否是阶段
// });

const resetSingleEdit_form = () => {
      singleEdit_form.value.menuId = '';
      singleEdit_form.value.parentId = '';
      singleEdit_form.value.majorCategory = '';
      singleEdit_form.value.minorCategory = '';
      singleEdit_form.value.subCategory = '';
      singleEdit_form.value.subSubCategory = '';
      singleEdit_form.value.isSingleScore = false;
      singleEdit_form.value.stageName = '';
      singleEdit_form.value.stagePoints = null;
      singleEdit_form.value.materialName = '';
      singleEdit_form.value.materialRequirements = '';
      singleEdit_form.value.applicationInstructions = '';
      singleEdit_form.value.createTime = '';
      singleEdit_form.value.isTimeSensitive= "1";// 新增属性：是否具有时效性
      singleEdit_form.value.children = reactive([]); // 清空子节点数组
      singleEdit_form.value.hasChildren = false; // 设置是否有子节点为 false
      isTopLevelParentHasChildren.value= false;  // 顶级父节点是否有子节点
      isSecondLevelParentHasChildren.value= false;  // 第二级父节点是否有子节点
      isThirdLevelParentHasChildren.value= false;  // 第三级父节点是否有子节点
      proxy.resetForm("queryRef");
    };



const handleUpdate_config1 = (row) => {
  resetSingleEdit_form();

  // 使用 Object.assign 将 row 中的属性赋值给 singleEdit_form
  Object.assign(singleEdit_form, row);

  // 如果 row 中没有 children 属性，或者 children 是空数组，则设置 hasChildren 为 false
  singleEdit_form.hasChildren = Array.isArray(row.children) && row.children.length > 0;
  if (row.hasChildren) {
    const level = calculateRowLevel(row);
    switch (level) {
      case 0:
        isTopLevelParentHasChildren.value = true;
        break;
      case 1:
        isSecondLevelParentHasChildren.value = true;
        break;
      case 2:
        isThirdLevelParentHasChildren.value = true;
        break;
    }
  } else {
    isNoChildren.value = false;
  }

  showFullTable.value = false;
  getMenu(row.menuId).then((response) => {
    form.value = response.data;
    singleEditOpen.value = true;
    title.value = "修改菜单";
  });
};
// async function handleSingleUpdate(row) {
//    reset();
//    if (row.hasChildren) {
//       const level = this.calculateRowLevel(row);
//       switch (level) {
//          case 0:
//          isTopLevelParentHasChildren.value = true;
//          break;
//          case 1:
//          isSecondLevelParentHasChildren.value = true;
//          break;
//          case 2:
//          isThirdLevelParentHasChildren.value = true;
//          break;
//       }
//    } else {
//       this.isNoChildren = false;
//    }
//   showFullTable.value = false;
//   reset();
//   await getTreeselect();
//   getMenu(row.menuId).then(response => {
//     form.value = response.data;
//     all_add_open.value = true;
//     title.value = "修改菜单";
//   });
// }
/** 展开/折叠操作 */
function toggleExpandAll() {
  refreshTable.value = false;
  isExpandAll.value = !isExpandAll.value;
  nextTick(() => {
    refreshTable.value = true;
  });
}

/** 修改按钮操作 */
async function handleUpdate(row) {
   reset();
   if (row.hasChildren) {
      const level = this.calculateRowLevel(row);
      switch (level) {
         case 0:
         isTopLevelParentHasChildren.value = true;
         break;
         case 1:
         isSecondLevelParentHasChildren.value = true;
         break;
         case 2:
         isThirdLevelParentHasChildren.value = true;
         break;
      }
   } else {
      this.isNoChildren = false;
   }
  showFullTable.value = false;
  reset();
  await getTreeselect();
  getMenu(row.menuId).then(response => {
    form.value = response.data;
    all_add_open.value = true;
    title.value = "修改菜单";
  });
}
// 定义 ref 对象
const subMenu = ref({
  menuNameMode: 'input',
  menuName_select: '',
  menuName_input: ''
});
//细分类
// 定义所有细分类的数组
const allMenuNames = [
  { value: '1', label: '细分类A' },
  { value: '2', label: '细分类B' },
  { value: '3', label: '细分类C' },
  { value: '4', label: '细分类D' },
  { value: '5', label: '细分类E' },
];

// 过滤函数
const filterMenuNames = (majorCategory, minorCategory) => {
  // 假设这里有逻辑来过滤细分类
  // 例如，如果大类是 "类别1" 并且小类是 "子类1"，我们只显示与之关联的细分类
  return allMenuNames.filter(menu => menu.value.startsWith(`${majorCategory}-${minorCategory}-`));
};

// 计算属性来获取过滤后的细分类
const filteredMenuNames = computed(() => {
  if (update_form.majorCategory_select && update_form.minorCategory_select) {
    return filterMenuNames(update_form.majorCategory_select, update_form.minorCategory_select);
  }
  return [];
});

// 处理方法
const toggleMenuNameMode = (mode) => {
  if (mode === 'select') {
    subMenu.value.menuNameMode = 'select';
    subMenu.value.menuName_input = '';
    subMenu.value.menuName_select = '';
    // 如果大类和小类都是选择的，那么筛选细分类
    if (majorCategoryMode.value === 'select' && minorCategoryMode.value === 'select') {
      subMenu.value.menuName_select = '';
      subMenu.value.menuName_input = '';
      subMenu.value.menuName_select = filteredMenuNames.value; // 更新细分类选项
    }
  } else if (mode === 'input') {
    subMenu.value.menuNameMode = 'input';
    subMenu.value.menuName_input = '';
    subMenu.value.menuName_select = '';
  }
};
// 定义所有细分子类的数组
const allSubMenuNames = [
  { value: '1', label: '细分子类A' },
  { value: '2', label: '细分子类B' },
  { value: '3', label: '细分子类C' },
  { value: '4', label: '细分子类D' },
  { value: '5', label: '细分子类E' },
];

// 定义所有阶段名称的数组
const allStageNames = [
  { value: '1', label: '阶段名称A' },
  { value: '2', label: '阶段名称B' },
  { value: '3', label: '阶段名称C' },
  { value: '4', label: '阶段名称D' },
  { value: '5', label: '阶段名称E' },
];
// 过滤函数
const filterSubMenuNames = (majorCategory, minorCategory, menuName) => {
  // 假设这里有逻辑来过滤细分子类
  // 例如，如果大类是 "类别1"，小类是 "子类1"，细分类是 "细分类1"，我们只显示与之关联的细分子类
  return allSubMenuNames.filter(subMenu => subMenu.value.startsWith(`${majorCategory}-${minorCategory}-${menuName}-`));
};
const filterStageNames = (majorCategory, minorCategory, menuName, subMenuName) => {
  // 假设这里有逻辑来过滤阶段名称
  // 例如，如果大类是 "类别1"，小类是 "子类1"，细分类是 "细分类1"，细分子类是 "细分子类1"，我们只显示与之关联的阶段名称
  return allStageNames.filter(stage => stage.value.startsWith(`${majorCategory}-${minorCategory}-${menuName}-${subMenuName}-`));
};
// 计算属性来获取过滤后的细分子类
const filteredSubMenuNames = computed(() => {
  if (majorCategory_select.value && minorCategory_select.value && item.menuName_select.value) {
    return filterSubMenuNames(majorCategory_select.value, minorCategory_select.value, item.menuName_select.value);
  }
  return [];
});
// 计算属性来获取过滤后的阶段名称
const filteredStageNames = computed(() => {
  if (majorCategory_select.value && minorCategory_select.value && item.menuName_select.value && item.subMenuName_select) {
    return filterStageNames(majorCategory_select.value, minorCategory_select.value, item.menuName_select.value, item.subMenuName_select);
  }
  return [];
});
// 处理方法
const addSubMenuItem = () => {
  const newItem = {
    id: formItems.value.length + 1,
    subMenuNameMode: 'input',
    subMenuName_select: '',
    subMenuName_input: '',
    totalScore: null,
    isMultipleScores: 'false',
    stages: [],
    showStages: false
  };
  formItems.value.push(newItem);
};
const removeSubMenuItem = (index) => {
  formItems.value.splice(index, 1);
};

const switchSubMenuNameMode = (item, mode) => {
  if (mode === 'select') {
    item.subMenuNameMode = 'select';
    item.subMenuName_input = '';
    item.subMenuName_select = '';
    // 如果大类、小类和细分类都是选择的，那么筛选细分子类
    if (majorCategoryMode.value === 'select' && minorCategoryMode.value === 'select' && item.menuNameMode === 'select') {
      item.subMenuName_select = '';
      item.subMenuName_input = '';
      item.subMenuName_select = filteredSubMenuNames.value; // 更新细分子类选项
    }
  } else if (mode === 'input') {
    item.subMenuNameMode = 'input';
    item.subMenuName_input = '';
    item.subMenuName_select = '';
  }
};

const toggleMultipleScores = (item) => {
  item.showStages = item.isMultipleScores === 'true';
};

const addStageItem = (item) => {
  const newStage = {
    stageNameMode: 'input',
    stageName_select: '',
    stageName_input: '',
    totalScore: null
  };
  item.stages.push(newStage);
  item.showStages = true;
};

const removeStageItem = (item, stageIndex) => {
  item.stages.splice(stageIndex, 1);
};

const switchStageNameMode = (stage, mode) => {
  if (mode === 'select') {
    stage.stageNameMode = 'select';
    stage.stageName_input = '';
    stage.stageName_select = '';
    // 如果大类、小类、细分类和细分子类都是选择的，那么筛选阶段名称
    if (majorCategoryMode.value === 'select' && minorCategoryMode.value === 'select' && item.menuNameMode === 'select' && item.subMenuNameMode === 'select') {
      stage.stageName_select = '';
      stage.stageName_input = '';
      stage.stageName_select = filteredStageNames.value; // 更新阶段名称选项
    }
  } else if (mode === 'input') {
    stage.stageNameMode = 'input';
    stage.stageName_input = '';
    stage.stageName_select = '';
  }
};

const checkNumberValidity = (item, field) => {
  // 验证数字是否合法
  // 这里可以添加你的验证逻辑
};
// 处理方法
const toggleSubMenuNameMode = (mode) => {
  if (mode === 'select') {
    subMenuNameMode.value = 'select';
    subMenuName_input.value = '';
    subMenuName_select.value = '';
    // 如果大类、小类和细分类都是选择的，那么筛选细分子类
    if (majorCategoryMode.value === 'select' && minorCategoryMode.value === 'select' && item.menuNameMode === 'select') {
      subMenuName_select.value = '';
      subMenuName_input.value = '';
      subMenuName_select.value = filteredSubMenuNames.value; // 更新细分子类选项
    }
  } else if (mode === 'input') {
    subMenuNameMode.value = 'input';
    subMenuName_input.value = '';
    subMenuName_select.value = '';
  }
};

/** 提交按钮 */
function submitForm() {
  proxy.$refs["menuRef"].validate(valid => {
    if (valid) {
      if (form.value.menuId != undefined) {
        updateMenu(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addMenu(form.value).then(response => {
          proxy.$modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        });
      }
    }
  });
}

/** 删除按钮操作 */
// function handleDelete(row) {
//   proxy.$modal.confirm('是否确认删除名称为"' + row.menuName + '"的数据项?').then(function() {
//     return delConfig(row.menuId);
//   }).then(() => {
//     getList();
//     proxy.$modal.msgSuccess("删除成功");
//   }).catch(() => {});
// }

getList();

const canAddSubSubCategory = computed(() => {
      // 判断大类、小类、细分类是否已选择或输入
      return (
        ((update_form.majorCategoryMode === 'select' && update_form.majorCategory_select) ||
         (update_form.majorCategoryMode === 'input' && update_form.majorCategory_input)) &&
        ((update_form.minorCategoryMode === 'select' && update_form.minorCategory_select) ||
         (update_form.minorCategoryMode === 'input' && update_form.minorCategory_input)) &&
        ((update_form.detailCategoryMode === 'select' && update_form.detailCategory_select) ||
         (update_form.detailCategoryMode === 'input' && update_form.detailCategory_input) ||
         (update_form.detailCategoryMode === 'none'))
      );
    });
function toggleSubSubCategoryMode(menuId, currentMode, mode) {
  // 查找数组中的对象
  const item = update_form.subSubCategories_add.find(item => item.menuId === menuId);

  // 如果找到了对象
  if (item) {
    // 如果当前模式是 'none'
    if (currentMode === 'none') {
      // 设置 subSubCategoryMode 为 'none'
      item.subSubCategoryMode = 'none';
    } else {
      // 根据传入的 mode 参数设置 subSubCategoryMode
      item.subSubCategoryMode = mode === 'input' ? 'input' : 'none';
    }
  }
}
    // const showSubSubCategories = computed(() => {
    //   return (
    //     update_form.detailCategoryMode === 'select' &&
    //     update_form.detailCategory_select !== null &&
    //     update_form.majorCategoryMode === 'select' &&
    //     update_form.detailCategory_select !== null &&
    //     update_form.minorCategoryMode !== 'input'
    //     // update_form.majorCategoryMode !== 'input' &&
    //     // update_form.minorCategoryMode !== 'input'
    //   );
    // });
    const showSubSubCategories = computed(() => {
  return (
    update_form.detailCategoryMode === 'select' &&
    update_form.detailCategory_select !== null &&
    update_form.majorCategoryMode === 'select' &&
    (update_form.minorCategoryMode === 'none' || (update_form.minorCategoryMode === 'select' && update_form.minorCategory_select !== null))
  );
});
</script>
<style scoped>
::v-deep .el-table--fit .el-table__inner-wrapper:before {
  width: auto !important; /* 或者使用具体的宽度值 */
}
/* 在您的样式文件中定义 */
.custom-spacing .toolbar-spacing {
  margin-left: 980px; /* 为 right-toolbar 添加200px的左间距 */
}

.centered-table {
  
  margin-left: 20px; /* 向右移动50px */

}
::v-deep .center-content {
  /* display: flex; */
  /* justify-content: center; */
  margin-left: 13px !important; /* 向右移动10px */

}
.form-item-row {
  width: 100%;
}
.small-margin {
  margin-bottom: 1px !important;/* 调整这个数值来改变间距大小 */
}
.form-item-row {
  position: relative; /* 设置相对定位 */
}

.delete-button {
  position: absolute;

  right: 8px; /* 调整右侧距离 */
  font-size: 14px; /* 调整字体大小 */

}
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