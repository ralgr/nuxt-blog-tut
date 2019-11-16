<template>
    <div class="single-post-page">
        <section class="post">
            <h1 class="post-title">{{ post.postTitle }}</h1>
            <div class="post-details">
                <div class="post-detail">Last updated on {{ post.updatedDate | date }}</div>
                <div class="post-detail">Written by {{ post.author }}</div>
            </div>
            <p class="post-content">{{ post.content }}</p>
            <section class="post-feedback">
                <p>What you think? <a href="#">awesome domain</a></p>
            </section>
        </section>
    </div>
</template>

<script>
    export default {
        asyncData(context) {
            // context.payload is only available during the static generation command.

            // if (context.payload) {
            //   return {
            //       post: context.payload.postData
            //   }
            // }
            
            return context.app.$axios.$get(`/posts/${context.params.id}.json`)
            .then(data => {              
                return {
                    post: data
                }
            })
            .catch(err => context.error(err))
        }
    }
</script>

<style scoped>
    .single-post-page {
    padding: 30px;
    text-align: center;
    box-sizing: border-box;
    }

    .post {
    width: 100%;
    }

    @media (min-width: 768px) {
    .post {
        width: 600px;
        margin: auto;
    }
    }

    .post-title {
    margin: 0;
    }

    .post-details {
    padding: 10px;
    box-sizing: border-box;
    border-bottom: 3px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    }

    @media (min-width: 768px) {
    .post-details {
        flex-direction: row;
    }
    }

    .post-detail {
    color: rgb(88, 88, 88);
    margin: 0 10px;
    }

    .post-feedback a {
    color: red;
    text-decoration: none;
    }

    .post-feedback a:hover,
    .post-feedback a:active {
    color: salmon;
    }
</style>