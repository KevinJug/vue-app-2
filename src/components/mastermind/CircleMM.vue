<template>
    <div>
        <p
                class="circle center border"
                @click="swapColorCircle"
                :class="[this.colors.indexColors !== -1 ? 'circle-' + this.colors.colors : '', swap ? 'pointer' : '']"
        >{{colors.initialization}}</p>
    </div>

</template>

<script>
    export default {
        name: "CircleMM",
        props: {
            colors: {
                type: Object
            },
            swap: {
                type: Boolean,
            }
        },
        methods: {
            swapColorCircle() {
                if (this.swap){
                    this.colors.initialization = "";
                    this.$emit('change-colors',this.colors);
                }
            }
        }
    }
</script>

<style scoped>

</style>