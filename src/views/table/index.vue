<template>
  <el-main>
    <el-input
      v-model="tabledata.id"
      type="text"
      placeholder="请输入要搜索的项目基金编号"
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
        label="项目类型"
        prop="type"
        width="350"
        align="center"
      />
      <el-table-column
        label="项目名称"
        prop="title"
        width="400"
        align="center"
      />
      <el-table-column
        label="项目状态"
        prop="projectTypesId"
        width="50"
        align="center"
      />
      <el-table-column
        label="起始时间"
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="50%">
      <div>
        <el-tag>项 目 基 金 类 型 </el-tag>
        <el-input
          v-model="tabledata.type"
          size="small"
          class="updateinput"
        />
        <el-tag>项 目 基 金 名 称 </el-tag>
        <el-input
          v-model="tabledata.title"
          size="small"
          class="updateinput"
        />
        <el-tag>项 目 基 金 状 态 </el-tag>
        <el-input
          v-model="tabledata.projectTypesId"
          size="small"
          class="updateinput"
        />
        <el-tag>项目基金起始时间</el-tag>
        <el-input
          v-model="tabledata.time"
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
import { getList, ListAdd, ListDelete, ListEdit, ListSelect } from '@/api/table'
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
      dialogTitle: '添加项目基金',
      tabledata: {
        id: '',
        type: '',
        title: '',
        projectTypesId: '',
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
      formData.append('id', this.tabledata.id)
      ListSelect(formData).then((response) => {
        console.log(formData)
        // this.fetchData()
        this.dialogVisible = false
      })
    },
    Update() {
      if (!this.tabledata.id) {
        // 新增
        const formData = new FormData()
        formData.append('id', this.tabledata.id)
        formData.append('type', this.tabledata.type)
        formData.append('title', this.tabledata.title)
        formData.append('projectTypesId', this.tabledata.projectTypesId)
        formData.append('time', this.tabledata.time)
        ListAdd(formData).then((response) => {
          this.fetchData()
          this.dialogVisible = false
        })
      } else {
        // 编辑
        const formData = new FormData()
        formData.append('id', this.tabledata.id)
        formData.append('type', this.tabledata.type)
        formData.append('title', this.tabledata.title)
        formData.append('projectTypesId', this.tabledata.projectTypesId)
        formData.append('time', this.tabledata.time)
        ListEdit(formData).then((response) => {
          this.fetchData()
          this.dialogVisible = false
        })
      }
    },
    handleAdd(index, data) {
      this.tabledata = {
        id: '',
        type: '',
        title: '',
        projectTypesId: 0,
        time: ''
      }
      this.dialogTitle = '添加项目基金'
      this.dialogVisible = true
      // this.activeItemIndex = 0
    },
    handleDelete(index, data) {
      // const Data = new Data()
      // Data.append('id', data.id)
      this.$confirm(
        '此操作将永久删除该[' + data.title + '] 项目基金，是否继续？',
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
      this.dialogTitle = '编辑项目基金'
      this.dialogVisible = true
      this.tabledata = data
      //   this.activeItemIndex = 0
      // }
      // handleSelect
    }
  }
}
</script>
<style scoped>
.updateinput {
  width: 600px;
  margin-left: 8px;
}
</style>
