<template>
    <div>
        <t-navbar :fixed="false">
            <template #left>
                <t-search @change="onSearch" v-model="searchText" placeholder="502美食园" shape="round" />
            </template>
            <!-- <template #right>
                <t-icon name="home" size="24px" />
                <t-icon name="ellipsis" size="24px" />
            </template> -->
        </t-navbar>
        <!-- <t-navbar title="502美食园" :fixed="false" class="custom-navbar" /> -->

        <div class="side-bar-wrapper">
            <t-side-bar :value="sideBarIndex" @change="onSideBarChange" @click="onSideBarClick">
                <t-side-bar-item v-for="(item, index) in data.categories" :key="index" :value="index"
                    :label="item.label" :badge-props="item.badgeProps" />
            </t-side-bar>
            <div ref="wrapper" class="content" @scroll="onScroll">
                <div v-for="(item, index) in data.categories" :key="index" class="section" :style="contentStyle">
                    <div class="title">{{ item.title || item.label }}</div>
                    <t-grid :column="1" :align="`left`" :border="false" theme="card">
                        <div v-for="(cargo, cargoIndex) in item.items" :key="cargoIndex"
                            :style="`display: flex;justify-content: space-between;align-items: center;`">
                            <t-grid-item :style="`flex: 1;justify-content: flex-start;`" :text="cargo.label"
                                :description="cargo.desc" :image="cargo.image" @click="clickItem" :layout="`horizontal`"
                                :image-props="{ shape: 'round', lazy: true }">
                            </t-grid-item>
                            <!-- <div>+</div> -->
                        </div>
                    </t-grid>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive, ref, onMounted, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { getCurrentInstance } from 'vue';
const vm = getCurrentInstance();
const router = useRouter()

const sideBarIndex = ref(1);

const data = reactive({
    categories: [
        {
            label: '特色菜',
            title: '特色菜',
            badgeProps: {},
            items: [
            ],
        },

    ],
});
const files = import.meta.globEager('../../public/menu/**/*')
Object.keys(files).map(key => {
    let k = key.split('/')
    let name = k[k.length - 1].slice(0, -4)
    let path = k[k.length - 1]
    data.categories[0].items.push({
        label: name,
        image: document.location.href.indexOf('github.io') > -1 ? ('/ParadiseCity/calendar/menu/' + path) : ('/menu/' + path),
        desc: ''
    })
})
const wrapper = ref();
const offsetTopList = reactive([]);
const contentStyle = ref('');
const getOffsetTopList = () => {
    if (wrapper.value) {
        const $title = wrapper.value.querySelectorAll(`.title`);
        $title.forEach((item) => offsetTopList.push(item.offsetTop));
    }
};
const backClick = () => {
    router.replace({ path: '/' })
}

const moveToActiveSideBar = (index) => {
    if (wrapper.value) {
        wrapper.value.scrollTop = offsetTopList[index] - offsetTopList[0];
    }
};
const searchText = ref('');
const dataBak = [...data.categories[0].items]
const onSearch = async () => {
    if (searchText.value) {
        data.categories[0].items = dataBak.filter(v => v.label.indexOf(searchText.value) > -1)
    } else {
        data.categories[0].items = dataBak
    }
    await nextTick();
    document.querySelectorAll('img').forEach(v => {
        v.addEventListener('click', (e) => {
            vm.proxy.$hevueImgPreview(e.target.src)
        })
    })
};
onMounted(() => {

    getOffsetTopList();
    moveToActiveSideBar(Number(sideBarIndex.value));
    document.querySelectorAll('img').forEach(v => {
        v.addEventListener('click', (e) => {
            vm.proxy.$hevueImgPreview(e.target.src)
        })
    })
});

const onSideBarClick = (value, label) => {

};
const clickItem = () => {

}
const onSideBarChange = (value) => {
    sideBarIndex.value = value;
    moveToActiveSideBar(Number(value));
};

const onScroll = (e) => {
    const threshold = offsetTopList[0]; // 下一个标题与顶部的距离
    const { scrollTop } = e.target;
    if (scrollTop < threshold) {
        sideBarIndex.value = 0;
        return;
    }
    const index = offsetTopList.findIndex((top) => top > scrollTop && top - scrollTop <= threshold);

    if (index > -1) {
        sideBarIndex.value = index;
    }
};
</script>
<style lang="less" scoped>
:deep(.t-image__img) {
    height: 60px;
}

.custom-navbar {
    --td-navbar-bg-color: #f3f3f3;
    --td-navbar-color: #222;
}

.side-bar-wrapper {
    display: flex;
    height: 100vh;
    background-color: var(--bg-color-demo, #fff);

    .content {
        flex: 1;
        overflow-y: scroll;
    }

    .section {
        padding: 16px 0;
    }

    .title {
        padding-left: 20px;
        margin-bottom: 4px;
        line-height: 26px;
    }

    .image {
        width: 48px;
        height: 48px;
    }
}
</style>