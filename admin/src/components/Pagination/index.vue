<!--
 * @Author: your name
 * @Date: 2020-07-24 17:29:04
 * @LastEditTime: 2020-07-27 13:54:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \FrontEnd\js\vue\imitate-wzry\admin\src\components\Pagination\index.vue
-->
<template>
  <el-pagination
    background
    :layout="layout"
    :current-page.sync="currentpage"
    :page-sizes="pageSizes"
    :page-size.sync="pageSize"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  ></el-pagination>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    total: {
      required: true,
      type: Number,
      default: 100,
    },
    layout: {
      required: true,
      type: String,
      default: "total, sizes, prev, pager, next, jumper",
    },
    page: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 20,
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50];
      },
    },
  },
  computed: {
    currentpage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit("update:page", val);
      },
    },
    pageSize: {
      get() {
        return this.limit;
      },
      set(val) {
        this.$emit("update:limit", val);
      },
    },
  },
  methods: {
    handleSizeChange(pageLimit) {
      this.$emit("pagination", { page: this.currentpage, limit: pageLimit });
    },
    handleCurrentChange(pageNum) {
      this.$emit("pagination", { page: pageNum, limit: this.pageSizes });
    },
  },
};
</script>

<style></style>
