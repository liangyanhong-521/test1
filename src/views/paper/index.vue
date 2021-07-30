<template>
  <el-main>
    <el-input
      placeholder="请输入要搜索的论文编号"
      prefix-icon="el-icon-search"
      style="width: 500px"
      v-model="input"
    ></el-input>
    <el-button
      @click="handleDelete(scope.$index, scope.row)"
      size="mini"
      type="danger"
      > 查询
    </el-button>
    <el-table
      :data="list"
      v-loading="loading"
      border
      height="680px"
      style="width: 100%"
    >
      <el-table-column label="编号" width="100" prop="id" align="center">
      </el-table-column>
      <el-table-column
        label="论文内容"
        prop="context"
        width="600"
        align="center"
      >
      </el-table-column>
      <el-table-column label="发表时间" prop="time" width="200" align="center">
          <el-date-picker v-model="value1" type="date" placeholder="选择日期" style="width:200px"></el-date-picker>
      </el-table-column>
      <el-table-column
        label="论文pdf上传"
        prop=""
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center">
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
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15]"
      :page-size="pagesize"
      layout="total,jumper,prev, pager, next,sizes"
      :total="files_count"
    ></el-pagination>
  </el-main>
</template>

<script>
import { getList } from "@/api/table";
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
    };
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
