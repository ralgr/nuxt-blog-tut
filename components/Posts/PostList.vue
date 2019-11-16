<template>
    <section class="post-list">
        <PostsPreview
            v-for="post in postsToList"
            :key="post.id"
            :id="post.id"
            :postTitle="post.postTitle"
            :previewText="post.previewText"
            :thumbnail="post.thumbnail"
            :is-admin="isAdmin"/>   
    </section>  
</template>

<script>
    import PostsPreview from '@/components/Posts/PostsPreview'

    export default {
        name: 'PostList',
        components: {
            PostsPreview
        },
        props: {
            isAdmin: {
                type: Boolean,
                default: false
            },
            postsToList: {
                type: Array,
                required: true
            }
        },
    }
</script>

<style scoped>
    .post-list {
        display: flex;
        padding: 20px;
        box-sizing: border-box;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }
</style>