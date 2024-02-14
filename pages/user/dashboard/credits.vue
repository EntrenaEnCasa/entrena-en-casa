<template>
    <div class="relative grid gap-y-10">
        <h3 class="text-xl font-medium ">Créditos</h3>
        <div class="grid gap-2">
            <div class="text-secondary flex justify-end mr-3 ">
                <p class="text-sm mr-3">¿Qué significa cada crédito</p>
                <Icon name="fa6-solid:circle-info" />
            </div>
            <div class="bg-white flex  justify-between h-14 py-4 px-8 rounded-2xl border border-zinc-200"
                style="box-shadow: 0px 4px 50px -16px rgba(0, 0, 0, 0.10);">
                <div>
                    <h5 class="text-lg font-semibold">Tus créditos</h5>
                </div>
                <div>
                    <div v-if="user.credits" class="flex  space-x-4">
                        <div class="flex items-center space-x-1">
                            <img src="/plans/gold-medal.png" class="w-4 h-4" alt="">
                            <span> {{ user.credits.gold }}</span>
                        </div>
                        <div class="flex items-center space-x-1">
                            <img src="/plans/silver-medal.png" class="w-4 h-4" alt="">
                            <span> {{ user.credits.silver }}</span>
                        </div>
                        <div class="flex items-center space-x-1">
                            <img src="/plans/bronze-medal.png" class="w-4 h-4" alt="">
                            <span> {{ user.credits.bronze }}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="flex justify-center gap-4 text-center">
            <button @click="ChangeSelect('gold')"
                class="w-24 px-4 py-2 bg-yellow-500/80 rounded-lg text-white font-bold ">Oro</button>
            <button @click="ChangeSelect('silver')"
                class="px-4 w-24 py-2 bg-gray-500 rounded-lg text-white font-bold ">Plata</button>
            <button @click="ChangeSelect('bronze')"
                class="px-4 w-24 py-2 bg-orange-700/60 rounded-lg text-white font-bold ">Bronce</button>
        </div>
        <div class="mx-2 md:mx-6  bg-white border border-zinc-200  p-4"
            style="box-shadow: 0px 4px 50px -16px rgba(0, 0, 0, 0.10);">
            <table class=" table-fixed w-full text-sm text-left">
                <thead class=" text-xs text-gray-700 uppercase ">
                    <tr class="p-8">
                        <th class=" w-1/3 md:w-2/3">Descripción</th>
                        <th class="md:w-1/9">Créditos</th>
                        <th class="md:w-1/9">Valor</th>
                        <th class="md:w-1/9"></th>
                    </tr>

                </thead>
                <tbody>
                    <tr v-for="item in tableInformation.items" :key="item.id" class="">
                        <td class="py-4 wrap pr-2 text-md">
                            {{ item.description }}
                        </td>
                        <td class=" py-4  flex items-center space-x-1">

                            <img :src="`/plans/${item.credit_type}-medal.png`" class="w-5 h-5" alt="">
                            {{ item.quantity }}

                        </td>
                        <td class=" py-4 flex-wrap font-bold">
                            {{ item.price }}
                        </td>
                        <td class=" py-4 ">
                            <button class="px-4 py-2 bg-primary text-white rounded-md font-medium"
                                @click="addCredits(item)">
                                Comprar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>
</template>

<script setup>

import { useUserStore } from '~/stores/UserStore';
const runtimeConfig = useRuntimeConfig();
const router = useRouter();
const userStore = useUserStore();


const user = ref({})

const newCredits = ref({
    gold: 0,
    silver: 0,
    bronze: 0,
})


const tableInformation = ref({
    selected: "gold",
    items: []
});

const ChangeSelect = (type) => {
    tableInformation.value.selected = type;
    fetchTableInformation()
}

onMounted(() => {
    user.value = userStore.user;
    fetchTableInformation()
})

const fetchTableInformation = async () => {
    await useFetch("/data.json", {
        onResponse({ response }) {

            tableInformation.value.items = response._data[tableInformation.value.selected];
        },
    });
};

const addCredits = async (item) => {
    await useFetch(`${runtimeConfig.public.apiBase}/student/credits`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": userStore.userToken || '',
        },
        body: JSON.stringify({
            user_id: userStore.user.user_id,
            credit_type: item.credit_type,
            quantity: item.quantity,
        }),
        onResponse({ request, response, options }) {
            let responseData = response._data;
            if (responseData.success) {
                newCredits.value = {
                    gold: responseData.credits.gold,
                    silver: responseData.credits.silver,
                    bronze: responseData.credits.bronze,
                }
                alert(responseData.message);
            } else {
                alert(responseData.message);
            }
        },
    });
}


</script>