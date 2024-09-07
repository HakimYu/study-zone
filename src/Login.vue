<template>
  <v-row class="d-flex justify-center my-3 mt-5">
    <div class="d-flex-none hidden-md-and-up mx-5 mt-13">
      <v-card-title class="d-flex justify-center text-h5" primary-title>
        登录
      </v-card-title>
      <v-card-actions>
        <v-row class="d-flex justify-center no-gutters">
          <v-col cols="12" sm="12">
            <v-text-field
                label="手机号码"
                v-model="userCode"
                prepend-icon="mdi-phone"
                color="#1a73e8"
                outlined
            ></v-text-field>
          </v-col>
          <v-col v-show="!msgLogin" key="pwdf" cols="12" sm="12">
            <form>
              <v-text-field
                  label="密码"
                  prepend-icon="mdi-lock"
                  color="#1a73e8"
                  autocomplete="off"
                  v-model="password"
                  :append-icon="pwdEye"
                  :type="isPwd ? 'password' : 'text'"
                  @click:append="
                  pwdEye === 'mdi-eye-off'
                    ? (pwdEye = 'mdi-eye')
                    : (pwdEye = 'mdi-eye-off');
                  isPwd = !isPwd;
                "
                  outlined
              ></v-text-field>
            </form>
          </v-col>
          <v-col v-show="msgLogin" sm="12">
            <v-text-field
                width="366px"
                label="验证码"
                v-model="smsCode"
                prepend-icon="mdi-message-text"
                color="#1a73e8"
                outlined
            >
              <template v-slot:append-outer>
                <v-btn
                    class="float-right align-center align-self-center"
                    style="margin-top: -5px"
                    small
                    v-show="msgLogin"
                    color="secondary"
                >发送验证码
                </v-btn
                >
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="9"></v-col>
          <v-col class="mt-10 align-self-center" sm="6"
          >
            <v-btn
                style="margin-left: -15px"
                small
                v-html="msgLogin ? '密码登录' : '短信登录'"
                @click="msgLogin = !msgLogin"
                color="#1a73e8"
            >
            </v-btn
            >
          </v-col
          >
          <v-col class="mt-10" sm="6">
            <v-btn
                class="float-right"
                color="#1a73e8"
                dark
                elevation="0"
            >登录
            </v-btn
            >
          </v-col>
        </v-row>
      </v-card-actions>
    </div>

    <v-card
        class="hidden-sm-and-down align-self-center"
        elevation="0"
        style="text-align: center"
        width="448px"
        height="500px"
        rounded="lg"
        outlined
    >
      <v-card-title
          class="justify-center text-h5"
          style="margin-top: 60px"
          primary-title
      >
        登录
      </v-card-title>
      <v-card-actions>
        <v-row class="justify-center no-gutters">
          <v-col sm="10">
            <v-text-field
                width="366px"
                label="手机号码"
                v-model="userCode"
                prepend-icon="mdi-phone"
                color="#1a73e8"
                outlined
            ></v-text-field>
          </v-col>
          <v-col v-show="!msgLogin" sm="10">
            <form>
              <v-text-field
                  width="366px"
                  label="密码"
                  v-model="password"
                  autocomplete="off"
                  color="#1a73e8"
                  prepend-icon="mdi-lock"
                  :append-icon="pwdEye"
                  :type="isPwd ? 'password' : 'text'"
                  @click:append="
                  pwdEye === 'mdi-eye-off'
                    ? (pwdEye = 'mdi-eye')
                    : (pwdEye = 'mdi-eye-off');
                  isPwd = !isPwd;
                "
                  outlined
              ></v-text-field>
            </form>
          </v-col>
          <v-col v-show="msgLogin" sm="10">
            <v-text-field
                width="366px"
                label="验证码"
                v-model="smsCode"
                prepend-icon="mdi-message-text"
                color="#1a73e8"
                outlined
            >
              <template v-slot:append-outer>
                <v-btn
                    class="float-right align-center align-self-center"
                    style="margin-top: -5px"
                    small
                    v-show="msgLogin"
                    color="secondary"
                >发送验证码
                </v-btn
                >
              </template>
            </v-text-field>
          </v-col>
          <v-col sm="5"
          >
            <v-btn
                class="float-left"
                style="margin-left: -10px"
                small
                color="#1a73e8"
                v-html="msgLogin ? '密码登录' : '短信登录'"
                @click="msgLogin = !msgLogin"
            >
            </v-btn
            >
          </v-col
          >
          <v-col cols="5">
            <v-btn
                class="float-right"
                color="#1a73e8"
                dark
                elevation="0"
                @click="router.push('/')"
            >登录
            </v-btn
            >
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
    <!-- CardLay -->
  </v-row>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { useTheme } from "vuetify";
const theme = useTheme();
const router = useRouter();
const msgLogin = ref(false);
const isPwd = ref(true);
const pwdEye = ref("mdi-eye");
const userCode = ref("");
const password = ref("");
const smsCode = ref("");
onMounted(() => {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    theme.global.name.value = 'dark'
  }
})
</script>