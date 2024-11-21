<template>
    <div>
        <t-navbar :fixed="true">
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
                            :style="`display: flex;justify-content: space-between;align-items: center;border-bottom: 1px solid #eee;`">
                            <t-grid-item :style="`flex: 1;justify-content: flex-start;`" :text="cargo.label"
                                :description="cargo.desc" :image="cargo.image" @click="clickItem" :layout="`horizontal`"
                                :image-props="{ shape: 'round', lazy: true }">
                            </t-grid-item>
                            <t-stepper v-model="data.buyList.find(v => v.label == cargo.label).num" theme="outline"
                                v-if="data.buyList.find(v => v.label == cargo.label)" @change="() => {
                                    if (data.buyList.find(v => v.label == cargo.label).num == 0) {
                                        data.buyList = data.buyList.filter(v => v.label != cargo.label)
                                    }
                                }" />
                            <AddIcon v-else @click="() => {
                                data.buyList.push({ ...cargo, num: 1 })
                            }" />
                        </div>
                    </t-grid>
                </div>
            </div>
        </div>
        <t-popup v-model="visible" placement="bottom" style="height: 70vh;overflow: auto;">
            <div class="header">
                <div class="btn btn--cancel" aria-role="button" @click="onHide">取消</div>
                <div class="title">购物车</div>
                <div class="btn btn--confirm" aria-role="button" @click="payOrder">下单</div>
            </div>
            <div>
                <t-grid :column="1" :align="`left`" :border="false" theme="card">
                    <div v-for="(cargo, cargoIndex) in data.buyList" :key="cargoIndex"
                        :style="`display: flex;justify-content: space-between;align-items: center;border-bottom: 1px solid #eee;`">
                        <t-grid-item :style="`flex: 1;justify-content: flex-start;`" :text="cargo.label"
                            :description="cargo.desc" :image="cargo.image" @click="clickItem" :layout="`horizontal`"
                            :image-props="{ shape: 'round', lazy: true }">
                        </t-grid-item>
                        <t-stepper v-model="cargo.num" theme="outline" @change="() => {
                            if (cargo.num == 0) {
                                data.buyList = data.buyList.filter(v => v.label != cargo.label)
                            }
                        }" />
                    </div>
                </t-grid>
            </div>
        </t-popup>
        <t-badge :count="data.buyList.length" :offset="[5, 5]" class="badge-item"
            style="position: fixed;left: 20px;bottom: 20px;">
            <t-button @click="visible = true" size="large" :icon="searchIcon" shape="circle"
                aria-label="购物车"></t-button>
        </t-badge>
    </div>
</template>
<script setup>
import { reactive, ref, h, onMounted, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { getCurrentInstance } from 'vue';
import {
    CartAddIcon, AddIcon,
} from 'tdesign-icons-vue-next';
import { copyText } from 'vue3-clipboard'
import { Toast } from 'tdesign-mobile-vue';

const vm = getCurrentInstance();
const router = useRouter()
const visible = ref(false);
const onHide = () => (visible.value = false);
const payOrder = () => {
    copyText('今日菜单：' + data.buyList.map(v => `${v.label} * ${v.num}`).join(','), undefined, (error) => {
        if (error) {
            Toast({
                theme: 'error',
                direction: 'column',
                message: '下单失败！',
            });
        } else {
            Toast({
                theme: 'success',
                duration: 3000,
                direction: 'column',
                message: '菜谱已复制成功！快去分享吧',
            });
        }
    });
}
const sideBarIndex = ref(1);
const searchIcon = () => h(CartAddIcon, { size: '24px' });
const data = reactive({
    categories: [
        {
            label: '特色菜',
            title: '特色菜',
            badgeProps: { maxCount: 999, offset: [-12, 5], color: '#0052d9' },
            items: [
            ],
        },
        {
            label: '主食',
            title: '主食',
            badgeProps: { maxCount: 999, offset: [-12, 5], color: '#0052d9' },
            items: [
            ],
        },
        {
            label: '凉菜',
            title: '凉菜',
            badgeProps: { maxCount: 999, offset: [-12, 5], color: '#0052d9' },
            items: [
            ],
        },
        {
            label: '汤羹',
            title: '汤羹',
            badgeProps: { maxCount: 999, offset: [-12, 5], color: '#0052d9' },
            items: [
            ],
        },
    ],
    buyList: []
});
const files = import.meta.globEager('../../public/menu/**/*')
Object.keys(files).map(key => {
    let k = key.split('/')
    let name = k[k.length - 1].slice(0, -4)
    let path = k[k.length - 1]
    if (name.indexOf('饭') > -1 || name.indexOf('面') > -1 || name.indexOf('饺') > -1 || name.indexOf('饼') > -1) {
        data.categories[1].items.push({
            label: name,
            image: document.location.href.indexOf('github.io') > -1 ? ('/ParadiseCity/calendar/menu/' + path) : ('/menu/' + path),
            desc: '',
            num: 0
        })
        return;
    }
    if (name.indexOf('拌') > -1) {
        data.categories[2].items.push({
            label: name,
            image: document.location.href.indexOf('github.io') > -1 ? ('/ParadiseCity/calendar/menu/' + path) : ('/menu/' + path),
            desc: '',
            num: 0
        })
        return;
    }
    if (name.indexOf('汤') > -1) {
        data.categories[3].items.push({
            label: name,
            image: document.location.href.indexOf('github.io') > -1 ? ('/ParadiseCity/calendar/menu/' + path) : ('/menu/' + path),
            desc: '',
            num: 0
        })
        return;
    }
    data.categories[0].items.push({
        label: name,
        image: document.location.href.indexOf('github.io') > -1 ? ('/ParadiseCity/calendar/menu/' + path) : ('/menu/' + path),
        desc: '',
        num: 0
    })

})
data.categories.map(v => {
    v.badgeProps.count = v.items.length
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
        wrapper.value.scrollTop = offsetTopList[index] - offsetTopList[0] - 100;
    }
};
const searchText = ref('');
const categoriesBak = JSON.parse(JSON.stringify(data.categories))
const onSearch = async () => {
    if (searchText.value) {
        data.categories.map((v, i) => {
            v.items = categoriesBak[i].items.filter(v => v.label.indexOf(searchText.value) > -1)
        })
    } else {
        data.categories.map((v, i) => {
            v.items = categoriesBak[i].items
        })
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
.popup-demo {
    padding: 0 16px;
}

.header {
    display: flex;
    align-items: center;
    height: 116rpx;
}

.title {
    flex: 1;
    text-align: center;
    font-weight: 600;
    font-size: 18px;
    color: var(--td-text-color-primary, rgba(0, 0, 0, 0.9));
}

.btn {
    font-size: 16px;
    padding: 16px;
}

.btn--cancel {
    color: var(--td-text-color-secondary, rgba(0, 0, 0, 0.6));
}

.btn--confirm {
    color: #0052d9;
}

:deep(.t-image__img) {
    max-height: 60px;
}

.custom-navbar {
    --td-navbar-bg-color: #f3f3f3;
    --td-navbar-color: #222;
}

.side-bar-wrapper {
    padding-top: 50px;
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