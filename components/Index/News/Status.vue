<template>
    <ElRow>
        <ElCol   v-for="item in statusItems"  :span="24/cols">
            <el-statistic style="text-align: center;" :value="item.value">
                <template #title>
                  <div style="display: inline-flex; align-items: center;text-align: center;">
                    {{ item.name }}
                    <el-tooltip
                      effect="dark"
                      :content="item.tips"
                      placement="top"
                    >
                      <el-icon style="margin-left: 4px" :size="12">
                        <ElIcon-warning />
                      </el-icon>
                    </el-tooltip>
                  </div>
                </template>
                <template #suffix> {{ item.unit }}</template>
              </el-statistic>
        </ElCol>
    </ElRow>
</template>
<script lang="ts" setup>
import type { StatusItem } from '~/types/NewsShow';

const cols=3//显示的列数

const statusItems:StatusItem[] = [
    {
        name:'服务器数量',
        value: 1000,
        unit:'台',
        tips:'截至2024'
    },{
        name:'用户人数',
        value: 99,
        unit:'人',
        tips:'截至2024'
    },    {
        name:'剩余存储',
        value: 90,
        unit:'%',
        tips:'截至2024'
    },{
        name:'服务器数量',
        value: 1000,
        unit:'台',
        tips:'截至2024'
    },{
        name:'用户人数',
        value: 99,
        unit:'人',
        tips:'截至2024'
    },    {
        name:'剩余存储',
        value: 90,
        unit:'%',
        tips:'截至2024'
    },{
        name:'服务器数量',
        value: 1000,
        unit:'台',
        tips:'截至2024'
    },{
        name:'用户人数',
        value: 99,
        unit:'人',
        tips:'截至2024'
    },    {
        name:'剩余存储',
        value: 90,
        unit:'%',
        tips:'截至2024'
    }
]
</script>