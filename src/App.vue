<template>
  <v-app>
    <!--消息条-->
    <v-snackbar
        v-model="snackbar"
    >
      {{ snackbarText }}

      <template v-slot:actions>
        <v-btn
            color="pink"
            variant="text"
            @click="snackbar = false"
        >
          关闭
        </v-btn>
      </template>
    </v-snackbar>
    <!-- 应用栏 -->
    <v-app-bar color="primary" :elevation="2">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>学习空间</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-dialog max-width="60vw">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
              v-bind="activatorProps"
              icon="mdi-palette"
              id="theme-activator"
          >
          </v-btn>
          <v-tooltip
              activator="#theme-activator"
              location="top"
          >主题设置
          </v-tooltip>
        </template>

        <template v-slot:default="{ isActive }">
          <v-card color="background" title="主题设置">
            <v-container>
              <v-row>
                <v-col>
                  <v-row no-gutters>
                    <v-col>
                      <div class="text-subtitle-2 text-center">亮色模式</div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="d-flex justify-center">
                      <v-btn @click="changeColor('light', 'primary')" :color="store.color.light.primary"
                             icon="">
                        <v-tooltip
                            activator="parent"
                            location="top"
                        >主色
                        </v-tooltip>
                      </v-btn>
                    </v-col>
                    <v-col class="d-flex justify-center">
                      <v-btn @click="changeColor('light','secondary')" :color="store.color.light.secondary"
                             icon="">
                        <v-tooltip
                            activator="parent"
                            location="top"
                        >辅色
                        </v-tooltip>
                      </v-btn>
                    </v-col>
                    <v-col class="d-flex justify-center">
                      <v-btn @click="changeColor('light', 'background')" :color="store.color.light.background"
                             icon="">
                        <v-tooltip
                            activator="parent"
                            location="top"
                        >背景色
                        </v-tooltip>
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <div class="text-subtitle-2 text-center">暗色模式</div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="d-flex justify-center">
                      <v-btn @click="changeColor('dark', 'primary')" :color="store.color.dark.primary"
                             icon="">
                        <v-tooltip
                            activator="parent"
                            location="bottom"
                        >主色
                        </v-tooltip>
                      </v-btn>
                    </v-col>
                    <v-col class="d-flex justify-center">
                      <v-btn @click="changeColor('dark','secondary')" :color="store.color.dark.secondary"
                             icon="">
                        <v-tooltip
                            activator="parent"
                            location="bottom"
                        >辅色
                        </v-tooltip>
                      </v-btn>
                    </v-col>
                    <v-col class="d-flex justify-center">
                      <v-btn @click="changeColor('dark', 'background')" :color="store.color.dark.background"
                             class="border-md"
                             icon="">
                        <v-tooltip
                            activator="parent"
                            location="bottom"
                        >背景色
                        </v-tooltip>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
            <template v-slot:actions>
              <v-spacer></v-spacer>
              <v-btn
                  text="取消"
                  @click="isActive.value = false"
              ></v-btn>
              <v-btn
                  text="保存并刷新"
                  @click="()=>{isActive.value = false;refreshPage()}"
              ></v-btn>
            </template>
          </v-card>
        </template>
      </v-dialog>
      <v-btn class="mr-4" icon>
        <v-avatar
            image="avatar.png"
            color="surface-variant"
            variant="flat"
        ></v-avatar>
        <v-menu activator="parent">
          <v-list>
            <v-list-item>
              <template v-slot:prepend>
                <v-icon icon="mdi-account"></v-icon>
              </template>
              <v-list-item-title>个人中心</v-list-item-title>
            </v-list-item>
            <v-list-item @click="showSnackbar('已退出登录')">
              <template v-slot:prepend>
                <v-icon icon="mdi-logout"></v-icon>
              </template>
              <v-list-item-title>退出登录</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
    </v-app-bar>
    <!-- 抽屉 -->
    <v-navigation-drawer
        v-model="drawer"
        width="350"
        floating>
      <div class="px-2 my-2">
        <v-text-field
            class="mb-4"
            label="搜索待办"
            density="compact"
            prepend-inner-icon="mdi-magnify"
            variant="solo-filled"
            flat
            hide-details
        ></v-text-field>
        <div v-for="(value,index) in toDoList">
          <v-divider class="my-6"></v-divider>
          <v-card :prepend-avatar="'./1-'+(index+1)+'.jpg'">
            <v-card-title>{{ value.name }}</v-card-title>
            <v-card-text>{{ value.brief }}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon="mdi-arrow-right"></v-btn>
            </v-card-actions>
            <!--点击窗口-->
            <v-dialog activator="parent" max-width="80%">
              <template v-slot:default="{ isActive }">
                <v-card
                    title="课程名称"
                >
                  <v-container>
                    <v-row>
                      <v-col class="d-flex justify-center" cols="12" md="6">
                        <v-card width="300">
                          <v-img :src="'./1-'+(index+1)+'.jpg'"></v-img>
                        </v-card>
                      </v-col
                      >
                      <v-col class="d-flex justify-center" cols="12" md="6">
                        <div class="text-body-1 pr-10">[课程名称] 课程深入探讨 [课程主题相关内容]。分析
                          [课程主题对特定领域的影响]，引导学生思考 [与课程主题相关的思考点]。
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                  <template v-slot:actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        class="ml-auto"
                        text="关闭"
                        @click="isActive.value = false"
                    ></v-btn>
                    <v-btn
                        class="ml-auto"
                        text="学习"
                        @click="isActive.value = false"
                    ></v-btn>
                  </template>
                </v-card>
              </template>
            </v-dialog>
          </v-card>
        </div>
      </div>
    </v-navigation-drawer>

    <v-main>
      <v-sheet
          class="mx-auto pa-2 pt-6"
          bg-color="background"
      >

        <v-slide-group show-arrows>
          <v-slide-group-item
              v-for="n in slideGroup"
              :key="n"
          >
            <v-hover
                v-slot="{ isHovering, props }"
            >
              <v-card
                  :class="{ 'on-hover': isHovering }"
                  :elevation="isHovering ? 16 : 2"
                  class="ma-3"
                  bg-color="background"
                  width="250"
                  rounded
                  v-bind="props"
              >
                <v-img :src="n"></v-img>
                <v-dialog activator="parent" max-width="80%">
                  <template v-slot:default="{ isActive }">
                    <v-card
                        title="课程名称"
                    >
                      <v-container>
                        <v-row>
                          <v-col class="d-flex justify-center" cols="12" md="6">
                            <v-card class="d-flex justify-center" width="300">
                              <v-img :src="n"></v-img>
                            </v-card>
                          </v-col
                          >
                          <v-col class="d-flex justify-center" cols="12" md="6">
                            <div class="text-body-1 pr-10">[课程名称] 课程深入探讨 [课程主题相关内容]。分析
                              [课程主题对特定领域的影响]，引导学生思考 [与课程主题相关的思考点]。
                            </div>
                          </v-col>
                        </v-row>
                      </v-container>
                      <template v-slot:actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            class="ml-auto"
                            text="关闭"
                            @click="isActive.value = false"
                        ></v-btn>
                        <v-btn
                            class="ml-auto"
                            text="学习"
                            @click="isActive.value = false"
                        ></v-btn>
                      </template>
                    </v-card>
                  </template>
                </v-dialog>
              </v-card>
            </v-hover>
          </v-slide-group-item>
        </v-slide-group>
      </v-sheet>

      <v-sheet
          class="mx-auto pa-2 pt-6"
          bg-color="background"
      >
        <v-container fluid>
          <!--无限滚动-->
          <v-infinite-scroll :items="items" :onLoad="load">
            <v-row>
              <v-col

                  v-for="(item, index) in items"
                  :key="index"
                  cols="6"
                  md="2"
              >
                <v-hover v-slot="{ isHovering, props }">
                  <v-card v-bind="props"
                          :class="{ 'on-hover': isHovering }"
                          :elevation="isHovering ? 16 : 2">
                    <v-img :src="item"></v-img>
                    <v-dialog activator="parent" max-width="80%">
                      <template v-slot:default="{ isActive }">
                        <v-card
                            title="课程名称"
                        >
                          <v-container>
                            <v-row>
                              <v-col class="d-flex justify-center" cols="12" md="6">
                                <v-card class="d-flex justify-center" width="300">
                                  <v-img :src="item"></v-img>
                                </v-card>
                              </v-col
                              >
                              <v-col class="d-flex justify-center" cols="12" md="6">
                                <div class="text-body-1 pr-10">[课程名称] 课程深入探讨 [课程主题相关内容]。分析
                                  [课程主题对特定领域的影响]，引导学生思考 [与课程主题相关的思考点]。
                                </div>
                              </v-col>
                            </v-row>
                          </v-container>
                          <template v-slot:actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                class="ml-auto"
                                text="关闭"
                                @click="isActive.value = false"
                            ></v-btn>
                            <v-btn
                                class="ml-auto"
                                text="学习"
                                @click="isActive.value = false"
                            ></v-btn>
                          </template>
                        </v-card>
                      </template>
                    </v-dialog>
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>
          </v-infinite-scroll>
        </v-container>
      </v-sheet>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {useDisplay} from 'vuetify'
