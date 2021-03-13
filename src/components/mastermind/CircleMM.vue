<template>
    <div>
        <drop class="circle center border" :class="this.colors.colors !== '' ? 'circle-' + this.colors.colors : ''"
              @drop="swapColorCircle">
            <p>{{this.colors.colors ? '' : '?'}}</p>
        </drop>
       </div>

</template>

<script>
    import {Drop} from "vue-easy-dnd";

    export default {
        name: "CircleMM",
        components: {
            Drop
        },
        props: {
            colors: {
                type: Object
            },
            swap: {
                type: Boolean,
            }
        },
        data() {
            return {
                color: ''
            }
        },
        methods: {
            swapColorCircle(e) {
                if (this.swap) {
                    this.colors.colors = e.data.color;
                    this.colors.indexColors = e.data.index;
                    this.$emit('change-colors', this.colors);
                }
            }
        }
    }
</script>

<style scoped>

</style>