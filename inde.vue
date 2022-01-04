<template lang="pug">
.page-groups
    .page-title
        | 用户组管理
        span.member-name(v-if="selectGroupName && !isIndexPage") ({{selectGroupName}})
    .page-content
        template(v-if="isIndexPage")
            lh-button.right-btn(type="primary", @click="openGroupsPopup") 新建用户组
            .filter-panel
                search-component(placeholder="搜索成员" @search="search")
            .table
                lh-table(v-if="!tableInfo.isFetching" :dataSource="tableInfo.list", :columns="tableInfo.columns", :loading="tableInfo.isFetching")
                    div(:slot="`column_${index}`", prop="operation", v-for="(item,index) in tableInfo.list")
                        lh-dropdown(:menuList="dropdownList", @on-change="onChange", :extraData="item")
                            lh-icon-ellipsis(size="24" class="icon-hover")
                    div(slot="footer")
                        .footer
                            .total 当前显示1-10条数据，共{{tableInfo.total}}条
                            lh-pagination(:totalnum="tableInfo.total", :startpage="pageNo", :perpagecount="pageSize" @lh-change="onPaginationChange")
        template(v-if="isMemberPage")
            lh-button.right-btn(type="primary", @click="openAddMemberPopup") 添加成员
            router-view
        create-group(@onConfirm="fetchTableList", ref="createGroupRef")
        add-member(ref="addMemberRef")
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watchEffect, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import searchComponent from '@/components/search/index.vue'
import useTableList from '@/hooks/groups/tableList';
import CreateGroup from './createGroup.vue'
import AddMember from './addMember.vue';

const onPaginationChange = (e: CustomEvent) => {
    const page_no = e.detail.value;
    pageNo.value = page_no;
    fetchTableList({ page_no })
}
const pageSize = 10;
const pageNo = ref(1);
const route = useRoute();
const router = useRouter();
const createGroupRef = ref();
const addMemberRef = ref();
const selectGroupName = ref('');
const currentPage = ref<string>('groups');

const dropdownList = [
    {name: '添加成员', value: 'addMember', disabled: true},
    {name: '管理成员', value: 'toMembers'},
    {name: '修改用户组', value: 'modifyGroup'},
    '-',
    {name: '删除', value: 'deleteGroup', status: 'danger' },
];
const { tableInfo, fetchTableList } = useTableList({
    type: 'groups',
    size: 10,
    columns: [
        { label: '用户组名称', prop: 'group_name' },
        { label: '描述', prop: 'description' },
        { label: '成员数', prop: 'count' },
        { label: '操作', prop: 'operation' }
    ]
});
const openGroupsPopup = () => createGroupRef.value?.open();
const openAddMemberPopup = () => addMemberRef.value?.open();
const search = (v: string) => {
    fetchTableList({ keyword: v });
    pageNo.value = 1;
};
const isIndexPage = computed(() => currentPage.value === 'groups');
const isMemberPage = computed(() => currentPage.value === 'groupMembers');
const onChange = (e: CustomEvent) => {
    const item = e.detail
    switch (item.value) {
        case 'addMember':
            openAddMemberPopup();
            break;
        case 'toMembers':
            const extraData = item.extraData || {};
            selectGroupName.value = extraData.group_name;
            router.push(`/groups/${extraData.group_id}`);
            break;
        case 'modifyGroup':
            break;
        case 'deleteGroup':
            break;
    }
}
watchEffect(() => {
    currentPage.value = route.name as string;
})

onBeforeMount(fetchTableList);

</script>

<style lang="sass" scoped>
    .page-content
        position: relative
    .right-btn
        position: absolute
        right: 0
        top: -56px
    .filter-panel
        display: flex
        align-items: center
        margin-bottom: 24px
        justify-content: space-between
        :deep(.lh-input)
            width: 240px
    .footer
        display: flex
        align-items: center
        justify-content: space-between
        :deep(.lh-pagination)
            margin-top: 0
</style>

