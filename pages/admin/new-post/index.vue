<template>
    <div class="new-post">
        <AdminPostForm @submit="onSubmitted" />
    </div>
</template>

<script>
    import AdminPostForm from '@/components/Admin/AdminPostForm'

    export default {
        layout: 'admin',
        middleware: ['check-auth', 'auth'],
        components: {
            AdminPostForm
        },
        methods: {
            onSubmitted(postData) {
               this.$store.dispatch('addPostAction', postData) 
               .then(() => {
                   this.$router.push('/admin')
               })
            }
        }
    }
</script>

<style scoped>
    .new-post {
    width: 90%;
    margin: 20px auto;
    }

    @media (min-width: 768px) {
        .new-post {
            width: 500px;
        }
    }
</style>