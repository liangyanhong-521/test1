<template>
  <el-main>
    <el-input type="text" placeholder="请输入要搜索的项目编号" prefix-icon="el-icon-search" style="width: 500px" v-model="input"></el-input>
    <el-button
      @click="handleDelete(scope.$index, scope.row)"
      size="mini"
      type="danger"
    >
      查询
    </el-button>
    <el-table
      :data="list"
      v-loading="loading"
      border
      height="680px"
      style="width: 100%"
    >
      <el-table-column
        label="编号"
        width="100"
        prop="id"
        align="center"
      ></el-table-column>
      <el-table-column
        label="项目类型"
        prop="type"
        width="400"
        align="center"
      ></el-table-column>
      <el-table-column
        label="项目名称"
        prop="name"
        width="500"
        align="center"
      ></el-table-column>
      <el-table-column label="起始时间" prop="time" width="200" align="center">
        <el-date-picker
          style="width: 300px"
          v-model="value1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300">
        <template slot-scope="scope">
          <el-button
            @click="handleDelete(scope.$index, scope.row)"
            size="mini"
            type="danger"
            >编辑
          </el-button>
          <el-button
            @click="handleDelete(scope.$index, scope.row)"
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
  </el-main>
</template>

<script>
import { getList } from "@/api/table";
import axios from 'axios';
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
      input: '',
      list: null,
      listLoading: true,
      info:{
           id: '',
           type: '',
           name: '',
           state: '',
           time: ''
      }
    }
  },

  mounted(){
    axios
    .get("..../.vscode/模拟数据/table.json")
    .then(response => this.info=response.data)
  },

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
  },
};
</script>
