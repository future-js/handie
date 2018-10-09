<template>
  <Submission class="Shareholder" @submit="toastOption.show = true">
    <Box>
      <List>
        <ListItem>股东身份<XButton
          :icon="{type: 'right', append: true}"
          inline
          dummy
          @click="showShareholderTypes"
          slot="extra">{{ type || "请选择股东身份" }}</XButton>
        </ListItem>
        <InputItem placeholder="请填写实名认证手机号">股东手机号</InputItem>
        <InputItem
          placeholder="请填写实际占股比例"
          @input="inputing"
          @change="changed">占股比例</InputItem>
        <ListItem class="ListItem--sizeFull" v-for="(n, i) in [1, 2, 3, 4, 5]" :key="i">股东正反面身份证
          <Flex class="MediaItems">
            <MediaItem
              url="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
              @click="mediaClicked" />
            <MediaItem
              url="https://dn-mhc.qbox.me/DF4B90A9-ECD9-4AB8-AC92-33D094906C46.mp4"
              @click="mediaClicked" />
          </Flex>
          <Flex>
            <MediaPicker
              class="PersonIdCard PersonIdCard--front"
              media="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
              url="http://172.21.0.169:8080/crm/uploadImageNew.json"
              @upload="imageUploaded"
              @remove="imageRemoved" />
            <MediaPicker
              class="PersonIdCard PersonIdCard--back"
              media="https://dn-mhc.qbox.me/DF4B90A9-ECD9-4AB8-AC92-33D094906C46.mp4"
              type="video"
              url="http://172.21.0.169:8080/crm/uploadImageNew.json"
              @upload="imageUploaded"
              @remove="imageRemoved" />
            <MediaPicker
              class="PersonIdCard PersonIdCard--back"
              type="audio"
              url="http://172.21.0.169:8080/crm/uploadImageNew.json"
              @upload="imageUploaded"
              @remove="imageRemoved" />
          </Flex>
        </ListItem>
      </List>
    </Box>
    <ActionSheet
      title="请选择股东身份"
      :actions="types"
      :show="shareholderTypesShown"
      @trigger="onShareholderTypeSelected"
      @hidden="onShareholderTypeHidden" />
    <Toast :show="toastOption.show" @hidden="toastOption.show = false">{{ toastOption.message }}</Toast>
  </Submission>
</template>

<script>
  import {
    Flex, Icon, Toast, Submission, Box,
    List, ListItem, ListItemBrief, InputItem,
    MediaItem, MediaPicker, ActionSheet, XButton } from '../../../../src/vue/components/mobile';

  export default {
    name: 'Shareholder',
    components: {
      Flex, Icon, Toast, Submission, Box,
      List, ListItem, ListItemBrief, InputItem,
      MediaItem, MediaPicker, ActionSheet, XButton
    },
    data() {
      return {
        type: null,
        types: ['签章人', '法定代表人', '实际控制人', '其他'],
        shareholderTypesShown: false,
        images: [{
          url: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'
        }, {
          url: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'
        }, {
          url: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'
        }],
        toastOption: {
          show: false,
          message: '测试 Toast'
        }
      }
    },
    methods: {
      showShareholderTypes() {
        this.shareholderTypesShown = true;
      },
      onShareholderTypeSelected( item ) {
        this.type = item.text;
      },
      onShareholderTypeHidden() {
        this.shareholderTypesShown = false;
      },
      imageUploaded( url ) {
        console.log("%s uploaded", url);
      },
      imageRemoved( url ) {
        console.log("%s removed", url);
      },
      inputing( ...args ) {
        console.log("inputing: ", ...args);
      },
      changed( ...args ) {
        console.log("changed: ", ...args);
      },
      mediaClicked() {
        console.log(arguments);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../stylesheets/helper";

  .Shareholder {
    background-color: #fff;

    /deep/ {
      .ImageList {
        margin: {
          top: rem(20px);
          bottom: rem(20px);
        }
      }

      .List:last-child {
        border-bottom-width: 0;

        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 2dppx) {
          &:after {
            display: none;
          }
        }
      }
    }
  }

  .MediaItems /deep/ .ImageItem {
    width: 50%;
  }

  .PersonIdCard {
    $w: rem(312px);
    $h: rem(197px);

    width: $w;

    /deep/ {
      .ImageItem {
        &.ImageItem--add,
        > div {
          &:after {
            padding-top: 100% * $h / $w;
          }
        }

        &.ImageItem--add {
          background: {
            image: url("https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg");
            size: cover;
          }
        }
      }
    }
  }
</style>
