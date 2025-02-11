<!--  -->
<template>
<Layout class="i-layout ">
  <Sider width="240" class="i-layout-sider i-layout-sider-fix  i-layout-sider-dark">
    <div class="i-layout-sider-logo i-layout-sider-logo-dark"><a href="/" target="_self" class="i-link i-link-color" style="display: none;"><img src="https://file.iviewui.com/admin-pro-dist/img/logo-dark.ab519d9f.png"></a></div>
    <Menu class="i-layout-menu-side i-scrollbar-hide " active-name="1-2" theme="dark" width="auto" :open-names="['1']">
      <MenuItem name="11">
      <custom-icon type="iconfont icon-zhengcefagui"></custom-icon>
      用户管理
      </MenuItem>
      <MenuItem name="12">
      <custom-icon type="iconfont icon-zhengcefagui"></custom-icon>
      角色管理
      </MenuItem>

      <MenuItem name="13">
      <custom-icon type="iconfont icon-zhengcefagui"></custom-icon>
      权限管理
      </MenuItem>

      <Submenu name="1">
        <template slot="title">
          <Icon type="ios-navigate"></Icon>
          Item 1
        </template>
        <MenuItem name="1-1">Option 1</MenuItem>
        <MenuItem name="1-2">Option 2</MenuItem>
        <MenuItem name="1-3">Option 3</MenuItem>
      </Submenu>
      <Submenu name="2">
        <template slot="title">
          <Icon type="ios-keypad"></Icon>
          Item 2
        </template>
        <MenuItem name="2-1">Option 1</MenuItem>
        <MenuItem name="2-2">Option 2</MenuItem>
      </Submenu>
      <Submenu name="3">
        <template slot="title">
          <Icon type="ios-analytics"></Icon>
          Item 3
        </template>
        <MenuItem v-for="(item, index) in 20" :key="index" name="3-2">Option {{index}}</MenuItem>
      </Submenu>
    </Menu>
  </Sider>
  <Layout class="i-layout-inside i-layout-inside-fix-with-sider">
    <Header class="i-layout-header i-layout-header-fix i-layout-header-color-dark i-layout-header-stick" style="width: calc(100% - 0px);">
      <div class="app-bar-content">
        <div class="app-bar-logo i-layout-header-logo i-layout-header-logo-stick">
          <!-- <img alt="logo" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTI4cHgiIGhlaWdodD0iMTI4cHgiIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA1Mi42ICg2NzQ5MSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+VnVlPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+CiAgICAgICAgPGxpbmVhckdyYWRpZW50IHgxPSI2OS42NDQxMTYlIiB5MT0iMCUiIHgyPSI2OS42NDQxMTYlIiB5Mj0iMTAwJSIgaWQ9ImxpbmVhckdyYWRpZW50LTEiPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMjlDREZGIiBvZmZzZXQ9IjAlIj48L3N0b3A+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMxNDhFRkYiIG9mZnNldD0iMzcuODYwMDY4NyUiPjwvc3RvcD4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzBBNjBGRiIgb2Zmc2V0PSIxMDAlIj48L3N0b3A+CiAgICAgICAgPC9saW5lYXJHcmFkaWVudD4KICAgICAgICA8bGluZWFyR3JhZGllbnQgeDE9Ii0xOS44MTkxNTUzJSIgeTE9Ii0zNi43OTMxNDY0JSIgeDI9IjEzOC41NzkxOSUiIHkyPSIxNTcuNjM3NTA3JSIgaWQ9ImxpbmVhckdyYWRpZW50LTIiPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMjlDREZGIiBvZmZzZXQ9IjAlIj48L3N0b3A+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMwRjc4RkYiIG9mZnNldD0iMTAwJSI+PC9zdG9wPgogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICAgICAgPGxpbmVhckdyYWRpZW50IHgxPSI2OC4xMjc5ODcyJSIgeTE9Ii0zNS42OTA1NzM3JSIgeDI9IjMwLjQ0MDA5MTQlIiB5Mj0iMTE0Ljk0MjY3OSUiIGlkPSJsaW5lYXJHcmFkaWVudC0zIj4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI0ZBOEU3RCIgb2Zmc2V0PSIwJSI+PC9zdG9wPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjRjc0QTVDIiBvZmZzZXQ9IjUxLjI2MzUxOTElIj48L3N0b3A+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNGNTFEMkMiIG9mZnNldD0iMTAwJSI+PC9zdG9wPgogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8L2RlZnM+CiAgICA8ZyBpZD0iVnVlIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE5LjAwMDAwMCwgOS4wMDAwMDApIj4KICAgICAgICAgICAgPHBhdGggZD0iTTg5Ljk2LDkwLjQ4IEM3OC41OCw5My40OCA2OC4zMyw4My4zNiA2Ny42Miw4Mi40OCBMNDYuNjYwNDQ4Nyw2Mi4yMjkyMjU4IEM0NS41MDIzODQ5LDYxLjExMDMyMzYgNDQuODQyNjg0NSw1OS41NzI4ODM1IDQ0LjgyOTY5ODcsNTcuOTYyNjM5NiBMNDQuNTAzNTU2NCwxNy41MjA5OTQ4IEM0NC40OTQ4ODYxLDE2LjQ0NTg3NDQgNDQuMDUzNzcxNCwxNS40MTk1MDk1IDQzLjI3OTY4NjQsMTQuNjczMzUxNyBMMjkuNjQ1OTk5OSwxLjUzMTUzNzM3IEMyOC4wNTU0NzUsLTAuMDAxNjA1MDQwMDUgMjUuNTIzMjQyMywwLjA0NDkxMjY1ODggMjMuOTkwMDk5OSwxLjYzNTQzNzU2IEMyMy4yNzE1MTIxLDIuMzgwOTIwNjYgMjIuODcsMy4zNzYwMDgzNCAyMi44Nyw0LjQxMTQzNzQ2IEwyMi44Nyw2NC4zODY0NzUxIEMyMi44Nyw2Ny4wODA3ODkxIDIzLjk1NzIyMzMsNjkuNjYxMTA2NyAyNS44ODU0MDksNzEuNTQyOTc0OCBMNjMuNjAwNDYxNSwxMDguMzUyMDYxIEM2NS45NDY2MzIzLDExMC42NDE4NzMgNjkuNjk2MzU4NCwxMTAuNjI0NjA1IDcyLjAyMTM0MDMsMTA4LjMxMzI4MSIgaWQ9IlBhdGgtQ29weSIgZmlsbD0idXJsKCNsaW5lYXJHcmFkaWVudC0xKSIgZmlsbC1ydWxlPSJub256ZXJvIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1Ni40MTUwMDAsIDU0LjgzMTE1Nykgc2NhbGUoLTEsIDEpIHRyYW5zbGF0ZSgtNTYuNDE1MDAwLCAtNTQuODMxMTU3KSAiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTY4LDkwLjExNjMxMjIgQzU2LjYyLDkzLjExNjMxMjIgNDUuNDYsODMuMzYgNDQuNzUsODIuNDggTDIzLjc5MDQ0ODcsNjIuMjI5MjI1OCBDMjIuNjMyMzg0OSw2MS4xMTAzMjM2IDIxLjk3MjY4NDUsNTkuNTcyODgzNSAyMS45NTk2OTg3LDU3Ljk2MjYzOTYgTDIxLjYzMzU1NjQsMTcuNTIwOTk0OCBDMjEuNjI0ODg2MSwxNi40NDU4NzQ0IDIxLjE4Mzc3MTQsMTUuNDE5NTA5NSAyMC40MDk2ODY0LDE0LjY3MzM1MTcgTDYuNzc1OTk5OSwxLjUzMTUzNzM3IEM1LjE4NTQ3NSwtMC4wMDE2MDUwNDAwNSAyLjY1MzI0MjMyLDAuMDQ0OTEyNjU4OCAxLjEyMDA5OTkxLDEuNjM1NDM3NTYgQzAuNDAxNTEyMTI1LDIuMzgwOTIwNjYgMy45MDIxMTg3OGUtMTMsMy4zNzYwMDgzNCAzLjkwNzk4NTA1ZS0xMyw0LjQxMTQzNzQ2IEwzLjk0MzUxMjE4ZS0xMyw2NC4zODY0NzUxIEMzLjk0NjgxMTc3ZS0xMyw2Ny4wODA3ODkxIDEuMDg3MjIzMjYsNjkuNjYxMTA2NyAzLjAxNTQwOTAzLDcxLjU0Mjk3NDggTDQwLjc4MDcwOTIsMTA4LjQwMTEwMSBDNDMuMTA2OTMwNCwxMTAuNjcxNDQ0IDQ2LjgxODAxNTEsMTEwLjY3NjUyNSA0OS4xNTA0NDQ1LDEwOC40MTI1NjEiIGlkPSJQYXRoIiBmaWxsPSJ1cmwoI2xpbmVhckdyYWRpZW50LTIpIiBmaWxsLXJ1bGU9Im5vbnplcm8iPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTQzLjI5ODM0ODgsMTkuMDk5MTkzMSBMMjcuNTU2NjA3OSwzLjg4MjQ2MjQ0IEMyNi43NjI0MjgxLDMuMTE0NzY5NjcgMjYuNzQwOTU2MSwxLjg0ODYyMTc3IDI3LjUwODY0ODgsMS4wNTQ0NDE5NCBDMjcuODg1NDgyNiwwLjY2NDYwNjYxMSAyOC40MDQ0NDM4LDAuNDQ0NDcyNjUxIDI4Ljk0NjYzODYsMC40NDQ0NzI2NTEgTDYwLjM5MjUwMjEsMC40NDQ0NzI2NTEgQzYxLjQ5NzA3MTYsMC40NDQ0NzI2NTEgNjIuMzkyNTAyMSwxLjMzOTkwMzE1IDYyLjM5MjUwMjEsMi40NDQ0NzI2NSBDNjIuMzkyNTAyMSwyLjk4NTgzNzUgNjIuMTczMDM5NiwzLjUwNDA3NzQyIDYxLjc4NDI1MTIsMy44ODA3OTk0MiBMNDYuMDgwMTI4NSwxOS4wOTc1MzAxIEM0NS4zMDUxNTc5LDE5Ljg0ODQ0ODggNDQuMDc0MjE2NywxOS44NDkxODQ3IDQzLjI5ODM0ODgsMTkuMDk5MTkzMSBaIiBpZD0iUGF0aCIgZmlsbD0idXJsKCNsaW5lYXJHcmFkaWVudC0zKSI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+" />
          XXX人民代表大会... -->
        </div>
        <Menu mode="horizontal" active-name="1">
          <div class="layout-nav">
            <MenuItem name="9">
            <custom-icon type="iconfont icon-caiwujuesuan"></custom-icon>
            决算编制
            </MenuItem>
            <MenuItem name="8">
            <custom-icon type="iconfont icon-yusuanbianzhi"></custom-icon>
            预算编制
            </MenuItem>

            <MenuItem name="7">
            <custom-icon type="iconfont icon-yijianx"></custom-icon>
            代表建议
            </MenuItem>

            <MenuItem name="6">
            <custom-icon type="iconfont icon-zhengcefagui"></custom-icon>
            政策法规
            </MenuItem>

            <MenuItem name="5">
            <custom-icon type="iconfont icon-wenjianguanli"></custom-icon>
            工作资料
            </MenuItem>

            <MenuItem name="4">
            <custom-icon type="iconfont icon-jigouguanli"></custom-icon>
            机构管理
            </MenuItem>
            <MenuItem name="1">
            <custom-icon type=" iconfont icon-dianpu"></custom-icon>
            系统管理
            </MenuItem>
          </div>
        </Menu>
        <div class="spacer"></div>
        <div class="i-layout-header-trigger i-layout-header-trigger-min ">
          <div class="i-notifications">
            <Dropdown trigger="click">
              <Badge>
                <Icon type="ios-notifications-outline" size="26"></Icon>
                <sup class="ivu-badge-count" style="margin-top: 32px; margin-right: 10px;" slot="count">30</sup>
              </Badge>
              <DropdownMenu slot="list">
                <div class="i-notifications-list">
                  <div class="i-notifications-list-tabs">
                    <Tabs :animated="false" value="name1">
                      <TabPane label="通知" name="name1">2019年财政预算收集通知</TabPane>
                      <TabPane label="代办" name="name2">今日待办事项通知</TabPane>
                      <TabPane label="关注" name="name3">人大代表意见关注通知</TabPane>
                    </Tabs>
                  </div>
                </div>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div class="i-layout-header-trigger i-layout-header-trigger-min">
          <Avatar style="background:#f56a00">U</Avatar>
          系统管理员
        </div>
      </div>
    </Header>
    <Content class="i-layout-content i-layout-content-fix-with-header " :style="{background: '#fff'}">
      <div class="i-layout-content-main">
        <transition name="fade-transform" mode="out-in">
          <router-view v-if="$route.meta && $route.meta.notCache === true" />
          <keep-alive v-else>
            <router-view />
          </keep-alive>
        </transition>
      </div>
    </Content>
    <Footer class="text-center i-layout-footer-fix">2019-2025 &copy; XXX科技有限公司</Footer>
  </Layout>
</Layout>
</template>

<script>
export default {
  props: {},
  components: {},
  data() {
    return {}
  },
  methods: {},
  mounted: function () {},
  computed: {}
}
</script>

<style lang="less">
@import url('./style/main.less');
</style>
