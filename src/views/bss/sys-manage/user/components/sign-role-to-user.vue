<!--  -->
<template>
    <div>
      <UserDetailInfo :user-info="userInfo" ></UserDetailInfo>
      <div style="padding:16px;">
         <UserRolePermission :user-info="userInfo"></UserRolePermission>
      </div>
    </div>
</template>

<script>
import UserDetailInfo from './user-detail-info'
import UserRolePermission from '@/views/bss/sys-manage/permission/components/user-role-permission'
export default {
  props: {
    userInfo: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    UserDetailInfo,
    UserRolePermission
  },
  data () {
    return {
    }
  },
  methods: {},
  mounted: function() {},
  computed: {}
}

</script>
<style  scoped>
</style>
