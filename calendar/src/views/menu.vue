<template>
    <div>
        <t-navbar title="502美食园" :fixed="false" class="custom-navbar" />

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
                            <div>+</div>
                        </div>
                    </t-grid>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import { TdSideBarProps, TdSideBarItemProps } from 'tdesign-mobile-vue';
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()

const image = 'https://tdesign.gtimg.com/mobile/demos/example2.png';
const items = new Array(12).fill({ label: '鱼香肉丝', image, desc: '描述' }, 0, 12);
const sideBarIndex = ref<TdSideBarProps['value']>(1);

const data = reactive({
    categories: [
        {
            label: '主食',
            title: '主食',
            badgeProps: {},
            items: [
                {
                    label: '钵仔饭', image, desc: '描述'
                }, {
                    label: '煮挂面', image, desc: '描述'
                }, {
                    label: '小米粥', image, desc: '描述'
                },
            ],
        },
        {
            label: '素菜',
            title: '素菜',
            items: [
                {
                    label: '西红柿炒鸡蛋', image, desc: '描述'
                }, {
                    label: '蘸酱菜', image, desc: '描述'
                }, {
                    label: '酸辣土豆丝', image, desc: '描述'
                }, {
                    label: '酸辣白菜', image, desc: '描述'
                }, {
                    label: '蒸茄子', image, desc: '描述'
                },
            ],
        },
        {
            label: '肉菜',
            title: '肉菜',
            badgeProps: {},
            items: [
                {
                    label: '煎鸡胸', image, desc: '描述'
                }, {
                    label: '水煮虾', image, desc: '描述'
                }, {
                    label: '涮牛羊肉', image, desc: '描述'
                },
            ],
        },
        {
            label: '火锅专区',
            title: '火锅专区',
            items: [
                {
                    label: '蟹棒', image, desc: '描述'
                }, {
                    label: '宽粉', image, desc: '描述'
                }, {
                    label: '生菜', image, desc: '描述'
                }, {
                    label: '冻豆腐', image, desc: '描述'
                }, {
                    label: '粉丝', image, desc: '描述'
                },
            ],
        },
        {
            label: '水果',
            title: '水果',
            badgeProps: {},
            items: [
                {
                    label: '苹果', image, desc: '描述'
                }, {
                    label: '橘子', image, desc: '描述'
                }, {
                    label: '柚子', image, desc: '描述'
                }, {
                    label: '西瓜', image, desc: '描述'
                }, {
                    label: '猕猴桃', image, desc: '描述'
                },
            ],
        },
    ],
});

const wrapper = ref<HTMLElement>();
const offsetTopList = reactive<number[]>([]);
const contentStyle = ref('');
const getOffsetTopList = () => {
    if (wrapper.value) {
        const $title = wrapper.value.querySelectorAll<HTMLElement>(`.title`);
        $title.forEach((item) => offsetTopList.push(item.offsetTop));
    }
};
const backClick = () => {
    router.replace({ path: '/' })
}

const moveToActiveSideBar = (index: number) => {
    if (wrapper.value) {
        wrapper.value.scrollTop = offsetTopList[index] - offsetTopList[0];
    }
};

onMounted(() => {
    getOffsetTopList();
    moveToActiveSideBar(Number(sideBarIndex.value));
});

const onSideBarClick = (value: TdSideBarProps['value'], label: TdSideBarItemProps['label']) => {
    console.log('=onSideBarClick===', value, label);
};
const clickItem = () => {

}
const onSideBarChange = (value: TdSideBarProps['value']) => {
    sideBarIndex.value = value;
    moveToActiveSideBar(Number(value));
};

const onScroll = (e: WheelEvent | Event) => {
    const threshold = offsetTopList[0]; // 下一个标题与顶部的距离
    const { scrollTop } = e.target as HTMLElement;
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