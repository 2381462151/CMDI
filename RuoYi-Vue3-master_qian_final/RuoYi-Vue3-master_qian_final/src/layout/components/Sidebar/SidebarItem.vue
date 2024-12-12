<template>
  <div v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path, onlyOneChild.query)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{ 'submenu-title-noDropdown': !isNest }" >
          <svg-icon :icon-class="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"/>
          <template #title>
            <div style="display: flex; justify-content: space-between;flex:1">
              <span class="menu-title" :title="hasTitle(onlyOneChild.meta.title)">{{ onlyOneChild.meta.title }}</span>
              <span
                v-if="onlyOneChild.meta.shuju !== undefined"
                :class="{'badge-gray': onlyOneChild.meta.shuju === '0', 'badge-red': onlyOneChild.meta.shuju != '0'}"
                style="font-family: 'Microsoft YaHei', 微软雅黑,\9ed1\4f53,\5b8b\4f53, 'Microsoft JhengHei'; font-size: 14px;"
              >
                {{ Number(onlyOneChild.meta.shuju) }}
              </span>
            </div>
            <!-- <span class="menu-title" :title="hasTitle(onlyOneChild.meta.title)">{{ onlyOneChild.meta.title }}</span>
              <span  v-if="onlyOneChild.meta.shuju !== undefined" :class="{'badge-gray': onlyOneChild.meta.shuju === '0', 'badge-red': onlyOneChild.meta.shuju != '0'}" style="font-family: 'Microsoft YaHei', 微软雅黑,\9ed1\4f53,\5b8b\4f53, 'Microsoft JhengHei'; font-size: 14px; ">
                {{ Number(onlyOneChild.meta.shuju) }}
              </span> -->
            <!-- <template v-if="onlyOneChild.meta.shuju !== undefined"> -->
              <!-- <div class="badge" :class="{'badge-gray': onlyOneChild.meta.shuju === 0, 'badge-red': onlyOneChild.meta.shuju > 0}">
                {{ onlyOneChild.meta.shuju }}
              </div> -->
            <!-- </template> -->
          </template>
        </el-menu-item>
        
      </app-link>
      
    </template>

    <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)" teleported>
      <template v-if="item.meta" #title>
        <svg-icon :icon-class="item.meta && item.meta.icon" />
        <span class="menu-title" :title="hasTitle(item.meta.title)">{{ item.meta.title }}</span>
      </template>

      <sidebar-item
        v-for="(child, index) in item.children"
        :key="child.path + index"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script setup>
import { isExternal } from '@/utils/validate'
import AppLink from './Link'
import { getNormalPath } from '@/utils/ruoyi'

const props = defineProps({
  // route object
  item: {
    type: Object,
    required: true
  },
  isNest: {
    type: Boolean,
    default: false
  },
  basePath: {
    type: String,
    default: ''
  }
})

const onlyOneChild = ref({});

function hasOneShowingChild(children = [], parent) {
  if (!children) {
    children = [];
  }
  const showingChildren = children.filter(item => {
    if (item.hidden) {
      return false
    } else {
      // Temp set(will be used if only has one showing child)
      onlyOneChild.value = item
      return true
    }
  })

  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length === 1) {
    return true
  }

  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
    return true
  }

  return false
};

function resolvePath(routePath, routeQuery) {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  if (routeQuery) {
    let query = JSON.parse(routeQuery);
    return { path: getNormalPath(props.basePath + '/' + routePath), query: query }
  }
  return getNormalPath(props.basePath + '/' + routePath)
}

function hasTitle(title){
  if (title.length > 5) {
    return title;
  } else {
    return "";
  }
}
</script>
<style scoped>
  .badge {
    display: inline-block;
    padding: 2px 6px;
    border-radius: 50%;
    font-size: 12px;
    line-height: 1;
    text-align: center;
  }

  .badge-gray {
    /* background-color: #cccccc; */
      color: #020202;
  }

  .badge-red {
    /* background-color: #ff0000; */
    color: #ff0000;
  }
</style>