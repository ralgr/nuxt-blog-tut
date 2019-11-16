<template>
  <div class="homepage">
    <section class="intro">
      <h1>Get the latest anime news!</h1>
    </section>

    <PostList :postsToList="posts" />
  </div>
</template>

<script>
export default {
  name: 'index',
  computed: {
    posts() {
      return this.$store.getters.loadedPosts
    }
  }
  // asyncData is executed in the server allowing for better SEO
  // as the crawler will detect the data on the page because this
  // data will also be rendered server-side for the first page only
  // "this" keyword does not work in asyncData beccase asyncData
  // runs before the component is created
  // asyncData should return a JS object
  // asyncData needs a greenlight to know when data fetching is finished
  // Two ways are presented: Promises and use of callback
  // For the callback, the "context" argument is used with "callback" method 
  // that CAN BE EXECUTED. The execution of the "callback" will signal the
  // asyncData function that the operation is finished.
  // "context" contains various data including the param data usually found
  // in $route.params in an SPA.
  // Note that Callback-based asyncData is deprecated and it is recommended to use
  // promises and async/await syntax
  // This would make the app wait for the async code on the server before giving 
  // the first page to the client
  
  // asyncData(context, callback) {
  //   setTimeout(() => {
  //     // Can pass error or pass null if no error
  //     // Second argument is the data itself
  //     callback(null, {
  //       posts: [
  //         {
  //           id: '1',
  //           postTitle: 'ゴブリンスレイヤー',
  //           previewText: "A young priestess has formed her first adventuring party, but almost immediately they find themselves in distress. Luckily for her, the Goblin Slayer chose that place as his next killing grounds--a man who's dedicated his life to the extermination of all goblins, by any means necessary. And when rumors of his feats begin to circulate, there's no telling who might come calling next.",
  //           thumbnail: 'https://s.pacn.ws/1500/w9/gin-no-kisei-cd-dvd-goblin-slayer-limited-edition-580673.1.jpg?pmw9h6'
  //         },
  //         {
  //           id: '2',
  //           postTitle: 'ログ・ホライズン',
  //           previewText: "When thirty thousand Japanese gamers are suddenly trapped in the online game world of 'Elder Tale', a realm of swords and sorcery that was, up until yesterday, very much a fantasy is now their cold, hard reality. Severed from their everyday lives, theyre faced with fighting monsters, eating food with no flavor, and being unable to die?! Amid the chaos in 'Elder Tale' Akihabara, veteran gamer Shiroe locates his old friend Naotsugu and teams up with the beautiful female assassin Akatsuki. Together they embark on an adventure to change the world as they know it!",
  //           thumbnail: 'https://vignette.wikia.nocookie.net/log-horizon/images/9/93/Character_Slider.jpg/revision/latest/scale-to-width-down/670?cb=20180522155243'
  //         }
  //       ]  
  //     })
  //   }, 1000);
  // },
}
</script>

<style scoped>
  .intro {
    height: 300px;
    position: relative;
    padding: 30px;
    box-sizing: border-box;
    background-image: url('~assets/images/main-page-background.jpg');
    background-position: center;
    background-size: cover;
  }

  .intro h1 {
    position: absolute;
    top: 10%;
    left: 5%;
    width: 90%;
    font-size: 1.5rem;
    color: black;
    background-color: rgb(211, 211, 211);
    padding: 10px;
    border-radius: 10px;
    box-shadow: 3px 3px 3px black;
    box-sizing: border-box;
    border: 1px solid black;
  }

  @media (min-width: 768px) {
    .intro h1 {
      font-size: 2rem;
    }
  }
</style>
