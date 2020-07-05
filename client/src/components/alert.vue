<template>
    <div>
        <v-alert type="success" v-if="message" class="alert">
            {{ message }}
        </v-alert>
    </div>
</template>
<style scoped src='../assets/css/alert.css' lang='csss'>
</style>
<script>
import alert from '../scripts/alert_component'
export default alert
</script>
