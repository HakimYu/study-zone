<template>
  <v-card :prepend-avatar="avatar">
    <v-card-title v-if="toValue">{{ toValue.name }}</v-card-title>
    <v-card-text v-if="toValue">{{ toValue.brief }}</v-card-text>
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
                  <v-img :src="avatar"></v-img>
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
</template>

<script setup lang="ts">
interface ToDoList {
  name: string;
  brief: string;
  img: string;
}
defineProps<{
  avatar?: string
  toValue?: ToDoList
}>();
</script>