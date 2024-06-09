<template slot-scope>
    <el-carousel height="300px" motion-blur>
        <el-carousel-item class="newsShow" v-for="news in newsCovers" :key="news.key" :label="news.name" v-on:click="navigateTo(news.url)">
            <el-image>
                <template #placeholder>
                    <ElText type="info">加载中...</ElText>
                  </template>
                <template #error>
                      <el-icon size="200"><ElIcon-picture /></el-icon>
                  </template>
            </el-image>
            <h6>{{news.description}}</h6>
       
        </el-carousel-item>
    </el-carousel>
</template>
<script lang="ts" setup>
import { ElText } from 'element-plus'
import type { NewsCover } from '~/types/NewsShow';

const newsCovers:NewsCover[] = [
    {
        key:1,
        name:'Test1',
        url:'/apply',
        description:'测试一'
    },
    {
        key:2,
        name:'Test2',
        url:'/apply',
        description:'测试二'
    },
    {
        key:3,
        name:'Test3',
        url:'/status',
        description:'测试三'
    }
]
</script>
<style>
.newsShow {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
 }
</style>