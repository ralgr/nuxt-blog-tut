<template>
    <div class="admin-post-page">
        <section class="update-form">
            <AdminPostForm @submit="onSubmitEdit" :post="loadedPost"/>
        </section>
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

        asyncData(context) {
            return context.app.$axios.$get(`/posts/${context.params.postId}.json`)
            .then(data => {
                return {
                    loadedPost: {...data, id: context.params.postId}
                }
            })
            .catch(err => context.error(err))
        },

        methods: {
            onSubmitEdit(editedPost) {
                this.$store.dispatch('editPostAction', editedPost)
                .then(() => {
                    this.$router.push('/admin')
                })
            }
        }
    }
</script>

<style scoped>
    .update-form {
    width: 90%;
    margin: 20px auto;
    }
    @media (min-width: 768px) {
    .update-form {
        width: 500px;
    }
    }
</style>