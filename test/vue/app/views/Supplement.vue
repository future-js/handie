<template>
  <div>
    <Box>
      <List class="is-headless">
        <ListItem extra="杭州一骑轻尘信息技术有限公司">经销商</ListItem>
        <ListItem extra="申请星级，至【二星】">申请类型</ListItem>
        <ListItem extra="待补充">申请状态</ListItem>
      </List>
    </Box>
    <Box>
      <List>
        <ListItem extra="已上传" url="#/">签章人正反面身份证</ListItem>
        <ListItem :link="{name:'JSX', query: {test: 123}}">签章人手持身份证照片</ListItem>
        <ListItem>签章人手机号<router-link :to="{name: 'JSX'}" slot="extra">13857814433</router-link></ListItem>
      </List>
    </Box>
    <Box>
      <List>
        <ListItem url="http://maihaoche.com">法人正反面身份证</ListItem>
        <ListItem url="//maihaoche.com">法人手持身份证照片</ListItem>
        <ListItem extra="13857814433">法人手机号</ListItem>
        <ListItem url="/">法人个人征信报告</ListItem>
        <ListItem url="#/">法人个人或直系亲属房产证明<ListItemBrief>（选填）</ListItemBrief></ListItem>
      </List>
    </Box>
    <Box>
      <List>
        <ListItem url="#/">实际控制人正反面身份证</ListItem>
        <ListItem url="#/">实际控制人手持身份证照片</ListItem>
        <ListItem extra="13857814433">实际控制人手机号</ListItem>
        <ListItem url="#/">实际控制人个人征信报告</ListItem>
        <ListItem url="#/">实际控制人个人或直系亲属房产证明<ListItemBrief>（选填）</ListItemBrief></ListItem>
      </List>
    </Box>
    <Box>
      <List>
        <ListItem url="#/">人民银行企业征信报告</ListItem>
      </List>
    </Box>
    <Box>
      <List>
        <ListItem url="#/" multiline>近6个月的公司流水<ListItemBrief>（或用于公司走账的法定代表人流水）</ListItemBrief></ListItem>
      </List>
    </Box>
    <Box>
      <List>
        <ListItem url="#/">股东正反面身份证</ListItem>
        <ListItem url="#/">股东手持身份证照片</ListItem>
        <ListItem extra="13857814433">股东手机号</ListItem>
        <ListItem extra="50%">占股比例</ListItem>
        <ListItem url="#/">股东个人征信报告</ListItem>
        <ListItem url="#/">股东个人或直系亲属房产证明</ListItem>
      </List>
    </Box>
    <Box>
      <List>
        <ListItem url="#/">钉钉定位截屏照片</ListItem>
        <ListItem url="#/">门牌照片</ListItem>
        <ListItem url="#/">拍照照片</ListItem>
        <ListItem url="#/">内部经营环境照片</ListItem>
        <ListItem url="#/">经营场所视频</ListItem>
      </List>
    </Box>
    <Box>
      <List>
        <ListItem url="#/">基本经营情况表照片</ListItem>
        <ListItem url="#/">业务和签字人合影照片</ListItem>
        <ListItem url="#/">企业和品牌名称不一致说明照片</ListItem>
        <ListItem url="#/">注册地址和经营实际地址不一致说明照片</ListItem>
        <ListItem>实际经营地址</ListItem>
      </List>
    </Box>
    <Box>
      <List>
        <ListItem url="#/">卖好车廉洁公约照片</ListItem>
        <ListItem url="#/">法人和实际控制人签署的担保函照片</ListItem>
        <ListItem url="#/">签约视频</ListItem>
      </List>
    </Box>
  </div>
</template>

<script>
  import { Box, List, ListItem, ListItemBrief } from "../../../../src/vue/components/mobile";

  export default {
    name: "Supplement",
    components: {
      Box, List, ListItem, ListItemBrief
    }
  }
</script>
