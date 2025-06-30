<script setup lang="ts">

import { ref, onMounted } from 'vue'
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus'
import moment from 'moment'

import TheWelcome from '../components/TheWelcome.vue'
import API from '../api/index.js'

const store = useStore();

// const token = ref("");
const token = ref("")
const content = ref("")
// const list = ref([])
const noteListData = ref([])
const noteEditData = ref({})
// const userNameData = ref('')

const localStorageToken = localStorage.getItem('token')


const refreshNoteList = () => {
  // if (!localStorage.getItem('token')) return;
  if (!localStorageToken) return ;
  // API.NOTE.LIST().then((res) => {
  API.NOTE.LIST().then((data) => {
    // console.log('res.data', res.data)
    console.log('res.data', data)
    // list.value = res.data
    // console.log('list.value', list.value, list)
    // noteListData.value = res.data
    noteListData.value = data
    console.log('noteListData.value', noteListData.value, noteListData)
  })
}

// const getUserName = () => {
//   if (!localStorageToken) return ;
//   // API.NOTE.LIST().then((res) => {
//   API.USER.NAME().then((data: { name: string } = { name: '' }) => {
//     // console.log('res.data', res.data)
//     console.log('res.data', data.name)
//     // list.value = res.data
//     // console.log('list.value', list.value, list)
//     // noteListData.value = res.data
//     userNameData.value = data.name
//     console.log('userNameData.value', userNameData.value, userNameData)
//   })
// }

// const delNote = ({ uuid }) => {
//   API.NOTE.DEL({ uuid }).then(() => {
//     refreshNoteList()
//   })
// }

// const onClick = () => {
//   console.log('onClick 2', content.value)
//   API.NOTE.ADD({ content: content.value })
//   refreshNoteList()
// }

const onSaveNote = () => {
  console.log('onClick 2', content.value)
  API.NOTE.ADD({ content: content.value }).then(() => {
    content.value = ''
    ElMessage({
      message: '保存笔记成功',
      type: 'success'
    })
    noteEditData.value = {}
    refreshNoteList()
  })
}

const onDelNote = ({ uuid }) => {
  API.NOTE.DEL({ uuid }).then(() => {
    ElMessage({
      message: '删除笔记成功',
      type: 'success'
    })
    refreshNoteList()
  })
}

const onEditNote = ({ uuid, content }) => {
  noteEditData.value[uuid] = {
    type: 'edit',
    content: decodeURIComponent(content)
  }
  console.log('onEditNote content', content)
  // noteEditData.value[uuid] = content
}

const onEditNoteCancel = ({ uuid, content }) => {
  noteEditData.value[uuid] = null
}

const onEditNoteSave = ({ uuid, content }) => {
  API.NOTE.EDIT({ uuid, content }).then(() => {
    noteEditData.value[uuid] = null
    refreshNoteList()
  })
  ElMessage({
    message: '保存笔记成功',
    type: 'success'
  })
}


// function onClick(event) {
//   console.log('onClick', event)
//   API.NOTE.ADD(content)
// }

// const token = ref("");

// onMounted(() => {
//   const localStorageToken = localStorage.getItem('token')
//   token.value = localStorageToken
// })

onMounted(() => {
  // const localStorageToken = localStorage.getItem('token')
  // token.value = localStorageToken
  token.value = localStorage.getItem('token')
  console.log(`the component is now mounted.`)
  console.log('API', API)
  refreshNoteList()
  // getUserName()
  // API.NOTE.LIST().then((res) => {
  //   console.log('res.data', res.data)
  //   noteListData.value = res.data
  //   console.log('noteListData.value', noteListData.value, noteListData)
  // })
  // API.NOTE.ADD("hello world 200")
})
</script>

