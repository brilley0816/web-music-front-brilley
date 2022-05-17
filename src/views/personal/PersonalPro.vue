<template>
  <el-container>
    <el-aside class="personalInfo-slide">
      <el-image class="personal-img" fit="contain" :src="attachImageUrl(userPic)" @click="dialogTableVisible = true"/>
      <div class="album-info">
        <el-descriptions title="个人信息" width=220px column=1 >
        <el-descriptions-item label="用户" width=220px>{{ personalInfo.username }}</el-descriptions-item>
        <el-descriptions-item label="性别" width=220px v-if="personalInfo.sex !== 2">{{ getUserSex(personalInfo.sex) }}</el-descriptions-item>
        <el-descriptions-item label="生日" width=220px>{{ getBirth(personalInfo.birth) }}</el-descriptions-item>
        <el-descriptions-item label="手机" width=260px>{{ personalInfo.phone }}</el-descriptions-item>
        <el-descriptions-item label="邮箱" width=260px>{{ personalInfo.email }}</el-descriptions-item>
        <el-descriptions-item label="故乡">{{ personalInfo.location }}</el-descriptions-item>
        <el-descriptions-item label="个性签名">{{ personalInfo.introduction }}</el-descriptions-item> 
        <el-descriptions-item >{{}}</el-descriptions-item> 
        </el-descriptions>
      </div>
      <el-button class="edit-info" round :icon="Edit" @click="goPage()">修改个人信息</el-button>
      <el-tag size="small"></el-tag> 
      <el-tag size="small">可爱</el-tag>    
      <el-tag size="small">严严宝宝</el-tag>  
      <el-dialog v-model="dialogTableVisible" title="修改头像"> <upload></upload> </el-dialog>
    </el-aside>
    <el-main class="album-main">
      <!-- <h1>{{ songDetails.name }}</h1>
      <p>{{ songDetails.introduction }}</p> -->
      <h1>收藏的歌曲</h1>
      <song-list :songList="collectSongList" :show="true" @changeData="changeData"></song-list>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick, computed, onMounted, reactive, watch} from "vue";
import { useStore } from "vuex";
import mixin from "@/mixins/mixin";
import { Edit } from "@element-plus/icons-vue";
import SongList from "@/components/SongList.vue";
import Upload from "../setting/Upload.vue";
import { HttpManager } from "@/api";
import { getBirth } from "@/utils";
import { RouterName } from "@/enums";

export default defineComponent({
  components: {
    SongList,
    Upload,
  },
  setup() {
    const store = useStore();
    const { routerManager } = mixin();
    const dialogTableVisible = ref(false);
    const collectSongList = ref([]); // 收藏的歌曲
    const personalInfo = reactive({
      username: "",
      userSex: "",
      birth: "",
      phone: "",
      email: "",
      location: "",
      introduction: "",
    });

    const userId = computed(() => store.getters.userId);
    const userPic = computed(() => store.getters.userPic);
    console.log("hihi")
    console.log(userPic)
    const { getUserSex } = mixin();
    
    watch(userPic, () => {
      dialogTableVisible.value = false;
    });

    function goPage() {
      routerManager(RouterName.Setting, { path: RouterName.Setting });
    }

    async function getUserInfo(id) {
      const result = (await HttpManager.getUserOfId(id)) as ResponseBody;
      console.log(result);
      personalInfo.username = result.data[0].username;
      personalInfo.userSex = result.data[0].sex;
      personalInfo.birth = result.data[0].birth;
      personalInfo.location = result.data[0].location;
      personalInfo.phone = result.data[0].phoneNum;
      personalInfo.email = result.data[0].email;
      personalInfo.introduction = result.data[0].introduction;
    }

    // 获取收藏的歌曲
    async function getCollection(userId) {
      collectSongList.value = []
      const result = (await HttpManager.getCollectionOfUser(userId)) as ResponseBody;
      const collectIDList = result.data || []; // 存放收藏的歌曲ID
      // 通过歌曲ID获取歌曲信息
      for (const item of collectIDList) {
        const result = (await HttpManager.getSongOfId(item.songId)) as ResponseBody;
        collectSongList.value.push(result.data[0]);
      }
    }
    
    function changeData() {
      getCollection(userId.value);
    }

    nextTick(() => {
      getUserInfo(userId.value);
      getCollection(userId.value);
    });

    return {
      Edit,
      userPic,
      personalInfo,
      collectSongList,
      dialogTableVisible,
      attachImageUrl: HttpManager.attachImageUrl,
      getBirth,
      getUserSex,
      goPage,
      changeData,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/var.scss";

.personalInfo-slide {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;

  .personal-img {
    height: 150px;
    width: 150px;
    border-radius: 10%;
    cursor: pointer;
  }

  .album-info {
    width: 250px;
    padding-top: 2rem;
    li {
      width: 100%;
      height: 30px;
      line-height: 30px;
    }
    margin:0 0 0 100px;
  }
}

.album-main {
  p {
    color: rgba(0, 0, 0, 0.5);
    margin: 10px 0 20px 0px;
  }
}

@media screen and (min-width: $sm) {
  .personalInfo-slide {
    position: fixed;
    width: 450px;
  }
  .album-main {
    min-width: 600px;
    padding-right: 10vw;
    margin-left: 350px;
  }
}

@media screen and (max-width: $sm) {
  .album-slide {
    display: none;
  }
}
</style>
