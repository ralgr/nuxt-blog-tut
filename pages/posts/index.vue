<template>
    <div class="posts-page">
        <PostList :postsToList="loadedPosts"/>
    </div>
</template>

<script>
    export default {
        name: 'index',
        // For middleware
        
        // middleware: 'log',

        // 'fetch' is a special method added by nuxt
        // Similar to asyncData, it can run in the server for the first load 
        // and in the client afterwards
        // Unlike asyncData, it does not merge the data with the data property
        // of the component and instead stores it in the vuex store if instructed
        // to do so. The data in 'fetch' can be used depending on use cases.

        // fetch(context) {
        //     if (context.store.state.loadedPosts.length > 0) {
        //         return null;
        //     }

        //     // Promise version
        //     return new Promise((resolve, reject) => {
        //         setTimeout(() => {
        //             resolve({
        //                 posts: [
        //                     {
        //                         id: '1',
        //                         postTitle: 'ゴブリンスレイヤー',
        //                         previewText: "A young priestess has formed her first adventuring party, but almost immediately they find themselves in distress. Luckily for her, the Goblin Slayer chose that place as his next killing grounds--a man who's dedicated his life to the extermination of all goblins, by any means necessary. And when rumors of his feats begin to circulate, there's no telling who might come calling next.",
        //                         thumbnail: 'https://s.pacn.ws/1500/w9/gin-no-kisei-cd-dvd-goblin-slayer-limited-edition-580673.1.jpg?pmw9h6'
        //                     },
        //                     {
        //                         id: '2',
        //                         postTitle: 'ログ・ホライズン',
        //                         previewText: "When thirty thousand Japanese gamers are suddenly trapped in the online game world of 'Elder Tale', a realm of swords and sorcery that was, up until yesterday, very much a fantasy is now their cold, hard reality. Severed from their everyday lives, theyre faced with fighting monsters, eating food with no flavor, and being unable to die?! Amid the chaos in 'Elder Tale' Akihabara, veteran gamer Shiroe locates his old friend Naotsugu and teams up with the beautiful female assassin Akatsuki. Together they embark on an adventure to change the world as they know it!",
        //                         thumbnail: 'https://vignette.wikia.nocookie.net/log-horizon/images/9/93/Character_Slider.jpg/revision/latest/scale-to-width-down/670?cb=20180522155243'
        //                     }
        //                 ]  
        //             })
        //         }, 1000);
        //     })
        //     .then(data => {
        //         // Previously, when asyncData was used, it was sufficient to just
        //         // return the data as is. For 'fetch' however, it is better to dispatch
        //         // directly to the store. The store can be accessed in the context object.
        
        //         context.store.dispatch('setLoadedPostsAction', data.posts)
        //     })
        // },
        computed: {
            loadedPosts() {               
                return this.$store.getters.loadedPosts
            }
        }
    }
</script>

<style scoped>
    .posts-page {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>