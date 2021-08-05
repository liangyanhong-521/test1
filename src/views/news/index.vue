<template>
  <el-main>
    <div>
      <el-input
        type="text"
        placeholder="请输入要搜索的新闻标题"
        prefix-icon="el-icon-search"
        style="width: 500px"
        @keydown.enter.native="handleAdd"
        size="small"
        v-model="news.title"
      ></el-input>
      <el-button
        @click="handleSearch(scope.$index, scope.row)"
        size="small"
        type="danger"
        style="margin-left: 5px"
        >查询
      </el-button>
    </div>
    <div class="newstable">
      <el-table
        :data="list"
        v-loading="loading"
        border
        height="680px"
        style="width: 100%"
        size="small"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          label="编号"
          width="100"
          prop="id"
          align="center"
        ></el-table-column>
        <el-table-column
          label="新闻标题"
          prop="title"
          width="400"
          align="center"
        ></el-table-column>
        <el-table-column
          label="新闻内容"
          prop="content"
          width="500"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-button
              @click="handleEdit(scope.$index, scope.row)"
              size="mini"
              type="danger"
              >编辑
            </el-button>
            <el-button
              @click="handleAdd(scope.$index, scope.row)"
              size="mini"
              type="danger"
              >添加
            </el-button>
            <el-button
              @click="handleDelete(scope.$index, scope.row)"
              size="mini"
              type="danger"
              >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页底部 -->
    </div>
    <el-dialog title="添加新闻" :visible.sync="dialogVisible" width="80%">
      <div>
        <el-form ref="empForm" :model="emp" label-position="80px">
          <el-row>
            <el-col :span="6">
              <el-form-item label="新闻标题:" prop="title">
                 <el-input size="small" prefix-icon="el-icon-edit" placeholder="请输入新闻标题" v-model="emp.title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6"></el-col>
            <el-col :span="6"></el-col>
            <el-col :span="6"></el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </el-main>
</template>

<script>
import { getList } from "@/api/table";
import axios from "axios";
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      news: {
        id: '',
        title: '',
        content: ''
      },
      list: [],
      dialogVisible: false,
      emp: {
        id: '',
        title: '',
        content: ''
      },
    };
  },
  /* mounted() {
    this.fetchData;
  }
   created:在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
   mounted:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作.
  */
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getList().then((response) => {
        this.list = response.data.items;
        this.listLoading = false;
      });
    },
    handleSearch(index, data) {},
    handleEdit(index, data) {},
    handleAdd(index, data) {
      this.dialogVisible = true;
      if (this.news.title) {
        this.postList(this.news).then((response) => {
          if (response) {
            this.fetchData();
            this.news.title = "";
          }
        });
      } else {
        this.$message.error("新闻标题不能为空");
      }
    },
    handleDelete(index, data) {
      this.$confirm("此操作将永久删除该新闻, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
<style>
.newstable {
  margin-top: 10px;
}
</style>

