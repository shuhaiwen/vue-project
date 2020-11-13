<!--
 * @Author: your name
 * @Date: 2020-07-23 10:05:50
 * @LastEditTime: 2020-08-06 20:29:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \FrontEnd\js\vue\imitate-wzry\admin\src\components\Tables\Table.vue
-->
<template>
  <div class="app-container" style="width: 100%">
    <el-table
      :data="tableData"
      border
      stripe
      height="80vh"
      style="width: 100%"
      @sort-change="sortChange"
      @filter-change="filterChange"
      :row-class-name="tableRowClassName"
    >
      <!--label: 表头名
        prop：与el-table中:data="tableData"的tableData数组中的对象成员匹配
       column-key 与<el-table>中filter-change配合使用
       width：表列宽
        fixed: 固定列可指定left right，默认left
        :filters：设定过滤选项 
      :filter-method：过滤的判断方法-->
      <el-table-column
        label="姓名"
        prop="Auth"
        column-key="Auth"
        width="100"
        align="center"
        fixed
        :filters="filterAuth"
      >
        <template slot-scope="scope">
          <el-tag :type="primary" disable-transitions>
            {{ scope.row.Auth }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="名称" prop="Function" width="200" align="center">
        <template slot="header" slot-scope="scope">       
            <el-input
              type="text"
              v-model="searchFun"
              prefix-icon="el-icon-search"
              placeholder="请输入"
              size="mini"
            >{{scope==""}}</el-input>
        </template>
        <template slot-scope="scope">
          <el-tag :type="primary" disable-transitions>
            {{ scope.row.Function }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="分类"
        prop="Type"
        width="100"
        align="center"
        column-key="Type"
        :filters="filterType"
      >
        <template slot-scope="scope">
          <el-tag :type="primary" disable-transitions>
            {{ scope.row.Type }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        prop="State"
        column-key="State"
        width="100"
        align="center"
        :filters="filterState"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.State === '完成' ? 'success' : 'primary'"
            disable-transitions
            >{{ scope.row.State }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        sortable
        label="日期"
        prop="UpDate"
        width="200"
        align="center"
      >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.UpDate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="注释"
        prop="Comments"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="right" fixed="right">
        <template v-slot="{ row, $index }">
          <el-button size="mini" @click="handleEdit(row, $index)"
            >Edit</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(row, $index)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      :total="total"
      :limit.sync="listQuery.limit"
      :page.sync="listQuery.page"
      @pagination="getList"
    ></Pagination>
    <el-dialog
      title="OTX"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="rowData" ref="formRef" label-width="80px">
        <el-form-item label="Auth">
          <el-select v-model="rowData.Auth" placeholder="请选择">
            <div v-for="item in filterAuth" :key="item.text">
              <el-option :label="item.text" :value="item.value"></el-option>
            </div>
          </el-select>
        </el-form-item>
        <el-form-item label="名称">
          <el-input
            placeholder="请输入内容"
            v-model="rowData.Function"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="rowData.Type" placeholder="请选择">
            <span v-for="item in filterType" :key="item.text">
              <el-option :label="item.text" :value="item.value"></el-option>
            </span>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="rowData.State">
            <span v-for="item in filterState" :key="item.text">
              <el-radio :label="item.text"></el-radio>
            </span>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="日期">
          <el-input
            placeholder="请选择日期"
            prefix-icon="el-icon-date"
            v-model="rowData.UpDate"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="注释">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入内容"
            v-model="rowData.Comments"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updataData">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { update, download } from "../../network/otxData";
import Pagination from "../Pagination/index";
export default {
  name: "Table",
  data() {
    return {
      total: 20,
      tableData: [],
      dialogVisible: false,
      listQuery: {
        page: 1,
        limit: 20,
        Function: "",
        sort: {
          UpDate: false,
        },
        filter: {
          Auth: [],
          Type: [],
          State: [],
        },
      },
      filterAuth: [
        { text: "shw", value: "shw" },
        { text: "Bob", value: "Bob" },
        { text: "Anny", value: "Anny" },
      ],
      filterType: [
        { text: "Term", value: "Term" },
        { text: "Action", value: "Action" },
      ],
      filterState: [
        { text: "完成", value: "完成" },
        { text: "未完成", value: "未完成" },
        { text: "待定", value: "待定" },
      ],
      searchFun: "",
      index: 0,
      rowData: {
        _id: "",
        Auth: "",
        Type: "",
        State: "",
        UpDate: "",
        Comments: "",
      },
    };
  },
  components: {
    Pagination,
  },
  computed: {},
  methods: {
    sortChange(data) {
      const { prop, order } = data;
      this.listQuery.sort[prop] = order === "ascending" ? false : true;
      this.downloadData();
    },
    filterChange(filters) {
      this.searchFun=''
      for (const key in filters) {
        this.listQuery.filter[key] = filters[key];
      }
    },
    tableRowClassName({ row }) {
      if (row.State === "未完成") {
        return "warning-row";
      } else if (row.State === "完成") {
        return "success-row";
      }
      return "info-row";
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    updateTableRowData(index) {
      this.tableData[index].Auth = this.rowData.Auth;
      this.tableData[index].Function = this.rowData.Function;
      this.tableData[index].Type = this.rowData.Type;
      this.tableData[index].State = this.rowData.State;
      this.tableData[index].UpDate = this.rowData.UpDate;
      this.tableData[index].Comments = this.rowData.Comments;
    },
    updataData() {
      this.dialogVisible = false;
      this.rowData.UpDate = this.formatTime(new Date());
      update({
        id: this.rowData._id,
        rowData: {
          Auth: this.rowData.Auth,
          Function: this.rowData.Function,
          Type: this.rowData.Type,
          State: this.rowData.State,
          UpDate: new Date(),
          Comments: this.rowData.Comments,
        },
      })
        .then(() => {
          this.$notify({
            title: "Success",
            message: "Update Successfully",
            type: "success",
            showClose: false,
            duration: 500,
          });
        })
        .catch((err) => {
          this.$notify.error({
            title: "error",
            message: `Update failed ${err}`,
            duration: 0,
          });
        });
      this.updateTableRowData(this.index);
    },
    downloadData() {
      download({ listQuery: this.listQuery, search: this.searchFun }).then(
        (res) => {
          this.tableData = res.data.data;
          this.total = res.data.total;
          this.$notify({
            title: "Success",
            message: "Update Successfully",
            type: "success",
            showClose: false,
            duration: 2000,
          });
        },
        (error) => {
          this.$message(error);
        }
      );
    },
    handleEdit(row, index) {
      this.dialogVisible = true;
      this.index = index;
      this.rowData = Object.assign({}, row);
      console.log("row: ", row);
    },
    timeConnect(m) {
      return m < 10 ? "0" + m : m;
    },
    formatTime(time) {
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      return (
        y +
        "-" +
        this.timeConnect(m) +
        "-" +
        this.timeConnect(d) +
        " " +
        this.timeConnect(h) +
        ":" +
        this.timeConnect(mm) +
        ":" +
        this.timeConnect(s)
      );
    },
  },
  watch: {
    listQuery: {
      handler() {
        this.downloadData();
      },
      deep: true,
    },
    searchFun() {
      this.downloadData();
      console.log(this.searchFun);
    },
  },
  mounted() {
    this.downloadData();
  },
};
</script>

<style lang="less">
.el-table {
  .success-row {
    background: #f0f9eb;
  }
  .warning-row {
    background: rgb(231, 109, 79);
  }
  .info-row {
    background: #98ca0f;
  }
}
</style>
