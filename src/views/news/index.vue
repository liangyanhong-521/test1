<template>
  <el-main>
    <el-input
      v-model="news.id"
      type="text"
      placeholder="请输入要搜索的新闻编号"
      prefix-icon="el-icon-search"
      style="width: 500px"
    />
    <el-button
      size="mini"
      @click="handleSelect()"
    >
      查询
    </el-button>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      height="680px"
      style="width: 100%"
    >
      <el-table-column label="编号" width="50" prop="id" align="center" />
      <el-table-column
        label="新闻标题"
        prop="title"
        width="400"
        align="center"
      />
      <el-table-column
        label="新闻内容"
        prop="content"
        width="400"
        align="center"
      />
      <el-table-column
        label="发布时间"
        prop="time"
        width="150"
        align="center"
      />
      <el-table-column label="操作" align="center" width="300">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑
          </el-button>

          <el-button
            size="mini"
            type="danger"
            @click="handleAdd()"
          >添加
          </el-button>

          <el-button
            type="danger"
            size="mini"
            @click="handleDelete(scope.$index, scope.row)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页底部 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="60%">
      <div>
        <el-tag>新闻标题 </el-tag>
        <el-input
          v-model="news.title"
          size="small"
          class="updateinput"
        />
        <el-tag>新闻内容</el-tag>
        <el-input
          v-model="news.content"
          size="small"
          class="updateinput"
        />
        <el-tag>发布时间</el-tag>
        <el-input
          v-model="news.time"
          size="small"
          class="updateinput"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="Update()"
        >确 定</el-button>
      </span>
    </el-dialog>
  </el-main>
</template>

<script>
import { getList, ListAdd, ListDelete, ListEdit, ListSelect } from '@/api/news'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [],
      listLoading: true,
      dialogVisible: false,
      dialogTitle: '添加新闻',
      news: {
        id: '',
        content: '',
        title: '',
        time: ''
      }
    }
  },

  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then((response) => {
        this.list = response.data
        this.listLoading = false
      })
    },
    handleSelect(index, data) {
      const formData = new FormData()
      formData.append('id', this.news.id)
      ListSelect(formData).then((response) => {
        console.log(formData)
        // this.fetchData()
        this.dialogVisible = false
      })
    },
    Update() {
      if (!this.news.id) {
        // 新增
        const formData = new FormData()
        formData.append('id', this.news.id)
        formData.append('content', this.news.content)
        formData.append('title', this.news.title)
        formData.append('time', this.news.time)
        ListAdd(formData).then((response) => {
          this.fetchData()
          this.dialogVisible = false
        })
      } else {
        // 编辑
        const formData = new FormData()
        formData.append('id', this.news.id)
        formData.append('content', this.news.content)
        formData.append('title', this.news.title)
        formData.append('time', this.news.time)
        ListEdit(formData).then((response) => {
          this.fetchData()
          this.dialogVisible = false
        })
      }
    },
    handleAdd(index, data) {
      this.news = {
        id: '',
        content: '',
        title: '',
        time: ''
      }
      this.dialogTitle = '添加新闻'
      this.dialogVisible = true
      // this.activeItemIndex = 0
    },
    handleDelete(index, data) {
      // const Data = new Data()
      // Data.append('id', data.id)
      this.$confirm(
        '此操作将永久删除该[' + data.title + '] 新闻，是否继续？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        ListDelete(data.id).then((response) => {
          this.fetchData()
          this.dialogVisible = false
        })
      })
    },

    handleEdit(index, data) {
      this.dialogTitle = '编辑新闻'
      this.dialogVisible = true
      this.news = data
      // }
    }
  }
}
</script>
<style>
.newstable {
  margin-top: 10px;
}
</style>