<template>
  <!-- <main v-if="token"> -->
  <main v-if="$store.state.token">
    <div class="note-save">
      <!-- 11 {{ $store.state.token }} -->
      <!-- <el-row>
        <el-col :span="24">
          <h1 class="title">龚思凯笔记</h1>
        </el-col>
      </el-row> -->
      <!-- <input v-model="content" /> -->
      <!-- <input v-model="content" placeholder="点我输入笔记内容"/> -->
      <el-row>
        <el-col :span="15">
          <el-input v-model="content" placeholder="点我输入笔记内容"/>
        </el-col>
      <!-- <button @click="onClick(1)">add note</button> -->
      <!-- <button @click="onClick(1)">保存笔记</button> -->
      <!-- <button @click="onSaveNote(1)">保存笔记</button> -->
        <el-col :span="9">
          <!-- <el-button class="save-button" type="primary" @click="onSaveNote(1)" :disabled="''">保存笔记</el-button> -->
          <el-button class="save-button" type="primary" @click="onSaveNote(1)">保存笔记</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- <TheWelcome /> -->
    <!-- <div v-for="(item, index) in list" :key="index"> -->
    <div v-for="(item, index) in noteListData" :key="index">
      <hr />
      <div class="note-buttons">
        <!-- <el-button type="primary" :icon="Edit" circle /> -->
        <!-- <button v-if="!noteEditData[item.uuid]" @click="onEditNote({ uuid: item.uuid, content: item.content })">编辑</button> -->
        <el-button type="primary"  v-if="!noteEditData[item.uuid]" @click="onEditNote({ uuid: item.uuid, content: item.content })">编辑</el-button>
        <!-- <button v-if="noteEditData[item.uuid]" @click="onEditNoteCancel({ uuid: item.uuid, content: item.content })">取消编辑</button> -->
        <el-button type="primary" v-if="noteEditData[item.uuid]" @click="onEditNoteCancel({ uuid: item.uuid, content: item.content })">取消编辑</el-button>
        <!-- <button v-if="noteEditData[item.uuid]" @click="onEditNoteSave({ uuid: item.uuid, content: noteEditData[item.uuid].content })">保存编辑</button> -->
        <el-button type="primary" v-if="noteEditData[item.uuid]" @click="onEditNoteSave({ uuid: item.uuid, content: noteEditData[item.uuid].content })">保存编辑</el-button>
        <!-- <el-button type="danger" :icon="Delete" circle /> -->
        <!-- <button v-if="!noteEditData[item.uuid]" @click="onDelNote({ uuid: item.uuid })">删除</button> -->
        <el-button type="danger" v-if="!noteEditData[item.uuid]" @click="onDelNote({ uuid: item.uuid })">删除</el-button>
      </div>
      <div>
        <p class="note-date">
          <!-- {{ decodeURIComponent(moment(item.create_time).format('lll')) }} -->
          <!-- {{ decodeURIComponent(moment(item.create_time, "YYYY MM DD hh:mm:ss")) }} -->
          <!-- {{ decodeURIComponent(moment(item.create_time).format("YYYY MM DD hh:mm:ss")) }} -->
          <!-- {{ decodeURIComponent(moment(item.create_time).format("YYYY-MM-DD hh:mm:ss")) }} -->
          {{ decodeURIComponent(moment(item.create_time).format("YYYY年MM月DD日 HH时mm分ss秒")) }}
        </p>
        <!-- <p>
          {{ decodeURIComponent(item.content) }}
        </p> -->
        <!-- <textarea width="200" v-if="!noteEditData[item.uuid]" disabled>
          {{ decodeURIComponent(item.content) }}
        </textarea> -->
        <!-- <p class="note-text" v-if="!noteEditData[item.uuid]" disabled v-html="`${decodeURIComponent(item.content)}`"> -->
        <!-- <p class="note-text" v-if="!noteEditData[item.uuid]" disabled v-html="item.content"> -->
        <p class="note-text" v-if="!noteEditData[item.uuid]" disabled>
          <!-- {{ decodeURIComponent(item.content) }} -->
          <!-- 1 -->
          <!-- <span v-html="decodeURIComponent(item.content.replace('\n', '<br />'))"></span> -->
          <!-- <span v-html="decodeURIComponent(item.content.replace('%0A', '<br />'))"></span> -->
          <!-- <span v-html="decodeURIComponent(item.content.replaceAll('%20', `<span style='visiblity: hidden'>1</span>`).replaceAll('%0A', '<br />'))"></span> -->
          
          <!-- <vue-markdown :content="item.content"></vue-markdown> -->
          <my-markdown :source="decodeURIComponent((item.content || ''))" />

          <!-- <span v-html="decodeURIComponent( (item.content || '').replaceAll('%20', `<span style='visibility: hidden'>8</span>`).replaceAll('%0A', '<br />'))"></span> -->

        </p>
        <!-- <textarea class="note-textarea note-textarea-text" v-if="noteEditData[item.uuid]" v-model="noteEditData[item.uuid].content"></textarea> -->

        <!-- <textarea class="note-textarea note-textarea-text" rows="5" v-if="noteEditData[item.uuid]" v-model="noteEditData[item.uuid].content"></textarea> -->
        <textarea class="note-textarea note-textarea-text" rows="15" v-if="noteEditData[item.uuid]" v-model="noteEditData[item.uuid].content"></textarea>
        <!-- <textarea class="note-textarea note-textarea-text" :rows="((item || {}).content || '').match(/%0A/g).length > 5 ? item.content.match(/%0A/g).length : 5" v-if="noteEditData[item.uuid]" v-model="noteEditData[item.uuid].content"></textarea> -->
        <!-- <br /> -->
        <!-- <hr /> -->
      </div>
      <div>

      </div>
    </div>
    <!-- <input v-model="content" />
    <button @click="onClick(1)">add note</button> -->
    <br />
    <br />
    <br />
    <br />
    <br />
  </main>
  <!-- <main v-if="!token"> -->
  <main v-if="!$store.state.token">
    <!-- <div> -->
      <!-- 未登录 -->
      <!-- 11 {{ JSON.stringify($store.state) }} -->
    <!-- </div> -->
    <h1 class="not-login">
      未登录
      <!-- 11 {{ JSON.stringify($store.state) }} -->
    </h1>
  </main>
</template>

<style>
  /* .title {
    padding: 10px 0px;
  } */
  .note-save, .note-buttons {
    padding: 10px 20px;
  }
  .note-date {
    padding: 0px 20px 10px 20px;
  }
  .note-text {
    padding: 0px 20px 10px 20px;
  }
  .note-textarea {
    margin: 0px 20px 10px 20px;
    /* width: 300px; */
    width: 88%;
  }
  .note-textarea {
    padding: 10px 20px;
  }
  .save-button {
    margin-left: 10px;
  }
  .not-login {
    padding-top: 10px;
    text-align: center;
  }
</style>
