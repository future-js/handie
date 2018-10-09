<template>
  <div class="Home">
    <Box>
      <MediaList
        :media="images"
        :picker="picker"
        pickable
        @beforeUpload="beforeMediaUpload"
        @upload="imageUploaded"
        @remove="imageRemoved"
        @fail="uploadFail" />
    </Box>
    <Box>
      <h2 slot="header">测试</h2>
      <List>
        <ListItem @click.native="testActionSheet">股东身份</ListItem>
        <InputItem v-for="(game, idx) in games" :key="idx" placeholder="请输入游戏名称" name="game" :value="game.name">游戏名</InputItem>
        <ListItem>股东身份股东身份股东身份股东身份股东身份股东身份股东身份股东身份股东身份股东身份股东身份股东身份</ListItem>
      </List>
    </Box>
  </div>
</template> 

<script>
  import {
    Box, Icon,
    List, ListItem, InputItem,
    MediaList } from '../../../../src/vue/components/mobile';

  export default{
    name: 'Home',
    components: {
      Box, Icon,
      List, ListItem, InputItem,
      MediaList
    },
    data() {
      return {
        games: [{
          name: "超级马里奥 奥德赛",
          developer: "Nintendo"
        }, {
          name: "塞尔达传说 荒野之息",
          developer: "Nintendo"
        }],
        images: [{
          url: "https://ourai.ws/assets/avatars/ourai-200px-8f9378ded6603689c73eb1cfddc995863c516bdb580e9ce682644d31f5765bd8.jpg",
          caption: "欧雷"
        }, {
          url: ""
        }, {
          url: "https://ourai.ws/assets/avatars/ourai-200px-8f9378ded6603689c73eb1cfddc995863c516bdb580e9ce682644d31f5765bd8.jpg",
          caption: "欧雷"
        }, {
          url: "https://ourai.ws/assets/avatars/ourai-200px-8f9378ded6603689c73eb1cfddc995863c516bdb580e9ce682644d31f5765bd8.jpg",
          caption: "欧雷"
        }],
        picker: {
          position: 'first',
          url: '/upload'
        }
      }
    },
    methods: {
      testActionSheet() {
        this.$muu.actionSheet({
          title: '上传',
          actions: ['七牛', {
            text: '顽兔',
            handler( item ) {
              console.log('顽兔', item);
            }
          }],
          cancel: {
            handler() {
              console.log('cancel from test')
            }
          }
        });
      },
      testToast() {
        this.$muu.toast({
          text: '测试 toast',
          duration: 1
        });
      },
      beforeMediaUpload( file ) {
        console.log(file);
      },
      imageUploaded( files ) {
        console.log("files from `Home`: ", files);
      },
      imageRemoved( image ) {
        console.log("Image removed from `Home`: ", image);
      },
      uploadFail( err ) {
        alert(err.message);
      }
    },
    created() {
      const { $muu: muu } = this;

      console.log(muu);
    }
  }
</script>