import {storeF} from './store'
import {useTheme} from "vuetify";
//判断是否为手机
const {mobile} = useDisplay()
//抽屉
const drawer = ref(true)
//待办事项列表
const toDoList = ref([
  {
    "name": "人工智能与未来社会",
    "brief": "本课程探讨人工智能的发展历程、技术原理及在各个领域的应用。分析人工智能对未来社会的经济、文化、教育、医疗等方面带来的变革与挑战，引导学生思考人类在人工智能时代的角色定位和发展方向。",
    "img": "1-1.jpg"
  },
  {
    "name": "可持续发展与生态工程",
    "brief": "课程聚焦于可持续发展的理念与实践，涵盖生态工程的基本原理和方法。学生将学习如何通过生态设计和工程手段实现资源的高效利用、环境保护和生态系统的稳定，培养学生的环保意识和可持续发展思维。",
    "img": "1-2.jpg"
  },
  {
    "name": "创意写作与文化表达",
    "brief": "本课程旨在培养学生的写作创造力和文化表达能力。通过分析不同文学体裁和文化现象，引导学生进行创意写作实践，包括小说、诗歌、散文等，同时探讨写作在文化传承和创新中的作用。",
    "img": "1-3.jpg"
  },
  {
    "name": "金融科技与风险管理",
    "brief": "金融科技的最新发展趋势，包括区块链、大数据、人工智能在金融领域的应用。",
    "img": "1-4.jpg"
  }]
)
//轮播图列表
const slideGroup = ref(['2-1.jpg', '2-2.jpg', '2-3.jpg', '2-4.jpg', '2-5.jpg'])
//瀑布流别表
const items = ref([
  '3-1.jpg', '3-2.jpg', '3-3.jpg', '3-5.jpg', '3-6.jpg', '3-7.jpg', '3-8.jpg', '3-9.jpg', '3-10.jpg'
])
//消息条
const snackbar = ref(false)
//消息条文本
const snackbarText = ref('')
//定义done函数类型
interface loadDoneCallback {
  (status?: string): void;
}
//持久化储存
const store = storeF()
const changingColor = ref('');
const changingColorMode = ref('');
const colorPickerDialog = ref(false);
//vuetify主题
const theme = useTheme()
//改变主题颜色
function changeColor(mode: string, name: string) {
  changingColor.value = name;
  changingColorMode.value = mode;
  colorPickerDialog.value = true;
}
//刷新页面
function refreshPage() {
  window.location.reload();
}
//消息条
function showSnackbar(message: string) {
  snackbarText.value = message;
  snackbar.value = true;
}
//无限滚动加载项目
async function load({done}: { done: loadDoneCallback }) {
  setTimeout(() => {
    items.value.push.apply(items.value, [
      '3-1.jpg', '3-2.jpg', '3-3.jpg', '3-5.jpg', '3-6.jpg', '3-7.jpg', '3-8.jpg', '3-9.jpg', '3-10.jpg'
    ])
    done('ok')
  }, 2000)
}

//组件挂载完成
onMounted(() => {
  if (mobile.value) {
    drawer.value = false
  }
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    theme.global.name.value = 'dark'
  }
})
</script>