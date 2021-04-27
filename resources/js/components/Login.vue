<template>
    <div class="container">
<h1>Login page</h1>
{{ count }}
    </div>
</template>

<script>
import { mapState } from 'vuex';
    export default {
        mounted() {
            console.log('Component mounted.')
        },
        computed: {
            ...mapState({
                count: state => state.count
        }),
        }
    }
</script>
